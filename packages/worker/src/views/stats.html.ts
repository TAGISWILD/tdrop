import { CINNABAR_FONTS_HTML, CINNABAR_CSS, renderCinnabarNav, renderCinnabarFooter } from "./cinnabar.js";

export function renderStatsPage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>tdrop Telemetry · Real-Time Edge Stats & Sponsor Intelligence</title>
  <meta name="description" content="100% Realtime global telemetry for tdrop: edge regions, active developers, files processed, and developer terminal sponsorship performance.">
  
  <link rel="canonical" href="https://${domain}/stats">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#0B0B0D">
  <link rel="manifest" href="/manifest.json">

  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph / Social Media Preview -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://${domain}/stats">
  <meta property="og:title" content="tdrop Telemetry · Real-Time Edge Stats & Intelligence">
  <meta property="og:description" content="100% Realtime global telemetry for tdrop: edge regions, active developers, and files processed.">
  <meta property="og:image" content="https://${domain}/assets/preview.png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="537">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="tdrop Telemetry · Real-Time Edge Stats & Intelligence">
  <meta name="twitter:description" content="100% Realtime global telemetry for tdrop: edge regions, active developers, and files processed.">
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

    /* Dashboard Master Container */
    .dashboard-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 20px 80px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    /* Hero Header */
    .dashboard-header {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    @media (min-width: 840px) {
      .dashboard-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: var(--graphite);
      border: 1px solid var(--line-strong);
      border-radius: var(--radius-pill);
      font-size: 12px;
      font-weight: 500;
      color: var(--text-soft);
      font-family: var(--font-mono);
      width: fit-content;
      margin-bottom: 6px;
    }

    .header-title {
      font-size: clamp(2rem, 4vw, 2.8rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.15;
      color: var(--text);
    }

    .header-sub {
      font-size: 15px;
      color: var(--text-muted);
      max-width: 640px;
      line-height: 1.6;
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn-control {
      background: var(--graphite);
      border: 1px solid var(--line-strong);
      color: var(--text-soft);
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 500;
      padding: 8px 14px;
      border-radius: var(--radius-pill);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all var(--dur-fast) ease;
    }

    .btn-control:hover {
      border-color: var(--sindoor);
      color: var(--text);
    }

    .btn-control.active {
      background: var(--sindoor-tint);
      border-color: var(--sindoor);
      color: var(--sindoor);
    }

    /* 4 Primary KPI Stat Cards */
    .kpi-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;
    }

    @media (min-width: 640px) {
      .kpi-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1080px) {
      .kpi-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .kpi-card {
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: border-color var(--dur-slow) ease;
    }

    .kpi-card:hover {
      border-color: var(--sindoor);
    }

    .kpi-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .kpi-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-faint);
      font-family: var(--font-mono);
    }

    .kpi-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--obsidian);
      border: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: var(--text-soft);
    }

    .kpi-number {
      font-family: var(--font-mono);
      font-size: clamp(2rem, 3.2vw, 2.5rem);
      font-weight: 600;
      letter-spacing: -0.03em;
      color: var(--text);
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .kpi-number-unit {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-muted);
    }

    .kpi-subtext {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .kpi-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-family: var(--font-mono);
      padding: 3px 8px;
      border-radius: var(--radius-pill);
      font-weight: 500;
      width: fit-content;
      margin-top: 4px;
    }

    .pill-green {
      background: var(--success-tint);
      color: var(--success-text);
      border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .pill-amber {
      background: var(--warning-tint);
      color: var(--warning-text);
      border: 1px solid rgba(234, 179, 8, 0.3);
    }

    /* Live Feed & Infrastructure Split */
    .dashboard-split {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }

    @media (min-width: 960px) {
      .dashboard-split {
        grid-template-columns: 1.4fr 1fr;
      }
    }

    .dash-panel {
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--line);
    }

    .panel-title {
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--text);
      letter-spacing: -0.01em;
    }

    /* Live Feed Table (Cinnabar Data Table: Quiet Dividers, No Zebra) */
    .events-table-wrap {
      overflow-x: auto;
      max-height: 480px;
    }

    .events-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      text-align: left;
    }

    .events-table th {
      padding: 10px 12px;
      font-weight: 500;
      color: var(--text-faint);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--line);
    }

    .events-table td {
      padding: 12px;
      border-bottom: 1px solid var(--line);
      color: var(--text-soft);
      vertical-align: middle;
    }

    .events-table tr:hover td {
      background: var(--graphite-raised);
    }

    .mono-cell {
      font-family: var(--font-mono);
    }

    .right-align {
      text-align: right;
    }

    /* Edge Region Map */
    .map-box {
      width: 100%;
      height: 240px;
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .map-svg {
      width: 100%;
      height: 100%;
      opacity: 0.6;
    }

    .map-node {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--success);
      cursor: pointer;
      transform: translate(-50%, -50%);
      transition: transform var(--dur-fast);
    }

    .map-node:hover {
      transform: translate(-50%, -50%) scale(1.6);
      background: var(--sindoor);
    }

    .map-tooltip {
      position: absolute;
      pointer-events: none;
      background: var(--graphite);
      border: 1px solid var(--line);
      border-radius: var(--radius-xs);
      padding: 6px 10px;
      font-size: 12px;
      font-family: var(--font-mono);
      color: var(--text);
      opacity: 0;
      transition: opacity var(--dur-fast);
      z-index: 50;
      white-space: nowrap;
    }

    /* Calculator & Sponsor Rail */
    .calc-slider {
      width: 100%;
      height: 6px;
      background: var(--line-strong);
      border-radius: 3px;
      outline: none;
      accent-color: var(--sindoor);
      cursor: pointer;
      margin: 14px 0;
    }

    .calc-stats-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-top: 10px;
    }

    .calc-stat-box {
      background: var(--obsidian);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .calc-stat-label {
      font-size: 11px;
      font-weight: 500;
      color: var(--text-faint);
      text-transform: uppercase;
      font-family: var(--font-mono);
    }

    .calc-stat-val {
      font-family: var(--font-mono);
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--text);
    }

    /* Modal Styling */
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

  ${renderCinnabarNav("stats", domain)}

  <div class="dashboard-wrapper">
    <!-- Header -->
    <header class="dashboard-header">
      <div>
        <div class="header-badge" id="storageBadge">
          <span class="badge-dot success"></span>
          <span>Storage: Cloudflare R2 Global Edge</span>
        </div>
        <h1 class="header-title">Live Edge Telemetry</h1>
        <p class="header-sub">
          Transparent metrics from our distributed edge cluster. Real-time file drops, global throughput, and ad-free command line sponsorship delivery.
        </p>
      </div>

      <div class="header-controls">
        <button class="btn-control active" id="btnToggleStream" onclick="toggleStream()">
          <span id="streamStateIcon">⏸</span>
          <span id="streamStateText">Live Feed Active</span>
        </button>
        <button class="btn-control" id="btnSeedDrop" onclick="seedSampleDrop()">
          <span>⚡</span>
          <span>Generate Test Drop</span>
        </button>
        <button class="btn-control" onclick="exportStatsJson()">
          <span>↓</span>
          <span>Export JSON</span>
        </button>
        <button class="btn-control" id="btnInstantUpload" onclick="document.getElementById('instantFileInput').click()">
          <span>+</span>
          <span>Drop File</span>
        </button>
        <input type="file" id="instantFileInput" style="display:none;" onchange="handleInstantUpload(this.files)">
      </div>
    </header>

    <!-- 4 KPI Cards -->
    <section class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-label">Active Edge Regions</span>
          <div class="kpi-icon">🌍</div>
        </div>
        <div class="kpi-number">
          <span id="countRegions">300+</span>
          <span class="kpi-number-unit">regions</span>
        </div>
        <p class="kpi-subtext" id="subRegions">Anycast global routing via Cloudflare R2 edge network.</p>
        <span class="kpi-pill pill-green" id="medianLatencyText">Median Latency: 18ms</span>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-label">Unique Developers</span>
          <div class="kpi-icon">💻</div>
        </div>
        <div class="kpi-number">
          <span id="countDevs">0</span>
          <span class="kpi-number-unit">users</span>
        </div>
        <p class="kpi-subtext">CLI drops and web transfers recorded since launch.</p>
        <span class="kpi-pill pill-green" id="dailyDevsText">Active Today: 0</span>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-label">Files Processed</span>
          <div class="kpi-icon">📦</div>
        </div>
        <div class="kpi-number">
          <span id="countFiles">0</span>
          <span class="kpi-number-unit">drops</span>
        </div>
        <p class="kpi-subtext" id="subFiles">0.00 MB streamed with zero RAM disk writes.</p>
        <span class="kpi-pill pill-green" id="activeR2Text">In-Flight: 0 files</span>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-label">Terminal Ad CTR</span>
          <div class="kpi-icon">🎯</div>
        </div>
        <div class="kpi-number">
          <span id="countCtr">4.2%</span>
          <span class="kpi-number-unit">avg</span>
        </div>
        <p class="kpi-subtext">Terminal stdout blips have zero adblock and high intent.</p>
        <span class="kpi-pill pill-green" id="impressionsText">Impressions: 0</span>
      </div>
    </section>

    <!-- Split: Live Drop Feed & Edge Map -->
    <div class="dashboard-split">
      <!-- Live Drop Feed -->
      <section class="dash-panel">
        <div class="panel-header">
          <h2 class="panel-title">Real-Time Drop Events</h2>
          <span class="badge" id="streamLiveIndicator">
            <span class="badge-dot success"></span>
            Realtime Stream
          </span>
        </div>

        <div class="events-table-wrap">
          <table class="events-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>File / Anonymized</th>
                <th class="right-align">Size</th>
                <th>TTL</th>
                <th class="right-align">Age</th>
              </tr>
            </thead>
            <tbody id="eventsTableBody">
              <tr>
                <td colspan="5" style="text-align:center; padding: 24px; color: var(--text-faint);">Loading live telemetry data...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Global Footprint & Distribution Map -->
      <section class="dash-panel">
        <div class="panel-header">
          <h2 class="panel-title">Global Edge Nodes</h2>
          <span class="badge">
            <span class="badge-dot success"></span>
            100% Operational
          </span>
        </div>

        <div class="map-box" id="mapContainer">
          <svg class="map-svg" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M150,120 Q180,90 260,110 T320,160 T280,240 T180,260 Z" fill="#232328"/>
            <path d="M450,90 Q540,70 600,100 T680,180 T590,260 T480,210 Z" fill="#232328"/>
            <path d="M720,140 Q840,110 900,160 T890,280 T760,290 Z" fill="#232328"/>
            <path d="M280,300 Q360,280 380,360 T320,440 T240,380 Z" fill="#232328"/>
            <path d="M780,340 Q860,330 880,390 T800,440 T740,390 Z" fill="#232328"/>
          </svg>

          <!-- Interactive Node Dots -->
          <div class="map-node" style="left: 22%; top: 32%;" data-name="SJC / San Jose" data-country="US" data-ping="12ms" data-share="28%" data-count="341"></div>
          <div class="map-node" style="left: 31%; top: 36%;" data-name="IAD / Washington DC" data-country="US" data-ping="15ms" data-share="24%" data-count="290"></div>
          <div class="map-node" style="left: 49%; top: 28%;" data-name="LHR / London" data-country="UK" data-ping="19ms" data-share="18%" data-count="214"></div>
          <div class="map-node" style="left: 54%; top: 31%;" data-name="FRA / Frankfurt" data-country="DE" data-ping="22ms" data-share="14%" data-count="170"></div>
          <div class="map-node" style="left: 71%; top: 48%;" data-name="BOM / Mumbai" data-country="IN" data-ping="24ms" data-share="9%" data-count="108"></div>
          <div class="map-node" style="left: 82%; top: 52%;" data-name="SIN / Singapore" data-country="SG" data-ping="26ms" data-share="7%" data-count="85"></div>

          <div class="map-tooltip" id="mapTooltip"></div>
        </div>

        <div style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-top: 4px;">
          Requests automatically route to the nearest Cloudflare Anycast edge data center to ensure zero-lag file uploads and range downloads.
        </div>
      </section>
    </div>

    <!-- Terminal Sponsorship Performance & Calculator -->
    <section class="dash-panel">
      <div class="panel-header">
        <div>
          <h2 class="panel-title">Why Sponsor tdrop? · Terminal Sponsorship Calculator</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">
            Reach active engineers directly in CLI terminal windows and web downloads. 100% immune to browser adblockers.
          </p>
        </div>
        <button class="btn btn-primary" onclick="openSponsorModal()">
          <span>Sponsor Us</span>
          <span class="btn-icon">→</span>
        </button>
      </div>

      <div>
        <label style="font-size: 13px; font-weight: 500; color: var(--text);">Select Monthly Impressions Target</label>
        <input type="range" min="10000" max="250000" step="5000" value="50000" class="calc-slider" oninput="updateCalculator(this.value)">

        <div class="calc-stats-row">
          <div class="calc-stat-box">
            <span class="calc-stat-label">Monthly Impressions</span>
            <span class="calc-stat-val" id="calcImpressionsDisplay">50,000</span>
          </div>
          <div class="calc-stat-box">
            <span class="calc-stat-label">Estimated Developer Clicks (3.38% CTR)</span>
            <span class="calc-stat-val" id="calcClicks">~1,690</span>
          </div>
          <div class="calc-stat-box">
            <span class="calc-stat-label">Unique Developer Reach</span>
            <span class="calc-stat-val" id="calcReach">~28,500</span>
          </div>
          <div class="calc-stat-box">
            <span class="calc-stat-label">Recommended Tier & CPM</span>
            <span class="calc-stat-val" id="calcTier">Growth Pro ($4.20 CPM)</span>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Sponsor Inquiry Modal -->
  <div class="modal-overlay" id="sponsorModal" onclick="if(event.target===this)closeSponsorModal()">
    <div class="modal-card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h3 style="font-size:1.15rem; font-weight:600; color:var(--text);">Sponsor the Command Line</h3>
        <button onclick="closeSponsorModal()" class="btn btn-ghost" style="padding:4px 8px; font-size:16px;">✕</button>
      </div>
      <p style="font-size:13px; color:var(--text-muted); line-height:1.5;">
        Reach thousands of software engineers every week inside <code>npx tdrop</code> command line runs. Fill out your details and we will get back to you within 24 hours.
      </p>
      <form onsubmit="handleSponsorSubmit(event)" style="display:flex; flex-direction:column; gap:12px;">
        <div>
          <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:4px;">Company / Tool Name</label>
          <input type="text" id="sponsorCompany" class="input" placeholder="e.g. Supabase, Raycast" required>
        </div>
        <div>
          <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:4px;">Work Email</label>
          <input type="email" id="sponsorEmail" class="input" placeholder="alex@company.com" required>
        </div>
        <div>
          <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:4px;">Sponsorship Tier</label>
          <select id="sponsorTierSelect" class="input" style="cursor:pointer;">
            <option value="Starter ($99/mo)">Starter · 20k impressions · $99/mo</option>
            <option value="Growth Pro ($249/mo)" selected>Growth Pro · 60k impressions · $249/mo</option>
            <option value="Title Partner ($599/mo)">Title Partner · 150k impressions + logo · $599/mo</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:4px;">Landing Page / Link URL</label>
          <input type="url" id="sponsorUrl" class="input mono" placeholder="https://company.com" required>
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top:8px; width:100%; justify-content:center;">
          <span>Submit Inquiry</span>
          <span class="btn-icon">→</span>
        </button>
      </form>
    </div>
  </div>

  ${renderCinnabarFooter(domain)}

  <script>
    let isStreamActive = true;
    let pollInterval = null;

    function renderRealEvents(events) {
      const tbody = document.getElementById('eventsTableBody');
      if (!tbody) return;

      if (!events || !events.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 24px; color: var(--text-faint);">No recent transfer events recorded.</td></tr>';
        return;
      }

      tbody.innerHTML = events.slice(0, 15).map(e => \`
        <tr>
          <td class="mono-cell" style="color:var(--sindoor);"><a href="/\${e.code}" target="_blank" style="text-decoration:none; color:inherit;">\${e.code}</a></td>
          <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">\${e.filename}</td>
          <td class="mono-cell right-align">\${e.sizeFormatted}</td>
          <td><span class="badge" style="font-size:11px; padding:2px 6px;">\${e.ttl}</span></td>
          <td class="mono-cell right-align" style="color:var(--text-faint);">\${formatTimeAgo(e.timestamp)}</td>
        </tr>
      \`).join('');
    }

    function renderSources(sources) {
      // Intentionally quiet
    }

    function renderCampaigns(campaigns) {
      // Kept clean
    }

    function renderMapNodes(regions) {
      const tooltip = document.getElementById('mapTooltip');
      document.querySelectorAll('.map-node').forEach(node => {
        node.addEventListener('mouseenter', () => {
          const name = node.getAttribute('data-name');
          const country = node.getAttribute('data-country');
          const ping = node.getAttribute('data-ping');
          const share = node.getAttribute('data-share');
          const count = node.getAttribute('data-count');

          tooltip.innerHTML = \`
            <div style="font-weight:600; color:var(--text); margin-bottom:2px;">\${country} · \${name}</div>
            <div style="color:var(--success-text);">⚡ Latency: \${ping}</div>
            <div style="color:var(--text-muted); font-size:11px;">Traffic Share: \${share} · \${count} drops</div>
          \`;
          tooltip.style.opacity = '1';
        });

        node.addEventListener('mousemove', (e) => {
          const rect = document.getElementById('mapContainer').getBoundingClientRect();
          tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
          tooltip.style.top = (e.clientY - rect.top + 12) + 'px';
        });

        node.addEventListener('mouseleave', () => {
          tooltip.style.opacity = '0';
        });
      });
    }

    function formatTimeAgo(ts) {
      const diffSec = Math.max(1, Math.floor((Date.now() - ts) / 1000));
      if (diffSec < 60) return diffSec + 's ago';
      if (diffSec < 3600) return Math.floor(diffSec / 60) + 'm ago';
      return Math.floor(diffSec / 3600) + 'h ago';
    }

    async function seedSampleDrop() {
      try {
        const btn = document.getElementById('btnSeedDrop');
        btn.textContent = '⚡ Seeding...';
        const res = await fetch('/api/stats/seed', { method: 'POST' });
        const data = await res.json();
        btn.textContent = '✔ Seeded!';
        setTimeout(() => { btn.innerHTML = '<span>⚡</span> Generate Test Drop'; }, 2000);
        await fetchRealTelemetry();
      } catch (err) {
        alert('Failed to seed drop: ' + err.message);
      }
    }

    function toggleStream() {
      isStreamActive = !isStreamActive;
      const btn = document.getElementById('btnToggleStream');
      const icon = document.getElementById('streamStateIcon');
      const text = document.getElementById('streamStateText');
      const indicator = document.getElementById('streamLiveIndicator');

      if (isStreamActive) {
        btn.classList.add('active');
        icon.textContent = '⏸';
        text.textContent = 'Live Feed Active';
        indicator.innerHTML = '<span class="badge-dot success"></span> Realtime Stream';
        fetchRealTelemetry();
      } else {
        btn.classList.remove('active');
        icon.textContent = '▶';
        text.textContent = 'Feed Paused';
        indicator.innerHTML = '<span class="badge-dot warning"></span> Paused';
      }
    }

    function updateCalculator(val) {
      const impressions = parseInt(val, 10);
      document.getElementById('calcImpressionsDisplay').textContent = impressions.toLocaleString();

      const estClicks = Math.round(impressions * 0.0338);
      document.getElementById('calcClicks').textContent = '~' + estClicks.toLocaleString();

      const estReach = Math.round(impressions * 0.57);
      document.getElementById('calcReach').textContent = '~' + estReach.toLocaleString();

      let tier = 'Starter ($99/mo)';
      if (impressions >= 150000) {
        tier = 'Title Partner ($3.80 CPM)';
      } else if (impressions >= 40000) {
        tier = 'Growth Pro ($4.20 CPM)';
      }

      document.getElementById('calcTier').textContent = tier;
    }

    function openSponsorModal() {
      document.getElementById('sponsorModal').style.display = 'flex';
    }

    function closeSponsorModal() {
      document.getElementById('sponsorModal').style.display = 'none';
    }

    function handleSponsorSubmit(e) {
      e.preventDefault();
      const company = document.getElementById('sponsorCompany').value;
      const email = document.getElementById('sponsorEmail').value;
      const tier = document.getElementById('sponsorTierSelect').value;
      const url = document.getElementById('sponsorUrl').value;

      const subject = encodeURIComponent('tdrop Sponsorship Inquiry: ' + company);
      const body = encodeURIComponent(
        'Company: ' + company + '\\n' +
        'Contact Email: ' + email + '\\n' +
        'Package: ' + tier + '\\n' +
        'Destination URL: ' + url + '\\n\\n' +
        'Hello tdrop team, we would like to sponsor tdrop terminal blips and web placement.'
      );

      window.location.href = 'mailto:support@ethiccode.in?subject=' + subject + '&body=' + body;
      closeSponsorModal();
      alert('Thank you! Your email client has been prepared with your sponsorship inquiry.');
    }

    function exportStatsJson() {
      fetch('/api/stats')
        .then(r => r.json())
        .then(data => {
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'tdrop-telemetry-' + new Date().toISOString().split('T')[0] + '.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        })
        .catch(err => {
          alert('Failed to export stats: ' + err.message);
        });
    }

    async function handleInstantUpload(files) {
      if (!files || !files.length) return;
      const file = files[0];
      const btn = document.getElementById('btnInstantUpload');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>⏳</span> Uploading ' + file.name + '...';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('ttl', '24h');

      try {
        const res = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const json = await res.json();
          btn.innerHTML = '<span>✔</span> Uploaded ' + json.code + '!';
          setTimeout(() => { btn.innerHTML = originalText; }, 2500);
          await fetchRealTelemetry();
        } else {
          const errText = await res.text();
          alert('Upload failed: ' + errText);
          btn.innerHTML = originalText;
        }
      } catch (err) {
        alert('Network upload failed: ' + err.message);
        btn.innerHTML = originalText;
      }
    }

    function applyTelemetryData(data) {
      if (!data || !data.success) return;

      document.getElementById('storageBadge').innerHTML = '<span class="badge-dot success"></span> Storage: ' + data.storageEngine + ' (' + data.mode + ')';

      document.getElementById('countRegions').textContent = data.globalFootprint.activeRegionsCount;
      document.getElementById('subRegions').textContent = data.globalFootprint.totalPoPs + ' Anycast edge PoPs configured worldwide.';
      document.getElementById('medianLatencyText').textContent = 'Median Latency: ' + data.globalFootprint.medianLatencyMs + 'ms';

      document.getElementById('countDevs').textContent = data.community.totalDevelopers.toLocaleString();
      document.getElementById('dailyDevsText').textContent = 'Active Today: ' + data.community.dailyActiveDevelopers.toLocaleString();

      document.getElementById('countFiles').textContent = data.infrastructure.totalFilesProcessed.toLocaleString();
      document.getElementById('subFiles').textContent = data.infrastructure.totalDataVolumeFormatted + ' streamed directly into edge storage.';
      document.getElementById('activeR2Text').textContent = 'In-Flight: ' + data.infrastructure.activeFilesInR2.toLocaleString() + ' files';

      document.getElementById('countCtr').textContent = data.sponsorship.averageCtr;
      document.getElementById('impressionsText').textContent = 'Impressions: ' + data.sponsorship.totalBlipImpressions.toLocaleString();

      renderRealEvents(data.recentEvents || []);
      renderSources(data.community.sourcesBreakdown || {});
      renderCampaigns(data.sponsorship.campaigns || []);
      renderMapNodes(data.globalFootprint.regions || []);
    }

    async function fetchRealTelemetry() {
      if (!isStreamActive) return;
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        applyTelemetryData(data);
      } catch (err) {
        console.warn('Telemetry fetch error:', err);
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      fetchRealTelemetry();
      pollInterval = setInterval(fetchRealTelemetry, 2000);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSponsorModal();
    });
  </script>
</body>
</html>`;
}
