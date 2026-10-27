import { CINNABAR_FONTS_HTML, CINNABAR_CSS, renderCinnabarNav, renderCinnabarFooter } from "./cinnabar.js";

export function renderPrivacyPage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>Privacy Policy · tdrop</title>
  <meta name="description" content="Privacy Policy for tdrop ephemeral file sharing. Learn how we handle your data, our zero-retention architecture, and Google AdSense disclosures.">
  
  <link rel="canonical" href="https://${domain}/privacy">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#0B0B0D">
  <link rel="manifest" href="/manifest.json">

  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph -->
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
      max-width: 820px;
      margin: 36px auto 80px;
      padding: 0 20px;
    }

    .legal-card {
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      padding: clamp(28px, 5vw, 48px);
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .legal-header {
      border-bottom: 1px solid var(--line);
      padding-bottom: 20px;
    }

    .legal-tag {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--sindoor);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .legal-title {
      font-size: clamp(1.9rem, 5vw, 2.6rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--text);
      line-height: 1.2;
    }

    .legal-updated {
      font-size: 13px;
      color: var(--text-faint);
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
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--text);
      letter-spacing: -0.015em;
    }

    .legal-section p, .legal-section li {
      font-size: 15px;
      color: var(--text-soft);
    }

    .legal-section ul {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .legal-highlight {
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-left: 3px solid var(--sindoor);
      padding: 16px 20px;
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      font-size: 14px;
      color: var(--text);
      line-height: 1.6;
    }

    .legal-section a {
      color: var(--sindoor-text);
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    /* Phone Screen Optimizations (Mobile-first Cinnabar UX) */
    @media (max-width: 480px) {
      .content-wrapper {
        padding: 16px 12px 60px;
        gap: 20px;
      }
      .legal-card {
        padding: 20px 16px;
        border-radius: var(--radius-lg);
        gap: 20px;
      }
      .legal-title {
        font-size: clamp(1.8rem, 6vw, 2.2rem);
        text-wrap: balance;
        line-height: 1.15;
      }
      .legal-highlight {
        padding: 14px 12px;
      }
    }
  </style>
</head>
<body>

  ${renderCinnabarNav("about", domain)}

  <div class="content-wrapper">
    <main class="legal-card">
      <div class="legal-header">
        <div class="legal-tag">Legal & Compliance</div>
        <h1 class="legal-title">Privacy Policy</h1>
        <div class="legal-updated">Last Updated: October 3, 2026</div>
      </div>

      <div class="legal-highlight">
        <strong>The Core Privacy Guarantee:</strong> tdrop is built on strict ephemeral principles. Uploaded files are streamed directly to edge object storage and permanently incinerated upon retention expiration (1 hour, 24 hours, or 7 days). We do not require user accounts, passwords, or personal identifiable information.
      </div>

      <div class="legal-section">
        <h2>1. Information We Collect</h2>
        <p>Because tdrop is authless, we collect only the minimal technical data required to securely process and distribute ephemeral transfers:</p>
        <ul>
          <li><strong>File Data:</strong> The binary content and filename you upload. Files are held exclusively for your selected retention window and purged automatically.</li>
          <li><strong>IP Address Hashing:</strong> To protect our edge infrastructure from abusive port scanning and brute-force probing, client IP addresses are hashed using HMAC-SHA256 with a private cryptographic salt. We do not store raw IP addresses in plain text.</li>
          <li><strong>Server Logs:</strong> Edge logs may record HTTP request methods, response status codes, and user-agent strings for security and telemetry diagnostics.</li>
        </ul>
      </div>

      <div class="legal-section">
        <h2>2. Automated Malware Inspection</h2>
        <p>To ensure developer safety, files uploaded through tdrop are inspected asynchronously using the open-source ClamAV antivirus engine against millions of known malware signatures. If a file is determined to be malicious or infected, it is immediately purged from storage without being distributed.</p>
      </div>

      <div class="legal-section">
        <h2>3. Third-Party Advertising & Google AdSense Disclosures</h2>
        <p>This website may display advertisements served by Google AdSense and third-party advertising networks. In accordance with Google AdSense policies:</p>
        <ul>
          <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.</li>
          <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to tdrop and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a> or through <a href="https://www.aboutads.info" target="_blank" rel="noopener">www.aboutads.info</a>.</li>
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
          <li>The object is permanently unlinked and deleted from edge storage.</li>
          <li>Metadata entries are purged via automatic time-to-live (TTL) expiration.</li>
          <li>Deleted files are cryptographically unrecoverable.</li>
        </ul>
      </div>

      <div class="legal-section">
        <h2>6. Contact & Inquiries</h2>
        <p>If you have any questions or concerns regarding this Privacy Policy or our security architecture, you may reach out to us directly at:</p>
        <p style="font-family: var(--font-mono); color: var(--sindoor-text);"><a href="mailto:support@ethiccode.in">support@ethiccode.in</a></p>
      </div>
    </main>
  </div>

  ${renderCinnabarFooter(domain)}
</body>
</html>`;
}
