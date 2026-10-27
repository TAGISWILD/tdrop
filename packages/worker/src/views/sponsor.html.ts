import { CINNABAR_FONTS_HTML, CINNABAR_CSS, renderCinnabarNav, renderCinnabarFooter } from "./cinnabar.js";

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
  <meta name="theme-color" content="#0B0B0D">
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

    /* Main Container */
    .container {
      width: 100%;
      max-width: 920px;
      margin: 0 auto;
      padding: 36px 20px 80px;
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
      background: var(--graphite);
      border: 1px solid var(--line-strong);
      border-radius: var(--radius-pill);
      font-size: 12px;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .hero-title {
      font-size: clamp(2.3rem, 6vw, 3.8rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.12;
      color: var(--text);
      max-width: 740px;
    }

    .hero-subtitle {
      font-size: clamp(0.95rem, 2.5vw, 1.15rem);
      color: var(--text-muted);
      max-width: 600px;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 6px;
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
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 20px 16px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: border-color var(--dur-slow) ease;
    }

    .metric-card:hover {
      border-color: var(--sindoor);
    }

    .metric-val {
      font-size: 1.6rem;
      font-weight: 600;
      color: var(--text);
      font-family: var(--font-mono);
      letter-spacing: -0.02em;
    }

    .metric-label {
      font-size: 11px;
      color: var(--text-faint);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;
    }

    /* Terminal Preview Specimen */
    .specimen-card {
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 22px;
    }

    .specimen-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--line);
    }

    .specimen-title {
      font-size: 12px;
      font-family: var(--font-mono);
      color: var(--text-faint);
    }

    .specimen-body {
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.7;
      color: var(--text-soft);
      overflow-x: auto;
    }

    .specimen-blip {
      color: var(--sindoor-text);
      font-weight: 500;
    }

    /* Tiers Grid */
    .tiers-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .section-title {
      font-size: 1.6rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--text);
      text-align: center;
    }

    .tiers-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    @media (min-width: 768px) {
      .tiers-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .tier-card {
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
      position: relative;
      transition: border-color var(--dur-slow) ease;
    }

    .tier-card:hover {
      border-color: var(--sindoor);
    }

    .tier-card.featured {
      border-color: var(--line-stronger);
      background: var(--graphite);
    }

    .tier-badge {
      position: absolute;
      top: -10px;
      right: 20px;
      background: var(--sindoor);
      color: var(--obsidian);
      font-size: 11px;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: var(--radius-pill);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .tier-name {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text);
    }

    .tier-price {
      font-family: var(--font-mono);
      font-size: 2rem;
      font-weight: 600;
      color: var(--text);
      margin: 8px 0 4px;
    }

    .tier-period {
      font-size: 13px;
      color: var(--text-faint);
      font-weight: 400;
    }

    .tier-desc {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .tier-features {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 14px;
      font-size: 13px;
      color: var(--text-soft);
    }

    .tier-feature {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tier-feature::before {
      content: "•";
      color: var(--sindoor);
      font-size: 1.2rem;
      line-height: 0;
    }

    /* Google AdSense Container */
    .adsense-container {
      width: 100%;
      margin: 20px 0;
      background: var(--graphite);
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

    /* Sponsor Inquiry Modal */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(11, 11, 13, 0.76);
      backdrop-filter: blur(8px);
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-card {
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      padding: 28px;
      width: 100%;
      max-width: 480px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.7);
    }
  </style>
</head>
<body>

  ${renderCinnabarNav("sponsor", domain)}

  <main class="container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-chip">
        <span>0% AdBlock</span>
        <span>·</span>
        <span>High-Intent Engineers</span>
        <span>·</span>
        <span>Realtime Telemetry</span>
      </div>

      <h1 class="hero-title">Sponsor the command line.</h1>
      <p class="hero-subtitle">Promote your developer platform, cloud tool, or API directly inside <code>npx tdrop</code> terminal stdout runs and web download screens.</p>

      <div class="hero-actions">
        <a href="#tiers" class="btn btn-primary">
          <span>Explore Packages</span>
          <span class="btn-icon">→</span>
        </a>
        <a href="/stats" class="btn btn-secondary">View Live Telemetry</a>
      </div>
    </section>

    <!-- Metrics Bar -->
    <section class="metrics-bar">
      <div class="metric-card">
        <span class="metric-val">0%</span>
        <span class="metric-label">AdBlock Rate</span>
      </div>
      <div class="metric-card">
        <span class="metric-val">3.8%</span>
        <span class="metric-label">Average CTR</span>
      </div>
      <div class="metric-card">
        <span class="metric-val">300+</span>
        <span class="metric-label">Edge PoP Reach</span>
      </div>
      <div class="metric-card">
        <span class="metric-val">100%</span>
        <span class="metric-label">Active Engineers</span>
      </div>
    </section>

    <!-- Terminal Preview Specimen -->
    <section class="specimen-card">
      <div class="specimen-header">
        <span class="specimen-title">Terminal Stdout Specimen</span>
        <span class="badge" style="font-size: 11px;"><span class="badge-dot success"></span>Clean Delivery</span>
      </div>
      <div class="specimen-body">
        <div><span style="color:var(--text-faint);">$</span> npx tdrop production-dump.sql</div>
        <div class="specimen-blip">⚡ [Sponsored] PlanetScale — Serverless MySQL with instant branching: https://${domain}/ad/planetscale</div>
        <div>Uploading [████████████████████] 100% · 14.2 MB/s</div>
        <div style="color:var(--success-text);">✔ Drop complete! Auto-expires in 24 hours.</div>
        <div>Link: <span style="color:var(--text);">https://${domain}/a9kL3x2</span></div>
      </div>
    </section>

    <!-- Sponsorship Tiers Grid -->
    <section class="tiers-section" id="tiers">
      <h2 class="section-title">Transparent Sponsorship Packages</h2>

      <div class="tiers-grid">
        <!-- Starter Tier -->
        <div class="tier-card">
          <div>
            <div class="tier-name">Starter</div>
            <div class="tier-price">$99<span class="tier-period"> / mo</span></div>
            <p class="tier-desc">Ideal for developer tools and indie hackers looking to build consistent mindshare.</p>
            <ul class="tier-features">
              <li class="tier-feature">20,000+ Terminal Blip runs</li>
              <li class="tier-feature">Clean text stdout attribution</li>
              <li class="tier-feature">Web download landing placement</li>
              <li class="tier-feature">Real-time CTR telemetry</li>
            </ul>
          </div>
          <button type="button" onclick="openSponsorModal('Starter')" class="btn btn-secondary" style="width:100%; justify-content:center;">
            <span>Apply for Starter</span>
          </button>
        </div>

        <!-- Growth Pro Tier -->
        <div class="tier-card featured">
          <span class="tier-badge">Most Popular</span>
          <div>
            <div class="tier-name">Growth Pro</div>
            <div class="tier-price">$249<span class="tier-period"> / mo</span></div>
            <p class="tier-desc">High-frequency terminal exposure across all CLI transfers and top-tier web banners.</p>
            <ul class="tier-features">
              <li class="tier-feature">60,000+ Terminal Blip runs</li>
              <li class="tier-feature">Priority rotation & custom URL</li>
              <li class="tier-feature">Homepage sponsor banner showcase</li>
              <li class="tier-feature">Weekly analytics report</li>
            </ul>
          </div>
          <button type="button" onclick="openSponsorModal('Growth Pro')" class="btn btn-primary" style="width:100%; justify-content:space-between;">
            <span>Apply for Growth Pro</span>
            <span class="btn-icon">→</span>
          </button>
        </div>

        <!-- Title Partner Tier -->
        <div class="tier-card">
          <div>
            <div class="tier-name">Title Partner</div>
            <div class="tier-price">$599<span class="tier-period"> / mo</span></div>
            <p class="tier-desc">Exclusive command line category sponsor with persistent brand logo presence.</p>
            <ul class="tier-features">
              <li class="tier-feature">150,000+ Terminal Blip runs</li>
              <li class="tier-feature">Exclusive industry exclusivity</li>
              <li class="tier-feature">Sidebar sticky card on all views</li>
              <li class="tier-feature">GitHub README & docs footer</li>
            </ul>
          </div>
          <button type="button" onclick="openSponsorModal('Title Partner')" class="btn btn-secondary" style="width:100%; justify-content:center;">
            <span>Contact Partners Team</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Google AdSense Container -->
    <div class="adsense-container" aria-label="Advertisement">
      <span class="adsense-label">ADVERTISEMENT</span>
      <ins class="adsbygoogle"
           style="display:block; width:100%;"
           data-ad-client="ca-pub-2876380604791121"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  </main>

  <!-- Sponsor Inquiry Modal -->
  <div class="modal-overlay" id="sponsorModal" onclick="if(event.target===this)closeSponsorModal()" aria-hidden="true" role="dialog" aria-labelledby="sponsorModalTitle">
    <div class="modal-card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h3 id="sponsorModalTitle" style="font-size:1.2rem; font-weight:600; color:var(--text);">Sponsor the Command Line</h3>
        <button type="button" onclick="closeSponsorModal()" class="btn btn-ghost" style="padding:4px 8px; font-size:16px;" aria-label="Close modal">✕</button>
      </div>

      <p style="font-size:13px; color:var(--text-muted); line-height:1.5;">
        Reach thousands of engineers inside <code>npx tdrop</code> terminal stdout runs and web downloads. Tell us about your tool or platform.
      </p>

      <form id="sponsorForm" onsubmit="handleSponsorSubmit(event)" style="display:flex; flex-direction:column; gap:14px;">
        <div>
          <label for="sponsorCompany" style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Company / Tool Name</label>
          <input type="text" id="sponsorCompany" class="input" placeholder="e.g. Supabase, Turso, Raycast" required>
        </div>

        <div>
          <label for="sponsorEmail" style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Work Email</label>
          <input type="email" id="sponsorEmail" class="input" placeholder="alex@company.com" required>
        </div>

        <div>
          <label for="sponsorTierSelect" style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Sponsorship Tier</label>
          <select id="sponsorTierSelect" class="input" style="cursor:pointer;">
            <option value="Starter ($99/mo)">Starter · 20,000+ impressions · $99/mo</option>
            <option value="Growth Pro ($249/mo)" selected>Growth Pro · 60,000+ impressions · $249/mo (Most Popular)</option>
            <option value="Title Partner ($599/mo)">Title Partner · 150,000+ impressions + Logo · $599/mo</option>
            <option value="Custom Partnership">Custom Partnership / High Volume</option>
          </select>
        </div>

        <div>
          <label for="sponsorUrl" style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Destination / Landing Page URL</label>
          <input type="url" id="sponsorUrl" class="input mono" placeholder="https://yourcompany.com" required>
        </div>

        <div>
          <label for="sponsorNotes" style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Brief Pitch / Ad Text (Optional)</label>
          <input type="text" id="sponsorNotes" class="input" placeholder="e.g. Serverless Postgres with instant branching">
        </div>

        <button type="submit" class="btn btn-primary" id="btnSubmitSponsor" style="margin-top:4px; width:100%; justify-content:center;">
          <span>Submit Sponsorship Inquiry</span>
          <span class="btn-icon">→</span>
        </button>

        <div id="sponsorSuccessBox" style="display:none; padding:12px; background:var(--obsidian); border:1px solid var(--line-strong); border-radius:var(--radius-md); font-size:12px; line-height:1.6; color:var(--text-soft);">
          <div style="font-weight:600; color:var(--success-text); margin-bottom:4px;">✔ Inquiry Prepared!</div>
          If your email app didn't launch automatically, email us directly:
          <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
            <code style="color:var(--text); font-size:12px; background:var(--graphite); padding:2px 8px; border-radius:4px;">support@ethiccode.in</code>
            <button type="button" class="btn btn-secondary" onclick="copySupportEmail(this)" style="padding:3px 10px; font-size:11px;">Copy</button>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px; font-size:12px; color:var(--text-faint);">
          <span>Direct partner contact:</span>
          <button type="button" class="btn btn-ghost" onclick="copySupportEmail(this)" style="padding:2px 6px; font-size:12px; color:var(--sindoor-text);">
            support@ethiccode.in 📋
          </button>
        </div>
      </form>
    </div>
  </div>

  <script>
    function openSponsorModal(tier) {
      const modal = document.getElementById('sponsorModal');
      const select = document.getElementById('sponsorTierSelect');
      if (select && tier) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.toLowerCase().includes(tier.toLowerCase())) {
            select.selectedIndex = i;
            break;
          }
        }
      }
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      const firstInput = document.getElementById('sponsorCompany');
      if (firstInput) firstInput.focus();
    }

    function closeSponsorModal() {
      const modal = document.getElementById('sponsorModal');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }

    function copySupportEmail(btn) {
      const email = 'support@ethiccode.in';
      navigator.clipboard.writeText(email).then(() => {
        const orig = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => { btn.innerText = orig; }, 2000);
      }).catch(() => {
        prompt('Copy support email:', email);
      });
    }

    function handleSponsorSubmit(e) {
      e.preventDefault();
      const company = document.getElementById('sponsorCompany').value.trim();
      const email = document.getElementById('sponsorEmail').value.trim();
      const tier = document.getElementById('sponsorTierSelect').value;
      const url = document.getElementById('sponsorUrl').value.trim();
      const notes = document.getElementById('sponsorNotes').value.trim();

      const subject = encodeURIComponent('tdrop Sponsorship Inquiry: ' + company);
      const body = encodeURIComponent(
        'Company / Tool: ' + company + '\\n' +
        'Contact Email: ' + email + '\\n' +
        'Selected Package: ' + tier + '\\n' +
        'Destination URL: ' + url + '\\n' +
        (notes ? ('Notes / Pitch: ' + notes + '\\n') : '') +
        '\\nHello tdrop team,\\nWe would like to discuss sponsoring tdrop terminal runs and web downloads.'
      );

      // Show inline confirmation with copyable support email fallback
      const successBox = document.getElementById('sponsorSuccessBox');
      if (successBox) {
        successBox.style.display = 'block';
      }

      // Try triggering mailto link
      const mailtoLink = 'mailto:support@ethiccode.in?subject=' + subject + '&body=' + body;
      const dummyAnchor = document.createElement('a');
      dummyAnchor.href = mailtoLink;
      dummyAnchor.click();
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSponsorModal();
    });
  </script>

  ${renderCinnabarFooter(domain)}
</body>
</html>`;
}
