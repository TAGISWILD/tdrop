export function renderErrorPage(
  statusCode: number = 404,
  title: string = "File Expired or Not Found",
  message: string = "This ephemeral transfer has reached its expiration window and was permanently incinerated from Cloudflare R2 storage.",
  domain: string = "tdrop.link"
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>${statusCode} · ${title} · tdrop</title>
  <meta name="description" content="${message}">
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

    /* Master Layout */
    .site-wrapper {
      width: 100%;
      max-width: 1040px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 36px;
      padding: 40px 16px 80px;
      min-height: 100vh;
    }

    /* Center Content Container */
    .content-container {
      width: 100%;
      max-width: 600px;
      flex: 1 1 600px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Error Card */
    .error-card {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: clamp(24px, 5vw, 40px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 18px;
    }

    .error-icon-box {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .error-code-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      padding: 3px 10px;
      border-radius: 9999px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .error-title {
      font-size: clamp(1.4rem, 4.5vw, 1.85rem);
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.03em;
      line-height: 1.25;
    }

    .error-desc {
      font-size: clamp(0.85rem, 2.6vw, 0.95rem);
      color: var(--text-muted);
      line-height: 1.6;
      max-width: 480px;
    }

    .error-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      width: 100%;
      margin-top: 8px;
    }

    .btn-solid-white {
      background: #ffffff;
      color: #09090b;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 12px 24px;
      border-radius: 10px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.8);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-solid-white:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
    }

    .cli-cmd-box {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      border-radius: 10px;
      padding: 11px 16px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }

    .cli-cmd-box:hover {
      border-color: rgba(255, 255, 255, 0.2);
      color: var(--text-main);
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
        <a href="/" class="btn-sm-ghost">Home</a>
        <a href="/sponsor" class="btn-sponsor-nav">Sponsor Us</a>
      </div>
    </nav>
  </header>

  <div class="site-wrapper">

    <!-- Center Column -->
    <div class="content-container">

      <main class="error-card">
        <div class="error-icon-box">⏳</div>
        <div class="error-code-badge">${statusCode} · Ephemeral Auto-Purge</div>
        <h1 class="error-title">${title}</h1>
        <p class="error-desc">${message}</p>
        
        <div class="error-actions">
          <a href="/" class="btn-solid-white">Upload New File</a>
          <div class="cli-cmd-box" onclick="copySnippet('npx tdrop <file>')">
            <code>$ npx tdrop &lt;file&gt;</code>
            <span style="font-size:0.75rem; color:var(--text-dim);">Copy</span>
          </div>
        </div>
      </main>

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
        <p class="sponsor-rail-desc">Reach active developers directly on terminal stdout and edge downloads. 0% AdBlock and high CTR.</p>
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
    function copySnippet(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => alert('Copied: ' + text));
      } else {
        const temp = document.createElement('input');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        alert('Copied: ' + text);
      }
    }
  </script>
</body>
</html>`;
}
