import { CINNABAR_FONTS_HTML, CINNABAR_CSS, renderCinnabarNav, renderCinnabarFooter } from "./cinnabar.js";

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
  <meta name="theme-color" content="#0B0B0D">
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
      max-width: 840px;
      margin: 0 auto;
      padding: 36px 20px 80px;
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .about-card {
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      padding: clamp(28px, 5vw, 48px);
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .about-tag {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--sindoor);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .about-title {
      font-size: clamp(2rem, 5vw, 2.75rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--text);
      line-height: 1.2;
    }

    .about-subtitle {
      font-size: 16px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-top: 12px;
    }

    .about-section {
      display: flex;
      flex-direction: column;
      gap: 14px;
      line-height: 1.7;
    }

    .about-section h2 {
      font-size: 1.35rem;
      font-weight: 600;
      color: var(--text);
      letter-spacing: -0.015em;
      margin-top: 12px;
    }

    .about-section p {
      font-size: 15px;
      color: var(--text-soft);
    }

    .about-section ul {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 15px;
      color: var(--text-soft);
    }

    .about-highlight {
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-left: 3px solid var(--sindoor);
      padding: 16px 20px;
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      font-size: 14px;
      color: var(--text);
      line-height: 1.6;
    }

    .creator-box {
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 24px;
      display: flex;
      gap: 20px;
      align-items: center;
      margin-top: 12px;
    }

    .creator-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--graphite-input);
      border: 1px solid var(--line-strong);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--text);
      font-family: var(--font-mono);
    }

    .creator-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .creator-name {
      font-weight: 600;
      font-size: 1.1rem;
      color: var(--text);
    }

    .creator-role {
      font-size: 12px;
      color: var(--text-faint);
      font-family: var(--font-mono);
    }

    .creator-bio {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.5;
      margin-top: 4px;
    }

    /* Phone Screen Optimizations (Mobile-first Cinnabar UX) */
    @media (max-width: 480px) {
      .content-wrapper {
        padding: 16px 12px 60px;
        gap: 20px;
      }
      .about-card {
        padding: 20px 16px;
        border-radius: var(--radius-lg);
        gap: 20px;
      }
      .about-title {
        font-size: clamp(1.8rem, 6vw, 2.2rem);
        text-wrap: balance;
        line-height: 1.15;
      }
      .creator-box {
        flex-direction: column;
        text-align: center;
        align-items: center;
        padding: 18px 14px;
        border-radius: var(--radius-md);
      }
    }
  </style>
</head>
<body>

  ${renderCinnabarNav("about", domain)}

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
          <li>SCP and SFTP required configuring SSH bastion jump boxes and temporary public keys.</li>
          <li>Cloud storage services required OAuth sign-in, email verification, and manual browser clicks.</li>
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
              <a href="https://github.com/TAGISWILD" target="_blank" rel="noopener" style="color:var(--sindoor-text); font-size:13px; text-decoration:none;">GitHub Profile →</a>
              <a href="https://github.com/TAGISWILD/tdrop" target="_blank" rel="noopener" style="color:var(--text-muted); font-size:13px; text-decoration:none;">tdrop Repository →</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>

  ${renderCinnabarFooter(domain)}
</body>
</html>`;
}
