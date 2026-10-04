import { Hono } from "hono";
import type { AppContext } from "../types.js";

export const installRoute = new Hono<AppContext>();

installRoute.get("/install.sh", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const repo = "TAGISWILD/tdrop";

  const script = `#!/usr/bin/env sh
set -e

# tdrop - Instant One-Liner Terminal Installer
# Usage: curl -fsSL https://${domain}/install.sh | bash

REPO="${repo}"
BINARY_NAME="tdrop"

# ANSI Colors
BOLD="\\033[1m"
GREEN="\\033[32m"
CYAN="\\033[36m"
YELLOW="\\033[33m"
RED="\\033[31m"
RESET="\\033[0m"

printf "\${CYAN}\${BOLD}tdrop\${RESET} · Fast, Ephemeral File Sharing CLI\\n"
printf "Installing latest release...\\n\\n"

# 1. Detect OS
OS="\$(uname -s)"
case "\$OS" in
  Darwin*) TARGET_OS="darwin" ;;
  Linux*)  TARGET_OS="linux" ;;
  *)
    printf "\${RED}Unsupported Operating System: %s\${RESET}\\n" "\$OS"
    printf "Windows users: run \${CYAN}irm https://${domain}/install.ps1 | iex\${RESET}\\n"
    exit 1
    ;;
esac

# 2. Detect Architecture
ARCH="\$(uname -m)"
case "\$ARCH" in
  x86_64|amd64)   TARGET_ARCH="x64" ;;
  arm64|aarch64)  TARGET_ARCH="arm64" ;;
  *)
    printf "\${RED}Unsupported architecture: %s\${RESET}\\n" "\$ARCH"
    exit 1
    ;;
esac

ASSET_NAME="\${BINARY_NAME}-\${TARGET_OS}-\${TARGET_ARCH}"
TAR_NAME="\${ASSET_NAME}.tar.gz"
DOWNLOAD_URL="https://github.com/\${REPO}/releases/latest/download/\${TAR_NAME}"
FALLBACK_RAW_URL="https://github.com/\${REPO}/releases/latest/download/\${ASSET_NAME}"

# 3. Determine install destination
if [ -w "/usr/local/bin" ]; then
  INSTALL_DIR="/usr/local/bin"
elif [ -n "\$SUDO_USER" ] && [ -w "/usr/local/bin" ]; then
  INSTALL_DIR="/usr/local/bin"
else
  INSTALL_DIR="\${HOME}/.local/bin"
  mkdir -p "\$INSTALL_DIR"
fi

TMP_DIR="\$(mktemp -d 2>/dev/null || mktemp -d -t 'tdrop')"
cleanup() {
  rm -rf "\$TMP_DIR"
}
trap cleanup EXIT INT TERM

# 4. Download
printf "  \${BOLD}↓\${RESET} Downloading %s (%s-%s)...\\n" "\$BINARY_NAME" "\$TARGET_OS" "\$TARGET_ARCH"

HTTP_CODE=0
if command -v curl >/dev/null 2>&1; then
  HTTP_CODE=\$(curl -sSL -w "%{http_code}" -o "\${TMP_DIR}/\${TAR_NAME}" "\$DOWNLOAD_URL" || true)
elif command -v wget >/dev/null 2>&1; then
  wget -q -O "\${TMP_DIR}/\${TAR_NAME}" "\$DOWNLOAD_URL" && HTTP_CODE=200 || HTTP_CODE=404
else
  printf "\${RED}Error: curl or wget is required to install tdrop.\${RESET}\\n"
  exit 1
fi

if [ "\$HTTP_CODE" != "200" ] && [ "\$HTTP_CODE" != "302" ]; then
  # Try direct raw binary download if tar.gz was not found
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL -o "\${TMP_DIR}/\${BINARY_NAME}" "\$FALLBACK_RAW_URL" || true
  fi
fi

# Extract or copy
if [ -f "\${TMP_DIR}/\${TAR_NAME}" ] && tar -tzf "\${TMP_DIR}/\${TAR_NAME}" >/dev/null 2>&1; then
  tar -xzf "\${TMP_DIR}/\${TAR_NAME}" -C "\$TMP_DIR"
  EXTRACTED_BIN="\${TMP_DIR}/\${BINARY_NAME}"
  if [ ! -f "\$EXTRACTED_BIN" ]; then
    EXTRACTED_BIN="\${TMP_DIR}/\${ASSET_NAME}"
  fi
  cp "\$EXTRACTED_BIN" "\${TMP_DIR}/\${BINARY_NAME}"
fi

if [ ! -f "\${TMP_DIR}/\${BINARY_NAME}" ]; then
  # Fallback to npm global install if node is available
  if command -v npm >/dev/null 2>&1; then
    printf "\${YELLOW}Prebuilt binary unavailable for this version, falling back to npm global install...\${RESET}\\n"
    npm install -g tdrop
    printf "\\n\${GREEN}✔ Installed successfully via npm!\${RESET}\\n"
    exit 0
  else
    printf "\${RED}Failed to download binary from GitHub Releases.\${RESET}\\n"
    printf "Please check https://github.com/%s/releases\\n" "\$REPO"
    exit 1
  fi
fi

chmod +x "\${TMP_DIR}/\${BINARY_NAME}"

# Move to target dir
if [ -w "\$INSTALL_DIR" ]; then
  mv "\${TMP_DIR}/\${BINARY_NAME}" "\${INSTALL_DIR}/\${BINARY_NAME}"
else
  printf "  Elevated permissions required to install to %s. Running sudo...\\n" "\$INSTALL_DIR"
  sudo mv "\${TMP_DIR}/\${BINARY_NAME}" "\${INSTALL_DIR}/\${BINARY_NAME}"
fi

printf "\\n\${GREEN}\${BOLD}✔ tdrop successfully installed to \${INSTALL_DIR}/\${BINARY_NAME}!\${RESET}\\n"

# Verify PATH
case ":\$PATH:" in
  *":\$INSTALL_DIR:"*) ;;
  *)
    printf "\\n\${YELLOW}Note:\${RESET} %s is not in your current PATH.\\n" "\$INSTALL_DIR"
    printf "Add it by running:\\n"
    printf "  \${BOLD}export PATH=\\"%s:\\$PATH\\"\${RESET}\\n" "\$INSTALL_DIR"
    printf "or adding it to your ~/.bashrc or ~/.zshrc\\n\\n"
    ;;
esac

printf "\\n\${BOLD}Quick Start:\${RESET}\\n"
printf "  \${CYAN}tdrop <file>\${RESET}                  Upload file and get instant link + QR\\n"
printf "  \${CYAN}cat file | tdrop -n log.txt\${RESET}   Stream piped stdin to edge\\n"
printf "  \${CYAN}tdrop --help\${RESET}                  Show all CLI options\\n\\n"
`;

  return new Response(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
});

installRoute.get("/install.ps1", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const repo = "TAGISWILD/tdrop";

  const script = `# tdrop - Instant Windows PowerShell Installer
# Usage: irm https://${domain}/install.ps1 | iex

$ErrorActionPreference = "Stop"

$Repo = "${repo}"
$BinaryName = "tdrop.exe"

Write-Host "tdrop · Fast, Ephemeral File Sharing CLI" -ForegroundColor Cyan
Write-Host "Installing latest release for Windows...\`n"

$InstallDir = "$env:LOCALAPPDATA\\Programs\\tdrop\\bin"
if (-not (Test-Path -Path $InstallDir)) {
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
}

$TargetExe = Join-Path $InstallDir $BinaryName
$ZipName = "tdrop-windows-x64.zip"
$DownloadUrl = "https://github.com/$Repo/releases/latest/download/$ZipName"
$FallbackExeUrl = "https://github.com/$Repo/releases/latest/download/tdrop-windows-x64.exe"

$TempDir = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), [System.IO.Path]::GetRandomFileName())
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

try {
    Write-Host "  ↓ Downloading tdrop for Windows (x64)..." -ForegroundColor White
    $ZipPath = Join-Path $TempDir $ZipName
    
    $downloadSuccess = $false
    try {
        Invoke-WebRequest -Uri $DownloadUrl -OutFile $ZipPath -UseBasicParsing
        $downloadSuccess = $true
    } catch {
        try {
            Invoke-WebRequest -Uri $FallbackExeUrl -OutFile $TargetExe -UseBasicParsing
            $downloadSuccess = $true
        } catch {
            $downloadSuccess = $false
        }
    }

    if ($downloadSuccess -and (Test-Path $ZipPath)) {
        Expand-Archive -Path $ZipPath -DestinationPath $TempDir -Force
        $Extracted = Get-ChildItem -Path $TempDir -Filter "*.exe" -Recurse | Select-Object -First 1
        if ($Extracted) {
            Move-Item -Path $Extracted.FullName -Destination $TargetExe -Force
        }
    }

    if (-not (Test-Path $TargetExe)) {
        $npmCmd = Get-Command npm -ErrorAction SilentlyContinue
        if ($npmCmd) {
            Write-Host "Prebuilt Windows binary not found on GitHub, falling back to npm..." -ForegroundColor Yellow
            npm install -g tdrop
            Write-Host "\`n✔ Installed successfully via npm!" -ForegroundColor Green
            return
        } else {
            throw "Failed to download tdrop from GitHub Releases ($DownloadUrl)."
        }
    }

    $UserPath = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User)
    if ($UserPath -notlike "*$InstallDir*") {
        $NewPath = "$InstallDir;$UserPath"
        [Environment]::SetEnvironmentVariable("Path", $NewPath, [EnvironmentVariableTarget]::User)
        $env:Path = "$InstallDir;$env:Path"
        Write-Host "  ✔ Added $InstallDir to user PATH" -ForegroundColor DarkGray
    }

    Write-Host "\`n✔ tdrop successfully installed to $TargetExe!" -ForegroundColor Green
    Write-Host "\`nQuick Start:" -ForegroundColor White
    Write-Host "  tdrop <file>                  Upload file and get instant link + QR" -ForegroundColor Cyan
    Write-Host "  cat file.txt | tdrop -n a.txt Stream piped stdin" -ForegroundColor Cyan
    Write-Host "  tdrop --help                  Show CLI options\`n" -ForegroundColor Cyan

} finally {
    if (Test-Path $TempDir) {
        Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}
`;

  return new Response(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
});
