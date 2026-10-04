# Maintainer: EthicCode <support@ethiccode.in>
pkgname=tdrop-bin
pkgver=1.0.1
pkgrel=1
pkgdesc="Ultra-fast, ephemeral, authless file-sharing from your terminal"
arch=('x86_64' 'aarch64')
url="https://tdrop.link"
license=('MIT')
provides=('tdrop')
conflicts=('tdrop')
source_x86_64=("https://github.com/TAGISWILD/tdrop/releases/download/v${pkgver}/tdrop-linux-x64.tar.gz")
source_aarch64=("https://github.com/TAGISWILD/tdrop/releases/download/v${pkgver}/tdrop-linux-arm64.tar.gz")
sha256sums_x86_64=('SKIP')
sha256sums_aarch64=('SKIP')

package() {
    install -Dm755 "${srcdir}/tdrop" "${pkgdir}/usr/bin/tdrop"
}
