import { CINNABAR_FONTS_HTML, CINNABAR_CSS, renderCinnabarNav, renderCinnabarFooter } from "./cinnabar.js";

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
  <meta name="theme-color" content="#0B0B0D">
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

  ${CINNABAR_FONTS_HTML}

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
    ${CINNABAR_CSS}

    .content-wrapper {
      max-width: 860px;
      margin: 0 auto;
      padding: 36px 20px 80px;
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .contact-card {
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      padding: clamp(28px, 5vw, 48px);
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .contact-tag {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--sindoor);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .contact-title {
      font-size: clamp(2rem, 5vw, 2.75rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--text);
      line-height: 1.2;
    }

    .contact-subtitle {
      font-size: 16px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-top: 12px;
    }

    .channels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }

    .channel-box {
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: border-color var(--dur-slow) ease;
    }

    .channel-box:hover {
      border-color: var(--sindoor);
    }

    .channel-icon {
      font-size: 1.5rem;
    }

    .channel-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text);
    }

    .channel-desc {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.55;
    }

    .channel-link {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--sindoor-text);
      text-decoration: none;
      margin-top: auto;
      padding-top: 8px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: color var(--dur-fast);
    }

    .channel-link:hover {
      color: var(--sindoor-hover);
      text-decoration: underline;
    }

    .policy-box {
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-left: 3px solid var(--sindoor);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .policy-title {
      font-weight: 600;
      font-size: 15px;
      color: var(--text);
    }

    .policy-text {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
    }
  </style>
</head>
<body>

  ${renderCinnabarNav("about", domain)}

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

  ${renderCinnabarFooter(domain)}
</body>
</html>`;
}
