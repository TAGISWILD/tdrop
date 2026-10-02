import type { FileMetadata } from "@tdrop/shared";
import { formatContentDisposition } from "@tdrop/shared";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getFileIcon(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (["zip", "tar", "gz", "7z", "rar"].includes(ext)) return "📦";
  if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) return "📄";
  if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) return "🖼️";
  if (["js", "ts", "py", "rs", "go", "json", "html", "css"].includes(ext)) return "💻";
  if (["mp4", "mov", "mkv", "webm"].includes(ext)) return "🎥";
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Download ${meta.sanitizedFilename} · tdrop</title>
  <meta name="description" content="Secure, ephemeral file transfer. Verified with ClamAV.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Google AdSense Tag Placeholder -->
  <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script> -->

  <style>
    :root {
      --bg: #08090d;
      --surface: #10131a;
      --surface-border: #1e2433;
      --surface-hover: #171c26;
      --accent-green: #00ff88;
      --accent-cyan: #00d9f5;
      --text-main: #f1f5f9;
      --text-muted: #8b99ae;
      --danger: #ef4444;
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font-sans);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: 
        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 255, 136, 0.08), transparent 70%),
        radial-gradient(circle at 100% 100%, rgba(0, 217, 245, 0.04), transparent 40%);
      background-attachment: fixed;
    }

    /* Navigation */
    .nav {
      width: 100%;
      max-width: 1080px;
      padding: 24px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--text-main);
      text-decoration: none;
      letter-spacing: -0.5px;
    }
    .logo-badge {
      background: rgba(0, 255, 136, 0.12);
      color: var(--accent-green);
      font-size: 0.7rem;
      padding: 3px 8px;
      border-radius: 4px;
      border: 1px solid rgba(0, 255, 136, 0.3);
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--accent-green); }

    /* Main Container */
    .container {
      width: 100%;
      max-width: 680px;
      padding: 20px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Ad Container */
    .ad-slot {
      background: rgba(16, 19, 26, 0.6);
      border: 1px dashed var(--surface-border);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      min-height: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .ad-label {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted);
      position: absolute;
      top: 6px;
      right: 12px;
      opacity: 0.6;
    }

    /* Card */
    .download-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      padding: 36px 32px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      position: relative;
      overflow: hidden;
    }
    .download-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent-green), var(--accent-cyan), transparent);
    }

    .file-header {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 28px;
    }
    .file-icon {
      font-size: 2.8rem;
      line-height: 1;
      padding: 16px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
    }
    .file-details {
      flex: 1;
      min-width: 0;
    }
    .file-name {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-main);
      word-break: break-word;
      line-height: 1.3;
      margin-bottom: 6px;
    }
    .file-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      font-size: 0.85rem;
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
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 24px;
    }

    /* Action Buttons */
    .download-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      background: linear-gradient(135deg, var(--accent-green), #00cc6a);
      color: #04140b;
      font-family: var(--font-sans);
      font-size: 1.05rem;
      font-weight: 700;
      padding: 16px 24px;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 20px rgba(0, 255, 136, 0.25);
    }
    .download-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 255, 136, 0.4);
    }
    .download-btn:active {
      transform: translateY(0);
    }

    /* Terminal cURL Block */
    .curl-block {
      margin-top: 24px;
      background: #090b10;
      border: 1px solid var(--surface-border);
      border-radius: 10px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .curl-code {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .curl-code span { color: var(--accent-cyan); }
    .copy-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--surface-border);
      color: var(--text-main);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      flex-shrink: 0;
    }
    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: var(--accent-green);
    }

    /* Expiry details */
    .expiry-bar {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Footer */
    footer {
      margin-top: auto;
      padding: 30px 20px;
      font-size: 0.8rem;
      color: var(--text-muted);
      text-align: center;
    }
    footer a { color: var(--text-muted); text-decoration: none; }
    footer a:hover { color: var(--accent-green); }
  </style>
</head>
<body>

  <!-- Navigation -->
  <header class="nav">
    <a href="/" class="logo">
      <span>>_ tdrop</span>
      <span class="logo-badge">v1.0</span>
    </a>
    <div class="nav-links">
      <a href="/">Upload New File</a>
    </div>
  </header>

  <main class="container">

    <!-- Top Google AdSense Banner Placement -->
    <div class="ad-slot">
      <span class="ad-label">Advertisement</span>
      <!-- Replace with actual AdSense unit -->
      <ins class="adsbygoogle"
           style="display:block; width:100%; height:90px;"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="1234567890"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      <span style="font-size: 0.8rem; color: var(--text-muted);">[Google AdSense Placement]</span>
    </div>

    <!-- Download Card -->
    <div class="download-card">
      <div class="file-header">
        <div class="file-icon">${icon}</div>
        <div class="file-details">
          <h1 class="file-name">${meta.sanitizedFilename}</h1>
          <div class="file-meta">
            <span class="file-size">${sizeFormatted}</span>
            <span>•</span>
            <span>Ephemeral Transfer</span>
          </div>
        </div>
      </div>

      <!-- Security Stamp -->
      <div class="security-badge">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        <span>ClamAV Engine: Clean & Verified</span>
      </div>

      <!-- Download Button -->
      <a href="${downloadUrl}" class="download-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span>Download File (${sizeFormatted})</span>
      </a>

      <!-- Terminal cURL Copy -->
      <div class="curl-block">
        <div class="curl-code" id="curlCmd"><span>curl -O</span> https://${domain}/${meta.code}/${encodeURIComponent(meta.sanitizedFilename)}</div>
        <button class="copy-btn" onclick="copyCurl()">Copy cURL</button>
      </div>

      <div class="expiry-bar">
        <span>Retention: ${meta.retentionClass}</span>
        <span id="countdown">Calculating...</span>
      </div>
    </div>

    <!-- Bottom Google AdSense Unit -->
    <div class="ad-slot">
      <span class="ad-label">Advertisement</span>
      <ins class="adsbygoogle"
           style="display:block; width:100%; height:90px;"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="0987654321"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      <span style="font-size: 0.8rem; color: var(--text-muted);">[Google AdSense Placement]</span>
    </div>

  </main>

  <footer>
    <p>Powered by <a href="/">tdrop</a> · Zero egress fees · Zero logs · End-to-end ephemeral</p>
  </footer>

  <script>
    function copyCurl() {
      const text = "${curlCmd}";
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy cURL', 2000);
      });
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
