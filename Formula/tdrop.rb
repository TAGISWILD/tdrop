class Tdrop < Formula
  desc "Ultra-fast, ephemeral, authless file-sharing from your terminal"
  homepage "https://tdrop.link"
  version "1.0.1"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/TAGISWILD/tdrop/releases/download/v1.0.1/tdrop-darwin-arm64.tar.gz"
      sha256 "1348a2decdac41dadadd825d46297d772c21ba9a104296e2ffdd4b7f6032ba8b"
    else
      url "https://github.com/TAGISWILD/tdrop/releases/download/v1.0.1/tdrop-darwin-x64.tar.gz"
      sha256 "f89c17b0fb1f9d5072cd84adb0e6ee32cfe0fc9bab8d8dcc383bfbdfea7e2f5d"
    end
  end

  on_linux do
    if Hardware::CPU.arm?
      url "https://github.com/TAGISWILD/tdrop/releases/download/v1.0.1/tdrop-linux-arm64.tar.gz"
      sha256 "b38539f9a477e4b83d96224c3c297e47229bad68e90ba8648940bf2819ad6345"
    else
      url "https://github.com/TAGISWILD/tdrop/releases/download/v1.0.1/tdrop-linux-x64.tar.gz"
      sha256 "f957fe23b1f9fd0bd3f8013e54931864268f1c8334a608790049a50bca8e1ee1"
    end
  end

  def install
    bin.install "tdrop"
  end

  test do
    assert_match "tdrop", shell_output("#{bin}/tdrop --help")
  end
end
