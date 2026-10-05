import type { FileMetadata } from "@tdrop/shared";
import { renderSVG } from "uqr";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

interface FileBadge {
  ext: string;
  color: string;
  accentBg: string;
}

function getFileBadge(filename: string): FileBadge {
  const parts = filename.split(".");
  const ext = (parts.length > 1 ? parts.pop()?.toLowerCase() : "") || "file";
  
  if (["zip", "tar", "gz", "7z", "rar", "bz2", "xz", "iso", "dmg"].includes(ext)) {
    return { ext: ext.toUpperCase(), color: "#38bdf8", accentBg: "rgba(56, 189, 248, 0.12)" };
  }
  if (["pdf"].includes(ext)) {
    return { ext: "PDF", color: "#f87171", accentBg: "rgba(248, 113, 113, 0.12)" };
  }
  if (["png", "jpg", "jpeg", "webp", "gif", "svg", "ico", "bmp"].includes(ext)) {
    return { ext: ext.toUpperCase(), color: "#c084fc", accentBg: "rgba(192, 132, 252, 0.12)" };
  }
  if (["js", "ts", "py", "rs", "go", "json", "html", "css", "yaml", "yml", "sh", "sql", "c", "cpp", "java", "tsx", "jsx"].includes(ext)) {
    return { ext: ext.toUpperCase(), color: "#34d399", accentBg: "rgba(52, 211, 153, 0.12)" };
  }
  if (["mp4", "mov", "mkv", "webm", "avi"].includes(ext)) {
    return { ext: ext.toUpperCase(), color: "#fb923c", accentBg: "rgba(251, 146, 60, 0.12)" };
  }
  if (["mp3", "wav", "ogg", "flac", "m4a"].includes(ext)) {
    return { ext: ext.toUpperCase(), color: "#f472b6", accentBg: "rgba(244, 114, 182, 0.12)" };
  }
  return { ext: ext.slice(0, 4).toUpperCase(), color: "#94a3b8", accentBg: "rgba(148, 163, 184, 0.12)" };
}

export function renderDownloadPage(meta: FileMetadata, domain: string = "tdrop.link"): string {
  const sizeFormatted = formatBytes(meta.size);
  const badge = getFileBadge(meta.filename);
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
  <meta name="description" content="Download ${meta.sanitizedFilename} (${sizeFormatted}). Fast, private, ephemeral file sharing verified by ClamAV.">
  
  <meta name="robots" content="noindex, nofollow">
  <link rel="canonical" href="${pageUrl}">
  <meta name="theme-color" content="#09090b">

  <!-- Web App Manifest (PWA) -->
  <link rel="manifest" href="/manifest.json">

  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph / Social Media Preview -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="Download ${meta.sanitizedFilename} · tdrop">
  <meta property="og:description" content="Download ${meta.sanitizedFilename} (${sizeFormatted}). Fast, private, ephemeral file sharing.">
  <meta property="og:image" content="https://${domain}/assets/preview.png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="537">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Download ${meta.sanitizedFilename} · tdrop">
  <meta name="twitter:description" content="Download ${meta.sanitizedFilename} (${sizeFormatted}). Fast, private, ephemeral file sharing.">
  <meta name="twitter:image" content="https://${domain}/assets/preview.png">

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
      background-image: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255, 255, 255, 0.04), transparent 60%);
      background-attachment: fixed;
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }

    /* Floating Island Navbar */
    .nav-wrapper {
      position: sticky;
      top: 12px;
      z-index: 100;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 12px;
      pointer-events: none;
    }

    .nav-island {
      pointer-events: auto;
      background: rgba(14, 15, 20, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--surface-border);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      border-radius: 9999px;
      padding: 6px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: var(--text-main);
    }

    .brand-logo {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #ffffff;
    }

    .brand-dot {
      width: 6px;
      height: 6px;
      background: var(--status-green);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--status-green);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-nav-upload {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.78rem;
      font-weight: 500;
      padding: 5px 11px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      border-radius: 9999px;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .btn-nav-upload:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .btn-nav-sponsor {
      background: #ffffff;
      color: #09090b !important;
      font-size: 0.78rem;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-nav-sponsor:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
    }

    /* Master Layout */
    .site-wrapper {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 32px;
      padding: 20px 12px 60px;
      min-height: calc(100vh - 60px);
    }

    @media (min-width: 640px) {
      .site-wrapper {
        padding: 32px 16px 80px;
      }
    }

    /* Center Content Container */
    .content-container {
      width: 100%;
      max-width: 580px;
      flex: 1 1 580px;
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
      top: 84px;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
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
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }

    .sponsor-rail-desc {
      font-size: 0.78rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .sponsor-rail-stats {
      display: flex;
      flex-direction: column;
      gap: 5px;
      background: rgba(0, 0, 0, 0.3);
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--surface-border-subtle);
    }

    .sponsor-stat-pill {
      font-family: var(--font-mono);
      font-size: 0.7rem;
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
      font-size: 0.8rem;
      font-weight: 600;
      padding: 9px;
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

    /* Main Download Card */
    .download-card {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      padding: 18px 16px;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      position: relative;
    }

    @media (min-width: 480px) {
      .download-card {
        border-radius: 20px;
        padding: 24px 22px;
      }
    }

    /* File Header */
    .file-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 16px;
    }

    .file-icon-box {
      width: 48px;
      height: 52px;
      flex-shrink: 0;
      background: ${badge.accentBg};
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
    }

    .file-icon-svg {
      color: ${badge.color};
      width: 22px;
      height: 22px;
    }

    .file-ext-badge {
      font-family: var(--font-mono);
      font-size: 0.58rem;
      font-weight: 800;
      color: ${badge.color};
      letter-spacing: 0.5px;
      margin-top: 2px;
      text-transform: uppercase;
      max-width: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-details {
      flex: 1;
      min-width: 0;
    }

    .file-name {
      font-size: 1.15rem;
      font-weight: 700;
      color: #ffffff;
      overflow-wrap: anywhere;
      word-break: break-all;
      line-height: 1.3;
      margin-bottom: 4px;
      letter-spacing: -0.015em;
    }

    @media (min-width: 480px) {
      .file-name {
        font-size: 1.35rem;
      }
    }

    .file-meta-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px 8px;
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .file-meta-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      border-radius: 5px;
      padding: 1px 6px;
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
      background: rgba(16, 185, 129, 0.06);
      border: 1px solid rgba(16, 185, 129, 0.22);
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
      margin-bottom: 16px;
    }

    .security-chip .status-dot {
      width: 6px;
      height: 6px;
      background: var(--status-green);
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
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
      gap: 8px;
      width: 100%;
      min-height: 48px;
      background: #ffffff;
      color: #09090b !important;
      font-family: var(--font-sans);
      font-size: 0.92rem;
      font-weight: 700;
      padding: 12px 20px;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
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

    /* Quick Action Toolbar (Mobile & Desktop) */
    .action-toolbar {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 8px;
      margin-top: 10px;
    }

    .btn-action-tool {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      color: var(--text-main);
      font-size: 0.78rem;
      font-weight: 600;
      padding: 9px 12px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      min-height: 38px;
    }

    .btn-action-tool:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .btn-action-tool:active {
      transform: scale(0.97);
    }

    .btn-action-qr-toggle {
      width: 38px;
      padding: 0;
      flex-shrink: 0;
    }

    .btn-action-qr-toggle.active {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.3);
      color: #ffffff;
    }

    /* Collapsible / Expandable QR Drawer */
    .qr-drawer {
      display: none;
      margin-top: 12px;
      background: #090a0d;
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: 14px;
      animation: fadeIn 0.2s ease-out;
    }

    .qr-drawer.open {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .qr-frame {
      width: 140px;
      height: 140px;
      background: #ffffff;
      padding: 8px;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
      cursor: pointer;
    }

    .qr-frame svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .qr-hint {
      font-size: 0.72rem;
      color: var(--text-dim);
      font-family: var(--font-mono);
      text-align: center;
    }

    /* Desktop Transfer Box (Hidden on small mobile screens to keep it clean, shown on >= 640px) */
    .desktop-transfer-box {
      display: none;
      margin-top: 14px;
      background: #090a0d;
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: 14px 16px;
      align-items: center;
      gap: 16px;
    }

    @media (min-width: 640px) {
      .desktop-transfer-box {
        display: flex;
      }
      .action-toolbar {
        display: none;
      }
      .qr-drawer {
        display: none !important;
      }
    }

    .desktop-qr-frame {
      width: 96px;
      height: 96px;
      min-width: 96px;
      min-height: 96px;
      background: #ffffff;
      padding: 6px;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      cursor: pointer;
    }

    .desktop-qr-frame svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .desktop-transfer-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .desktop-transfer-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .desktop-transfer-desc {
      font-size: 0.76rem;
      color: var(--text-muted);
      line-height: 1.4;
    }

    .desktop-transfer-actions {
      display: flex;
      gap: 8px;
      margin-top: 4px;
    }

    .btn-dt-action {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      color: var(--text-main);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s;
    }

    .btn-dt-action:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* Terminal cURL Block */
    .curl-container {
      margin-top: 14px;
      background: #090a0d;
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .curl-scroll-area {
      flex: 1;
      min-width: 0;
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;
    }

    .curl-scroll-area::-webkit-scrollbar {
      display: none;
    }

    .curl-code-line {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      white-space: nowrap;
      user-select: all;
    }

    .curl-code-line span.cmd-prefix {
      color: var(--status-green);
      font-weight: 600;
    }

    .curl-code-line span.cmd-url {
      color: var(--text-muted);
    }

    .btn-copy-curl {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      color: var(--text-main);
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 600;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn-copy-curl:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* Expiry & Retention Bar */
    .expiry-bar {
      margin-top: 14px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 6px;
      font-size: 0.72rem;
      color: var(--text-dim);
      font-family: var(--font-mono);
      padding-top: 12px;
      border-top: 1px solid var(--surface-border-subtle);
    }

    /* Google AdSense Container */
    .adsense-container {
      width: 100%;
      margin-top: 16px;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--surface-border-subtle);
      border-radius: 12px;
      padding: 10px 12px;
      text-align: center;
      min-height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .adsense-label {
      font-family: var(--font-mono);
      font-size: 0.62rem;
      color: var(--text-dim);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    /* Footer */
    footer {
      width: 100%;
      margin-top: 28px;
      padding: 20px 12px;
      font-size: 0.75rem;
      color: var(--text-dim);
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 14px;
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
        <img src="/assets/logo-128.png" alt="tdrop" width="22" height="22" style="border-radius: 5px; object-fit: contain; flex-shrink: 0;">
        <span class="brand-logo">tdrop</span>
      </a>
      <div class="nav-actions">
        <a href="/" class="btn-nav-upload">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          <span>Upload</span>
        </a>
        <a href="/sponsor" class="btn-nav-sponsor">Sponsor</a>
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
          <div class="file-icon-box">
            <svg class="file-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span class="file-ext-badge">${badge.ext}</span>
          </div>
          <div class="file-details">
            <h1 class="file-name">${meta.sanitizedFilename}</h1>
            <div class="file-meta-row">
              <span class="file-meta-pill">${sizeFormatted}</span>
              <span class="file-meta-sep">•</span>
              <span>Ephemeral</span>
              <span class="file-meta-sep">•</span>
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

        <!-- Primary White Download Button -->
        <a href="${downloadUrl}" class="download-btn" id="mainDownloadBtn" onclick="onDownloadClick()">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span id="downloadBtnText">Download (${sizeFormatted})</span>
        </a>

        <!-- Mobile Quick Actions Toolbar -->
        <div class="action-toolbar">
          <button type="button" class="btn-action-tool" onclick="triggerNativeShare()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            <span id="mobileShareText">Share Link</span>
          </button>
          <button type="button" class="btn-action-tool" onclick="copyLink()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span id="mobileCopyText">Copy URL</span>
          </button>
          <button type="button" class="btn-action-tool btn-action-qr-toggle" id="qrToggleBtn" onclick="toggleQrDrawer()" title="Show QR Code">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          </button>
        </div>

        <!-- Mobile Expandable QR Code Drawer -->
        <div class="qr-drawer" id="mobileQrDrawer">
          <div class="qr-frame" onclick="copyLink()" title="Click to copy link">
            ${qrSvg}
          </div>
          <div class="qr-hint">Show screen to another device or tap QR to copy link</div>
        </div>

        <!-- Desktop Transfer Box (Hidden on Mobile) -->
        <div class="desktop-transfer-box">
          <div class="desktop-qr-frame" onclick="copyLink()" title="Scan with camera or click to copy link">
            ${qrSvg}
          </div>
          <div class="desktop-transfer-info">
            <div class="desktop-transfer-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              <span>Instant Mobile Transfer</span>
            </div>
            <p class="desktop-transfer-desc">Scan with your phone camera to download directly on iOS/Android, or share instantly.</p>
            <div class="desktop-transfer-actions">
              <button class="btn-dt-action" type="button" onclick="triggerNativeShare()">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>Share</span>
              </button>
              <button class="btn-dt-action" type="button" onclick="copyLink()">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span id="desktopCopyText">Copy URL</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Terminal cURL Single-Row Block -->
        <div class="curl-container">
          <div class="curl-scroll-area">
            <code class="curl-code-line"><span class="cmd-prefix">curl -O</span> <span class="cmd-url">https://${domain}/${meta.code}/${encodeURIComponent(meta.sanitizedFilename)}</span></code>
          </div>
          <button class="btn-copy-curl" id="curlCopyBtn" onclick="copyCurl()">Copy</button>
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
        <p>tdrop · Zero egress fees · Zero logs · End-to-end ephemeral</p>
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
    function onDownloadClick() {
      const btn = document.getElementById('downloadBtnText');
      if (btn) {
        btn.textContent = 'Streaming ${sizeFormatted}...';
        setTimeout(() => {
          btn.textContent = 'Download (${sizeFormatted})';
        }, 3000);
      }
    }

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

    function toggleQrDrawer() {
      const drawer = document.getElementById('mobileQrDrawer');
      const btn = document.getElementById('qrToggleBtn');
      if (!drawer) return;
      const isOpen = drawer.classList.toggle('open');
      if (btn) btn.classList.toggle('active', isOpen);
    }

    function copyLink() {
      const url = "${pageUrl}";
      const updateLabels = () => {
        const mBtn = document.getElementById('mobileCopyText');
        const dtBtn = document.getElementById('desktopCopyText');
        if (mBtn) mBtn.textContent = 'Copied!';
        if (dtBtn) dtBtn.textContent = 'Copied!';
        setTimeout(() => {
          if (mBtn) mBtn.textContent = 'Copy URL';
          if (dtBtn) dtBtn.textContent = 'Copy URL';
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(updateLabels).catch(updateLabels);
      } else {
        const temp = document.createElement('input');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        updateLabels();
      }
    }

    function copyCurl() {
      const text = "${curlCmd}";
      const btn = document.getElementById('curlCopyBtn');
      const updateLabel = () => {
        if (btn) {
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy', 2000);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(updateLabel).catch(updateLabel);
      } else {
        const temp = document.createElement('input');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        updateLabel();
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
