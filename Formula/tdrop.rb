class Tdrop < Formula
  desc "Ultra-fast, ephemeral, authless file-sharing from your terminal"
  homepage "https://tdrop.link"
  version "1.0.1"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/TAGISWILD/tdrop/releases/download/v1.0.1/tdrop-darwin-arm64.tar.gz"
      sha256 "de31fa3338e0bbcb44e51299856e5aa0df26b0d920e81523269d0f1c8984b4cb"
    else
      url "https://github.com/TAGISWILD/tdrop/releases/download/v1.0.1/tdrop-darwin-x64.tar.gz"
      sha256 "46c19779d77a14cd8ecf122f4ca026b61aae3abd8f3dae00bcada238547eb080"
    end
  end

  on_linux do
    if Hardware::CPU.arm?
      url "https://github.com/TAGISWILD/tdrop/releases/download/v1.0.1/tdrop-linux-arm64.tar.gz"
      sha256 "6811155f85162a2672276d518edd8b4e0e009af228d66a88defebaa8a844b791"
    else
      url "https://github.com/TAGISWILD/tdrop/releases/download/v1.0.1/tdrop-linux-x64.tar.gz"
      sha256 "b4c06d383de480e704f7a82a2a0ccd25f316c7ba24c1dfa70891ad431decd3d7"
    end
  end

  def install
    bin.install "tdrop"
  end

  test do
    assert_match "tdrop", shell_output("#{bin}/tdrop --help")
  end
end
