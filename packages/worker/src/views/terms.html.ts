import { CINNABAR_FONTS_HTML, CINNABAR_CSS, renderCinnabarNav, renderCinnabarFooter } from "./cinnabar.js";

export function renderTermsPage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>Terms of Service · tdrop</title>
  <meta name="description" content="Terms of Service for tdrop. Acceptable use policy, liability disclaimers, and ephemeral file sharing guidelines.">
  
  <link rel="canonical" href="https://${domain}/terms">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#0B0B0D">
  <link rel="manifest" href="/manifest.json">

  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://${domain}/terms">
  <meta property="og:title" content="Terms of Service · tdrop">
  <meta property="og:description" content="Terms of Service and Acceptable Use Policy for tdrop ephemeral file sharing.">
  <meta property="og:image" content="https://${domain}/assets/preview.png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="537">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Terms of Service · tdrop">
  <meta name="twitter:description" content="Terms of Service and Acceptable Use Policy for tdrop ephemeral file sharing.">
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
    }
  </style>
</head>
<body>

  ${renderCinnabarNav("about", domain)}

  <div class="content-wrapper">
    <main class="legal-card">
      <div class="legal-header">
        <div class="legal-tag">Legal & Compliance</div>
        <h1 class="legal-title">Terms of Service</h1>
        <div class="legal-updated">Last Updated: October 3, 2026</div>
      </div>

      <div class="legal-section">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using tdrop via web browser, the tdrop CLI (<code>npx tdrop</code>), or HTTP APIs (cURL/stdin), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the service.</p>
      </div>

      <div class="legal-section">
        <h2>2. Service Description & Ephemerality</h2>
        <p>tdrop provides temporary, authless file transfer capabilities. All files are hosted on an ephemeral basis for a strict duration (1 hour, 24 hours, or 7 days) and are permanently destroyed upon expiration. tdrop is NOT an archival or persistent cloud storage service. You are solely responsible for retaining independent backups of any uploaded material.</p>
      </div>

      <div class="legal-section">
        <h2>3. Acceptable Use Policy</h2>
        <p>You agree not to use tdrop for any unlawful purpose. Prohibited activities include, but are not limited to, uploading or distributing:</p>
        <ul>
          <li>Malware, viruses, ransomware, trojans, or exploit payloads.</li>
          <li>Content that infringes upon copyright, trademark, patent, or intellectual property rights.</li>
          <li>Child sexual abuse material (CSAM) or any exploitative content.</li>
          <li>Phishing kits, stolen credentials, or private sensitive data (PII).</li>
          <li>Automated Denial of Service (DoS) floods or abusive API probing.</li>
        </ul>
        <p>Violations will result in immediate termination of the download link, permanent object deletion, and automated IP ban via edge tripwires.</p>
      </div>

      <div class="legal-section">
        <h2>4. Malware Inspection & DMCA</h2>
        <p>Uploaded files are automatically scanned using ClamAV antivirus signatures. We reserve the right to remove any file immediately if flagged as infected, suspicious, or subject to a valid DMCA takedown notice.</p>
      </div>

      <div class="legal-section">
        <h2>5. Disclaimer of Warranties</h2>
        <p>The service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, whether express or implied. tdrop disclaims all warranties regarding availability, data integrity, non-infringement, or fitness for a particular purpose.</p>
      </div>

      <div class="legal-section">
        <h2>6. Limitation of Liability</h2>
        <p>In no event shall tdrop, its operators, or edge infrastructure providers be liable for any indirect, incidental, special, consequential, or punitive damages resulting from loss of data, service interruption, or unauthorized access.</p>
      </div>

      <div class="legal-section">
        <h2>7. Contact</h2>
        <p>For legal inquiries, abuse reports, or DMCA notifications, contact:</p>
        <p style="font-family: var(--font-mono); color: var(--sindoor-text);"><a href="mailto:support@ethiccode.in">support@ethiccode.in</a></p>
      </div>
    </main>
  </div>

  ${renderCinnabarFooter(domain)}
</body>
</html>`;
}
