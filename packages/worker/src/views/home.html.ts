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
  <meta name="theme-color" content="#09090b">
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

  <!-- Schema.org JSON-LD Structured Data for Google Knowledge Graph & Rich Snippets -->
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

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

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

    /* Floating Island Navbar (Inspired by componentry.dev & spaceui.one) */
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
      transition: border-color 0.2s;
    }

    .nav-island:hover {
      border-color: rgba(255, 255, 255, 0.14);
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
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
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
      gap: 8px;
    }

    .cli-pill-nav {
      display: none;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      border-radius: 9999px;
      padding: 5px 12px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .cli-pill-nav:hover {
      border-color: rgba(255, 255, 255, 0.25);
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.07);
    }

    .cli-pill-nav:active {
      transform: scale(0.97);
    }

    @media (min-width: 600px) {
      .cli-pill-nav {
        display: inline-flex;
      }
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 6px 10px;
      border-radius: 8px;
      transition: color 0.15s;
    }

    .nav-link:hover {
      color: var(--text-main);
    }

    /* Master Layout: Center Content with Right Sponsor Rail */
    .site-wrapper {
      width: 100%;
      max-width: 1080px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 36px;
      padding: 24px 16px 80px;
      min-height: 100vh;
    }

    /* Right Sticky Sponsor Rail */
    .sponsor-rail {
      display: none;
      width: 240px;
      flex: 0 0 240px;
    }

    @media (min-width: 1060px) {
      .sponsor-rail {
        display: block;
      }
    }

    .sponsor-sticky-card {
      position: sticky;
      top: 96px;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .sponsor-rail-tag {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: var(--text-dim);
      font-family: var(--font-mono);
    }

    .sponsor-rail-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }

    .sponsor-rail-desc {
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .sponsor-rail-stats {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: rgba(0, 0, 0, 0.3);
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid var(--surface-border-subtle);
    }

    .sponsor-stat-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sponsor-stat-pill::before {
      content: '•';
      color: var(--status-green);
    }

    .btn-sponsor-rail {
      background: #ffffff;
      color: #09090b;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 10px;
      border-radius: 8px;
      text-align: center;
      text-decoration: none;
      display: block;
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.12);
      transition: all 0.2s;
    }

    .btn-sponsor-rail:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
    }

    /* Center Content Container */
    .content-container {
      width: 100%;
      max-width: 740px;
      flex: 1 1 740px;
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
      margin: 36px 0 32px;
    }

    .hero-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 14px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 9999px;
      font-size: 0.78rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .hero-chip-badge {
      color: #ffffff;
      font-weight: 600;
    }

    .hero-chip-sep {
      color: var(--surface-border);
    }

    .hero-title {
      font-size: clamp(2.3rem, 6.5vw, 3.8rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.1;
      max-width: 680px;
      text-align: center;
      color: #ffffff;
    }

    .hero-subtitle {
      font-size: clamp(0.95rem, 2.6vw, 1.12rem);
      color: var(--text-muted);
      max-width: 540px;
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

    .btn-solid-white {
      background: #ffffff;
      color: #09090b;
      font-family: var(--font-sans);
      font-size: 0.88rem;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 14px rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.8);
      user-select: none;
    }

    .btn-solid-white:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
    }

    .btn-solid-white:active {
      transform: scale(0.98);
    }

    .cli-cmd-box {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      border-radius: 10px;
      padding: 9px 16px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .cli-cmd-box:hover {
      border-color: rgba(255, 255, 255, 0.2);
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.07);
    }

    .cli-cmd-box code {
      color: #ffffff;
    }

    /* Uploader Console Card (Tactile, Clean, Inset Bevels) */
    .uploader-card {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: clamp(20px, 4vw, 32px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      margin-bottom: 40px;
    }

    /* Segmented Retention Control */
    .retention-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--surface-border-subtle);
    }

    .retention-label {
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--text-dim);
      font-family: var(--font-mono);
    }

    .retention-tabs {
      display: flex;
      gap: 4px;
      background: rgba(0, 0, 0, 0.4);
      padding: 3px;
      border-radius: 8px;
      border: 1px solid var(--surface-border);
    }

    .ttl-tab {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 0.75rem;
      font-family: var(--font-mono);
      font-weight: 500;
      padding: 5px 11px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .ttl-tab:hover {
      color: var(--text-main);
    }

    .ttl-tab.active {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    }

    /* Drop Zone */
    .drop-zone {
      border: 1px dashed rgba(255, 255, 255, 0.14);
      border-radius: 14px;
      padding: clamp(32px, 6vw, 44px) 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      background: rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .drop-zone:hover, .drop-zone:focus {
      border-color: rgba(255, 255, 255, 0.35);
      background: rgba(255, 255, 255, 0.02);
      transform: translateY(-1px);
    }

    .drop-zone.dragover {
      border-color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
      transform: scale(1.01);
    }

    .drop-icon-box {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-main);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
      transition: transform 0.2s;
    }

    .drop-zone:hover .drop-icon-box {
      transform: scale(1.06);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .drop-title {
      font-size: clamp(1.05rem, 3.2vw, 1.25rem);
      font-weight: 600;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .drop-subtitle {
      font-size: clamp(0.8rem, 2.4vw, 0.88rem);
      color: var(--text-muted);
      line-height: 1.5;
    }

    .file-input { display: none; }

    .upload-legal-notice {
      margin-top: 14px;
      font-size: 0.76rem;
      color: var(--text-dim);
      font-family: var(--font-mono);
      text-align: center;
      line-height: 1.5;
    }

    .upload-legal-notice a {
      color: var(--text-muted);
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: color 0.15s;
    }

    .upload-legal-notice a:hover {
      color: #ffffff;
    }

    /* Upload Progress State */
    .upload-state {
      display: none;
      margin-top: 20px;
      flex-direction: column;
      gap: 10px;
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.82rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
    }

    .progress-bar-bg {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: #ffffff;
      transition: width 0.15s ease-out;
    }

    /* Result Box */
    .result-box {
      display: none;
      background: #090a0d;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      padding: clamp(16px, 3.5vw, 22px);
      margin-top: 20px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }

    .result-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 14px;
      font-size: 0.88rem;
      color: #ffffff;
      font-weight: 600;
    }

    .result-verified-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-family: var(--font-mono);
      color: var(--status-green);
    }

    .result-url-block {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 10px;
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
      font-size: 0.88rem;
      color: #ffffff;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .copy-btn {
      background: #ffffff;
      color: #09090b;
      border: 1px solid rgba(255, 255, 255, 0.8);
      padding: 7px 16px;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      min-height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      white-space: nowrap;
    }

    .copy-btn:hover {
      background: #f4f4f5;
    }

    .copy-btn:active {
      transform: scale(0.97);
    }

    /* Mobile QR Transfer & Quick Share */
    .transfer-box {
      margin-top: 14px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    @media (min-width: 480px) {
      .transfer-box {
        flex-direction: row;
        align-items: center;
        gap: 16px;
      }
    }

    .qr-frame {
      width: 104px;
      height: 104px;
      min-width: 104px;
      min-height: 104px;
      background: #ffffff;
      padding: 6px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      margin: 0 auto;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
    }

    .qr-frame:hover {
      transform: scale(1.04);
    }

    .qr-frame svg {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 2px;
    }

    .transfer-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .transfer-header {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .transfer-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #ffffff;
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .transfer-desc {
      font-size: 0.78rem;
      color: var(--text-muted);
      line-height: 1.45;
    }

    .transfer-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .btn-action-primary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--surface-border-hover);
      color: #ffffff;
      font-size: 0.78rem;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .btn-action-primary:hover {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 255, 255, 0.28);
      transform: translateY(-1px);
    }

    .btn-action-secondary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 500;
      padding: 7px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .btn-action-secondary:hover {
      background: rgba(255, 255, 255, 0.07);
      color: var(--text-main);
      border-color: rgba(255, 255, 255, 0.18);
    }

    .result-details {
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 14px;
      border-top: 1px solid var(--surface-border-subtle);
    }

    .result-curl-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: rgba(0, 0, 0, 0.35);
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--surface-border);
      font-family: var(--font-mono);
      font-size: 0.78rem;
    }

    .result-curl-text {
      color: var(--text-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .copy-sm {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      color: var(--text-muted);
      font-size: 0.72rem;
      font-weight: 500;
      padding: 3px 8px;
      border-radius: 4px;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s;
    }

    .copy-sm:hover {
      color: var(--text-main);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .result-meta-row {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
    }

    /* Terminal Console (Clean, Precision Code Block) */
    .terminal-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 40px;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #ffffff;
    }

    .section-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 3px;
    }

    .terminal-box {
      background: #090a0d;
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
      overflow: hidden;
    }

    .terminal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid var(--surface-border);
    }

    .terminal-dots {
      display: flex;
      gap: 6px;
    }

    .terminal-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.15);
    }

    .terminal-tabs {
      display: flex;
      gap: 2px;
      background: rgba(0, 0, 0, 0.4);
      padding: 2px;
      border-radius: 6px;
      border: 1px solid var(--surface-border);
    }

    .terminal-tab-btn {
      background: transparent;
      border: none;
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 500;
      padding: 4px 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .terminal-tab-btn.active {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .terminal-body {
      padding: 18px 20px;
      font-family: var(--font-mono);
      font-size: clamp(0.75rem, 2.3vw, 0.85rem);
      line-height: 1.65;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      color: var(--text-main);
    }

    .terminal-line {
      display: flex;
      flex-wrap: nowrap;
      gap: 8px;
      white-space: pre;
    }

    .terminal-prompt { color: var(--text-dim); }

    /* Bento Grid Features (Understated, High-Craft) */
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
      gap: 14px;
    }

    @media (min-width: 600px) {
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
    }

    .feature-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: border-color 0.2s, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .feature-card:hover {
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    .feature-title {
      font-size: 1rem;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .feature-desc {
      font-size: 0.84rem;
      color: var(--text-muted);
      line-height: 1.55;
    }

    /* API Cheat Sheet */
    .api-section {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 22px;
      margin-bottom: 30px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .api-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 14px;
      color: #ffffff;
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
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--surface-border);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .api-row-label {
      font-size: 0.72rem;
      font-weight: 500;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .api-row-code {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-main);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      overflow-x: auto;
    }

    /* In-Flow Banner Ad Container (Quiet, Clean) */
    .ad-banner-inline {
      width: 100%;
      margin: 20px 0;
      padding: 10px;
      text-align: center;
      min-height: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    /* Sponsored Ad Banner */
    .sponsored-ad-banner {
      width: 100%;
      margin: 24px 0 36px;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04);
      transition: border-color 0.2s;
    }

    .sponsored-ad-banner:hover {
      border-color: rgba(255, 255, 255, 0.16);
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
      font-size: 0.68rem;
      font-family: var(--font-mono);
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .ad-badge-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      padding: 2px 7px;
      border-radius: 4px;
      color: var(--text-muted);
      font-weight: 600;
    }

    .ad-sponsor-tag {
      color: var(--text-main);
      font-weight: 600;
    }

    .ad-promote-link {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--text-dim);
      text-decoration: none;
      transition: color 0.15s;
    }

    .ad-promote-link:hover {
      color: #ffffff;
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
      gap: 12px;
      flex: 1;
      min-width: 0;
    }

    .ad-icon-box {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      flex-shrink: 0;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    .ad-text-wrap {
      flex: 1;
      min-width: 0;
    }

    .ad-headline {
      font-size: 0.95rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.25;
      letter-spacing: -0.01em;
      margin-bottom: 2px;
    }

    .ad-copy {
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .btn-ad-visit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: #ffffff;
      color: #09090b !important;
      font-family: var(--font-sans);
      font-size: 0.82rem;
      font-weight: 700;
      padding: 9px 16px;
      border-radius: 8px;
      text-decoration: none;
      white-space: nowrap;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.12);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-ad-visit:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(255, 255, 255, 0.2);
    }

    /* Google AdSense Wrapper */
    .adsense-container {
      width: 100%;
      margin: 18px 0;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--surface-border-subtle);
      border-radius: 12px;
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
      font-size: 0.65rem;
      color: var(--text-dim);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    /* Footer */
    footer {
      width: 100%;
      border-top: 1px solid var(--surface-border);
      padding: 32px 16px;
      font-size: 0.82rem;
      color: var(--text-dim);
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    footer a {
      color: var(--text-muted);
      text-decoration: none;
    }

    footer a:hover {
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
        <a href="#dropZone" class="nav-link">Upload</a>
        <a href="#features" class="nav-link">Features</a>
        <a href="#cli" class="nav-link">CLI & API</a>
        <a href="/sponsor" class="nav-link" style="color:#ffffff; font-weight:600;">Sponsor</a>
        <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener" class="nav-link">GitHub</a>
      </div>
    </nav>
  </header>

  <!-- Layout: Main Content + Right Sponsor Rail -->
  <div class="site-wrapper">

    <!-- Center Content -->
    <div class="content-container">

      <main style="width: 100%;">

        <!-- Hero Section -->
        <section class="hero">
          <div class="hero-chip">
            <span class="hero-chip-badge">Fast & Private</span>
            <span class="hero-chip-sep">/</span>
            <span>ClamAV Clean</span>
            <span class="hero-chip-sep">/</span>
            <span>Zero Logs</span>
          </div>
          <h1 class="hero-title">
            tdrop — Ephemeral file sharing,<br>built for everyone.
          </h1>
          <p class="hero-subtitle">
            Share files instantly from your browser, phone, terminal, or cURL. Streamed to the edge with zero sign-up, zero tracking, and automatic permanent deletion.
          </p>
          <div class="hero-actions">
            <a href="#dropZone" class="btn-solid-white">Share a File</a>
            <div class="cli-cmd-box" onclick="copySnippet('npx tdrop <file>')">
              <code>$ npx tdrop &lt;file&gt;</code>
              <span style="font-size:0.75rem; color:var(--text-dim);">CLI</span>
            </div>
          </div>
        </section>

        <!-- Tactile Uploader Console -->
        <div class="uploader-card">
          
          <!-- Retention Duration Segmented Control -->
          <div class="retention-bar">
            <div class="retention-label">Retention duration</div>
            <div class="retention-tabs">
              <button type="button" class="ttl-tab" onclick="setTtl('1h', this)">1h</button>
              <button type="button" class="ttl-tab active" onclick="setTtl('24h', this)">24h</button>
              <button type="button" class="ttl-tab" onclick="setTtl('7d', this)">7d</button>
            </div>
          </div>

          <!-- Drop Zone -->
          <div class="drop-zone" id="dropZone" onclick="document.getElementById('fileInput').click()">
            <input type="file" id="fileInput" class="file-input" onchange="handleFileSelect(this.files)">
            <div class="drop-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <div class="drop-title">Drop file here or click to browse</div>
            <div class="drop-subtitle">Strict 10MB limit · Encrypted at rest · Auto-deleted after retention</div>
          </div>

          <div class="upload-legal-notice">
            By uploading, you accept our <a href="/terms" target="_blank" rel="noopener">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>.
          </div>

          <!-- Upload Progress -->
          <div class="upload-state" id="uploadState">
            <div class="progress-info">
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
              <span>Upload Ready</span>
              <span class="result-verified-pill">
                <span class="status-dot"></span>
                <span>ClamAV Verified</span>
              </span>
            </div>
            
            <div class="result-url-block">
              <span class="result-url" id="resultUrl">https://${domain}/...</span>
              <button class="copy-btn" id="copyUrlBtn" onclick="copyResultUrl()">Copy Link</button>
            </div>

            <!-- Mobile QR Transfer & Quick Share -->
            <div class="transfer-box" id="resultTransferBox">
              <div class="qr-frame" id="resultQrFrame" onclick="copyResultUrl()" title="Scan with camera or click to copy link">
                <div style="font-size:0.7rem; color:#71717a; text-align:center;">QR Code</div>
              </div>
              <div class="transfer-info">
                <div class="transfer-header">
                  <div class="transfer-title-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                    <span>Instant Mobile Transfer</span>
                  </div>
                  <p class="transfer-desc">Scan with your phone camera to download directly on iOS/Android, or share instantly.</p>
                </div>
                <div class="transfer-actions">
                  <button class="btn-action-primary" type="button" onclick="triggerNativeShare()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    <span id="shareBtnText">Share Link</span>
                  </button>
                  <button class="btn-action-secondary" type="button" onclick="copyResultUrl()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    <span id="copyUrlBtnText">Copy URL</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="result-details">
              <div class="result-curl-row">
                <div class="result-curl-text" id="resultCurl">curl -O ...</div>
                <button class="copy-sm" onclick="copyResultCurl()">Copy</button>
              </div>
              <div class="result-meta-row">
                <span id="resultExpiry">Retention: 24h</span>
                <span>$0 Egress Fee</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Google AdSense Container -->
        <div class="adsense-container" aria-label="Advertisement">
          <div class="adsense-label">ADVERTISEMENT</div>
          <ins class="adsbygoogle"
               style="display:block; width:100%;"
               data-ad-client="ca-pub-2876380604791121"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>

        <!-- Multi-Platform & Terminal Showcase -->
        <section class="terminal-section" id="cli">
          <div>
            <h2 class="section-title">Every Device, Any Workflow</h2>
            <p class="section-desc">Drag and drop in your browser, transfer to your phone via QR, or automate via CLI and cURL.</p>
          </div>

          <div class="terminal-box">
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="terminal-dot"></span>
                <span class="terminal-dot"></span>
                <span class="terminal-dot"></span>
              </div>
              <div class="terminal-tabs">
                <button class="terminal-tab-btn active" onclick="switchTerminalTab('npx', this)">npx</button>
                <button class="terminal-tab-btn" onclick="switchTerminalTab('stdin', this)">stdin</button>
                <button class="terminal-tab-btn" onclick="switchTerminalTab('curl', this)">curl</button>
              </div>
            </div>
            <div class="terminal-body" id="terminalContent">
              <div class="terminal-line"><span class="terminal-prompt">$</span> <span>npx tdrop release-v1.tar.gz</span></div>
              <div class="terminal-line" style="color:var(--text-dim);"><span>[Sponsored] High-speed serverless infra -> https://${domain}/ad/r2</span></div>
              <div class="terminal-line"><span>Uploading [████████████] 100% | 4.8 MB/s</span></div>
              <div class="terminal-line" style="color:var(--status-green); margin-top:4px;"><span>✔ Upload complete!</span></div>
              <div class="terminal-line" style="color:var(--text-muted);"><span>  Scan: Verified Clean (ClamAV)</span></div>
              <div class="terminal-line"><span>  Link: </span><span style="color:#ffffff;">https://${domain}/a7kX9b2</span></div>
              <div class="terminal-line" style="color:var(--text-dim);"><span>  cURL: curl -O https://${domain}/a7kX9b2/release-v1.tar.gz</span></div>
            </div>
          </div>
        </section>

        <!-- Bento Grid Features (Universal & Clear) -->
        <section class="features-section" id="features">
          <div>
            <h2 class="section-title">Fast, Secure & Private for Everyone</h2>
            <p class="section-desc">End-to-end ephemeral file delivery with zero sign-up, zero tracking, and zero retention debt.</p>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <h3 class="feature-title">Instant Mobile Transfer</h3>
              <p class="feature-desc">Scan with your smartphone camera to download files or share on iOS and Android instantly via QR codes.</p>
            </div>

            <div class="feature-card">
              <h3 class="feature-title">ClamAV Malware Scanning</h3>
              <p class="feature-desc">Live streaming antivirus inspection ensures files are verified clean and safe before distribution.</p>
            </div>

            <div class="feature-card">
              <h3 class="feature-title">Auto-Incinerate Lifecycle</h3>
              <p class="feature-desc">True ephemerality. Objects are permanently deleted from edge storage after your chosen retention window.</p>
            </div>

            <div class="feature-card">
              <h3 class="feature-title">Zero Accounts & Zero Tracking</h3>
              <p class="feature-desc">No logins, no emails, no personal data, and no tracking cookies. Frictionless, private utility.</p>
            </div>

            <div class="feature-card">
              <h3 class="feature-title">Edge Direct-to-R2</h3>
              <p class="feature-desc">Zero RAM accumulation. Files stream directly to Cloudflare R2 globally with $0 egress bandwidth fees.</p>
            </div>

            <div class="feature-card">
              <h3 class="feature-title">CLI & Developer Automation</h3>
              <p class="feature-desc">Full terminal support with npx tdrop, cURL endpoints, and stdin piping for engineers and automated scripts.</p>
            </div>
          </div>
        </section>

        <!-- API Reference -->
        <section class="api-section">
          <h2 class="api-title">cURL API Reference</h2>
          <div class="api-code-list">
            <div class="api-row">
              <div class="api-row-label">Upload a file</div>
              <div class="api-row-code">
                <code>curl -F "file=@app.zip" https://${domain}/upload</code>
                <button class="copy-sm" onclick="copySnippet('curl -F \\"file=@app.zip\\" https://${domain}/upload')">Copy</button>
              </div>
            </div>
            <div class="api-row">
              <div class="api-row-label">Stream piped stdin</div>
              <div class="api-row-code">
                <code>cat logs.txt | curl -H "X-TDrop-Filename: logs.txt" --data-binary @- https://${domain}/upload/raw</code>
                <button class="copy-sm" onclick="copySnippet('cat logs.txt | curl -H \\"X-TDrop-Filename: logs.txt\\" --data-binary @- https://${domain}/upload/raw')">Copy</button>
              </div>
            </div>
            <div class="api-row">
              <div class="api-row-label">Resumable range download</div>
              <div class="api-row-code">
                <code>curl -C - -O https://${domain}/CODE/filename.ext</code>
                <button class="copy-sm" onclick="copySnippet('curl -C - -O https://${domain}/CODE/filename.ext')">Copy</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Frequently Asked Questions (SEO) -->
        <section class="faq-section" style="margin-top: 48px;">
          <h2 class="api-title" style="margin-bottom: 20px;">Frequently Asked Questions</h2>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--surface-border); border-radius: 10px; padding: 18px 20px;">
              <h3 style="font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 8px;">What is tdrop?</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">tdrop is an ultra-fast, zero-friction ephemeral file sharing utility. It allows developers and everyday users to send files instantly from the terminal (<code>npx tdrop &lt;file&gt;</code>, WinGet, Homebrew, cURL) or web browser with automatic link generation, QR codes, and automatic self-destruction.</p>
            </div>
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--surface-border); border-radius: 10px; padding: 18px 20px;">
              <h3 style="font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 8px;">How long do files stay on tdrop?</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">Files are strictly ephemeral and automatically expire and delete after 1 hour, 24 hours (default), or 7 days based on your chosen retention settings. Once expired, files are purged permanently from edge storage.</p>
            </div>
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--surface-border); border-radius: 10px; padding: 18px 20px;">
              <h3 style="font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 8px;">How do I install tdrop on Windows, Mac, or Linux?</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">On Windows: <code>winget install Tagiswild.tdrop</code>. On macOS or Linux: <code>brew install tagiswild/tap/tdrop</code> or <code>curl -fsSL https://${domain}/install.sh | bash</code>. With Node: <code>npm install -g tdrop</code> or <code>npx tdrop &lt;file&gt;</code>.</p>
            </div>
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--surface-border); border-radius: 10px; padding: 18px 20px;">
              <h3 style="font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Is tdrop free and secure?</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">Yes, tdrop is 100% free, open-source under MIT, and requires no account or authentication. Files stream directly to edge storage with zero disk writes, encrypted at rest, and zero activity logs.</p>
            </div>
          </div>
        </section>

      </main>

      <footer>
        <div class="footer-links" style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap; margin-bottom:8px;">
          <a href="/" style="color:var(--text-muted); text-decoration:none;">Home</a>
          <a href="/stats" style="color:var(--text-muted); text-decoration:none;">Stats</a>
          <a href="/sponsor" style="color:var(--text-muted); text-decoration:none;">Sponsorship</a>
          <a href="/privacy" style="color:var(--text-muted); text-decoration:none;">Privacy Policy</a>
          <a href="/terms" style="color:var(--text-muted); text-decoration:none;">Terms of Service</a>
          <a href="/sitemap.xml" style="color:var(--text-muted); text-decoration:none;">Sitemap</a>
          <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener" style="color:var(--text-muted); text-decoration:none;">GitHub</a>
        </div>
        <p>tdrop · Ephemeral File Sharing · <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">Open Source on GitHub</a></p>
        <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">Zero egress fees · No trackers · RFC 5987 Compliant</p>
      </footer>

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
        <a href="/sponsor" class="btn-sponsor-rail">Sponsor Us →</a>
      </div>
    </aside>

  </div>

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
            document.getElementById('resultCurl').innerHTML = 'curl -O ' + res.url + '/' + encodeURIComponent(res.filename);
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
      const altBtn = document.getElementById('copyUrlBtnText');
      if (altBtn) {
        altBtn.textContent = 'Copied!';
        setTimeout(() => { altBtn.textContent = 'Copy URL'; }, 2000);
      }
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
          '<div class="terminal-line" style="color:var(--text-dim);"><span>[Sponsored] High-speed serverless infra -> https://${domain}/ad/r2</span></div>' +
          '<div class="terminal-line"><span>Uploading [████████████] 100% | 4.8 MB/s</span></div>' +
          '<div class="terminal-line" style="color:var(--status-green); margin-top:4px;"><span>✔ Upload complete!</span></div>' +
          '<div class="terminal-line" style="color:var(--text-muted);"><span>  Scan: Verified Clean (ClamAV)</span></div>' +
          '<div class="terminal-line"><span>  Link: </span><span style="color:#ffffff;">https://${domain}/a7kX9b2</span></div>' +
          '<div class="terminal-line" style="color:var(--text-dim);"><span>  cURL: curl -O https://${domain}/a7kX9b2/release-v1.tar.gz</span></div>';
      } else if (tab === 'stdin') {
        box.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">$</span> <span>cat production.log | npx tdrop --filename prod.log</span></div>' +
          '<div class="terminal-line" style="color:var(--text-dim);"><span>Streaming stdin to https://${domain}... 1.2 MB uploaded</span></div>' +
          '<div class="terminal-line" style="color:var(--status-green); margin-top:4px;"><span>✔ Stdin upload complete!</span></div>' +
          '<div class="terminal-line" style="color:var(--text-muted);"><span>  Scan: Verified Clean (ClamAV)</span></div>' +
          '<div class="terminal-line"><span>  Link: </span><span style="color:#ffffff;">https://${domain}/b9mW2q1</span></div>';
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
