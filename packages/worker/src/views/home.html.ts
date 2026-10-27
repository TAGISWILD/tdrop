import { CINNABAR_FONTS_HTML, CINNABAR_CSS, renderCinnabarNav, renderCinnabarFooter } from "./cinnabar.js";

export function renderHomePage(domain: string = "tdrop.link", googleSiteVerification?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>tdrop — Ephemeral File Sharing CLI & Web Service</title>
  <meta name="description" content="tdrop is an ultra-fast, ephemeral, authless file sharing utility for developers and everyday users. Transfer files instantly from terminal (npx, winget, brew, curl) or browser with automatic self-destruction.">
  <meta name="keywords" content="tdrop, tdrop link, terminal file sharing, ephemeral file upload, cli file transfer, command line drop, curl file upload, temporary file storage, anonymous file transfer, zero log file share, npx tdrop, winget tdrop">
  <link rel="canonical" href="https://${domain}/">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="theme-color" content="#0B0B0D">
  ${googleSiteVerification ? `<meta name="google-site-verification" content="${googleSiteVerification}">` : ""}

  <!-- Web App Manifest (PWA) -->
  <link rel="manifest" href="/manifest.json">
  
  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="tdrop">
  <meta property="og:url" content="https://${domain}/">
  <meta property="og:title" content="tdrop — Ephemeral File Sharing CLI & Web Service">
  <meta property="og:description" content="Ultra-fast, ephemeral file sharing from your terminal, cURL, or browser. Free, encrypted at rest, zero logs, auto-incinerating.">
  <meta property="og:image" content="https://${domain}/assets/preview.png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="537">
  <meta property="og:image:alt" content="tdrop - Ephemeral file sharing, built for the command line and everyone">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://${domain}/">
  <meta name="twitter:title" content="tdrop — Ephemeral File Sharing CLI & Web Service">
  <meta name="twitter:description" content="Ultra-fast, ephemeral file sharing from your terminal, cURL, or browser. Free, encrypted at rest, zero logs, auto-incinerating.">
  <meta name="twitter:image" content="https://${domain}/assets/preview.png">

  <!-- Schema.org JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://${domain}/#webapp",
        "name": "tdrop",
        "alternateName": ["Terminal Drop", "tdrop.link", "tdrop cli", "tdrop file transfer"],
        "url": "https://${domain}/",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All (Windows, macOS, Linux, iOS, Android)",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Ultra-fast, ephemeral, authless file sharing utility for developers and everyday users. Transfer files instantly from terminal (npx, winget, brew, curl) or web browser with automatic expiration and zero logs.",
        "softwareVersion": "1.0.1",
        "creator": {
          "@type": "Person",
          "name": "Atharva Chauhan",
          "url": "https://github.com/TAGISWILD"
        },
        "downloadUrl": "https://github.com/TAGISWILD/tdrop/releases",
        "image": "https://${domain}/assets/logo.png",
        "screenshot": "https://${domain}/assets/preview.png",
        "featureList": [
          "Zero-RAM Edge Streaming",
          "Automatic 1h, 24h, 7d TTL Expiration",
          "Cross-Device QR Code Transfers",
          "Resumable HTTP Range Downloads (206 Partial Content)",
          "Universal Package Managers: WinGet, Homebrew, NPM, curl"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://${domain}/#website",
        "url": "https://${domain}/",
        "name": "tdrop",
        "alternateName": "tdrop.link",
        "description": "Ephemeral File Sharing for Everyone",
        "publisher": {
          "@type": "Organization",
          "name": "tdrop",
          "logo": {
            "@type": "ImageObject",
            "url": "https://${domain}/assets/logo.png"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://${domain}/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is tdrop?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "tdrop is an ultra-fast, zero-friction ephemeral file sharing utility. It allows developers and everyday users to send files instantly from the terminal (npx tdrop <file>, WinGet, Homebrew, curl) or web browser with automatic link generation, QR codes, and automatic self-destruction."
            }
          },
          {
            "@type": "Question",
            "name": "How long do files stay on tdrop?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Files are strictly ephemeral and automatically expire and delete after 1 hour, 24 hours (default), or 7 days based on your chosen retention settings."
            }
          },
          {
            "@type": "Question",
            "name": "How do I install tdrop on Windows, Mac, or Linux?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "On Windows: winget install Tagiswild.tdrop. On macOS or Linux: brew install tagiswild/tap/tdrop or curl -fsSL https://${domain}/install.sh | bash. With Node: npm install -g tdrop or npx tdrop <file>."
            }
          },
          {
            "@type": "Question",
            "name": "Is tdrop free and secure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, tdrop is 100% free, open-source under MIT, and requires no account or authentication. Files stream directly to edge storage with zero disk writes, encrypted at rest, and zero activity logs."
            }
          }
        ]
      }
    ]
  }
  </script>

  ${CINNABAR_FONTS_HTML}

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
    ${CINNABAR_CSS}

    /* Master Layout: Center Content with Right Sponsor Rail */
    .site-wrapper {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 36px;
      padding: 32px 16px 80px;
      min-height: 100vh;
    }

    /* Right Sticky Sponsor Rail */
    .sponsor-rail {
      display: none;
      width: 250px;
      flex: 0 0 250px;
    }

    @media (min-width: 1060px) {
      .sponsor-rail {
        display: block;
      }
    }

    .sponsor-sticky-card {
      position: sticky;
      top: 96px;
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: border-color var(--dur-slow) ease;
    }

    .sponsor-sticky-card:hover {
      border-color: var(--sindoor);
    }

    .sponsor-rail-tag {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--sindoor);
      font-family: var(--font-mono);
    }

    .sponsor-rail-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text);
      line-height: 1.3;
      letter-spacing: -0.01em;
    }

    .sponsor-rail-desc {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .sponsor-rail-stats {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--obsidian);
      padding: 12px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--line);
    }

    .sponsor-stat-pill {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sponsor-stat-pill::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--success);
    }

    /* Center Content Container */
    .content-container {
      width: 100%;
      max-width: 760px;
      flex: 1 1 760px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Hero Section (Calm, Confident, Clean) */
    .hero {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
      margin: 32px 0 36px;
    }

    .hero-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 14px;
      background: var(--graphite);
      border: 1px solid var(--line-strong);
      border-radius: var(--radius-pill);
      font-size: 12px;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .hero-chip-badge {
      color: var(--text);
      font-weight: 600;
    }

    .hero-chip-sep {
      color: var(--line-stronger);
    }

    .hero-title {
      font-size: clamp(2.4rem, 6.5vw, 3.8rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.1;
      max-width: 680px;
      text-align: center;
      color: var(--text);
      text-wrap: balance;
      word-break: break-word;
    }

    .hero-subtitle {
      font-size: clamp(0.95rem, 2.5vw, 1.12rem);
      color: var(--text-muted);
      max-width: 560px;
      line-height: 1.6;
      text-align: center;
      font-weight: 400;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 4px;
    }

    .cli-cmd-box {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--graphite);
      border: 1px solid var(--line-strong);
      border-radius: var(--radius-pill);
      padding: 9px 18px;
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text-muted);
      cursor: pointer;
      transition: all var(--dur-fast) ease;
      user-select: none;
    }

    .cli-cmd-box:hover {
      border-color: var(--sindoor);
      color: var(--text);
      background: var(--graphite-raised);
    }

    .cli-cmd-box code {
      color: var(--text);
    }

    /* Uploader Console Card (Cinnabar Graphite Surface) */
    .uploader-card {
      width: 100%;
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      padding: clamp(20px, 4vw, 32px);
      margin-bottom: 40px;
      transition: border-color var(--dur-slow) ease;
    }

    .uploader-card:hover {
      border-color: var(--line-strong);
    }

    /* Segmented Retention Control with Cinnabar Indicator */
    .retention-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--line);
    }

    .retention-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--text-muted);
      font-family: var(--font-sans);
    }

    .retention-tabs {
      display: flex;
      gap: 4px;
      background: var(--obsidian);
      padding: 3px;
      border-radius: var(--radius-pill);
      border: 1px solid var(--line);
    }

    .ttl-tab {
      position: relative;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 12px;
      font-family: var(--font-mono);
      font-weight: 500;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      cursor: pointer;
      transition: all var(--dur-fast) ease;
      user-select: none;
    }

    .ttl-tab:hover {
      color: var(--text);
    }

    .ttl-tab.active {
      background: var(--graphite-raised);
      color: var(--text);
      font-weight: 600;
    }

    .ttl-tab.active::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 2px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--sindoor);
      transform: translateX(-50%);
    }

    /* Drop Zone (Cinnabar 9.23 Specification: Dashed line turning Sindoor) */
    .drop-zone {
      border: 1.5px dashed var(--line-stronger);
      border-radius: var(--radius-lg);
      padding: clamp(36px, 6vw, 48px) 20px;
      text-align: center;
      cursor: pointer;
      transition: all var(--dur-base) ease;
      background: var(--obsidian);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .drop-zone:hover, .drop-zone:focus {
      border-color: var(--sindoor);
      background: var(--sindoor-tint);
    }

    .drop-zone.dragover {
      border-color: var(--sindoor);
      background: var(--sindoor-tint);
      transform: scale(1.008);
    }

    .drop-icon-box {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: var(--graphite-input);
      border: 1px solid var(--line-strong);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text);
      transition: transform var(--dur-fast) ease, border-color var(--dur-fast) ease;
    }

    .drop-zone:hover .drop-icon-box {
      transform: scale(1.08);
      border-color: var(--sindoor);
      color: var(--sindoor);
    }

    .drop-title {
      font-size: clamp(1.1rem, 3.2vw, 1.3rem);
      font-weight: 600;
      color: var(--text);
      letter-spacing: -0.01em;
    }

    .drop-subtitle {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .file-input { display: none; }

    .upload-legal-notice {
      margin-top: 14px;
      font-size: 12px;
      color: var(--text-faint);
      font-family: var(--font-mono);
      text-align: center;
      line-height: 1.5;
    }

    .upload-legal-notice a {
      color: var(--text-muted);
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: color var(--dur-fast);
    }

    .upload-legal-notice a:hover {
      color: var(--sindoor);
    }

    /* Upload Progress State (Cinnabar 4px Sindoor Bar) */
    .upload-state {
      display: none;
      margin-top: 20px;
      flex-direction: column;
      gap: 10px;
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-family: var(--font-mono);
      color: var(--text-muted);
    }

    .progress-bar-bg {
      width: 100%;
      height: 4px;
      background: var(--line-strong);
      border-radius: 2px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: var(--sindoor);
      transition: width 0.15s ease-out;
    }

    /* Result Box */
    .result-box {
      display: none;
      background: var(--obsidian);
      border: 1px solid var(--sindoor);
      border-radius: var(--radius-lg);
      padding: clamp(18px, 3.5vw, 24px);
      margin-top: 20px;
    }

    .result-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 14px;
      font-size: 14px;
      color: var(--text);
      font-weight: 600;
    }

    .result-url-block {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      padding: 10px 14px;
    }

    @media (min-width: 480px) {
      .result-url-block {
        flex-direction: row;
        align-items: center;
      }
    }

    .result-url {
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--text);
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Mobile QR Transfer & Quick Share */
    .transfer-box {
      margin-top: 14px;
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    @media (min-width: 480px) {
      .transfer-box {
        flex-direction: row;
        align-items: center;
        gap: 18px;
      }
    }

    .qr-frame {
      width: 104px;
      height: 104px;
      min-width: 104px;
      min-height: 104px;
      background: var(--paper);
      padding: 6px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      transition: transform var(--dur-fast) ease;
      cursor: pointer;
    }

    .qr-frame:hover {
      transform: scale(1.04);
    }

    .qr-frame svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .transfer-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .transfer-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text);
      font-size: 14px;
      font-weight: 600;
    }

    .transfer-desc {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .transfer-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .result-details {
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 14px;
      border-top: 1px solid var(--line);
    }

    .result-curl-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: var(--graphite-input);
      padding: 8px 12px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--line);
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .result-curl-text {
      color: var(--text-soft);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .result-meta-row {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-faint);
    }

    /* Terminal Console */
    .terminal-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 40px;
    }

    .section-title {
      font-size: 1.35rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--text);
    }

    .section-desc {
      font-size: 14px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .terminal-box {
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .terminal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 18px;
      background: var(--graphite);
      border-bottom: 1px solid var(--line);
    }

    .terminal-dots {
      display: flex;
      gap: 6px;
    }

    .terminal-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--line-strong);
    }

    .terminal-tabs {
      display: flex;
      gap: 4px;
      background: var(--obsidian);
      padding: 3px;
      border-radius: var(--radius-pill);
      border: 1px solid var(--line);
    }

    .terminal-tab-btn {
      position: relative;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 500;
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      cursor: pointer;
      transition: all var(--dur-fast);
    }

    .terminal-tab-btn:hover {
      color: var(--text);
    }

    .terminal-tab-btn.active {
      background: var(--graphite-raised);
      color: var(--text);
      font-weight: 600;
    }

    .terminal-tab-btn.active::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 2px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--sindoor);
      transform: translateX(-50%);
    }

    .terminal-body {
      padding: 20px;
      font-family: var(--font-mono);
      font-size: clamp(12px, 2.2vw, 13px);
      line-height: 1.7;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      color: var(--text);
    }

    .terminal-line {
      display: flex;
      flex-wrap: nowrap;
      gap: 8px;
      white-space: pre;
    }

    .terminal-prompt { color: var(--text-faint); }

    /* Bento Grid Features (Cinnabar Cards) */
    .features-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 40px;
    }

    .features-grid {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    @media (min-width: 600px) {
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .feature-card {
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: border-color var(--dur-slow) ease;
    }

    .feature-card:hover {
      border-color: var(--sindoor);
    }

    .feature-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text);
      letter-spacing: -0.01em;
    }

    .feature-desc {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* API Section */
    .api-section {
      width: 100%;
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 24px;
      margin-bottom: 32px;
    }

    .api-title {
      font-size: 1.15rem;
      font-weight: 600;
      margin-bottom: 16px;
      color: var(--text);
      letter-spacing: -0.01em;
    }

    .api-code-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .api-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      padding: 10px 14px;
    }

    .api-row-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-faint);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .api-row-code {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      overflow-x: auto;
    }

    /* Sponsored Ad Banner */
    .sponsored-ad-banner {
      width: 100%;
      margin: 24px 0 36px;
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: border-color var(--dur-slow) ease;
    }

    .sponsored-ad-banner:hover {
      border-color: var(--sindoor);
    }

    .ad-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .ad-badge-wrap {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--text-faint);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .ad-badge-pill {
      background: var(--graphite-raised);
      border: 1px solid var(--line);
      padding: 2px 7px;
      border-radius: var(--radius-xs);
      color: var(--text-soft);
      font-weight: 500;
    }

    .ad-promote-link {
      font-size: 12px;
      font-family: var(--font-mono);
      color: var(--text-faint);
      text-decoration: none;
      transition: color var(--dur-fast);
    }

    .ad-promote-link:hover {
      color: var(--sindoor);
    }

    .ad-content-row {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    @media (min-width: 480px) {
      .ad-content-row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .ad-main-info {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
      min-width: 0;
    }

    .ad-icon-box {
      width: 42px;
      height: 42px;
      border-radius: var(--radius-sm);
      background: var(--graphite-input);
      border: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text);
      flex-shrink: 0;
    }

    .ad-text-wrap {
      flex: 1;
      min-width: 0;
    }

    .ad-headline {
      font-size: 15px;
      font-weight: 600;
      color: var(--text);
      line-height: 1.3;
      margin-bottom: 2px;
    }

    .ad-copy {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.45;
    }

    /* Google AdSense Wrapper */
    .adsense-container {
      width: 100%;
      margin: 20px 0;
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 12px 14px;
      text-align: center;
      min-height: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .adsense-label {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-faint);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    /* Phone Screen Optimizations (Mobile-first Cinnabar UX) */
    @media (max-width: 480px) {
      .hero {
        margin: 16px 0 24px;
        gap: 14px;
      }
      .hero-chip {
        font-size: 11px;
        padding: 4px 10px;
        gap: 6px;
      }
      .hero-title {
        font-size: clamp(2rem, 7.5vw, 2.6rem);
        line-height: 1.1;
      }
      .hero-subtitle {
        font-size: 14px;
        line-height: 1.5;
        padding: 0 4px;
      }
      .hero-actions {
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
      .hero-actions .btn,
      .hero-actions .cli-cmd-box {
        width: 100%;
        justify-content: center;
        min-height: 44px;
      }
      .uploader-card {
        padding: 16px 14px;
        border-radius: var(--radius-lg);
        margin-bottom: 24px;
      }
      .retention-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      .retention-tabs {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }
      .ttl-tab {
        text-align: center;
        padding: 8px 4px;
        font-size: 11px;
        min-height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .drop-zone {
        padding: 26px 14px;
        gap: 10px;
        border-radius: var(--radius-md);
      }
      .drop-icon-box {
        width: 46px;
        height: 46px;
      }
      .drop-title {
        font-size: 15px;
      }
      .drop-subtitle {
        font-size: 13px;
      }
      .terminal-section {
        margin-bottom: 24px;
      }
      .terminal-header {
        padding: 10px 12px;
      }
      .terminal-tabs {
        gap: 2px;
        padding: 2px;
      }
      .terminal-tab-btn {
        padding: 4px 8px;
        font-size: 11px;
      }
      .terminal-body {
        padding: 14px 12px;
        font-size: 12px;
        line-height: 1.6;
      }
      .feature-card {
        padding: 18px 14px;
        border-radius: var(--radius-md);
      }
      .sponsored-ad-banner {
        padding: 16px 14px;
        border-radius: var(--radius-md);
      }
      .ad-content-row {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }
      .ad-content-row .btn {
        width: 100%;
        justify-content: center;
      }
    }
  </style>
</head>
<body>

  ${renderCinnabarNav("drop", domain)}

  <div class="site-wrapper">
    <div class="content-container">

      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-chip">
          <span class="hero-chip-badge">Zero Logs</span>
          <span class="hero-chip-sep">/</span>
          <span>Zero Authentication</span>
          <span class="hero-chip-sep">/</span>
          <span>Edge Direct</span>
        </div>

        <h1 class="hero-title">Ephemeral file sharing, built for the command line.</h1>
        <p class="hero-subtitle">Transfer files instantly from your terminal or browser. Encrypted at rest, streamed directly to edge memory, and automatically deleted when time runs out.</p>

        <div class="hero-actions">
          <button class="cli-cmd-box" onclick="copyNavCli('npx tdrop <file>', this)" title="Copy CLI Command">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            <span><code>npx tdrop &lt;file&gt;</code></span>
          </button>
          <a href="/docs" class="btn btn-secondary">Read Documentation</a>
        </div>
      </section>

      <!-- Uploader Card -->
      <main class="uploader-card">
        <div class="retention-bar">
          <span class="retention-label">Self-Destruction Retention</span>
          <div class="retention-tabs">
            <button class="ttl-tab" onclick="setTtl('1h', this)">1 Hour</button>
            <button class="ttl-tab active" onclick="setTtl('24h', this)">24 Hours</button>
            <button class="ttl-tab" onclick="setTtl('7d', this)">7 Days</button>
          </div>
        </div>

        <div class="drop-zone" id="dropZone" onclick="document.getElementById('fileInput').click()">
          <div class="drop-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <div>
            <div class="drop-title">Drop file here or tap to upload</div>
            <div class="drop-subtitle">Free edge transfer up to 10MB per file · Auto-incinerating</div>
          </div>
          <input type="file" id="fileInput" class="file-input" onchange="handleFileSelect(this.files)">
        </div>

        <div class="upload-legal-notice">
          By uploading, you agree to the <a href="/terms">Terms</a> and affirm the file is non-malicious and lawful.
        </div>

        <!-- Progress State -->
        <div class="upload-state" id="uploadState">
          <div class="progress-info">
            <span id="uploadFilename">Uploading file...</span>
            <span id="uploadPercent">0%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" id="progressBar"></div>
          </div>
        </div>

        <!-- Result Box -->
        <div class="result-box" id="resultBox">
          <div class="result-header">
            <span>Drop Ready & In-Flight</span>
            <span class="badge"><span class="badge-dot success"></span>ClamAV Clean</span>
          </div>

          <div class="result-url-block">
            <span class="result-url" id="resultUrl">https://${domain}/...</span>
            <button class="btn btn-primary" id="copyUrlBtn" onclick="copyResultUrl()">
              <span>Copy Link</span>
              <span class="btn-icon">→</span>
            </button>
          </div>

          <!-- Cross-Device Transfer -->
          <div class="transfer-box">
            <div class="qr-frame" id="resultQrFrame" onclick="copyResultUrl()" title="Scan with mobile camera">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div class="transfer-info">
              <div class="transfer-title-row">
                <span>Instant Mobile Transfer</span>
              </div>
              <p class="transfer-desc">Scan with your iOS or Android camera for instant direct download without logging in or typing URLs.</p>
              <div class="transfer-actions">
                <button class="btn btn-secondary" onclick="triggerNativeShare()">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  <span>Share Link</span>
                </button>
              </div>
            </div>
          </div>

          <div class="result-details">
            <div class="result-curl-row">
              <span class="result-curl-text" id="resultCurl">curl -O https://${domain}/...</span>
              <button class="btn btn-ghost" onclick="copyResultCurl()" style="padding: 4px 8px; font-size: 11px;">Copy cURL</button>
            </div>
            <div class="result-meta-row">
              <span id="resultExpiry">Retention: 24h</span>
              <span>Zero logs kept</span>
            </div>
          </div>
        </div>
      </main>

      <!-- Terminal Interactive Section -->
      <section class="terminal-section">
        <div>
          <h2 class="section-title">The Terminal Experience</h2>
          <p class="section-desc">Share files directly from your developer workflow without switching context or opening browsers.</p>
        </div>

        <div class="terminal-box">
          <div class="terminal-header">
            <div class="terminal-dots">
              <div class="terminal-dot"></div>
              <div class="terminal-dot"></div>
              <div class="terminal-dot"></div>
            </div>
            <div class="terminal-tabs">
              <button class="terminal-tab-btn active" onclick="switchTerminalTab('npx', this)">npx</button>
              <button class="terminal-tab-btn" onclick="switchTerminalTab('stdin', this)">stdin pipe</button>
              <button class="terminal-tab-btn" onclick="switchTerminalTab('curl', this)">curl</button>
            </div>
          </div>
          <div class="terminal-body" id="terminalContent">
            <div class="terminal-line"><span class="terminal-prompt">$</span> <span>npx tdrop release-v1.tar.gz</span></div>
            <div class="terminal-line" style="color:var(--text-faint);"><span>[Sponsored] High-speed serverless infra -> https://${domain}/ad/r2</span></div>
            <div class="terminal-line"><span>Uploading [████████████] 100% | 4.8 MB/s</span></div>
            <div class="terminal-line" style="color:var(--success); margin-top:4px;"><span>Upload complete</span></div>
            <div class="terminal-line" style="color:var(--text-muted);"><span>  Scan: Verified Clean (ClamAV)</span></div>
            <div class="terminal-line"><span>  Link: </span><span style="color:var(--text);">https://${domain}/a7kX9b2</span></div>
            <div class="terminal-line" style="color:var(--text-faint);"><span>  cURL: curl -O https://${domain}/a7kX9b2/release-v1.tar.gz</span></div>
          </div>
        </div>
      </section>

      <!-- Sponsored Campaign Banner -->
      <section class="sponsored-ad-banner">
        <div class="ad-top-row">
          <div class="ad-badge-wrap">
            <span class="ad-badge-pill">Sponsored Partner</span>
            <span style="color: var(--text);">Cloudflare R2</span>
          </div>
          <a href="/sponsor" class="ad-promote-link">Sponsor tdrop →</a>
        </div>
        <div class="ad-content-row">
          <div class="ad-main-info">
            <div class="ad-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
            </div>
            <div class="ad-text-wrap">
              <div class="ad-headline">Cloudflare R2 Zero Egress Object Storage</div>
              <div class="ad-copy">S3-compatible object storage with zero egress fees, edge caching, and predictable billing.</div>
            </div>
          </div>
          <a href="https://www.cloudflare.com/developer-platform/r2/" target="_blank" rel="noopener sponsored" class="btn btn-secondary" style="font-size: 13px;">
            <span>Explore R2</span>
            <span class="btn-icon" style="width: 18px; height: 18px; font-size: 11px;">→</span>
          </a>
        </div>
      </section>

      <!-- Features Bento Grid -->
      <section class="features-section">
        <div>
          <h2 class="section-title">Built For Engineers</h2>
          <p class="section-desc">Designed around zero-friction principles and edge-native architecture.</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <h3 class="feature-title">Zero-RAM Edge Streaming</h3>
            <p class="feature-desc">Files stream directly between clients and distributed object storage without staging to local server disks.</p>
          </div>
          <div class="feature-card">
            <h3 class="feature-title">Auto Self-Destruction</h3>
            <p class="feature-desc">All files automatically incinerate after your specified TTL (1h, 24h, 7d). Cryptographically deleted forever.</p>
          </div>
          <div class="feature-card">
            <h3 class="feature-title">ClamAV Antivirus Shield</h3>
            <p class="feature-desc">In-flight scanning ensures payloads are verified free of known signatures and trojans before sharing.</p>
          </div>
          <div class="feature-card">
            <h3 class="feature-title">Cross-Platform Distribution</h3>
            <p class="feature-desc">Universal command line packages via NPM, Windows WinGet, macOS Homebrew, or pure cURL.</p>
          </div>
        </div>
      </section>

      <!-- API Cheat Sheet -->
      <section class="api-section">
        <h2 class="api-title">cURL & REST API Reference</h2>
        <div class="api-code-list">
          <div class="api-row">
            <span class="api-row-label">Upload File</span>
            <div class="api-row-code">
              <code>curl -F "file=@data.csv" -F "ttl=24h" https://${domain}/upload</code>
              <button class="btn btn-ghost" onclick="copySnippet('curl -F &quot;file=@data.csv&quot; -F &quot;ttl=24h&quot; https://${domain}/upload')" style="padding: 2px 6px; font-size: 11px;">Copy</button>
            </div>
          </div>
          <div class="api-row">
            <span class="api-row-label">Download File</span>
            <div class="api-row-code">
              <code>curl -O https://${domain}/&lt;code&gt;/data.csv</code>
              <button class="btn btn-ghost" onclick="copySnippet('curl -O https://${domain}/&lt;code&gt;/data.csv')" style="padding: 2px 6px; font-size: 11px;">Copy</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Google AdSense Container -->
      <div class="adsense-container">
        <span class="adsense-label">Advertisement</span>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-2876380604791121"
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      <!-- FAQ Section -->
      <section class="api-section" style="margin-top: 32px;">
        <h2 class="api-title">Frequently Asked Questions</h2>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="background: var(--obsidian); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 18px 20px;">
            <h3 style="font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 8px;">What is tdrop?</h3>
            <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6;">tdrop is an ultra-fast, zero-friction ephemeral file sharing utility. It allows developers and everyday users to send files instantly from the terminal (<code>npx tdrop &lt;file&gt;</code>, WinGet, Homebrew, cURL) or web browser with automatic link generation, QR codes, and automatic self-destruction.</p>
          </div>
          <div style="background: var(--obsidian); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 18px 20px;">
            <h3 style="font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 8px;">How long do files stay on tdrop?</h3>
            <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6;">Files are strictly ephemeral and automatically expire and delete after 1 hour, 24 hours (default), or 7 days based on your chosen retention settings. Once expired, files are purged permanently from edge storage.</p>
          </div>
          <div style="background: var(--obsidian); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 18px 20px;">
            <h3 style="font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 8px;">How do I install tdrop on Windows, Mac, or Linux?</h3>
            <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6;">On Windows: <code>winget install Tagiswild.tdrop</code>. On macOS or Linux: <code>brew install tagiswild/tap/tdrop</code> or <code>curl -fsSL https://${domain}/install.sh | bash</code>. With Node: <code>npm install -g tdrop</code> or <code>npx tdrop &lt;file&gt;</code>.</p>
          </div>
          <div style="background: var(--obsidian); border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 18px 20px;">
            <h3 style="font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 8px;">Is tdrop free and secure?</h3>
            <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6;">Yes, tdrop is 100% free, open-source under MIT, and requires no account or authentication. Files stream directly to edge storage with zero disk writes, encrypted at rest, and zero activity logs.</p>
          </div>
        </div>
      </section>

    </div>

    <!-- Right Sticky Sponsor Rail -->
    <aside class="sponsor-rail">
      <div class="sponsor-sticky-card">
        <div class="sponsor-rail-tag">Sponsorship</div>
        <h3 class="sponsor-rail-title">Sponsor the Command Line</h3>
        <p class="sponsor-rail-desc">Promote your developer platform or cloud service directly inside npx tdrop CLI runs and edge downloads.</p>
        <div class="sponsor-rail-stats">
          <div class="sponsor-stat-pill">0% AdBlock in Terminal</div>
          <div class="sponsor-stat-pill">3%–8% Average CTR</div>
          <div class="sponsor-stat-pill">300+ Edge PoP Reach</div>
        </div>
        <a href="/sponsor" class="btn btn-primary" style="justify-content: space-between;">
          <span>Sponsor Us</span>
          <span class="btn-icon">→</span>
        </a>
      </div>
    </aside>

  </div>

  ${renderCinnabarFooter(domain)}

  <script>
    let selectedTtl = '24h';
    const dropZone = document.getElementById('dropZone');
    const uploadState = document.getElementById('uploadState');
    const progressBar = document.getElementById('progressBar');
    const uploadPercent = document.getElementById('uploadPercent');
    const uploadFilename = document.getElementById('uploadFilename');
    const resultBox = document.getElementById('resultBox');
    const resultUrl = document.getElementById('resultUrl');
    const copyUrlBtn = document.getElementById('copyUrlBtn');

    function setTtl(ttl, btn) {
      selectedTtl = ttl;
      document.querySelectorAll('.ttl-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
    }

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
        alert('File size (' + (file.size / 1024 / 1024).toFixed(1) + 'MB) exceeds the 10MB free tier limit.');
        return;
      }

      uploadFilename.textContent = file.name;
      uploadState.style.display = 'flex';
      resultBox.style.display = 'none';
      progressBar.style.width = '10%';
      uploadPercent.textContent = '10%';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('ttl', selectedTtl);

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
            document.getElementById('resultCurl').setAttribute('data-cmd', 'curl -O ' + res.url + '/' + encodeURIComponent(res.filename));
            document.getElementById('resultExpiry').textContent = 'Retention: ' + res.expiresIn;

            if (res.qrSvg) {
              const qrFrame = document.getElementById('resultQrFrame');
              if (qrFrame) qrFrame.innerHTML = res.qrSvg;
            }
            window.currentShareData = {
              title: (res.filename || 'File') + ' · tdrop',
              text: 'Download ' + (res.filename || 'file') + ' via tdrop',
              url: res.url
            };
          } catch(e) {
            alert('Upload succeeded but response could not be parsed.');
          }
        } else {
          try {
            const errObj = JSON.parse(xhr.responseText);
            alert(errObj.message || errObj.error || ('Upload failed: ' + xhr.responseText));
          } catch(e) {
            alert('Upload failed: ' + xhr.responseText);
          }
          uploadState.style.display = 'none';
        }
      };

      xhr.onerror = () => {
        alert('Network upload failed. Please check your connection.');
        uploadState.style.display = 'none';
      };

      xhr.send(formData);
    }

    async function triggerNativeShare() {
      if (navigator.share && window.currentShareData && navigator.canShare && navigator.canShare(window.currentShareData)) {
        try {
          await navigator.share(window.currentShareData);
          return;
        } catch (err) {
          if (err.name !== 'AbortError') copyResultUrl();
        }
      } else {
        copyResultUrl();
      }
    }

    function copyResultUrl() {
      const url = resultUrl.getAttribute('data-url') || resultUrl.textContent;
      copyTextToClipboard(url, copyUrlBtn, 'Copied!');
    }

    function copyResultCurl() {
      const cmd = document.getElementById('resultCurl').getAttribute('data-cmd') || document.getElementById('resultCurl').textContent;
      copyTextToClipboard(cmd, event.target, 'Copied!');
    }

    function copySnippet(text) {
      copyTextToClipboard(text, event.target, 'Copied!');
    }

    function copyTextToClipboard(text, elem, successMsg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          const orig = elem.textContent;
          elem.textContent = successMsg;
          setTimeout(() => elem.textContent = orig, 2000);
        });
      } else {
        const temp = document.createElement('input');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        const orig = elem.textContent;
        elem.textContent = successMsg;
        setTimeout(() => elem.textContent = orig, 2000);
      }
    }

    function switchTerminalTab(tab, btn) {
      document.querySelectorAll('.terminal-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const box = document.getElementById('terminalContent');

      if (tab === 'npx') {
        box.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">$</span> <span>npx tdrop release-v1.tar.gz</span></div>' +
          '<div class="terminal-line" style="color:var(--text-faint);"><span>[Sponsored] High-speed serverless infra -> https://${domain}/ad/r2</span></div>' +
          '<div class="terminal-line"><span>Uploading [████████████] 100% | 4.8 MB/s</span></div>' +
          '<div class="terminal-line" style="color:var(--success); margin-top:4px;"><span>Upload complete</span></div>' +
          '<div class="terminal-line" style="color:var(--text-muted);"><span>  Scan: Verified Clean (ClamAV)</span></div>' +
          '<div class="terminal-line"><span>  Link: </span><span style="color:var(--text);">https://${domain}/a7kX9b2</span></div>' +
          '<div class="terminal-line" style="color:var(--text-faint);"><span>  cURL: curl -O https://${domain}/a7kX9b2/release-v1.tar.gz</span></div>';
      } else if (tab === 'stdin') {
        box.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">$</span> <span>cat production.log | npx tdrop --filename prod.log</span></div>' +
          '<div class="terminal-line" style="color:var(--text-faint);"><span>Streaming stdin to https://${domain}... 1.2 MB uploaded</span></div>' +
          '<div class="terminal-line" style="color:var(--success); margin-top:4px;"><span>Stdin upload complete</span></div>' +
          '<div class="terminal-line" style="color:var(--text-muted);"><span>  Scan: Verified Clean (ClamAV)</span></div>' +
          '<div class="terminal-line"><span>  Link: </span><span style="color:var(--text);">https://${domain}/b9mW2q1</span></div>';
      } else if (tab === 'curl') {
        box.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">$</span> <span>curl -F "file=@backup.sql" -F "ttl=7d" https://${domain}/upload</span></div>' +
          '<div class="terminal-line"><span>{"success":true,"code":"m4kL8z9","url":"https://${domain}/m4kL8z9","expiresIn":"7d"}</span></div>' +
          '<div class="terminal-line" style="margin-top:8px;"><span class="terminal-prompt">$</span> <span>curl -O https://${domain}/m4kL8z9/backup.sql</span></div>';
      }
    }
  </script>
</body>
</html>`;
}
