export function renderHomePage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>tdrop · Ephemeral File Sharing for Terminals & Modern Workflows</title>
  <meta name="description" content="Authless, ephemeral file sharing designed for developers. 10MB free tier, zero egress fees, ClamAV malware scanning.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2876380604791121" crossorigin="anonymous"></script>

  <style>
    :root {
      --bg: #07080b;
      --surface: #0f1218;
      --surface-card: #131720;
      --surface-border: #1b2230;
      --surface-border-subtle: rgba(255, 255, 255, 0.07);
      --surface-hover: #171d28;
      --accent-green: #00ff88;
      --accent-green-dim: rgba(0, 255, 136, 0.12);
      --accent-cyan: #00d9f5;
      --accent-cyan-dim: rgba(0, 217, 245, 0.12);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
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
        radial-gradient(ellipse 90% 50% at 50% -10%, rgba(0, 255, 136, 0.08), transparent 60%),
        radial-gradient(circle at 10% 40%, rgba(0, 217, 245, 0.04), transparent 30%);
      background-attachment: fixed;
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }

    /* Outer 3-Column Layout: Left Ads Column | Center Content | Right Ads Column */
    .page-layout {
      width: 100%;
      max-width: 1480px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      min-height: 100vh;
    }

    @media (min-width: 1240px) {
      .page-layout {
        grid-template-columns: 200px minmax(0, 1fr) 200px;
        gap: 24px;
        padding: 0 16px;
      }
    }

    @media (min-width: 1440px) {
      .page-layout {
        grid-template-columns: 240px minmax(0, 880px) 240px;
        justify-content: center;
        gap: 36px;
      }
    }

    /* Desktop Sticky Ad Sidebars */
    .ad-column {
      display: none;
      padding-top: 32px;
    }

    @media (min-width: 1240px) {
      .ad-column {
        display: block;
      }
    }

    .ad-sticky-box {
      position: sticky;
      top: 24px;
      background: rgba(15, 18, 24, 0.7);
      border: 1px dashed var(--surface-border);
      border-radius: 14px;
      padding: 16px 10px;
      min-height: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-align: center;
      backdrop-filter: blur(8px);
    }

    .ad-label {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--text-dim);
    }

    .ad-slot-skyscraper {
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

    /* Central Content Container */
    .center-column {
      width: 100%;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 16px 60px;
    }

    @media (min-width: 640px) {
      .center-column {
        padding: 0 24px 80px;
      }
    }

    /* Navigation */
    nav {
      width: 100%;
      max-width: 880px;
      padding: 18px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.15rem;
      color: var(--text-main);
      text-decoration: none;
      white-space: nowrap;
    }

    .brand-pill {
      background: var(--accent-green-dim);
      color: var(--accent-green);
      font-size: 0.68rem;
      padding: 2px 7px;
      border-radius: 4px;
      border: 1px solid rgba(0, 255, 136, 0.25);
    }

    .nav-links {
      display: flex;
      gap: 14px;
      align-items: center;
    }

    .nav-link-secondary {
      display: none;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 600;
      transition: color 0.15s;
    }

    .nav-link-secondary:hover {
      color: var(--accent-green);
    }

    @media (min-width: 540px) {
      .nav-link-secondary {
        display: inline-block;
      }
      .brand {
        font-size: 1.3rem;
      }
    }

    .nav-cta {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      padding: 7px 12px;
      border-radius: 8px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--accent-cyan);
      text-decoration: none;
      white-space: nowrap;
      transition: all 0.2s;
    }

    .nav-cta:hover {
      background: var(--accent-cyan-dim);
      border-color: var(--accent-cyan);
    }

    /* Horizontal Ad Banners (Top & Bottom) */
    .ad-banner-horizontal {
      width: 100%;
      max-width: 880px;
      margin: 10px 0 24px;
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

    /* Main Container Elements */
    main {
      width: 100%;
      max-width: 880px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 36px;
    }

    @media (min-width: 640px) {
      main {
        gap: 48px;
      }
    }

    /* Hero Section */
    .hero {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      width: 100%;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      background: rgba(0, 255, 136, 0.06);
      border: 1px solid rgba(0, 255, 136, 0.2);
      border-radius: 20px;
      font-size: clamp(0.72rem, 2.5vw, 0.8rem);
      font-weight: 600;
      color: var(--accent-green);
      line-height: 1.2;
    }

    .hero-title {
      font-size: clamp(1.85rem, 5.5vw, 3.2rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.15;
      max-width: 760px;
      padding: 0 4px;
    }

    .hero-title span {
      background: linear-gradient(135deg, var(--text-main) 30%, var(--accent-green) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: clamp(0.92rem, 2.8vw, 1.15rem);
      color: var(--text-muted);
      max-width: 580px;
      line-height: 1.55;
      padding: 0 8px;
    }

    /* Interactive Drop Zone Card */
    .uploader-card {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      padding: clamp(16px, 4vw, 36px);
      box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.6);
      position: relative;
      overflow: hidden;
    }

    .uploader-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent-green), var(--accent-cyan), transparent);
    }

    .drop-zone {
      border: 2px dashed rgba(255, 255, 255, 0.14);
      border-radius: 14px;
      padding: clamp(28px, 6vw, 48px) 16px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .drop-zone:hover, .drop-zone:focus {
      border-color: rgba(0, 255, 136, 0.6);
      background: rgba(0, 255, 136, 0.03);
    }

    .drop-zone.dragover {
      border-color: var(--accent-green);
      background: rgba(0, 255, 136, 0.07);
      transform: scale(1.005);
    }

    .drop-icon {
      font-size: clamp(2.2rem, 5vw, 2.8rem);
      line-height: 1;
    }

    .drop-title {
      font-size: clamp(1.05rem, 3.2vw, 1.25rem);
      font-weight: 700;
      color: var(--text-main);
    }

    .drop-subtitle {
      font-size: clamp(0.78rem, 2.5vw, 0.88rem);
      color: var(--text-muted);
      line-height: 1.4;
    }

    .file-input { display: none; }

    /* Progress & Uploading State */
    .upload-state {
      display: none;
      margin-top: 20px;
      flex-direction: column;
      gap: 12px;
    }

    .progress-bar-bg {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan));
      transition: width 0.15s ease-out;
    }

    /* Result Box */
    .result-box {
      display: none;
      background: #090c12;
      border: 1px solid rgba(0, 255, 136, 0.35);
      border-radius: 12px;
      padding: clamp(14px, 3.5vw, 20px);
      margin-top: 20px;
    }

    .result-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
      font-size: clamp(0.82rem, 2.5vw, 0.9rem);
      color: var(--accent-green);
      font-weight: 700;
    }

    .result-url-block {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 10px 12px;
    }

    @media (min-width: 480px) {
      .result-url-block {
        flex-direction: row;
        align-items: center;
      }
    }

    .result-url {
      font-family: var(--font-mono);
      font-size: clamp(0.85rem, 2.6vw, 0.95rem);
      color: var(--accent-cyan);
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .copy-btn {
      background: rgba(0, 255, 136, 0.15);
      color: var(--accent-green);
      border: 1px solid rgba(0, 255, 136, 0.35);
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s;
      min-height: 38px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .copy-btn:hover {
      background: var(--accent-green);
      color: #04140b;
    }

    .result-meta-row {
      margin-top: 12px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-dim);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
    }

    /* Terminal Preview Section */
    .terminal-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .section-title {
      font-size: clamp(1.15rem, 3.5vw, 1.35rem);
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .terminal-box {
      background: #080a0e;
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: clamp(14px, 3.5vw, 20px);
      font-family: var(--font-mono);
      font-size: clamp(0.74rem, 2.3vw, 0.88rem);
      color: var(--text-main);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .terminal-line {
      display: flex;
      flex-wrap: nowrap;
      gap: 8px;
      margin-bottom: 6px;
      white-space: pre;
    }

    .terminal-prompt { color: var(--accent-green); font-weight: 700; flex-shrink: 0; }
    .terminal-dim { color: var(--text-dim); }
    .terminal-cyan { color: var(--accent-cyan); }

    /* Features Grid */
    .features-grid {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    @media (min-width: 600px) {
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }

    .feature-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: clamp(18px, 4vw, 24px);
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: transform 0.2s, border-color 0.2s;
    }

    .feature-card:hover {
      transform: translateY(-2px);
      border-color: rgba(0, 255, 136, 0.25);
    }

    .feature-icon {
      font-size: 1.5rem;
      margin-bottom: 2px;
    }

    .feature-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .feature-desc {
      font-size: 0.84rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* Footer */
    footer {
      width: 100%;
      border-top: 1px solid var(--surface-border);
      padding: 28px 16px;
      font-size: 0.82rem;
      color: var(--text-muted);
      text-align: center;
      margin-top: 24px;
    }

    footer a {
      color: var(--accent-green);
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="page-layout">

    <!-- Left Sticky Ad Column (Desktop only, 160x600 Skyscraper) -->
    <aside class="ad-column">
      <div class="ad-sticky-box">
        <span class="ad-label">Sponsor</span>
        <div class="ad-slot-skyscraper">
          <ins class="adsbygoogle"
               style="display:inline-block;width:160px;height:600px"
               data-ad-client="ca-pub-2876380604791121"
               data-ad-slot="1010101010"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <span style="font-size: 0.72rem; color: var(--text-dim);">[160x600 Skyscraper]</span>
        </div>
      </div>
    </aside>

    <!-- Center Main Content -->
    <div class="center-column">

      <!-- Navigation Header -->
      <nav>
        <a href="/" class="brand">
          <span>>_ tdrop</span>
          <span class="brand-pill">v1.0</span>
        </a>
        <div class="nav-links">
          <a href="#cli" class="nav-link-secondary">CLI Usage</a>
          <a href="#features" class="nav-link-secondary">Features</a>
          <a href="#cli" class="nav-cta">npx tdrop</a>
        </div>
      </nav>

      <!-- Top Horizontal Google AdSense Leaderboard -->
      <div class="ad-banner-horizontal">
        <span class="ad-banner-tag">Advertisement</span>
        <ins class="adsbygoogle"
             style="display:block; width:100%; min-height:60px;"
             data-ad-client="ca-pub-2876380604791121"
             data-ad-slot="9988776655"
             data-ad-format="horizontal"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <span style="font-size: 0.75rem; color: var(--text-dim);">[Google AdSense Responsive Leaderboard]</span>
      </div>

      <main>

        <!-- Hero Section -->
        <section class="hero">
          <div class="hero-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Zero Egress · No Sign Up · 10MB Free</span>
          </div>
          <h1 class="hero-title">
            Ephemeral file sharing for <span>terminals & developers</span>.
          </h1>
          <p class="hero-subtitle">
            Transfer files from your command line or mobile browser. Fast, authless, encrypted, and automatically purged.
          </p>
        </section>

        <!-- Interactive Drag-and-Drop & Tap Uploader -->
        <div class="uploader-card">
          <div class="drop-zone" id="dropZone" onclick="document.getElementById('fileInput').click()">
            <input type="file" id="fileInput" class="file-input" onchange="handleFileSelect(this.files)">
            <div class="drop-icon">📤</div>
            <div class="drop-title">Tap to select or drop a file</div>
            <div class="drop-subtitle">Strict 10MB limit on free tier · Auto-expires in 24 hours</div>
          </div>

          <!-- Live Upload Progress -->
          <div class="upload-state" id="uploadState">
            <div style="display:flex; justify-content:space-between; font-size: 0.82rem; font-family: var(--font-mono);">
              <span id="uploadFilename">uploading...</span>
              <span id="uploadPercent">0%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" id="progressBar"></div>
            </div>
          </div>

          <!-- Result Card -->
          <div class="result-box" id="resultBox">
            <div class="result-header">
              <span>✔ Upload Verified & Available</span>
              <span style="color:var(--text-muted); font-size:0.75rem;">🛡️ ClamAV Clean</span>
            </div>
            <div class="result-url-block">
              <span class="result-url" id="resultUrl">https://${domain}/...</span>
              <button class="copy-btn" id="copyUrlBtn" onclick="copyResultUrl()">Copy Link</button>
            </div>
            <div class="result-meta-row">
              <span id="resultExpiry">Retention: 24h</span>
              <span id="resultCurl">curl -O ...</span>
            </div>
          </div>
        </div>

        <!-- Terminal Invocations -->
        <section class="terminal-section" id="cli">
          <div class="section-title">
            <span>Terminal Native</span>
            <span class="brand-pill">CLI Ready</span>
          </div>
          <div class="terminal-box">
            <div class="terminal-line"><span class="terminal-prompt">$</span><span>npx tdrop release-v1.tar.gz</span></div>
            <div class="terminal-line terminal-dim"><span>[Sponsored] High-speed serverless infra -> https://${domain}/ad/r2</span></div>
            <div class="terminal-line"><span class="terminal-cyan">Uploading [████████████] 100% | 4.8 MB/s</span></div>
            <div class="terminal-line" style="color:var(--accent-green); margin-top:4px;"><span>✔ Upload complete!</span></div>
            <div class="terminal-line"><span class="terminal-dim">  🛡️ Malware Scan:</span> <span style="color:var(--accent-green);">Clean (ClamAV Engine)</span></div>
            <div class="terminal-line"><span class="terminal-dim">  🔗 Link:</span> <span class="terminal-cyan">https://${domain}/a7kX9b2</span></div>
            <div class="terminal-line" style="margin-top:12px;"><span class="terminal-prompt">$</span><span>cat production.log | npx tdrop --filename prod.log</span></div>
          </div>
        </section>

        <!-- Features -->
        <section class="features-grid" id="features">
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3 class="feature-title">ClamAV Malware Scanning</h3>
            <p class="feature-desc">Files are scanned with over 3.6 million active malware signatures before distribution.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3 class="feature-title">Edge Direct-to-R2</h3>
            <p class="feature-desc">Zero RAM accumulation. Files stream directly to Cloudflare R2 globally with $0 egress fees.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⏳</div>
            <h3 class="feature-title">Guaranteed Ephemeral</h3>
            <p class="feature-desc">Auto-deleted after 1h, 24h, or 7d. Pushed directly to storage lifecycle garbage collection.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3 class="feature-title">Zero Telemetry</h3>
            <p class="feature-desc">Strict developer trust invariant. No tracking cookies, no analytics, no phone-homes.</p>
          </div>
        </section>

      </main>

      <!-- Bottom Horizontal Google AdSense Banner -->
      <div class="ad-banner-horizontal" style="margin-top: 36px;">
        <span class="ad-banner-tag">Advertisement</span>
        <ins class="adsbygoogle"
             style="display:block; width:100%; min-height:90px;"
             data-ad-client="ca-pub-2876380604791121"
             data-ad-slot="1122334455"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <span style="font-size: 0.75rem; color: var(--text-dim);">[Google AdSense Responsive Unit]</span>
      </div>

      <footer>
        <p>tdrop · Engineered for developers · <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">Open Source</a></p>
      </footer>

    </div>

    <!-- Right Sticky Ad Column (Desktop only, 160x600 Skyscraper) -->
    <aside class="ad-column">
      <div class="ad-sticky-box">
        <span class="ad-label">Sponsor</span>
        <div class="ad-slot-skyscraper">
          <ins class="adsbygoogle"
               style="display:inline-block;width:160px;height:600px"
               data-ad-client="ca-pub-2876380604791121"
               data-ad-slot="2020202020"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <span style="font-size: 0.72rem; color: var(--text-dim);">[160x600 Skyscraper]</span>
        </div>
      </div>
    </aside>

  </div>

  <script>
    const dropZone = document.getElementById('dropZone');
    const uploadState = document.getElementById('uploadState');
    const progressBar = document.getElementById('progressBar');
    const uploadPercent = document.getElementById('uploadPercent');
    const uploadFilename = document.getElementById('uploadFilename');
    const resultBox = document.getElementById('resultBox');
    const resultUrl = document.getElementById('resultUrl');
    const copyUrlBtn = document.getElementById('copyUrlBtn');

    // Drag and Drop
    ['dragenter', 'dragover'].forEach(name => {
      dropZone.addEventListener(name, (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    });
    ['dragleave', 'drop'].forEach(name => {
      dropZone.addEventListener(name, (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); });
    });
    dropZone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files.length) handleFileSelect(e.dataTransfer.files);
    });

    function handleFileSelect(files) {
      if (!files || !files.length) return;
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds the 10MB free tier limit.');
        return;
      }

      uploadFilename.textContent = file.name;
      uploadState.style.display = 'flex';
      resultBox.style.display = 'none';
      progressBar.style.width = '15%';
      uploadPercent.textContent = '15%';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('ttl', '24h');

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload', true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          progressBar.style.width = percent + '%';
          uploadPercent.textContent = percent + '%';
        }
      };

      xhr.onload = () => {
        if (xhr.status === 201) {
          try {
            const res = JSON.parse(xhr.responseText);
            uploadState.style.display = 'none';
            resultBox.style.display = 'block';
            resultUrl.textContent = res.url;
            resultUrl.setAttribute('data-url', res.url);
            document.getElementById('resultCurl').textContent = 'curl -O ' + res.url + '/' + encodeURIComponent(res.filename);
          } catch(e) {
            alert('Upload succeeded but response could not be parsed.');
          }
        } else {
          alert('Upload failed: ' + xhr.responseText);
          uploadState.style.display = 'none';
        }
      };

      xhr.onerror = () => {
        alert('Network upload failed. Please check your connection.');
        uploadState.style.display = 'none';
      };

      xhr.send(formData);
    }

    function copyResultUrl() {
      const url = resultUrl.getAttribute('data-url') || resultUrl.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          copyUrlBtn.textContent = 'Copied!';
          setTimeout(() => copyUrlBtn.textContent = 'Copy Link', 2000);
        });
      } else {
        const temp = document.createElement('input');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        copyUrlBtn.textContent = 'Copied!';
        setTimeout(() => copyUrlBtn.textContent = 'Copy Link', 2000);
      }
    }
  </script>
</body>
</html>`;
}
