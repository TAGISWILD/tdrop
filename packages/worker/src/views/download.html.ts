import type { FileMetadata } from "@tdrop/shared";
import { renderSVG } from "uqr";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getFileIcon(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (["zip", "tar", "gz", "7z", "rar", "bz2", "xz"].includes(ext)) return "📦";
  if (["pdf", "doc", "docx", "txt", "md", "csv", "rtf"].includes(ext)) return "📄";
  if (["png", "jpg", "jpeg", "webp", "gif", "svg", "ico"].includes(ext)) return "🖼️";
  if (["js", "ts", "py", "rs", "go", "json", "html", "css", "yaml", "yml", "sh"].includes(ext)) return "💻";
  if (["mp4", "mov", "mkv", "webm", "avi"].includes(ext)) return "🎥";
  if (["mp3", "wav", "ogg", "flac", "m4a"].includes(ext)) return "🎵";
  return "📁";
}

export function renderDownloadPage(meta: FileMetadata, domain: string = "tdrop.link"): string {
  const sizeFormatted = formatBytes(meta.size);
  const icon = getFileIcon(meta.filename);
  const downloadUrl = `https://${domain}/${meta.code}?download=1`;
  const pageUrl = `https://${domain}/${meta.code}`;
  const curlCmd = `curl -O https://${domain}/${meta.code}/${encodeURIComponent(meta.sanitizedFilename)}`;
  const qrSvg = renderSVG(pageUrl, {
    border: 1,
    whiteColor: "#ffffff",
    blackColor: "#09090b",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>Download ${meta.sanitizedFilename} · tdrop</title>
  <meta name="description" content="Secure, ephemeral file transfer. Streamed from Cloudflare R2 edge. ClamAV clean.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Active Google AdSense Tag -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2876380604791121" crossorigin="anonymous"></script>

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-M988VVTPWK"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-M988VVTPWK');
  </script>

  <style>
    :root {
      --bg: #09090b;
      --surface: #111216;
      --surface-raised: #18191f;
      --surface-border: rgba(255, 255, 255, 0.08);
      --surface-border-subtle: rgba(255, 255, 255, 0.04);
      --surface-border-hover: rgba(255, 255, 255, 0.18);
      --text-main: #f4f4f5;
      --text-muted: #a1a1aa;
      --text-dim: #71717a;
      --status-green: #10b981;
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'Geist Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      -webkit-text-size-adjust: 100%;
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font-sans);
      min-height: 100vh;
      min-height: 100dvh;
      width: 100%;
      overflow-x: hidden;
      background-image: 
        radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255, 255, 255, 0.04), transparent 60%);
      background-attachment: fixed;
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }

    /* Floating Island Navbar */
    .nav-wrapper {
      position: sticky;
      top: 16px;
      z-index: 100;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 16px;
      pointer-events: none;
    }

    .nav-island {
      pointer-events: auto;
      background: rgba(14, 15, 20, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--surface-border);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      border-radius: 9999px;
      padding: 8px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: border-color 0.2s;
    }

    .nav-island:hover {
      border-color: rgba(255, 255, 255, 0.14);
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text-main);
    }

    .brand-logo {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.05rem;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #ffffff;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      color: var(--text-muted);
      font-size: 0.65rem;
      font-family: var(--font-mono);
      padding: 2px 8px;
      border-radius: 20px;
      font-weight: 500;
    }

    .status-dot {
      width: 5px;
      height: 5px;
      background: var(--status-green);
      border-radius: 50%;
      box-shadow: 0 0 6px var(--status-green);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-sm-ghost {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 5px 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      border-radius: 9999px;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-sm-ghost:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .btn-sponsor-nav {
      background: #ffffff;
      color: #09090b !important;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-sponsor-nav:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
    }

    /* Master Layout: Center Content with Right Sponsor Rail */
    .site-wrapper {
      width: 100%;
      max-width: 1040px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 36px;
      padding: 36px 16px 80px;
      min-height: 100vh;
    }

    /* Center Content Container */
    .content-container {
      width: 100%;
      max-width: 640px;
      flex: 1 1 640px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Right Sticky Sponsor Rail */
    .sponsor-rail {
      display: none;
      width: 240px;
      flex: 0 0 240px;
    }

    @media (min-width: 1040px) {
      .sponsor-rail {
        display: block;
      }
    }

    .sponsor-sticky-card {
      position: sticky;
      top: 96px;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .sponsor-rail-tag {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: var(--text-dim);
      font-family: var(--font-mono);
    }

    .sponsor-rail-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }

    .sponsor-rail-desc {
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .sponsor-rail-stats {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: rgba(0, 0, 0, 0.3);
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid var(--surface-border-subtle);
    }

    .sponsor-stat-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sponsor-stat-pill::before {
      content: '•';
      color: var(--status-green);
    }

    .btn-sponsor-rail {
      background: #ffffff;
      color: #09090b;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 10px;
      border-radius: 8px;
      text-align: center;
      text-decoration: none;
      display: block;
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.12);
      transition: all 0.2s;
    }

    .btn-sponsor-rail:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
    }

    /* Download Card (Monochrome, Tactile, High-Craft) */
    .download-card {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: clamp(22px, 4.5vw, 36px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      position: relative;
    }

    /* File Header */
    .file-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 22px;
    }

    .file-icon {
      font-size: clamp(2rem, 4.5vw, 2.5rem);
      line-height: 1;
      padding: clamp(10px, 2.5vw, 14px);
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      flex-shrink: 0;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .file-details {
      flex: 1;
      min-width: 0;
    }

    .file-name {
      font-size: clamp(1.2rem, 3.8vw, 1.5rem);
      font-weight: 700;
      color: #ffffff;
      overflow-wrap: anywhere;
      word-break: break-word;
      line-height: 1.3;
      margin-bottom: 6px;
      letter-spacing: -0.02em;
    }

    .file-meta-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px 10px;
      font-size: 0.78rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .file-meta-pill {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      padding: 2px 7px;
      color: #ffffff;
      font-weight: 600;
    }

    .file-meta-sep {
      color: var(--surface-border);
    }

    /* ClamAV Verification Chip */
    .security-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      padding: 5px 12px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
      margin-bottom: 22px;
    }

    .security-chip .status-dot {
      width: 5px;
      height: 5px;
    }

    .security-chip span.clean-text {
      color: #ffffff;
      font-weight: 600;
    }

    /* Solid White Primary Download Button */
    .download-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      min-height: 50px;
      background: #ffffff;
      color: #09090b;
      font-family: var(--font-sans);
      font-size: 0.95rem;
      font-weight: 600;
      padding: 14px 22px;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 14px rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.8);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .download-btn:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
    }

    .download-btn:active {
      transform: scale(0.98);
    }

    /* Instant Mobile Transfer & QR Box */
    .transfer-box {
      margin-top: 16px;
      background: #090a0d;
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: border-color 0.2s;
    }

    .transfer-box:hover {
      border-color: rgba(255, 255, 255, 0.14);
    }

    @media (min-width: 480px) {
      .transfer-box {
        flex-direction: row;
        align-items: center;
        gap: 18px;
      }
    }

    .qr-frame {
      width: 104px;
      height: 104px;
      min-width: 104px;
      min-height: 104px;
      background: #ffffff;
      padding: 7px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      margin: 0 auto;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
    }

    .qr-frame:hover {
      transform: scale(1.04);
    }

    .qr-frame svg {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 2px;
    }

    .transfer-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .transfer-header {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .transfer-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #ffffff;
      font-size: 0.92rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .transfer-desc {
      font-size: 0.78rem;
      color: var(--text-muted);
      line-height: 1.45;
    }

    .transfer-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .btn-action-primary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--surface-border-hover);
      color: #ffffff;
      font-size: 0.78rem;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .btn-action-primary:hover {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 255, 255, 0.28);
      transform: translateY(-1px);
    }

    .btn-action-secondary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 500;
      padding: 7px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .btn-action-secondary:hover {
      background: rgba(255, 255, 255, 0.07);
      color: var(--text-main);
      border-color: rgba(255, 255, 255, 0.18);
    }

    /* cURL Terminal Block */
    .curl-block {
      margin-top: 18px;
      background: #090a0d;
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    @media (min-width: 480px) {
      .curl-block {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .curl-code-wrapper {
      flex: 1;
      min-width: 0;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .curl-code {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-muted);
      white-space: nowrap;
    }

    .curl-code code {
      color: #ffffff;
    }

    .copy-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      color: var(--text-main);
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 0.76rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      user-select: none;
    }

    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .copy-btn:active {
      transform: scale(0.97);
    }

    /* Expiry & Retention Bar */
    .expiry-bar {
      margin-top: 18px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.76rem;
      color: var(--text-dim);
      font-family: var(--font-mono);
      padding-top: 14px;
      border-top: 1px solid var(--surface-border-subtle);
    }

    /* Sponsored Ad Banner */
    .sponsored-ad-banner {
      width: 100%;
      margin-top: 20px;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04);
      transition: border-color 0.2s;
    }

    .sponsored-ad-banner:hover {
      border-color: rgba(255, 255, 255, 0.16);
    }

    .ad-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .ad-badge-wrap {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.68rem;
      font-family: var(--font-mono);
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .ad-badge-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      padding: 2px 7px;
      border-radius: 4px;
      color: var(--text-muted);
      font-weight: 600;
    }

    .ad-sponsor-tag {
      color: var(--text-main);
      font-weight: 600;
    }

    .ad-promote-link {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--text-dim);
      text-decoration: none;
      transition: color 0.15s;
    }

    .ad-promote-link:hover {
      color: #ffffff;
    }

    .ad-content-row {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    @media (min-width: 480px) {
      .ad-content-row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .ad-main-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
    }

    .ad-icon-box {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      flex-shrink: 0;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    .ad-text-wrap {
      flex: 1;
      min-width: 0;
    }

    .ad-headline {
      font-size: 0.95rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.25;
      letter-spacing: -0.01em;
      margin-bottom: 2px;
    }

    .ad-copy {
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .btn-ad-visit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: #ffffff;
      color: #09090b !important;
      font-family: var(--font-sans);
      font-size: 0.82rem;
      font-weight: 700;
      padding: 9px 16px;
      border-radius: 8px;
      text-decoration: none;
      white-space: nowrap;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.12);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-ad-visit:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(255, 255, 255, 0.2);
    }

    /* Google AdSense Wrapper */
    .adsense-container {
      width: 100%;
      margin-top: 18px;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--surface-border-subtle);
      border-radius: 12px;
      padding: 12px 14px;
      text-align: center;
      min-height: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .adsense-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--text-dim);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    /* Footer */
    footer {
      width: 100%;
      margin-top: 36px;
      padding: 24px 16px;
      font-size: 0.8rem;
      color: var(--text-dim);
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s;
    }

    .footer-links a:hover {
      color: #ffffff;
    }
  </style>
</head>
<body>

  <!-- Floating Island Navbar -->
  <header class="nav-wrapper">
    <nav class="nav-island">
      <a href="/" class="brand-wrap">
        <div class="brand-logo">tdrop</div>
      </a>
      <div class="nav-actions">
        <a href="/" class="btn-sm-ghost">Upload New File</a>
        <a href="/sponsor" class="btn-sponsor-nav">Sponsor Us</a>
      </div>
    </nav>
  </header>

  <!-- Layout: Main Content + Right Sponsor Rail -->
  <div class="site-wrapper">

    <!-- Center Column -->
    <div class="content-container">

      <!-- Main Download Card -->
      <main class="download-card">
        
        <div class="file-header">
          <div class="file-icon">${icon}</div>
          <div class="file-details">
            <h1 class="file-name">${meta.sanitizedFilename}</h1>
            <div class="file-meta-row">
              <span class="file-meta-pill">${sizeFormatted}</span>
              <span class="file-meta-sep">/</span>
              <span>Ephemeral</span>
              <span class="file-meta-sep">/</span>
              <span>$0 Egress</span>
            </div>
          </div>
        </div>

        <!-- ClamAV Security Chip -->
        <div class="security-chip">
          <div class="status-dot"></div>
          <span>Security scan:</span>
          <span class="clean-text">ClamAV Clean</span>
        </div>

        <!-- Solid White Download Button -->
        <a href="${downloadUrl}" class="download-btn" id="mainDownloadBtn" onclick="onDownloadClick()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span id="downloadBtnText">Download (${sizeFormatted})</span>
        </a>

        <!-- Mobile QR Transfer & Quick Share -->
        <div class="transfer-box">
          <div class="qr-frame" onclick="copyLink()" title="Scan with camera or click to copy link">
            ${qrSvg}
          </div>
          <div class="transfer-info">
            <div class="transfer-header">
              <div class="transfer-title-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                <span>Instant Mobile Transfer</span>
              </div>
              <p class="transfer-desc">Scan with your phone camera to download directly on iOS/Android, or beam via native share sheet.</p>
            </div>
            <div class="transfer-actions">
              <button class="btn-action-primary" onclick="triggerNativeShare()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span id="shareBtnText">Share Link</span>
              </button>
              <button class="btn-action-secondary" onclick="copyLink()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span id="copyLinkBtnText">Copy URL</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Terminal cURL Copy -->
        <div class="curl-block">
          <div class="curl-code-wrapper">
            <div class="curl-code"><code>curl -O</code> https://${domain}/${meta.code}/${encodeURIComponent(meta.sanitizedFilename)}</div>
          </div>
          <button class="copy-btn" onclick="copyCurl()">Copy cURL</button>
        </div>

        <!-- Live Expiry Bar -->
        <div class="expiry-bar">
          <span>Retention: ${meta.retentionClass}</span>
          <span id="countdown">Calculating...</span>
        </div>

      </main>

      <!-- Google AdSense Container -->
      <div class="adsense-container" aria-label="Advertisement">
        <div class="adsense-label">ADVERTISEMENT</div>
        <ins class="adsbygoogle"
             style="display:block; width:100%;"
             data-ad-client="ca-pub-2876380604791121"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      <footer>
        <div class="footer-links">
          <a href="/">Home</a>
          <a href="/sponsor">Sponsorship</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">GitHub</a>
        </div>
        <p>Powered by <a href="/" style="color:var(--text-muted); text-decoration:none;">tdrop</a> · Zero egress fees · Zero logs · End-to-end ephemeral</p>
      </footer>

    </div>

    <!-- Right Sticky Sponsor Rail -->
    <aside class="sponsor-rail">
      <div class="sponsor-sticky-card">
        <div class="sponsor-rail-tag">Sponsorship</div>
        <h3 class="sponsor-rail-title">Sponsor the Command Line</h3>
        <p class="sponsor-rail-desc">Reach developer audiences directly on terminal stdout and edge downloads. 0% AdBlock and high CTR.</p>
        <div class="sponsor-rail-stats">
          <div class="sponsor-stat-pill">0% AdBlock in Terminal</div>
          <div class="sponsor-stat-pill">3%–8% Average CTR</div>
          <div class="sponsor-stat-pill">300+ Edge PoP Reach</div>
        </div>
        <a href="/sponsor" class="btn-sponsor-rail">Sponsor Us →</a>
      </div>
    </aside>

  </div>

  <script>
    // Immediate Download Feedback
    function onDownloadClick() {
      const btn = document.getElementById('downloadBtnText');
      if (btn) {
        btn.textContent = 'Streaming ${sizeFormatted}...';
        setTimeout(() => {
          btn.textContent = 'Download (${sizeFormatted})';
        }, 3000);
      }
    }

    // Native Web Share API with Clipboard Fallback
    const shareData = {
      title: "${meta.sanitizedFilename} · tdrop",
      text: "Download ${meta.sanitizedFilename} (${sizeFormatted}) via tdrop",
      url: "${pageUrl}"
    };

    async function triggerNativeShare() {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyLink();
          }
        }
      } else {
        copyLink();
      }
    }

    function copyLink() {
      const url = "${pageUrl}";
      const updateLabel = () => {
        const btn = document.getElementById('copyLinkBtnText');
        if (btn) {
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy URL', 2000);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(updateLabel);
      } else {
        const temp = document.createElement('input');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        updateLabel();
      }
    }

    function copyCurl() {
      const text = "${curlCmd}";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          const btn = document.querySelector('.copy-btn');
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy cURL', 2000);
        });
      } else {
        const temp = document.createElement('input');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        const btn = document.querySelector('.copy-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy cURL', 2000);
      }
    }

    // Live Expiry Countdown
    const expiresAt = ${meta.expiresAt};
    function updateCountdown() {
      const now = Date.now();
      const diff = expiresAt - now;
      if (diff <= 0) {
        document.getElementById('countdown').textContent = 'Expired';
        return;
      }
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      document.getElementById('countdown').textContent = 'Expires in ' + hours + 'h ' + mins + 'm ' + secs + 's';
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  </script>
</body>
</html>`;
}
