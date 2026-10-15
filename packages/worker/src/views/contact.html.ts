export function renderContactPage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>Contact & Support · tdrop</title>
  <meta name="description" content="Get in touch with the tdrop team. Technical support, responsible security vulnerability disclosures, DMCA/abuse reporting, and sponsorship inquiries.">
  
  <link rel="canonical" href="https://${domain}/contact">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#09090b">
  <link rel="manifest" href="/manifest.json">

  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="tdrop">
  <meta property="og:url" content="https://${domain}/contact">
  <meta property="og:title" content="Contact & Support · tdrop">
  <meta property="og:description" content="Get in touch with the tdrop team. Technical support, responsible security disclosures, and partnership inquiries.">
  <meta property="og:image" content="https://${domain}/assets/preview.png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="537">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Contact & Support · tdrop">
  <meta name="twitter:description" content="Get in touch with the tdrop team. Technical support, responsible security disclosures, and partnership inquiries.">
  <meta name="twitter:image" content="https://${domain}/assets/preview.png">

  <!-- Structured Data: ContactPage Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact tdrop",
    "url": "https://${domain}/contact",
    "description": "Contact channels for technical support, security disclosures, and inquiries.",
    "mainEntity": {
      "@type": "Organization",
      "name": "tdrop",
      "url": "https://${domain}",
      "email": "support@tdrop.link",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "technical support",
          "url": "https://github.com/tagiswild/tdrop/issues"
        },
        {
          "@type": "ContactPoint",
          "contactType": "security",
          "email": "security@tdrop.link"
        }
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

    .contact-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: clamp(24px, 5vw, 48px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .contact-header {
      border-bottom: 1px solid var(--surface-border-subtle);
      padding-bottom: 24px;
    }

    .contact-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--status-blue);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .contact-title {
      font-size: clamp(2rem, 5vw, 2.75rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #ffffff;
      line-height: 1.2;
    }

    .contact-subtitle {
      font-size: 1.05rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-top: 12px;
    }

    .channels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .channel-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .channel-box:hover {
      border-color: rgba(255, 255, 255, 0.22);
      transform: translateY(-2px);
      background: var(--surface-raised);
    }

    .channel-icon {
      font-size: 1.5rem;
    }

    .channel-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #ffffff;
    }

    .channel-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .channel-link {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--status-blue);
      text-decoration: none;
      margin-top: auto;
      padding-top: 8px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .channel-link:hover {
      text-decoration: underline;
    }

    .policy-box {
      background: rgba(255, 255, 255, 0.02);
      border-left: 3px solid var(--status-blue);
      border-radius: 0 12px 12px 0;
      padding: 18px 22px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .policy-title {
      font-weight: 700;
      font-size: 1rem;
      color: #ffffff;
    }

    .policy-text {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.6;
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
        <a href="/about" class="nav-link">About</a>
        <a href="/contact" class="nav-link active">Contact</a>
        <a href="/sponsor" class="nav-link">Sponsor</a>
      </div>
    </div>
  </header>

  <div class="content-wrapper">
    <main class="contact-card">

      <div class="contact-header">
        <div class="contact-tag">Support & Inquiry</div>
        <h1 class="contact-title">Contact & Developer Support</h1>
        <p class="contact-subtitle">We are here to assist with technical support, security vulnerability disclosures, open-source feedback, and sponsorship inquiries.</p>
      </div>

      <div class="channels-grid">
        <div class="channel-box">
          <div class="channel-icon">🐛</div>
          <div class="channel-title">Bug Reports & Issues</div>
          <div class="channel-desc">Found a bug or error in the CLI, edge worker, or website? Open a tracked issue on our GitHub repository.</div>
          <a href="https://github.com/TAGISWILD/tdrop/issues" target="_blank" rel="noopener" class="channel-link">Open GitHub Issue →</a>
        </div>

        <div class="channel-box">
          <div class="channel-icon">💬</div>
          <div class="channel-title">Community Discussions</div>
          <div class="channel-desc">Discuss feature proposals, ask questions about terminal integrations, and share how you use tdrop in CI/CD.</div>
          <a href="https://github.com/TAGISWILD/tdrop/discussions" target="_blank" rel="noopener" class="channel-link">Join Discussions →</a>
        </div>

        <div class="channel-box">
          <div class="channel-icon">🛡️</div>
          <div class="channel-title">Security Disclosures</div>
          <div class="channel-desc">We take security seriously. Please report vulnerabilities responsibly before public disclosure.</div>
          <a href="mailto:security@tdrop.link" class="channel-link">security@tdrop.link →</a>
        </div>

        <div class="channel-box">
          <div class="channel-icon">🤝</div>
          <div class="channel-title">Sponsorship Inquiries</div>
          <div class="channel-desc">Interested in promoting your developer tool or cloud platform to terminal users across 300+ edge nodes?</div>
          <a href="/sponsor" class="channel-link">View Sponsor Options →</a>
        </div>
      </div>

      <div class="policy-box">
        <div class="policy-title">Responsible Security Vulnerability Disclosure Policy</div>
        <div class="policy-text">
          If you discover a security vulnerability affecting the tdrop service or packages, please notify us immediately via <code>security@tdrop.link</code> or through GitHub Security Advisories. Include detailed steps to reproduce the issue. We review all valid security reports within 24 hours and commit to resolving confirmed vulnerabilities before any public disclosure.
        </div>
      </div>

      <div class="policy-box">
        <div class="policy-title">Abuse, DMCA & Takedown Requests</div>
        <div class="policy-text">
          tdrop enforces a strict zero-tolerance policy for malware, copyrighted infringement, and harmful content. Files are automatically scanned with ClamAV. If you believe a file hosted on tdrop violates intellectual property rights or applicable laws, email <code>abuse@tdrop.link</code> with the URL. Identified infringing files are permanently purged immediately.
        </div>
      </div>

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
