import type { FileMetadata } from "@tdrop/shared";
import { renderSVG } from "uqr";
import { CINNABAR_FONTS_HTML, CINNABAR_CSS, renderCinnabarNav, renderCinnabarFooter } from "./cinnabar.js";

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
    whiteColor: "#F7F7F5",
    blackColor: "#0B0B0D",
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
  <meta name="theme-color" content="#0B0B0D">

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

  ${CINNABAR_FONTS_HTML}
  
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
    ${CINNABAR_CSS}

    /* Master Layout */
    .site-wrapper {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 36px;
      padding: 32px 16px 80px;
      min-height: 100vh;
    }

    .content-container {
      width: 100%;
      max-width: 680px;
      flex: 1 1 680px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Right Sticky Sponsor Rail */
    .sponsor-rail {
      display: none;
      width: 250px;
      flex: 0 0 250px;
    }

    @media (min-width: 1060px) {
      .sponsor-rail {
        display: block;
      }
    }

    .sponsor-sticky-card {
      position: sticky;
      top: 96px;
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: border-color var(--dur-slow) ease;
    }

    .sponsor-sticky-card:hover {
      border-color: var(--sindoor);
    }

    .sponsor-rail-tag {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--sindoor);
      font-family: var(--font-mono);
    }

    .sponsor-rail-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text);
      line-height: 1.3;
    }

    .sponsor-rail-desc {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .sponsor-rail-stats {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--obsidian);
      padding: 12px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--line);
    }

    .sponsor-stat-pill {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sponsor-stat-pill::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--success);
    }

    /* File Download Main Card */
    .download-card {
      width: 100%;
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      padding: clamp(24px, 5vw, 36px);
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 16px;
      transition: border-color var(--dur-slow) ease;
    }

    .download-card:hover {
      border-color: var(--line-strong);
    }

    /* File Header: Icon, Name, Size */
    .file-meta-header {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .file-ext-badge {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md);
      background: ${badge.accentBg};
      color: ${badge.color};
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      letter-spacing: -0.02em;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .file-name-block {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .file-title {
      font-size: clamp(1.1rem, 3.2vw, 1.35rem);
      font-weight: 600;
      color: var(--text);
      line-height: 1.3;
      word-break: break-all;
    }

    .file-subinfo {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .file-size-pill {
      color: var(--text);
      font-weight: 600;
    }

    /* Security Scan Row */
    .security-badge-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 14px;
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      font-size: 13px;
      color: var(--text-muted);
    }

    .clean-text {
      color: var(--success-text);
      font-weight: 600;
      font-family: var(--font-mono);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* Primary Cinnabar Download Button (Large Pill with Arrow) */
    .download-action-btn {
      width: 100%;
      height: 52px;
      font-size: 16px;
      font-weight: 600;
      padding: 0 12px 0 24px;
      justify-content: space-between;
    }

    .download-action-btn .btn-icon {
      width: 32px;
      height: 32px;
      font-size: 16px;
    }

    /* Mobile Quick Actions Toolbar */
    .action-toolbar {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
    }

    .btn-action-tool {
      flex: 1;
      background: var(--graphite-raised);
      border: 1px solid var(--line-strong);
      color: var(--text-soft);
      padding: 10px 14px;
      border-radius: var(--radius-pill);
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all var(--dur-fast) ease;
    }

    .btn-action-tool:hover {
      border-color: var(--sindoor);
      color: var(--text);
    }

    .btn-action-qr-toggle {
      flex: 0 0 44px;
      padding: 0;
      height: 40px;
    }

    .btn-action-qr-toggle.active {
      border-color: var(--sindoor);
      color: var(--sindoor);
      background: var(--sindoor-tint);
    }

    /* Mobile QR Drawer */
    .qr-drawer {
      display: none;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 18px;
      margin-top: 4px;
    }

    .qr-drawer.open {
      display: flex;
    }

    .qr-frame {
      width: 160px;
      height: 160px;
      background: var(--paper);
      padding: 10px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .qr-frame svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .qr-hint {
      font-size: 12px;
      color: var(--text-faint);
      text-align: center;
    }

    /* Desktop Transfer Box */
    .desktop-transfer-box {
      display: none;
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 16px;
      gap: 18px;
      align-items: center;
    }

    @media (min-width: 520px) {
      .desktop-transfer-box {
        display: flex;
      }
      .action-toolbar {
        display: none;
      }
    }

    .desktop-qr-frame {
      width: 96px;
      height: 96px;
      min-width: 96px;
      background: var(--paper);
      padding: 6px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform var(--dur-fast) ease;
    }

    .desktop-qr-frame:hover {
      transform: scale(1.04);
    }

    .desktop-qr-frame svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .desktop-transfer-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .desktop-transfer-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text);
      font-size: 14px;
      font-weight: 600;
    }

    .desktop-transfer-desc {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.45;
    }

    .desktop-transfer-actions {
      display: flex;
      gap: 8px;
    }

    .btn-dt-action {
      background: var(--graphite-raised);
      border: 1px solid var(--line-strong);
      color: var(--text-soft);
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all var(--dur-fast);
    }

    .btn-dt-action:hover {
      border-color: var(--sindoor);
      color: var(--text);
    }

    /* Terminal cURL Block */
    .curl-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: var(--graphite-input);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      padding: 10px 14px;
    }

    .curl-scroll-area {
      flex: 1;
      overflow-x: auto;
      white-space: nowrap;
    }

    .curl-code-line {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text-soft);
    }

    .cmd-prefix { color: var(--text-faint); }
    .cmd-url { color: var(--text); }

    .btn-copy-curl {
      background: transparent;
      border: 1px solid var(--line-strong);
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 12px;
      padding: 5px 10px;
      border-radius: var(--radius-xs);
      cursor: pointer;
      transition: all var(--dur-fast);
      flex-shrink: 0;
    }

    .btn-copy-curl:hover {
      border-color: var(--sindoor);
      color: var(--text);
    }

    /* Live Expiry Bar */
    .expiry-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      border-top: 1px solid var(--line);
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-faint);
    }

    /* Google AdSense Container */
    .adsense-container {
      width: 100%;
      margin: 20px 0;
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
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
      font-size: 11px;
      color: var(--text-faint);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>

  ${renderCinnabarNav("download", domain)}

  <div class="site-wrapper">
    <div class="content-container">

      <main class="download-card">
        <!-- File Header -->
        <div class="file-meta-header">
          <div class="file-ext-badge">${badge.ext}</div>
          <div class="file-name-block">
            <h1 class="file-title">${meta.sanitizedFilename}</h1>
            <div class="file-subinfo">
              <span class="file-size-pill">${sizeFormatted}</span>
              <span>•</span>
              <span>Ephemeral Drop</span>
            </div>
          </div>
        </div>

        <!-- Security Scan -->
        <div class="security-badge-row">
          <span>Security scan</span>
          <span class="clean-text">
            <span class="badge-dot success"></span>
            ClamAV Clean
          </span>
        </div>

        <!-- Primary Cinnabar Download Button -->
        <a href="${downloadUrl}" class="btn btn-primary download-action-btn" id="mainDownloadBtn" onclick="onDownloadClick()">
          <span id="downloadBtnText">Download (${sizeFormatted})</span>
          <span class="btn-icon">↓</span>
        </a>

        <!-- Mobile Quick Actions Toolbar -->
        <div class="action-toolbar">
          <button type="button" class="btn-action-tool" onclick="triggerNativeShare()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            <span id="mobileShareText">Share Link</span>
          </button>
          <button type="button" class="btn-action-tool" onclick="copyLink()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span id="mobileCopyText">Copy URL</span>
          </button>
          <button type="button" class="btn-action-tool btn-action-qr-toggle" id="qrToggleBtn" onclick="toggleQrDrawer()" title="Show QR Code">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          </button>
        </div>

        <!-- Mobile Expandable QR Code Drawer -->
        <div class="qr-drawer" id="mobileQrDrawer">
          <div class="qr-frame" onclick="copyLink()" title="Tap QR to copy link">
            ${qrSvg}
          </div>
          <div class="qr-hint">Show screen to another device or tap QR to copy link</div>
        </div>

        <!-- Desktop Transfer Box -->
        <div class="desktop-transfer-box">
          <div class="desktop-qr-frame" onclick="copyLink()" title="Scan with camera or click to copy link">
            ${qrSvg}
          </div>
          <div class="desktop-transfer-info">
            <div class="desktop-transfer-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              <span>Instant Cross-Device Transfer</span>
            </div>
            <p class="desktop-transfer-desc">Scan with your phone camera to download directly on iOS or Android, or copy link.</p>
            <div class="desktop-transfer-actions">
              <button class="btn-dt-action" type="button" onclick="triggerNativeShare()">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>Share</span>
              </button>
              <button class="btn-dt-action" type="button" onclick="copyLink()">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
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
        <span class="adsense-label">ADVERTISEMENT</span>
        <ins class="adsbygoogle"
             style="display:block; width:100%;"
             data-ad-client="ca-pub-2876380604791121"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

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
        <a href="/sponsor" class="btn btn-primary" style="justify-content: space-between;">
          <span>Sponsor Us</span>
          <span class="btn-icon">→</span>
        </a>
      </div>
    </aside>
  </div>

  ${renderCinnabarFooter(domain)}

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
