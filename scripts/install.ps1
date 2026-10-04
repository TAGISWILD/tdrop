# tdrop - Instant Windows PowerShell Installer
# Usage: irm https://tdrop.link/install.ps1 | iex

$ErrorActionPreference = "Stop"

$Repo = "TAGISWILD/tdrop"
$BinaryName = "tdrop.exe"

Write-Host "tdrop · Fast, Ephemeral File Sharing CLI" -ForegroundColor Cyan
Write-Host "Installing latest release for Windows...`n"

$InstallDir = "$env:LOCALAPPDATA\Programs\tdrop\bin"
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
        # Try raw exe fallback
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
        # Check if npm is installed as fallback
        $npmCmd = Get-Command npm -ErrorAction SilentlyContinue
        if ($npmCmd) {
            Write-Host "Prebuilt Windows binary not found on GitHub, falling back to npm..." -ForegroundColor Yellow
            npm install -g tdrop
            Write-Host "`n✔ Installed successfully via npm!" -ForegroundColor Green
            return
        } else {
            throw "Failed to download tdrop from GitHub Releases ($DownloadUrl)."
        }
    }

    # Add to User PATH permanently if not present
    $UserPath = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User)
    if ($UserPath -notlike "*$InstallDir*") {
        $NewPath = "$InstallDir;$UserPath"
        [Environment]::SetEnvironmentVariable("Path", $NewPath, [EnvironmentVariableTarget]::User)
        $env:Path = "$InstallDir;$env:Path"
        Write-Host "  ✔ Added $InstallDir to user PATH" -ForegroundColor DarkGray
    }

    Write-Host "`n✔ tdrop successfully installed to $TargetExe!" -ForegroundColor Green
    Write-Host "`nQuick Start:" -ForegroundColor White
    Write-Host "  tdrop <file>                  Upload file and get instant link + QR" -ForegroundColor Cyan
    Write-Host "  cat file.txt | tdrop -n a.txt Stream piped stdin" -ForegroundColor Cyan
    Write-Host "  tdrop --help                  Show CLI options`n" -ForegroundColor Cyan

} finally {
    if (Test-Path $TempDir) {
        Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}
