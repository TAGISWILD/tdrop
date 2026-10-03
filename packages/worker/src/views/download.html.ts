import type { FileMetadata } from "@tdrop/shared";

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
  const curlCmd = `curl -O https://${domain}/${meta.code}/${encodeURIComponent(meta.sanitizedFilename)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>Download ${meta.sanitizedFilename} · tdrop</title>
  <meta name="description" content="Secure, ephemeral file transfer. Verified clean with ClamAV.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Active Google AdSense Tag -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2876380604791121" crossorigin="anonymous"></script>

  <style>
    :root {
      --bg: #07080b;
      --surface: #0f1218;
      --surface-border: #1b2230;
      --surface-hover: #161c26;
      --accent-green: #00ff88;
      --accent-green-dim: rgba(0, 255, 136, 0.12);
      --accent-cyan: #00d9f5;
      --accent-cyan-dim: rgba(0, 217, 245, 0.12);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --danger: #ef4444;
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      -webkit-text-size-adjust: 100%;
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
        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 255, 136, 0.08), transparent 70%),
        radial-gradient(circle at 100% 100%, rgba(0, 217, 245, 0.04), transparent 40%);
      background-attachment: fixed;
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }

    /* Flexbox 3-Column Layout: Left Rail | Center Main | Right Rail */
    .site-wrapper {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 28px;
      padding: 0 16px 60px;
      min-height: 100vh;
    }

    /* Desktop Sticky Ad Rails */
    .ad-rail {
      display: none;
      width: 160px;
      flex: 0 0 160px;
    }

    @media (min-width: 1180px) {
      .ad-rail {
        display: block;
      }
    }

    .ad-sticky {
      position: sticky;
      top: 24px;
      background: rgba(15, 18, 24, 0.75);
      border: 1px dashed var(--surface-border);
      border-radius: 14px;
      padding: 16px 8px;
      min-height: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-align: center;
      backdrop-filter: blur(8px);
    }

    .ad-tag {
      font-size: 0.62rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--text-dim);
    }

    .ad-box-skyscraper {
      width: 100%;
      max-width: 160px;
      min-height: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 8px;
    }

    .ad-fallback-label {
      font-size: 0.72rem;
      color: var(--text-dim);
    }

    /* Central Content Column: Always Centered & Guaranteed Never Squished */
    .content-container {
      width: 100%;
      max-width: 680px;
      flex: 1 1 680px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Header Nav */
    header.nav {
      width: 100%;
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--text-main);
      text-decoration: none;
    }

    .logo-badge {
      background: var(--accent-green-dim);
      color: var(--accent-green);
      font-size: 0.68rem;
      padding: 2px 7px;
      border-radius: 4px;
      border: 1px solid rgba(0, 255, 136, 0.25);
    }

    .nav-action {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 7px 14px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      transition: all 0.15s;
    }

    .nav-action:hover {
      color: var(--accent-green);
      border-color: rgba(0, 255, 136, 0.3);
    }

    /* In-Flow Horizontal Ad Banners */
    .ad-banner-inline {
      width: 100%;
      margin: 8px 0 20px;
      background: rgba(15, 18, 24, 0.6);
      border: 1px dashed var(--surface-border);
      border-radius: 12px;
      padding: 12px 10px;
      text-align: center;
      min-height: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .ad-banner-tag {
      position: absolute;
      top: 4px;
      right: 10px;
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-dim);
    }

    /* Main Download Container */
    main.download-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Download Card */
    .download-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      padding: clamp(20px, 5vw, 36px);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
      width: 100%;
    }

    .download-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent-green), var(--accent-cyan), transparent);
    }

    /* File Header */
    .file-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 20px;
    }

    .file-icon {
      font-size: clamp(2.2rem, 5vw, 2.8rem);
      line-height: 1;
      padding: clamp(10px, 3vw, 16px);
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      flex-shrink: 0;
    }

    .file-details {
      flex: 1;
      min-width: 0;
    }

    .file-name {
      font-size: clamp(1.15rem, 4vw, 1.45rem);
      font-weight: 700;
      color: var(--text-main);
      overflow-wrap: anywhere;
      word-break: break-word;
      line-height: 1.3;
      margin-bottom: 6px;
    }

    .file-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 12px;
      font-size: clamp(0.78rem, 2.5vw, 0.85rem);
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .file-size {
      color: var(--accent-cyan);
      font-weight: 600;
    }

    /* Security Verified Badge */
    .security-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(0, 255, 136, 0.08);
      border: 1px solid rgba(0, 255, 136, 0.25);
      color: var(--accent-green);
      padding: 8px 14px;
      border-radius: 30px;
      font-size: clamp(0.75rem, 2.4vw, 0.82rem);
      font-weight: 600;
      margin-bottom: 22px;
      width: fit-content;
      max-width: 100%;
    }

    /* High-contrast Download Action Button */
    .download-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      min-height: 52px;
      background: linear-gradient(135deg, var(--accent-green), #00cc6a);
      color: #04140b;
      font-family: var(--font-sans);
      font-size: clamp(0.95rem, 3vw, 1.05rem);
      font-weight: 700;
      padding: 14px 20px;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 20px rgba(0, 255, 136, 0.25);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .download-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 255, 136, 0.4);
    }

    .download-btn:active {
      transform: translateY(0);
      opacity: 0.95;
    }

    /* Terminal cURL Block */
    .curl-block {
      margin-top: 20px;
      background: #090b10;
      border: 1px solid var(--surface-border);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
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
      font-size: clamp(0.75rem, 2.4vw, 0.85rem);
      color: var(--text-muted);
      white-space: nowrap;
    }

    .curl-code span { color: var(--accent-cyan); }

    .copy-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--surface-border);
      color: var(--text-main);
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      flex-shrink: 0;
      min-height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: var(--accent-green);
    }

    /* Expiry & Retention details */
    .expiry-bar {
      margin-top: 18px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
      font-size: clamp(0.72rem, 2.3vw, 0.8rem);
      color: var(--text-dim);
      font-family: var(--font-mono);
      padding-top: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Footer */
    footer {
      width: 100%;
      margin-top: 24px;
      padding: 24px 16px;
      font-size: 0.8rem;
      color: var(--text-dim);
      text-align: center;
    }

    footer a { color: var(--text-muted); text-decoration: none; }
    footer a:hover { color: var(--accent-green); }
  </style>
</head>
<body>

  <div class="site-wrapper">

    <!-- Left Sticky Ad Rail (Desktop >= 1180px only, 160x600) -->
    <aside class="ad-rail">
      <div class="ad-sticky">
        <span class="ad-tag">Sponsor</span>
        <div class="ad-box-skyscraper">
          <ins class="adsbygoogle"
               style="display:inline-block;width:160px;height:600px"
               data-ad-client="ca-pub-2876380604791121"
               data-ad-slot="3030303030"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <div class="ad-fallback-label">[160x600 Skyscraper]</div>
        </div>
      </div>
    </aside>

    <!-- Center Content: Always Centered & Never Squished -->
    <div class="content-container">

      <!-- Navigation Header -->
      <header class="nav">
        <a href="/" class="logo">
          <span>>_ tdrop</span>
          <span class="logo-badge">v1.0</span>
        </a>
        <a href="/" class="nav-action">Upload New File</a>
      </header>

      <!-- Top Horizontal In-Flow Ad Banner -->
      <div class="ad-banner-inline">
        <span class="ad-banner-tag">Advertisement</span>
        <ins class="adsbygoogle"
             style="display:block; width:100%; min-height:60px;"
             data-ad-client="ca-pub-2876380604791121"
             data-ad-slot="1234567890"
             data-ad-format="horizontal"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <div class="ad-fallback-label">[Google AdSense Responsive Unit]</div>
      </div>

      <!-- Main Download Card Container -->
      <main class="download-container">

        <div class="download-card">
          <div class="file-header">
            <div class="file-icon">${icon}</div>
            <div class="file-details">
              <h1 class="file-name">${meta.sanitizedFilename}</h1>
              <div class="file-meta">
                <span class="file-size">${sizeFormatted}</span>
                <span>•</span>
                <span>Ephemeral File</span>
              </div>
            </div>
          </div>

          <!-- ClamAV Security Stamp -->
          <div class="security-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <span>ClamAV Engine: Clean & Verified</span>
          </div>

          <!-- Download Action Button -->
          <a href="${downloadUrl}" class="download-btn">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Download File (${sizeFormatted})</span>
          </a>

          <!-- Terminal cURL Copy -->
          <div class="curl-block">
            <div class="curl-code-wrapper">
              <div class="curl-code"><span>curl -O</span> https://${domain}/${meta.code}/${encodeURIComponent(meta.sanitizedFilename)}</div>
            </div>
            <button class="copy-btn" onclick="copyCurl()">Copy cURL</button>
          </div>

          <!-- Live Expiry Bar -->
          <div class="expiry-bar">
            <span>Retention: ${meta.retentionClass}</span>
            <span id="countdown">Calculating...</span>
          </div>
        </div>

        <!-- Bottom Horizontal In-Flow Ad Banner -->
        <div class="ad-banner-inline" style="margin-top: 10px;">
          <span class="ad-banner-tag">Advertisement</span>
          <ins class="adsbygoogle"
               style="display:block; width:100%; min-height:90px;"
               data-ad-client="ca-pub-2876380604791121"
               data-ad-slot="0987654321"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <div class="ad-fallback-label">[Google AdSense Responsive Unit]</div>
        </div>

      </main>

      <footer>
        <p>Powered by <a href="/">tdrop</a> · Zero egress fees · Zero logs · End-to-end ephemeral</p>
      </footer>

    </div>

    <!-- Right Sticky Ad Rail (Desktop >= 1180px only, 160x600) -->
    <aside class="ad-rail">
      <div class="ad-sticky">
        <span class="ad-tag">Sponsor</span>
        <div class="ad-box-skyscraper">
          <ins class="adsbygoogle"
               style="display:inline-block;width:160px;height:600px"
               data-ad-client="ca-pub-2876380604791121"
               data-ad-slot="4040404040"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <div class="ad-fallback-label">[160x600 Skyscraper]</div>
        </div>
      </div>
    </aside>

  </div>

  <script>
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
