export function renderSponsorPage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>Sponsor tdrop · Reach Terminal Developers with 0% AdBlock</title>
  <meta name="description" content="Sponsor the command line with tdrop. High-intent developer impressions, 0% AdBlock rate, 3-8% CTR. Apply to sponsor tdrop CLI and web pages.">
  
  <link rel="canonical" href="https://${domain}/sponsor">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#09090b">
  <link rel="manifest" href="/manifest.json">

  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph / Social Media Preview -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://${domain}/sponsor">
  <meta property="og:title" content="Sponsor tdrop · Reach Terminal Developers">
  <meta property="og:description" content="High-intent developer impressions with 100% ad-blocker immunity across developer terminals and web.">
  <meta property="og:image" content="https://${domain}/assets/preview.png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="537">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Sponsor tdrop · Reach Terminal Developers">
  <meta name="twitter:description" content="High-intent developer impressions with 100% ad-blocker immunity across developer terminals and web.">
  <meta name="twitter:image" content="https://${domain}/assets/preview.png">

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

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: 9999px;
      transition: all 0.15s;
    }

    .nav-link:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }

    .btn-apply-nav {
      background: #ffffff;
      color: #09090b !important;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 6px 16px;
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-apply-nav:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
    }

    /* Main Container */
    .container {
      width: 100%;
      max-width: 840px;
      margin: 0 auto;
      padding: 40px 20px 80px;
      display: flex;
      flex-direction: column;
      gap: 56px;
    }

    /* Hero Section */
    .hero {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      margin-top: 20px;
    }

    .hero-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 14px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 9999px;
      font-size: 0.76rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .hero-title {
      font-size: clamp(2.2rem, 6vw, 3.6rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.12;
      color: #ffffff;
      max-width: 720px;
    }

    .hero-subtitle {
      font-size: clamp(0.95rem, 2.5vw, 1.1rem);
      color: var(--text-muted);
      max-width: 580px;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 6px;
    }

    .btn-primary {
      background: #ffffff;
      color: #09090b;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 10px;
      text-decoration: none;
      font-size: 0.9rem;
      box-shadow: 0 4px 14px rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.8);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-primary:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-main);
      font-weight: 500;
      padding: 12px 20px;
      border-radius: 10px;
      text-decoration: none;
      font-size: 0.9rem;
      border: 1px solid var(--surface-border);
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* Metrics Grid */
    .metrics-bar {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      width: 100%;
    }

    @media (min-width: 640px) {
      .metrics-bar {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .metric-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: 18px 16px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 4px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .metric-val {
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffffff;
      font-family: var(--font-mono);
      letter-spacing: -0.02em;
    }

    .metric-label {
      font-size: 0.75rem;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 600;
    }

    /* Specimen Terminal Preview */
    .specimen-card {
      background: #090a0d;
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .specimen-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--surface-border-subtle);
    }

    .specimen-title {
      font-size: 0.78rem;
      font-family: var(--font-mono);
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .specimen-code {
      font-family: var(--font-mono);
      font-size: clamp(0.78rem, 2.4vw, 0.85rem);
      line-height: 1.7;
      color: var(--text-main);
      overflow-x: auto;
    }

    .blip-preview-line {
      background: rgba(255, 255, 255, 0.04);
      border-left: 2px solid #ffffff;
      padding: 4px 10px;
      margin: 6px 0;
      border-radius: 0 4px 4px 0;
      color: #ffffff;
    }

    /* Advantages Bento */
    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }

    .section-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 22px;
      line-height: 1.5;
    }

    .advantages-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }

    @media (min-width: 600px) {
      .advantages-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .adv-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .adv-badge {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }

    .adv-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .adv-text {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.55;
    }

    /* Tiers Grid */
    .tiers-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    @media (min-width: 720px) {
      .tiers-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .tier-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
      position: relative;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .tier-card.featured {
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    }

    .tier-featured-tag {
      position: absolute;
      top: -10px;
      right: 18px;
      background: #ffffff;
      color: #09090b;
      font-size: 0.65rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .tier-header {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .tier-name {
      font-size: 1.15rem;
      font-weight: 700;
      color: #ffffff;
    }

    .tier-desc {
      font-size: 0.82rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .tier-features {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0;
      margin: 10px 0;
    }

    .tier-features li {
      font-size: 0.82rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tier-features li::before {
      content: '✓';
      color: var(--status-green);
      font-weight: 700;
    }

    .btn-tier {
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      border: 1px solid var(--surface-border);
      padding: 10px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 600;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-tier:hover {
      background: #ffffff;
      color: #09090b;
      border-color: #ffffff;
    }

    /* Sponsor Application Form */
    .form-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: clamp(24px, 5vw, 36px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-dim);
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-input, .form-select, .form-textarea {
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--surface-border);
      border-radius: 10px;
      padding: 10px 14px;
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 0.88rem;
      outline: none;
      transition: border-color 0.15s;
    }

    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: rgba(255, 255, 255, 0.3);
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }

    @media (min-width: 600px) {
      .form-grid-2 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .btn-submit {
      background: #ffffff;
      color: #09090b;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.8);
      font-size: 0.92rem;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(255, 255, 255, 0.15);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-submit:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
    }

    .form-success-box {
      display: none;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 18px;
      border-radius: 12px;
      color: #ffffff;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    footer {
      width: 100%;
      border-top: 1px solid var(--surface-border);
      padding: 36px 16px;
      font-size: 0.82rem;
      color: var(--text-dim);
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 10px;
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
        <div class="brand-logo">
          <img src="/assets/logo-128.png" alt="tdrop" width="22" height="22" style="border-radius: 5px; object-fit: contain; flex-shrink: 0;">
          tdrop
        </div>
      </a>
      <div class="nav-actions">
        <a href="/" class="nav-link">Home</a>
        <a href="#tiers" class="nav-link">Tiers</a>
        <a href="#apply" class="btn-apply-nav">Apply Now</a>
      </div>
    </nav>
  </header>

  <div class="container">

    <!-- Hero -->
    <section class="hero">
      <div class="hero-chip">
        <span>Terminal Real Estate</span>
        <span style="color:var(--surface-border);">/</span>
        <span style="color:#ffffff;">0% AdBlock Rate</span>
        <span style="color:var(--surface-border);">/</span>
        <span>3%–8% CTR</span>
      </div>
      <h1 class="hero-title">
        Sponsor the command line.<br>Reach developers where they ship.
      </h1>
      <p class="hero-subtitle">
        Feature your developer tool, database, cloud infra, or API directly inside npx tdrop CLI runs and edge download pages with verifiable impression and click telemetry.
      </p>
      <div class="hero-actions">
        <a href="#apply" class="btn-primary">Apply for Sponsorship</a>
        <a href="#specimen" class="btn-secondary">View CLI Specimen</a>
      </div>
    </section>

    <!-- Key Metrics Bar -->
    <div class="metrics-bar">
      <div class="metric-card">
        <div class="metric-val">0%</div>
        <div class="metric-label">AdBlock Rate</div>
      </div>
      <div class="metric-card">
        <div class="metric-val">3%–8%</div>
        <div class="metric-label">Average CTR</div>
      </div>
      <div class="metric-card">
        <div class="metric-val">300+</div>
        <div class="metric-label">Global Edge PoPs</div>
      </div>
      <div class="metric-card">
        <div class="metric-val">100%</div>
        <div class="metric-label">Technical Audience</div>
      </div>
    </div>

    <!-- Specimen Preview -->
    <div class="specimen-card" id="specimen">
      <div class="specimen-header">
        <span class="specimen-title">Terminal Specimen: How Developers See Your Brand</span>
        <span style="font-size:0.75rem; color:var(--text-dim); font-family:var(--font-mono);">stdout stream</span>
      </div>
      <div class="specimen-code">
        <div><span style="color:var(--text-dim);">$</span> npx tdrop release-v2.0.0.tar.gz</div>
        <div class="blip-preview-line">
          <span style="color:var(--text-dim);">[Sponsored by YourCompany]</span> Fast serverless edge database with instant branching <span style="text-decoration:underline;">https://${domain}/ad/your-company</span>
        </div>
        <div>Uploading [████████████████████████] 100% | 5.2 MB/s</div>
        <div style="color:var(--status-green); margin-top: 4px;">✔ Upload complete!</div>
        <div style="color:var(--text-muted);">  🔗 Link: https://${domain}/x9kP2m4</div>
      </div>
    </div>

    <!-- The Unfair Advantage Bento -->
    <section>
      <h2 class="section-title">The Unfair Advantage</h2>
      <p class="section-desc">Traditional web banners suffer 60–80% AdBlock usage among developers. Terminal sponsorships operate where adblockers cannot exist.</p>
      
      <div class="advantages-grid">
        <div class="adv-card">
          <div class="adv-badge">Visibility</div>
          <h3 class="adv-title">Zero AdBlock Dropoff</h3>
          <p class="adv-text">Your message is delivered straight to the terminal stdout. Every developer running an upload sees your brand, headline, and link.</p>
        </div>
        <div class="adv-card">
          <div class="adv-badge">Engagement</div>
          <h3 class="adv-title">3% to 8% Click-Through</h3>
          <p class="adv-text">Developers click terminal links because they are context-aware, relevant, and clean. Every click is routed via high-speed 302 tracking.</p>
        </div>
        <div class="adv-card">
          <div class="adv-badge">Audience</div>
          <h3 class="adv-title">Active Builders & DevOps</h3>
          <p class="adv-text">Users are shipping logs, databases, build artifacts, and test fixtures. They make architectural tooling and infrastructure decisions daily.</p>
        </div>
        <div class="adv-card">
          <div class="adv-badge">Verifiable Data</div>
          <h3 class="adv-title">Transparent Realtime Proof</h3>
          <p class="adv-text">Access live dashboards at /stats showing impressions, clicks, and geographic breakdowns across 300+ Cloudflare edge nodes.</p>
        </div>
      </div>
    </section>

    <!-- Sponsorship Tiers -->
    <section id="tiers">
      <h2 class="section-title">Sponsorship Packages</h2>
      <p class="section-desc">Flexible packages tailored for devtools, cloud hosting providers, databases, and engineering platforms.</p>

      <div class="tiers-grid">
        <div class="tier-card">
          <div class="tier-header">
            <h3 class="tier-name">Terminal Blip</h3>
            <p class="tier-desc">Direct text placement inside npx tdrop CLI runs.</p>
          </div>
          <ul class="tier-features">
            <li>Single-line CLI blip</li>
            <li>Weighted random rotation</li>
            <li>Direct 302 click tracking</li>
            <li>Live analytics dashboard</li>
            <li>Custom target URL</li>
          </ul>
          <a href="#apply" class="btn-tier" onclick="selectTier('Terminal Blip')">Select Package</a>
        </div>

        <div class="tier-card featured">
          <div class="tier-featured-tag">Most Popular</div>
          <div class="tier-header">
            <h3 class="tier-name">Full-Stack Bundle</h3>
            <p class="tier-desc">Terminal blip + right-rail web showcase on all download pages.</p>
          </div>
          <ul class="tier-features">
            <li>High-priority CLI blip weight</li>
            <li>Desktop web sponsor card</li>
            <li>Download page brand visibility</li>
            <li>Full click and impression audits</li>
            <li>Weekly performance reports</li>
          </ul>
          <a href="#apply" class="btn-tier" style="background:#ffffff; color:#09090b;" onclick="selectTier('Full-Stack Bundle')">Select Package</a>
        </div>

        <div class="tier-card">
          <div class="tier-header">
            <h3 class="tier-name">Category Exclusive</h3>
            <p class="tier-desc">100% share of voice for your devtool industry category.</p>
          </div>
          <ul class="tier-features">
            <li>Exclusive category lockout</li>
            <li>Highest impression priority</li>
            <li>Homepage sponsor badge</li>
            <li>Custom CTA copy iterations</li>
            <li>Dedicated account support</li>
          </ul>
          <a href="#apply" class="btn-tier" onclick="selectTier('Category Exclusive')">Select Package</a>
        </div>
      </div>
    </section>

    <!-- Sponsor Application Form -->
    <section id="apply">
      <h2 class="section-title">Apply for Sponsorship</h2>
      <p class="section-desc">Submit your company details below. Our team reviews all applications within 24 hours to ensure high relevance for developers.</p>

      <div class="form-card">
        <div class="form-success-box" id="successBox">
          <div style="font-weight:700; font-size:1.05rem; margin-bottom:4px;">Application Received!</div>
          Thank you for applying to sponsor tdrop. We will review your developer tool and contact you with onboarding details and real-time campaign credentials within 24 hours.
        </div>

        <form id="sponsorForm" onsubmit="submitSponsorInquiry(event)">
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label" for="companyName">Company / Tool Name *</label>
              <input type="text" id="companyName" class="form-input" placeholder="e.g. Neon, Supabase, Vercel" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="workEmail">Work Email *</label>
              <input type="email" id="workEmail" class="form-input" placeholder="you@company.com" required>
            </div>
          </div>

          <div class="form-grid-2" style="margin-top:14px;">
            <div class="form-group">
              <label class="form-label" for="websiteUrl">Website / Target Product URL *</label>
              <input type="url" id="websiteUrl" class="form-input" placeholder="https://yourcompany.com" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="packageSelect">Interested Package</label>
              <select id="packageSelect" class="form-select">
                <option value="Terminal Blip">Terminal Blip</option>
                <option value="Full-Stack Bundle" selected>Full-Stack Bundle (CLI + Web)</option>
                <option value="Category Exclusive">Category Exclusive Takeover</option>
                <option value="Custom Campaign">Custom Campaign / Inquiries</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:14px;">
            <label class="form-label" for="message">Proposed Headline / Message / Goals</label>
            <textarea id="message" class="form-textarea" rows="4" placeholder="Briefly describe what your developer tool does and your target audience (e.g. backend developers, DevOps engineers)."></textarea>
          </div>

          <div style="margin-top:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <button type="submit" id="submitBtn" class="btn-submit">Submit Sponsorship Application</button>
            <span style="font-size:0.78rem; color:var(--text-dim); font-family:var(--font-mono);">Or email: <a href="mailto:support@ethiccode.in" style="color:inherit; text-decoration:underline;">support@ethiccode.in</a></span>
          </div>
        </form>
      </div>
    </section>

  </div>

  <footer>
    <div class="footer-links">
      <a href="/">Home</a>
      <a href="/stats">Stats</a>
      <a href="/sponsor">Sponsorship</a>
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <a href="/sitemap.xml">Sitemap</a>
      <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">GitHub</a>
    </div>
    <p>tdrop · Ephemeral File Sharing for Terminals & Modern Workflows</p>
  </footer>

  <script>
    function selectTier(name) {
      const select = document.getElementById('packageSelect');
      if (select) select.value = name;
    }

    async function submitSponsorInquiry(e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const origText = btn.textContent;
      btn.textContent = 'Submitting...';
      btn.disabled = true;

      const payload = {
        company: document.getElementById('companyName').value,
        email: document.getElementById('workEmail').value,
        website: document.getElementById('websiteUrl').value,
        package: document.getElementById('packageSelect').value,
        message: document.getElementById('message').value,
        timestamp: Date.now()
      };

      try {
        const res = await fetch('/api/sponsor-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        document.getElementById('sponsorForm').style.display = 'none';
        document.getElementById('successBox').style.display = 'block';
      } catch (err) {
        // Fallback: mailto
        window.location.href = 'mailto:support@ethiccode.in?subject=Sponsorship Inquiry: ' + encodeURIComponent(payload.company) + '&body=' + encodeURIComponent(JSON.stringify(payload, null, 2));
        document.getElementById('sponsorForm').style.display = 'none';
        document.getElementById('successBox').style.display = 'block';
      }
    }
  </script>
</body>
</html>`;
}
