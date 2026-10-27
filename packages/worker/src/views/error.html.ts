import { CINNABAR_FONTS_HTML, CINNABAR_CSS, renderCinnabarNav, renderCinnabarFooter } from "./cinnabar.js";

export function renderErrorPage(
  statusCode: number = 404,
  title: string = "File Expired or Not Found",
  message: string = "This ephemeral transfer has reached its expiration window and was permanently incinerated from edge storage.",
  domain: string = "tdrop.link"
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>${statusCode} · ${title} · tdrop</title>
  <meta name="description" content="${message}">
  
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#0B0B0D">

  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph / Social Media Preview -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${statusCode} · ${title} · tdrop">
  <meta property="og:description" content="${message}">
  <meta property="og:image" content="https://${domain}/assets/preview.png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="537">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${statusCode} · ${title} · tdrop">
  <meta name="twitter:description" content="${message}">
  <meta name="twitter:image" content="https://${domain}/assets/preview.png">

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

    /* Master Layout */
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

    .content-container {
      width: 100%;
      max-width: 680px;
      flex: 1 1 680px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Error Main Card */
    .error-card {
      width: 100%;
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      padding: clamp(32px, 6vw, 48px) clamp(20px, 4vw, 36px);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 18px;
      margin-top: 24px;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
    }

    /* Error Badge with Cool Rose-Red (Never Sindoor) */
    .error-symbol-ring {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--danger-tint);
      border: 1px solid rgba(225, 29, 72, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--danger);
      margin-bottom: 4px;
    }

    .error-title {
      font-size: clamp(1.4rem, 4vw, 1.85rem);
      font-weight: 700;
      color: var(--text);
      letter-spacing: -0.02em;
      line-height: 1.25;
      max-width: 520px;
    }

    .error-desc {
      font-size: 15px;
      color: var(--text-muted);
      line-height: 1.6;
      max-width: 480px;
    }

    .error-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 12px;
      width: 100%;
    }

    .cli-cmd-box {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--obsidian);
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

    /* Phone Screen Optimizations (Mobile-first Cinnabar UX) */
    @media (max-width: 480px) {
      .site-wrapper {
        padding: 16px 12px 60px;
      }
      .error-card {
        padding: 24px 16px;
        border-radius: var(--radius-lg);
        margin-top: 16px;
      }
      .error-title {
        font-size: 1.5rem;
        text-wrap: balance;
        line-height: 1.2;
      }
      .error-actions {
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
      .error-actions .btn {
        width: 100%;
        justify-content: center;
        min-height: 44px;
      }
      .cli-cmd-box {
        width: 100%;
        justify-content: center;
      }
    }
  </style>
</head>
<body>

  ${renderCinnabarNav("error", domain)}

  <div class="site-wrapper">
    <div class="content-container">

      <main class="error-card">
        <div class="error-symbol-ring">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        <span class="badge" style="border-color: rgba(225, 29, 72, 0.35); color: var(--danger-text);">
          <span class="badge-dot danger"></span>
          HTTP ${statusCode} · Ephemeral Auto-Purge
        </span>

        <h1 class="error-title">${title}</h1>
        <p class="error-desc">${message}</p>
        
        <div class="error-actions">
          <a href="/" class="btn btn-primary">
            <span>Drop a new file</span>
            <span class="btn-icon">→</span>
          </a>
          <button class="cli-cmd-box" onclick="copyNavCli('npx tdrop <file>', this)" title="Copy CLI Command">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            <span><code>npx tdrop &lt;file&gt;</code></span>
          </button>
        </div>
      </main>

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
    function copyNavCli(text, elem) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          const orig = elem.innerHTML;
          elem.innerHTML = '<span>Copied!</span>';
          setTimeout(() => elem.innerHTML = orig, 1800);
        });
      }
    }
  </script>
</body>
</html>`;
}
