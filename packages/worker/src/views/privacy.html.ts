export function renderPrivacyPage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>Privacy Policy · tdrop</title>
  <meta name="description" content="Privacy Policy for tdrop ephemeral file sharing. Learn how we handle your data, our zero-retention architecture, and Google AdSense disclosures.">
  
  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph / Social Media Preview -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://${domain}/privacy">
  <meta property="og:title" content="Privacy Policy · tdrop">
  <meta property="og:description" content="Privacy Policy for tdrop ephemeral file sharing: zero-retention, encrypted at rest, and strictly ephemeral.">
  <meta property="og:image" content="https://${domain}/assets/preview.png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="537">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Privacy Policy · tdrop">
  <meta name="twitter:description" content="Privacy Policy for tdrop ephemeral file sharing: zero-retention, encrypted at rest, and strictly ephemeral.">
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
    }

    .status-dot {
      width: 5px;
      height: 5px;
      background: var(--status-green);
      border-radius: 50%;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
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

    .btn-sponsor-nav {
      background: #ffffff;
      color: #09090b !important;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 9999px;
      text-decoration: none;
      font-size: 0.8rem;
      transition: all 0.2s;
    }

    .btn-sponsor-nav:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
    }

    /* Content Layout */
    .content-wrapper {
      max-width: 760px;
      margin: 40px auto 80px;
      padding: 0 20px;
    }

    .legal-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: clamp(24px, 5vw, 44px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .legal-header {
      border-bottom: 1px solid var(--surface-border-subtle);
      padding-bottom: 20px;
    }

    .legal-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .legal-title {
      font-size: clamp(1.8rem, 5vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #ffffff;
      line-height: 1.2;
    }

    .legal-updated {
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-top: 8px;
      font-family: var(--font-mono);
    }

    .legal-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      line-height: 1.7;
    }

    .legal-section h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .legal-section p, .legal-section li {
      font-size: 0.92rem;
      color: var(--text-muted);
    }

    .legal-section ul {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .legal-highlight {
      background: rgba(255, 255, 255, 0.03);
      border-left: 3px solid var(--status-green);
      padding: 14px 18px;
      border-radius: 0 10px 10px 0;
      font-size: 0.88rem;
      color: var(--text-main);
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
      <div class="nav-links">
        <a href="/" class="nav-link">Home</a>
        <a href="/sponsor" class="btn-sponsor-nav">Sponsor Us</a>
      </div>
    </nav>
  </header>

  <div class="content-wrapper">
    <div class="legal-card">
      <div class="legal-header">
        <div class="legal-tag">Legal & Compliance</div>
        <h1 class="legal-title">Privacy Policy</h1>
        <div class="legal-updated">Last Updated: October 3, 2026</div>
      </div>

      <div class="legal-highlight">
        <strong>The Core Privacy Guarantee:</strong> tdrop is built on strict ephemeral principles. Uploaded files are streamed directly to Cloudflare R2 edge storage and permanently incinerated upon retention expiration (1 hour, 24 hours, or 7 days). We do not require user accounts, passwords, or personal identifiable information.
      </div>

      <div class="legal-section">
        <h2>1. Information We Collect</h2>
        <p>Because tdrop is authless, we collect only the minimal technical data required to securely process and distribute ephemeral transfers:</p>
        <ul>
          <li><strong>File Data:</strong> The binary content and filename you upload. Files are held exclusively for your selected retention window and purged automatically.</li>
          <li><strong>IP Address Hashing:</strong> To protect our edge infrastructure from abusive port scanning and brute-force probing, client IP addresses are hashed using HMAC-SHA256 with a private cryptographic salt. We do not store raw IP addresses in plain text.</li>
          <li><strong>Server Logs:</strong> Cloudflare edge logs may record HTTP request methods, response status codes, and user-agent strings for security and telemetry diagnostics.</li>
        </ul>
      </div>

      <div class="legal-section">
        <h2>2. Automated Malware Inspection</h2>
        <p>To ensure developer safety, files uploaded through tdrop are inspected asynchronously using the open-source ClamAV antivirus engine against millions of known malware signatures. If a file is determined to be malicious or infected, it is immediately purged from Cloudflare R2 storage without being distributed.</p>
      </div>

      <div class="legal-section">
        <h2>3. Third-Party Advertising & Google AdSense Disclosures</h2>
        <p>This website may display advertisements served by Google AdSense and third-party advertising networks. In accordance with Google AdSense policies:</p>
        <ul>
          <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.</li>
          <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to tdrop and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" style="color:#ffffff;">Google Ads Settings</a> or through <a href="https://www.aboutads.info" target="_blank" rel="noopener" style="color:#ffffff;">www.aboutads.info</a>.</li>
        </ul>
      </div>

      <div class="legal-section">
        <h2>4. Analytics & Telemetry</h2>
        <p>We use Google Analytics (gtag.js) to understand aggregated traffic patterns, regional popularity, and site reliability. Google Analytics collects anonymized interaction data such as browser type, approximate geographic region (country/city), and page views. No uploaded file contents or filenames are ever sent to analytics providers.</p>
      </div>

      <div class="legal-section">
        <h2>5. Data Retention & Permanent Deletion</h2>
        <p>Files uploaded to tdrop have an immutable expiration timestamp determined at upload time (1 hour, 24 hours, or 7 days). Once this lifecycle completes:</p>
        <ul>
          <li>The object is permanently unlinked and deleted from Cloudflare R2.</li>
          <li>Metadata entries in Cloudflare KV are purged via automatic time-to-live (TTL) expiration.</li>
          <li>Deleted files are cryptographically unrecoverable.</li>
        </ul>
      </div>

      <div class="legal-section">
        <h2>6. Contact & Inquiries</h2>
        <p>If you have any questions or concerns regarding this Privacy Policy or our security architecture, you may reach out to us directly at:</p>
        <p style="font-family: var(--font-mono); color: #ffffff;"><a href="mailto:support@ethiccode.in" style="color: inherit; text-decoration: underline;">support@ethiccode.in</a></p>
      </div>
    </div>
  </div>

  <footer>
    <div class="footer-links">
      <a href="/">Home</a>
      <a href="/sponsor">Sponsorship</a>
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">GitHub</a>
    </div>
    <p>tdrop · Ephemeral File Sharing for Terminals & Modern Workflows</p>
  </footer>

</body>
</html>`;
}
