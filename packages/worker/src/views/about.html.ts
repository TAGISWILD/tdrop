export function renderAboutPage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>About tdrop · Ephemeral File Sharing Architecture & Story</title>
  <meta name="description" content="Learn about tdrop: our mission, the problems we solve for developers and sysadmins, our open-source philosophy, and the edge architecture powering millions of ephemeral drops.">
  
  <link rel="canonical" href="https://${domain}/about">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#09090b">
  <link rel="manifest" href="/manifest.json">

  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="tdrop">
  <meta property="og:url" content="https://${domain}/about">
  <meta property="og:title" content="About tdrop · Ephemeral File Sharing Architecture & Story">
  <meta property="og:description" content="Learn about tdrop: our mission, the problems we solve for developers and sysadmins, our open-source philosophy, and the edge architecture powering millions of ephemeral drops.">
  <meta property="og:image" content="https://${domain}/assets/preview.png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="537">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="About tdrop · Ephemeral File Sharing Architecture & Story">
  <meta name="twitter:description" content="Learn about tdrop: our mission, the problems we solve for developers and sysadmins, our open-source philosophy, and our edge architecture.">
  <meta name="twitter:image" content="https://${domain}/assets/preview.png">

  <!-- Structured Data: AboutPage Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About tdrop",
    "description": "The mission, architecture, and open-source history of tdrop ephemeral file sharing.",
    "url": "https://${domain}/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "tdrop",
      "url": "https://${domain}",
      "logo": "https://${domain}/assets/logo.png",
      "founder": {
        "@type": "Person",
        "name": "Atharva Chauhan",
        "url": "https://github.com/TAGISWILD"
      },
      "knowsAbout": [
        "Ephemeral File Sharing",
        "Edge Computing",
        "ClamAV Antivirus Security",
        "Cloudflare Workers & R2",
        "Terminal Utilities"
      ]
    }
  }
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Google AdSense Verification Tag -->
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
      --text-main: #f4f4f5;
      --text-muted: #a1a1aa;
      --text-dim: #71717a;
      --status-green: #10b981;
      --status-blue: #38bdf8;
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'Geist Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font-sans);
      min-height: 100vh;
      width: 100%;
      overflow-x: hidden;
      background-image: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255, 255, 255, 0.04), transparent 60%);
      background-attachment: fixed;
    }

    .nav-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100%;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background: rgba(9, 10, 14, 0.85);
      border-bottom: 1px solid var(--surface-border-subtle);
    }

    .nav-container {
      max-width: 1080px;
      margin: 0 auto;
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
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
      font-size: 1.15rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: 8px;
      transition: all 0.15s;
    }

    .nav-link:hover, .nav-link.active {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }

    .content-wrapper {
      max-width: 840px;
      margin: 40px auto 80px;
      padding: 0 20px;
    }

    .about-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: clamp(24px, 5vw, 48px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .about-header {
      border-bottom: 1px solid var(--surface-border-subtle);
      padding-bottom: 24px;
    }

    .about-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--status-blue);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .about-title {
      font-size: clamp(2rem, 5vw, 2.75rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #ffffff;
      line-height: 1.2;
    }

    .about-subtitle {
      font-size: 1.1rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-top: 12px;
    }

    .about-section {
      display: flex;
      flex-direction: column;
      gap: 14px;
      line-height: 1.75;
    }

    .about-section h2 {
      font-size: 1.4rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.02em;
      margin-top: 10px;
    }

    .about-section p {
      font-size: 0.95rem;
      color: #d4d4d8;
    }

    .about-section ul {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 0.95rem;
      color: #d4d4d8;
    }

    .about-highlight {
      background: rgba(255, 255, 255, 0.02);
      border-left: 3px solid var(--status-green);
      padding: 16px 20px;
      border-radius: 0 12px 12px 0;
      font-size: 0.92rem;
      color: var(--text-main);
    }

    .creator-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: 24px;
      display: flex;
      gap: 20px;
      align-items: center;
      margin-top: 16px;
    }

    .creator-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #18191f;
      border: 2px solid var(--surface-border);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.4rem;
      color: #ffffff;
      font-family: var(--font-mono);
    }

    .creator-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .creator-name {
      font-weight: 700;
      font-size: 1.05rem;
      color: #ffffff;
    }

    .creator-role {
      font-size: 0.8rem;
      color: var(--text-dim);
      font-family: var(--font-mono);
    }

    .creator-bio {
      font-size: 0.86rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-top: 4px;
    }

    footer {
      width: 100%;
      border-top: 1px solid var(--surface-border);
      padding: 40px 16px;
      font-size: 0.82rem;
      color: var(--text-dim);
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 18px;
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

  <!-- Top Navigation -->
  <header class="nav-bar">
    <div class="nav-container">
      <a href="/" class="brand-wrap">
        <div class="brand-logo">
          <img src="/assets/logo-128.png" alt="tdrop" width="22" height="22" style="border-radius: 5px;">
          tdrop
        </div>
      </a>

      <div class="nav-right">
        <a href="/" class="nav-link">Home</a>
        <a href="/docs" class="nav-link">Docs</a>
        <a href="/about" class="nav-link active">About</a>
        <a href="/stats" class="nav-link">Stats</a>
        <a href="/sponsor" class="nav-link">Sponsor</a>
      </div>
    </div>
  </header>

  <div class="content-wrapper">
    <main class="about-card">

      <div class="about-header">
        <div class="about-tag">About The Project</div>
        <h1 class="about-title">Built for the terminal, designed for everyone.</h1>
        <p class="about-subtitle">tdrop was created to solve a universal developer frustration: transferring files across devices, remote servers, and team channels without the overhead of cloud storage accounts, invasive trackers, or permanent data hoarding.</p>
      </div>

      <section class="about-section">
        <h2>The Origin Story</h2>
        <p>In 2024, software engineer <strong>Atharva Chauhan</strong> was debugging a remote, headless Linux virtual machine in a cloud environment. The machine encountered a kernel panic and generated a 4MB crash dump. To inspect the dump locally on a laptop, Atharva faced the classic dilemma of modern software engineering:</p>
        <ul>
          <li>SCP/SFTP required configuring SSH bastion jump boxes and temporary public keys.</li>
          <li>Cloud storage services (Dropbox, Google Drive, Box) required an OAuth sign-in, email verification, and manual browser clicks.</li>
          <li>S3 buckets required generating IAM credentials and configuring AWS CLI profiles inside an ephemeral VM.</li>
          <li>Existing pastebins only supported plain text and lacked binary streaming or antivirus verification.</li>
        </ul>
        <p>The solution was clear: a lightweight, open-source utility that streams files directly from the command line (<code>npx tdrop &lt;file&gt;</code> or <code>curl</code>) to high-speed edge object storage, verifies them against malware, provides a clean short link and mobile QR code, and automatically incinerates the file after 24 hours.</p>
      </section>

      <section class="about-section">
        <h2>Our Core Values</h2>

        <div class="about-highlight">
          <strong>1. Radical Ephemerality:</strong> We believe the internet suffers from "storage debt". Temporary files should not be stored permanently. Automatic expiration is not a feature; it is our foundation.
        </div>

        <div class="about-highlight">
          <strong>2. Zero Tracking & Authless Access:</strong> You should never have to provide your name, phone number, email address, or credit card just to share a 2MB diagnostic archive.
        </div>

        <div class="about-highlight">
          <strong>3. Open Source & Transparent:</strong> tdrop is completely open source under the MIT License. Every line of our CLI, edge worker, scanner bridge, and shared sanitizers is public and auditable on GitHub.
        </div>

        <div class="about-highlight">
          <strong>4. Built for Automation:</strong> Software engineers and DevOps engineers are first-class citizens. Everything that works in the web UI also works via cURL, stdin piping, and CI/CD pipelines.
        </div>
      </section>

      <section class="about-section">
        <h2>Technology & Infrastructure Stack</h2>
        <p>tdrop is powered by modern, globally distributed cloud infrastructure engineered for low latency, zero egress fees, and enterprise-grade reliability:</p>
        <ul>
          <li><strong>Cloudflare Workers:</strong> Serverless edge compute running across 300+ edge cities worldwide, terminating TLS 1.3 connections in milliseconds.</li>
          <li><strong>Cloudflare R2:</strong> Zero-egress S3-compatible object storage where files stream with AES-256 encryption at rest.</li>
          <li><strong>ClamAV Engine:</strong> High-performance parallel antivirus pipeline that intercepts and scans binary streams before distribution.</li>
          <li><strong>Upstash Redis & Cloudflare KV:</strong> Sub-millisecond state management for rate limiting, shortcode routing, and live telemetry aggregation.</li>
        </ul>
      </section>

      <section class="about-section">
        <h2>The Creator & Community</h2>
        <p>tdrop is developed and maintained by Atharva Chauhan and open-source contributors around the globe.</p>

        <div class="creator-box">
          <div class="creator-avatar">AC</div>
          <div class="creator-info">
            <div class="creator-name">Atharva Chauhan (@TAGISWILD)</div>
            <div class="creator-role">Creator & Lead Maintainer</div>
            <p class="creator-bio">Systems architect, open-source enthusiast, and creator of developer utilities. Dedicated to building fast, minimalist tools that respect user privacy and eliminate cloud complexity.</p>
            <div style="display:flex; gap:12px; margin-top:8px;">
              <a href="https://github.com/TAGISWILD" target="_blank" rel="noopener" style="color:var(--status-blue); font-size:0.8rem; text-decoration:none;">GitHub Profile →</a>
              <a href="https://github.com/TAGISWILD/tdrop" target="_blank" rel="noopener" style="color:var(--text-muted); font-size:0.8rem; text-decoration:none;">tdrop Repository →</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>

  <footer>
    <div class="footer-links">
      <a href="/">Home</a>
      <a href="/docs">Documentation</a>
      <a href="/about">About</a>
      <a href="/stats">Telemetry Stats</a>
      <a href="/sponsor">Sponsorship</a>
      <a href="/contact">Contact</a>
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <a href="/sitemap.xml">Sitemap</a>
      <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">GitHub</a>
    </div>
    <p>tdrop · Ephemeral File Sharing · Open Source under the MIT License</p>
    <p style="font-size: 0.72rem; color: var(--text-dim); margin-top: 4px;">Zero egress fees · No tracking cookies · RFC 5987 / RFC 7233 Compliant</p>
  </footer>

</body>
</html>`;
}
