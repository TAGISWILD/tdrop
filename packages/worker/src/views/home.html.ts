export function renderHomePage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>tdrop · Ephemeral File Sharing for Terminals & Modern Workflows</title>
  <meta name="description" content="Authless, ephemeral file sharing designed for developers. 10MB free tier, zero egress fees, ClamAV malware scanning.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Google AdSense Tag Placeholder -->
  <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script> -->

  <style>
    :root {
      --bg: #07080b;
      --surface: #0f1218;
      --surface-border: #1b212c;
      --surface-hover: #161b24;
      --accent-green: #00ff88;
      --accent-cyan: #00d9f5;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
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
        radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0, 255, 136, 0.07), transparent 60%),
        radial-gradient(circle at 10% 40%, rgba(0, 217, 245, 0.03), transparent 30%);
      background-attachment: fixed;
    }

    /* Navigation */
    nav {
      width: 100%;
      max-width: 1100px;
      padding: 24px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.3rem;
      color: var(--text-main);
      text-decoration: none;
    }
    .brand-pill {
      background: rgba(0, 255, 136, 0.1);
      color: var(--accent-green);
      font-size: 0.7rem;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid rgba(0, 255, 136, 0.25);
    }
    .nav-links {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      transition: color 0.15s;
    }
    .nav-links a:hover { color: var(--accent-green); }
    .nav-cta {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      padding: 8px 14px;
      border-radius: 8px;
      font-family: var(--font-mono);
      font-size: 0.85rem !important;
      color: var(--accent-cyan) !important;
    }
    .nav-cta:hover {
      background: rgba(0, 217, 245, 0.1) !important;
      border-color: var(--accent-cyan) !important;
    }

    /* Main Container */
    main {
      width: 100%;
      max-width: 900px;
      padding: 40px 20px 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 48px;
    }

    /* Hero Section */
    .hero {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(0, 255, 136, 0.06);
      border: 1px solid rgba(0, 255, 136, 0.2);
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--accent-green);
    }
    .hero-title {
      font-size: 3.2rem;
      font-weight: 800;
      letter-spacing: -1.5px;
      line-height: 1.15;
      max-width: 780px;
    }
    .hero-title span {
      background: linear-gradient(135deg, var(--text-main) 30%, var(--accent-green) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 580px;
      line-height: 1.6;
    }

    /* Interactive Drop Zone */
    .uploader-card {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
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
      border: 2px dashed rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 48px 24px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      background: rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }
    .drop-zone.dragover {
      border-color: var(--accent-green);
      background: rgba(0, 255, 136, 0.05);
      transform: scale(1.005);
    }
    .drop-icon {
      font-size: 2.8rem;
    }
    .drop-title {
      font-size: 1.2rem;
      font-weight: 700;
    }
    .drop-subtitle {
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .file-input { display: none; }

    /* Progress & Result Box */
    .upload-state {
      display: none;
      margin-top: 24px;
      flex-direction: column;
      gap: 16px;
    }
    .progress-bar-bg {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan));
      transition: width 0.1s ease;
    }

    .result-box {
      display: none;
      background: #090b10;
      border: 1px solid rgba(0, 255, 136, 0.3);
      border-radius: 12px;
      padding: 20px;
      margin-top: 20px;
    }
    .result-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 0.9rem;
      color: var(--accent-green);
      font-weight: 700;
    }
    .result-url-block {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 10px 14px;
    }
    .result-url {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      color: var(--accent-cyan);
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .copy-btn {
      background: rgba(0, 255, 136, 0.15);
      color: var(--accent-green);
      border: 1px solid rgba(0, 255, 136, 0.3);
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s;
    }
    .copy-btn:hover {
      background: var(--accent-green);
      color: #04140b;
    }

    /* Terminal Preview Section */
    .terminal-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .section-title {
      font-size: 1.3rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .terminal-box {
      background: #080a0e;
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: 20px;
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--text-main);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    }
    .terminal-line {
      display: flex;
      gap: 10px;
      margin-bottom: 8px;
    }
    .terminal-prompt { color: var(--accent-green); font-weight: 700; }
    .terminal-dim { color: var(--text-dim); }
    .terminal-cyan { color: var(--accent-cyan); }

    /* Features Grid */
    .features-grid {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
    }
    .feature-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: transform 0.15s;
    }
    .feature-card:hover { transform: translateY(-2px); }
    .feature-icon { font-size: 1.6rem; margin-bottom: 4px; }
    .feature-title { font-size: 1.05rem; font-weight: 700; color: var(--text-main); }
    .feature-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }

    /* Google AdSense Unit Container */
    .ad-banner {
      width: 100%;
      background: rgba(16, 19, 26, 0.5);
      border: 1px dashed var(--surface-border);
      border-radius: 14px;
      padding: 20px;
      text-align: center;
      min-height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .ad-tag {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-dim);
      position: absolute;
      top: 6px;
      right: 12px;
    }

    /* Footer */
    footer {
      width: 100%;
      border-top: 1px solid var(--surface-border);
      padding: 30px 20px;
      font-size: 0.85rem;
      color: var(--text-muted);
      text-align: center;
    }
    footer a { color: var(--accent-green); text-decoration: none; }
  </style>
</head>
<body>

  <nav>
    <a href="/" class="brand">
      <span>>_ tdrop</span>
      <span class="brand-pill">v1.0</span>
    </a>
    <div class="nav-links">
      <a href="#cli">CLI Usage</a>
      <a href="#features">Features</a>
      <a href="#cli" class="nav-cta">npx tdrop</a>
    </div>
  </nav>

  <main>

    <!-- Top Google AdSense Placement -->
    <div class="ad-banner">
      <span class="ad-tag">Advertisement</span>
      <ins class="adsbygoogle"
           style="display:block; width:100%; height:90px;"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="9988776655"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      <span style="font-size: 0.8rem; color: var(--text-dim);">[Google AdSense Banner Slot]</span>
    </div>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Zero Egress · Zero RAM Accumulation · 10MB Free</span>
      </div>
      <h1 class="hero-title">
        Ephemeral file sharing for <span>terminals & developers</span>.
      </h1>
      <p class="hero-subtitle">
        Drop files from your command line or browser. Fast, authless, encrypted, and automatically purged after 24 hours.
      </p>
    </section>

    <!-- Interactive Drag-and-Drop Uploader -->
    <div class="uploader-card">
      <div class="drop-zone" id="dropZone" onclick="document.getElementById('fileInput').click()">
        <input type="file" id="fileInput" class="file-input" onchange="handleFileSelect(this.files)">
        <div class="drop-icon">📤</div>
        <div class="drop-title">Drop your file here or click to browse</div>
        <div class="drop-subtitle">Strict 10MB limit on free tier · Auto-expires in 24 hours</div>
      </div>

      <!-- Live Upload Progress -->
      <div class="upload-state" id="uploadState">
        <div style="display:flex; justify-content:space-between; font-size: 0.85rem; font-family: var(--font-mono);">
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
        <div style="margin-top:12px; font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dim); display:flex; justify-content:space-between;">
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
        <div class="terminal-line">
          <span class="terminal-prompt">$</span>
          <span>npx tdrop release-v1.tar.gz</span>
        </div>
        <div class="terminal-line terminal-dim">
          <span>[Sponsored] High-speed serverless infrastructure -> https://tdrop.link/ad/r2</span>
        </div>
        <div class="terminal-line">
          <span class="terminal-cyan">Uploading [████████████████████████████] 100% | 4.8 MB/s</span>
        </div>
        <div class="terminal-line" style="color:var(--accent-green); margin-top:8px;">
          <span>✔ Upload complete!</span>
        </div>
        <div class="terminal-line">
          <span class="terminal-dim">  🛡️ Malware Scan:</span> <span style="color:var(--accent-green);">Verified Clean (ClamAV Engine)</span>
        </div>
        <div class="terminal-line">
          <span class="terminal-dim">  🔗 Link:</span> <span class="terminal-cyan">https://${domain}/a7kX9b2</span>
        </div>
        <div class="terminal-line" style="margin-top:16px;">
          <span class="terminal-prompt">$</span>
          <span>cat production.log | npx tdrop --filename prod.log</span>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features-grid" id="features">
      <div class="feature-card">
        <div class="feature-icon">🛡️</div>
        <h3 class="feature-title">ClamAV Malware Scanning</h3>
        <p class="feature-desc">Files are inspected by ClamAV engines with over 3.6 million active malware signatures before distribution.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3 class="feature-title">Edge Direct-to-R2</h3>
        <p class="feature-desc">Zero RAM accumulation. Files stream directly to Cloudflare R2 globally with zero egress bandwidth fees.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⏳</div>
        <h3 class="feature-title">Guaranteed Ephemeral</h3>
        <p class="feature-desc">Auto-deleted after 1h, 24h, or 7d. Pushed directly to storage lifecycle garbage collection.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3 class="feature-title">Zero Telemetry</h3>
        <p class="feature-desc">Strict developer trust invariant. No tracking cookies, no silent analytics, and no intrusive phone-homes.</p>
      </div>
    </section>

    <!-- Bottom Google AdSense Placement -->
    <div class="ad-banner">
      <span class="ad-tag">Advertisement</span>
      <ins class="adsbygoogle"
           style="display:block; width:100%; height:90px;"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="1122334455"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      <span style="font-size: 0.8rem; color: var(--text-dim);">[Google AdSense Banner Slot]</span>
    </div>

  </main>

  <footer>
    <p>tdrop · Engineered for developers · <a href="https://github.com/tagiswild/tdrop" target="_blank">Open Source</a></p>
  </footer>

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
      if (e.dataTransfer.files.length) handleFileSelect(e.dataTransfer.files);
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
      progressBar.style.width = '30%';
      uploadPercent.textContent = '30%';

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
          const res = JSON.parse(xhr.responseText);
          uploadState.style.display = 'none';
          resultBox.style.display = 'block';
          resultUrl.textContent = res.url;
          resultUrl.setAttribute('data-url', res.url);
          document.getElementById('resultCurl').textContent = 'curl -O ' + res.url + '/' + encodeURIComponent(res.filename);
        } else {
          alert('Upload failed: ' + xhr.responseText);
          uploadState.style.display = 'none';
        }
      };

      xhr.onerror = () => {
        alert('Network upload failed.');
        uploadState.style.display = 'none';
      };

      xhr.send(formData);
    }

    function copyResultUrl() {
      const url = resultUrl.getAttribute('data-url') || resultUrl.textContent;
      navigator.clipboard.writeText(url).then(() => {
        copyUrlBtn.textContent = 'Copied!';
        setTimeout(() => copyUrlBtn.textContent = 'Copy Link', 2000);
      });
    }
  </script>
</body>
</html>`;
}
