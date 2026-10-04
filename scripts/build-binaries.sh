#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="${DIR}/dist-release"
CLI_ENTRY="${DIR}/packages/cli/src/bin.ts"
VERSION=$(node -p "require('${DIR}/packages/cli/package.json').version")

echo "Building standalone native binaries for tdrop v${VERSION}..."
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR/bin"

TARGETS=(
  "bun-darwin-arm64:darwin-arm64:"
  "bun-darwin-x64:darwin-x64:"
  "bun-linux-x64:linux-x64:"
  "bun-linux-arm64:linux-arm64:"
  "bun-windows-x64:windows-x64:.exe"
)

for ITEM in "${TARGETS[@]}"; do
  IFS=":" read -r BUN_TARGET PLATFORM EXT <<< "$ITEM"
  OUT_BIN="$DIST_DIR/bin/tdrop-${PLATFORM}${EXT}"
  echo "==> Compiling for $BUN_TARGET -> $OUT_BIN"
  bun build --compile --target="$BUN_TARGET" "$CLI_ENTRY" --outfile "$OUT_BIN"
done

echo "==> Packaging distribution archives..."
cd "$DIST_DIR"

# Package Unix binaries (.tar.gz)
for PLATFORM in "darwin-arm64" "darwin-x64" "linux-x64" "linux-arm64"; do
  cp "bin/tdrop-${PLATFORM}" ./tdrop
  tar -czf "tdrop-${PLATFORM}.tar.gz" tdrop
  rm -f tdrop
  echo "Packaged tdrop-${PLATFORM}.tar.gz"
done

# Package Windows binary (.zip)
cp "bin/tdrop-windows-x64.exe" ./tdrop.exe
zip -q -9 "tdrop-windows-x64.zip" tdrop.exe
rm -f tdrop.exe
echo "Packaged tdrop-windows-x64.zip"

# Copy raw binaries alongside archives for direct curl download
cp bin/* .

echo "==> Generating sha256 checksums..."
if command -v shasum >/dev/null 2>&1; then
  shasum -a 256 *.tar.gz *.zip > sha256sums.txt
elif command -v sha256sum >/dev/null 2>&1; then
  sha256sum *.tar.gz *.zip > sha256sums.txt
fi

cat sha256sums.txt
echo "==> Done! Release artifacts created in $DIST_DIR"
