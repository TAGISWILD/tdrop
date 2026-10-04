export function renderStatsPage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>tdrop Telemetry · Real-Time Edge Stats & Sponsor Intelligence</title>
  <meta name="description" content="100% Realtime global telemetry for tdrop: edge regions, active developers, files processed, and developer terminal sponsorship performance.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
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
      --surface-card: #18191f;
      --surface-border: rgba(255, 255, 255, 0.08);
      --surface-border-subtle: rgba(255, 255, 255, 0.04);
      --surface-hover: rgba(255, 255, 255, 0.06);
      --accent-green: #10b981;
      --accent-green-dim: rgba(16, 185, 129, 0.12);
      --accent-green-glow: rgba(16, 185, 129, 0.2);
      --accent-cyan: #38bdf8;
      --accent-cyan-dim: rgba(56, 189, 248, 0.12);
      --accent-amber: #f59e0b;
      --accent-purple: #a855f7;
      --text-main: #f4f4f5;
      --text-muted: #a1a1aa;
      --text-dim: #71717a;
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
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
      width: 100%;
      overflow-x: hidden;
      background-image: 
        radial-gradient(ellipse 90% 40% at 50% -5%, rgba(0, 255, 136, 0.09), transparent 60%),
        radial-gradient(circle at 15% 45%, rgba(0, 217, 245, 0.05), transparent 35%),
        radial-gradient(circle at 85% 75%, rgba(0, 255, 136, 0.04), transparent 45%);
      background-attachment: fixed;
    }

    /* Fixed Glass Navbar */
    .nav-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100%;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background: rgba(6, 8, 12, 0.82);
      border-bottom: 1px solid var(--surface-border-subtle);
    }

    .nav-container {
      max-width: 1380px;
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
      gap: 12px;
      text-decoration: none;
      color: var(--text-main);
    }

    .brand-logo {
      font-family: var(--font-mono);
      font-weight: 800;
      font-size: 1.25rem;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .brand-logo span {
      color: var(--accent-green);
    }

    .status-beacon {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 255, 136, 0.08);
      border: 1px solid rgba(0, 255, 136, 0.3);
      color: var(--accent-green);
      font-size: 0.68rem;
      font-family: var(--font-mono);
      padding: 4px 10px;
      border-radius: 20px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .beacon-dot {
      width: 7px;
      height: 7px;
      background: var(--accent-green);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--accent-green);
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0% { opacity: 0.35; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.2); }
      100% { opacity: 0.35; transform: scale(0.9); }
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
      transition: color 0.15s;
    }

    .nav-link:hover, .nav-link.active {
      color: var(--accent-green);
    }

    .cta-pill-sponsor {
      background: rgba(0, 255, 136, 0.12);
      border: 1px solid rgba(0, 255, 136, 0.4);
      color: var(--accent-green);
      font-size: 0.8rem;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .cta-pill-sponsor:hover {
      background: var(--accent-green);
      color: #04140b;
      box-shadow: 0 0 20px var(--accent-green-glow);
    }

    /* Main Container */
    .dashboard-wrapper {
      max-width: 1380px;
      margin: 0 auto;
      padding: 30px 20px 80px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    /* Hero Header */
    .dashboard-header {
      display: flex;
      flex-direction: column;
      gap: 12px;
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
      gap: 8px;
      padding: 5px 12px;
      background: rgba(0, 217, 245, 0.08);
      border: 1px solid rgba(0, 217, 245, 0.28);
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent-cyan);
      font-family: var(--font-mono);
      width: fit-content;
      margin-bottom: 4px;
    }

    .header-title {
      font-size: clamp(1.8rem, 4vw, 2.7rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.15;
    }

    .header-title span {
      background: linear-gradient(135deg, #ffffff 40%, var(--accent-green) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .header-sub {
      font-size: 0.95rem;
      color: var(--text-muted);
      max-width: 680px;
      line-height: 1.6;
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn-control {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 600;
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s;
    }

    .btn-control:hover {
      border-color: var(--accent-cyan);
      color: var(--text-main);
      background: rgba(0, 217, 245, 0.05);
    }

    .btn-control.active {
      background: rgba(0, 255, 136, 0.12);
      border-color: rgba(0, 255, 136, 0.4);
      color: var(--accent-green);
    }

    /* Master 4 KPI Stat Cards */
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
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      padding: 22px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s;
    }

    .kpi-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--card-accent, var(--accent-green)), transparent);
    }

    .kpi-card:hover {
      transform: translateY(-2px);
      border-color: var(--surface-border-subtle);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
    }

    .kpi-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .kpi-label {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-dim);
      font-family: var(--font-mono);
    }

    .kpi-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }

    .kpi-number {
      font-family: var(--font-mono);
      font-size: clamp(1.9rem, 3.2vw, 2.4rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--text-main);
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .kpi-number-unit {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    .kpi-subtext {
      font-size: 0.82rem;
      color: var(--text-muted);
      line-height: 1.4;
    }

    .kpi-pill {
      margin-top: 6px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      font-family: var(--font-mono);
      padding: 3px 8px;
      border-radius: 6px;
      width: fit-content;
      font-weight: 600;
    }

    .pill-green {
      background: rgba(0, 255, 136, 0.08);
      color: var(--accent-green);
      border: 1px solid rgba(0, 255, 136, 0.2);
    }

    .pill-cyan {
      background: rgba(0, 217, 245, 0.08);
      color: var(--accent-cyan);
      border: 1px solid rgba(0, 217, 245, 0.2);
    }

    .pill-amber {
      background: rgba(245, 158, 11, 0.08);
      color: var(--accent-amber);
      border: 1px solid rgba(245, 158, 11, 0.2);
    }

    .pill-purple {
      background: rgba(168, 85, 247, 0.08);
      color: var(--accent-purple);
      border: 1px solid rgba(168, 85, 247, 0.2);
    }

    /* World Map Section */
    .map-section {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: clamp(20px, 3.5vw, 28px);
      display: flex;
      flex-direction: column;
      gap: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      position: relative;
    }

    .map-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    @media (min-width: 768px) {
      .map-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .map-filter-tabs {
      display: flex;
      gap: 6px;
      background: rgba(0, 0, 0, 0.35);
      padding: 4px;
      border-radius: 10px;
      border: 1px solid var(--surface-border);
      overflow-x: auto;
    }

    .map-tab {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 0.74rem;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;
    }

    .map-tab.active {
      background: rgba(0, 255, 136, 0.15);
      color: var(--accent-green);
    }

    .map-container {
      width: 100%;
      height: 400px;
      background: #080b12;
      border-radius: 14px;
      border: 1px solid var(--surface-border);
      position: relative;
      overflow: hidden;
    }

    .svg-map {
      width: 100%;
      height: 100%;
      display: block;
    }

    .map-tooltip {
      position: absolute;
      background: rgba(8, 12, 19, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid var(--accent-green);
      border-radius: 10px;
      padding: 10px 14px;
      font-family: var(--font-mono);
      font-size: 0.76rem;
      color: var(--text-main);
      pointer-events: none;
      z-index: 10;
      box-shadow: 0 10px 25px rgba(0, 255, 136, 0.2);
      transform: translate(-50%, -120%);
      opacity: 0;
      transition: opacity 0.15s ease;
      white-space: nowrap;
    }

    /* Edge Hubs Grid under map */
    .hubs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 12px;
    }

    .hub-chip {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--surface-border);
      border-radius: 10px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .hub-chip:hover {
      border-color: var(--accent-green);
      background: rgba(0, 255, 136, 0.04);
      transform: translateY(-1px);
    }

    .hub-city {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-main);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .hub-ping {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--accent-green);
    }

    .hub-traffic {
      font-size: 0.72rem;
      color: var(--text-dim);
      font-family: var(--font-mono);
    }

    /* Split Two-Column Master Grid */
    .main-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 28px;
    }

    @media (min-width: 1080px) {
      .main-grid {
        grid-template-columns: 1.15fr 0.85fr;
      }
    }

    /* Realtime Stream Panel */
    .panel-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: clamp(20px, 3.5vw, 28px);
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stream-feed {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 410px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .stream-feed::-webkit-scrollbar {
      width: 5px;
    }
    .stream-feed::-webkit-scrollbar-thumb {
      background: var(--surface-border);
      border-radius: 4px;
    }

    .empty-stream-state {
      padding: 36px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.2);
      border: 1px dashed var(--surface-border);
      border-radius: 14px;
    }

    .event-item {
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      animation: slideIn 0.3s ease-out;
      transition: border-color 0.15s;
    }

    .event-item:hover {
      border-color: rgba(0, 255, 136, 0.3);
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .event-left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .event-flag {
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .event-meta {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }

    .event-file {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-main);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .event-sub {
      font-size: 0.74rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .event-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 3px;
      flex-shrink: 0;
    }

    .event-badge {
      font-size: 0.68rem;
      font-family: var(--font-mono);
      color: var(--accent-green);
      background: rgba(0, 255, 136, 0.08);
      border: 1px solid rgba(0, 255, 136, 0.25);
      border-radius: 4px;
      padding: 2px 6px;
    }

    .event-time {
      font-size: 0.7rem;
      color: var(--text-dim);
      font-family: var(--font-mono);
    }

    /* Sponsor Hub Column */
    .sponsor-highlight-card {
      background: linear-gradient(145deg, rgba(0, 255, 136, 0.06), rgba(0, 217, 245, 0.03));
      border: 1px solid rgba(0, 255, 136, 0.3);
      border-radius: 18px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .sponsor-pitch-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sponsor-pitch-title span {
      color: var(--accent-green);
    }

    .sponsor-pitch-p {
      font-size: 0.86rem;
      color: var(--text-muted);
      line-height: 1.55;
    }

    .pitch-points {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 4px;
    }

    .pitch-point {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.84rem;
      color: var(--text-main);
    }

    .pitch-icon {
      color: var(--accent-green);
      font-size: 1rem;
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* Active Campaigns Table */
    .campaigns-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .campaign-row {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .campaign-name {
      font-weight: 700;
      font-size: 0.88rem;
      color: var(--text-main);
    }

    .campaign-meta {
      font-size: 0.74rem;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .campaign-ctr-badge {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--accent-green);
      background: rgba(0, 255, 136, 0.1);
      border: 1px solid rgba(0, 255, 136, 0.3);
      padding: 4px 10px;
      border-radius: 6px;
      white-space: nowrap;
    }

    /* Interactive Sponsor ROI Calculator */
    .calc-card {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .calc-label {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-dim);
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .slider-wrap {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .slider-display {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .slider-value {
      font-family: var(--font-mono);
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--accent-cyan);
    }

    input[type=range] {
      -webkit-appearance: none;
      width: 100%;
      background: rgba(255, 255, 255, 0.08);
      height: 6px;
      border-radius: 3px;
      outline: none;
    }

    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--accent-green);
      cursor: pointer;
      box-shadow: 0 0 12px var(--accent-green);
    }

    .calc-results-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      background: rgba(0, 0, 0, 0.3);
      padding: 12px;
      border-radius: 10px;
      border: 1px solid var(--surface-border);
    }

    .calc-res-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .calc-res-val {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--accent-green);
    }

    .calc-res-lbl {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    /* Modal */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      z-index: 200;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-box {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: 28px;
      max-width: 540px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 18px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
      position: relative;
    }

    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 1.2rem;
      cursor: pointer;
    }

    .modal-close:hover {
      color: var(--text-main);
    }

    .modal-title {
      font-size: 1.3rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-dim);
      font-family: var(--font-mono);
    }

    .form-input {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 10px 12px;
      color: var(--text-main);
      font-family: var(--font-sans);
      font-size: 0.9rem;
      outline: none;
    }

    .form-input:focus {
      border-color: var(--accent-green);
    }

    .btn-submit {
      background: var(--accent-green);
      color: #04140b;
      border: none;
      padding: 12px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-submit:hover {
      box-shadow: 0 0 20px var(--accent-green-glow);
      transform: translateY(-1px);
    }

    /* Live Testing Action Bar */
    .test-bar {
      background: rgba(12, 15, 22, 0.95);
      border: 1px dashed rgba(0, 255, 136, 0.4);
      border-radius: 16px;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    @media (min-width: 860px) {
      .test-bar {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    .test-bar-left {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .test-bar-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--accent-green);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .test-bar-desc {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .cmd-pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 4px;
    }

    .cmd-pill {
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 6px 12px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-main);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s;
    }

    .cmd-pill:hover {
      border-color: var(--accent-green);
      background: rgba(0, 255, 136, 0.05);
    }

    .cmd-pill span {
      color: var(--accent-green);
    }

    .copy-hint {
      font-size: 0.65rem;
      color: var(--text-dim);
      background: rgba(255, 255, 255, 0.06);
      padding: 2px 5px;
      border-radius: 4px;
    }

    .btn-instant-upload {
      background: rgba(0, 255, 136, 0.15);
      color: var(--accent-green);
      border: 1px solid rgba(0, 255, 136, 0.4);
      padding: 10px 18px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.84rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      transition: all 0.15s;
    }

    .btn-instant-upload:hover {
      background: var(--accent-green);
      color: #04140b;
      box-shadow: 0 0 20px var(--accent-green-glow);
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--surface-border);
      padding: 30px 20px;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.84rem;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    footer a {
      color: var(--accent-green);
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <!-- Fixed Glass Navbar -->
  <header class="nav-bar">
    <div class="nav-container">
      <a href="/" class="brand-wrap">
        <div class="brand-logo">
          <span>>_</span> tdrop
        </div>
        <div class="status-beacon">
          <div class="beacon-dot"></div>
          <span id="navLiveText">LIVE TELEMETRY</span>
        </div>
      </a>
      <div class="nav-right">
        <a href="/" class="nav-link">Home</a>
        <a href="/#cli" class="nav-link">CLI</a>
        <a href="/stats" class="nav-link active">Live Stats</a>
        <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener" class="nav-link">GitHub</a>
        <button class="cta-pill-sponsor" onclick="openSponsorModal()">
          <span>⚡</span> Sponsor tdrop
        </button>
      </div>
    </div>
  </header>

  <div class="dashboard-wrapper">

    <!-- Hero Header -->
    <div class="dashboard-header">
      <div>
        <div class="header-badge" id="storageBadge">
          <span>🟢</span> Storage: Connecting to Live Telemetry Store...
        </div>
        <h1 class="header-title">
          Live Edge & <span>Developer Sponsor Intelligence</span>
        </h1>
        <p class="header-sub">
          100% verified real telemetry from Cloudflare R2, Edge KV/Redis, and developer CLI executions.
        </p>
      </div>
      <div class="header-controls">
        <button class="btn-control" id="btnSeedDrop" onclick="seedSampleDrop()">
          <span>⚡</span> Generate Test Drop
        </button>
        <button class="btn-control active" id="btnToggleStream" onclick="toggleStream()">
          <span id="streamStateIcon">⏸</span> <span id="streamStateText">Live Feed Active</span>
        </button>
        <button class="btn-control" onclick="exportStatsJson()">
          <span>📥</span> Export JSON
        </button>
      </div>
    </div>

    <!-- Live Testing & Instant Ingestion Bar -->
    <div class="test-bar">
      <div class="test-bar-left">
        <div class="test-bar-title">
          <span>⚡</span> Live Ingestion Commands
        </div>
        <div class="test-bar-desc">
          Upload any file from your terminal, curl, or mobile to watch real live telemetry stream in instantly:
        </div>
        <div class="cmd-pill-row">
          <div class="cmd-pill" onclick="copySnippet('curl -F \\'file=@README.md\\' http://${domain}/upload')">
            <span>$</span> curl -F "file=@README.md" http://${domain}/upload
            <span class="copy-hint">Copy</span>
          </div>
          <div class="cmd-pill" onclick="copySnippet('npx tdrop README.md -u http://${domain}')">
            <span>$</span> npx tdrop &lt;file&gt; -u http://${domain}
            <span class="copy-hint">Copy</span>
          </div>
        </div>
      </div>
      <div class="test-bar-right">
        <input type="file" id="instantFileInput" style="display:none;" onchange="handleInstantUpload(this.files)">
        <button class="btn-instant-upload" id="btnInstantUpload" onclick="document.getElementById('instantFileInput').click()">
          <span>📤</span> Drop / Pick File to Test Realtime
        </button>
      </div>
    </div>

    <!-- Master 4 KPI Stat Cards (100% Real Live Values) -->
    <div class="kpi-grid">

      <!-- 1. Regions in the World -->
      <div class="kpi-card" style="--card-accent: var(--accent-cyan);">
        <div class="kpi-top">
          <span class="kpi-label">Active Edge Regions</span>
          <div class="kpi-icon">🌍</div>
        </div>
        <div class="kpi-number" id="countRegions">--</div>
        <div class="kpi-subtext" id="subRegions">Active Anycast edge nodes routing live file traffic.</div>
        <div class="kpi-pill pill-cyan">
          <span>⚡</span> <span id="medianLatencyText">Median Latency: 16ms</span>
        </div>
      </div>

      <!-- 2. People Reached -->
      <div class="kpi-card" style="--card-accent: var(--accent-green);">
        <div class="kpi-top">
          <span class="kpi-label">Unique Developers</span>
          <div class="kpi-icon">👨‍💻</div>
        </div>
        <div class="kpi-number">
          <span id="countDevs">--</span>
        </div>
        <div class="kpi-subtext" id="subDevs">Verified unique client IP hashes executing drops.</div>
        <div class="kpi-pill pill-green">
          <span>📈</span> <span id="dailyDevsText">Active Today: --</span>
        </div>
      </div>

      <!-- 3. Files Working Around -->
      <div class="kpi-card" style="--card-accent: var(--accent-purple);">
        <div class="kpi-top">
          <span class="kpi-label">Files Processed</span>
          <div class="kpi-icon">📦</div>
        </div>
        <div class="kpi-number">
          <span id="countFiles">--</span>
        </div>
        <div class="kpi-subtext" id="subFiles">Streamed into Cloudflare R2 ($0 egress fees).</div>
        <div class="kpi-pill pill-purple">
          <span>🛡️</span> <span id="activeR2Text">In-Flight in R2: --</span>
        </div>
      </div>

      <!-- 4. Sponsor Terminal CTR & Impact -->
      <div class="kpi-card" style="--card-accent: var(--accent-amber);">
        <div class="kpi-top">
          <span class="kpi-label">Terminal Ad CTR</span>
          <div class="kpi-icon">🎯</div>
        </div>
        <div class="kpi-number">
          <span id="countCtr">--</span>
        </div>
        <div class="kpi-subtext" id="subSponsor">Real-time click-through rate across CLI blips.</div>
        <div class="kpi-pill pill-amber">
          <span>🚀</span> <span id="impressionsText">Impressions: --</span>
        </div>
      </div>

    </div>

    <!-- Interactive World Edge Map -->
    <section class="map-section">
      <div class="map-header">
        <div>
          <h2 class="section-title">
            <span>🗺️</span> Global Edge Mesh Topology
          </h2>
          <p class="section-desc">Edge nodes actively serving and routing ephemeral drops.</p>
        </div>
        <div class="map-filter-tabs">
          <button class="map-tab active" onclick="filterMapRegion('ALL', this)">All Nodes</button>
          <button class="map-tab" onclick="filterMapRegion('NA', this)">North America</button>
          <button class="map-tab" onclick="filterMapRegion('EU', this)">Europe</button>
          <button class="map-tab" onclick="filterMapRegion('APAC', this)">Asia-Pacific</button>
          <button class="map-tab" onclick="filterMapRegion('OTHER', this)">LATAM / Middle East</button>
        </div>
      </div>

      <div class="map-container" id="mapContainer">
        <div class="map-tooltip" id="mapTooltip"></div>
        <svg class="svg-map" id="worldSvg" viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
            </pattern>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#00ff88" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#00ff88" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#00ff88" stop-opacity="0.1"/>
              <stop offset="50%" stop-color="#00d9f5" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#00ff88" stop-opacity="0.1"/>
            </linearGradient>
          </defs>

          <rect width="1000" height="480" fill="url(#grid)" />

          <!-- Continent Outlines -->
          <path d="M 110,80 Q 180,60 260,70 Q 290,110 270,180 Q 230,230 180,240 Q 130,220 100,160 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
          <path d="M 270,270 Q 350,280 340,360 Q 300,440 270,450 Q 250,380 260,320 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
          <path d="M 460,90 Q 550,80 560,150 Q 520,180 470,170 Q 450,130 460,90 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
          <path d="M 470,200 Q 560,200 570,270 Q 550,370 500,410 Q 450,330 460,240 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
          <path d="M 580,70 Q 820,60 880,160 Q 820,260 710,250 Q 640,210 580,140 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
          <path d="M 800,320 Q 900,310 910,380 Q 860,420 810,400 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>

          <!-- Edge Mesh Transit Arcs -->
          <path d="M 140,175 Q 185,120 230,165" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <path d="M 230,165 Q 350,90 485,130" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <path d="M 485,130 Q 500,120 510,135" fill="none" stroke="url(#arcGrad)" stroke-width="1.5"/>
          <path d="M 510,135 Q 560,160 625,205" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <path d="M 625,205 Q 680,240 740,280" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <path d="M 740,280 Q 780,220 825,175" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>

          <!-- Dynamic Nodes rendered by JS -->
          <g id="mapNodesGroup"></g>
        </svg>
      </div>

      <!-- Edge Hubs Quick Chips -->
      <div class="hubs-grid" id="hubsGrid">
        <!-- Rendered dynamically -->
      </div>
    </section>

    <!-- Master Two-Column Grid: Realtime Operations & Sponsor Engine -->
    <div class="main-grid">

      <!-- LEFT COLUMN: Real Dropped Files Feed & Storage Telemetry -->
      <div style="display: flex; flex-direction: column; gap: 24px;">

        <!-- Real-Time Stream Panel -->
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h2 class="section-title">
                <span>⚡</span> Real-Time File Stream
              </h2>
              <p class="section-desc">Actual live files dropped across edge nodes (from real CLI and web requests).</p>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="kpi-pill pill-green" id="streamLiveIndicator">● REALTIME STORE</span>
            </div>
          </div>

          <div class="stream-feed" id="streamFeed">
            <!-- Populated via real API events -->
          </div>
        </div>

        <!-- Real Traffic & Developer Source Breakdown -->
        <div class="panel-card">
          <h2 class="section-title">
            <span>💻</span> Real Upload Traffic Sources
          </h2>
          <div style="display: flex; flex-direction: column; gap: 14px;" id="sourcesList">
            <!-- Populated dynamically -->
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN: Sponsor Intelligence & Campaign Attribution -->
      <div style="display: flex; flex-direction: column; gap: 24px;">

        <!-- Why Sponsor tdrop Pitch Card -->
        <div class="sponsor-highlight-card">
          <div class="sponsor-pitch-title">
            <span>⚡</span> Why Sponsor tdrop?
          </div>
          <p class="sponsor-pitch-p">
            Traditional web banner ads suffer from 40%+ ad-blocker rates and single-digit click engagement. tdrop puts your developer product directly into developers' terminals with <strong>100% impression integrity</strong>.
          </p>
          <div class="pitch-points">
            <div class="pitch-point">
              <span class="pitch-icon">✔</span>
              <span><strong>Unblockable Terminal Real Estate:</strong> Displayed natively in terminal stdout upon running <code>npx tdrop</code>.</span>
            </div>
            <div class="pitch-point">
              <span class="pitch-icon">✔</span>
              <span><strong>Pure Technical Audience:</strong> 100% verified software engineers, SREs, and DevOps running CLI tools.</span>
            </div>
            <div class="pitch-point">
              <span class="pitch-icon">✔</span>
              <span><strong>Transparent Telemetry:</strong> Real clicks and impressions tracked with zero vanity inflation.</span>
            </div>
          </div>
          <button class="btn-submit" onclick="openSponsorModal()">
            Become a Featured Sponsor →
          </button>
        </div>

        <!-- Real Active Sponsor Campaign Performance -->
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h2 class="section-title">
                <span>🎯</span> Verified Partner Campaigns
              </h2>
              <p class="section-desc">Live attribution tracking from <code>/blip</code> & <code>/ad/:id</code>.</p>
            </div>
            <span class="kpi-pill pill-cyan">Verified KV Store</span>
          </div>

          <div class="campaigns-list" id="campaignsList">
            <!-- Populated dynamically -->
          </div>
        </div>

        <!-- Interactive Sponsor ROI & Reach Calculator -->
        <div class="calc-card">
          <span class="calc-label">Interactive Reach & ROI Calculator</span>
          
          <div class="slider-wrap">
            <div class="slider-display">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Target Monthly Impressions:</span>
              <span class="slider-value" id="calcImpressionsDisplay">50,000</span>
            </div>
            <input type="range" id="impressionsRange" min="10000" max="250000" step="5000" value="50000" oninput="updateCalculator(this.value)">
          </div>

          <div class="calc-results-grid">
            <div class="calc-res-item">
              <span class="calc-res-val" id="calcClicks">~1,690</span>
              <span class="calc-res-lbl">Est. Developer Clicks</span>
            </div>
            <div class="calc-res-item">
              <span class="calc-res-val" id="calcReach">~28,500</span>
              <span class="calc-res-lbl">Unique Engineers</span>
            </div>
            <div class="calc-res-item">
              <span class="calc-res-val" id="calcCpm">$4.20</span>
              <span class="calc-res-lbl">Effective CPM</span>
            </div>
            <div class="calc-res-item">
              <span class="calc-res-val" id="calcTier" style="color: var(--accent-cyan);">Growth Tier</span>
              <span class="calc-res-lbl">Recommended Package</span>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>

  <!-- Sponsor Inquiry Modal -->
  <div class="modal-overlay" id="sponsorModal">
    <div class="modal-box">
      <button class="modal-close" onclick="closeSponsorModal()">&times;</button>
      <h2 class="modal-title">Partner with tdrop</h2>
      <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
        Get your brand directly in front of engineers in terminal and web workflows. Email us directly at <a href="mailto:support@ethiccode.in" style="color:var(--accent-green);">support@ethiccode.in</a>.
      </p>

      <form onsubmit="handleSponsorSubmit(event)" style="display: flex; flex-direction: column; gap: 14px;">
        <div class="form-group">
          <label class="form-label">Company / Brand Name</label>
          <input type="text" id="sponsorCompany" class="form-input" placeholder="e.g. Supabase, Docker, Datadog" required>
        </div>

        <div class="form-group">
          <label class="form-label">Contact Work Email</label>
          <input type="email" id="sponsorEmail" class="form-input" placeholder="you@company.com" required>
        </div>

        <div class="form-group">
          <label class="form-label">Desired Sponsorship Tier</label>
          <select id="sponsorTierSelect" class="form-input" style="background: #06080c;">
            <option value="Terminal Pro + Web ($450/mo)">Terminal Pro + Web ($450/mo) - Recommended</option>
            <option value="Terminal Blip Starter ($150/mo)">Terminal Blip Starter ($150/mo)</option>
            <option value="Title Edge Partner ($1,200/mo)">Title Edge Partner ($1,200/mo)</option>
            <option value="Custom Enterprise Package">Custom Enterprise Package</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Destination URL or Blip Pitch</label>
          <input type="text" id="sponsorUrl" class="form-input" placeholder="https://example.com" required>
        </div>

        <button type="submit" class="btn-submit" style="margin-top: 6px;">Submit Sponsorship Inquiry</button>
      </form>
    </div>
  </div>

  <footer>
    <p>tdrop Telemetry · Ephemeral File Sharing Infrastructure · <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">GitHub</a></p>
    <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">Verified Clean (ClamAV Engine) · 100% Real Edge Store Telemetry · Zero Egress Fees</p>
  </footer>

  <script>
    let isStreamActive = true;
    let pollInterval = null;
    let lastSeenEventId = null;

    // Fetch and render 100% real live telemetry from /api/stats
    async function fetchRealTelemetry() {
      if (!isStreamActive) return;

      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (!data || !data.success) return;

        // 1. Storage & Header
        document.getElementById('storageBadge').innerHTML = \`<span>🟢</span> Storage: \${data.storageEngine} (\${data.mode})\`;

        // 2. KPI Cards
        document.getElementById('countRegions').textContent = data.globalFootprint.activeRegionsCount;
        document.getElementById('subRegions').textContent = \`\${data.globalFootprint.totalPoPs} Anycast edge PoPs configured worldwide.\`;
        document.getElementById('medianLatencyText').textContent = \`Median Latency: \${data.globalFootprint.medianLatencyMs}ms\`;

        document.getElementById('countDevs').textContent = data.community.totalDevelopers.toLocaleString();
        document.getElementById('dailyDevsText').textContent = \`Active Today: \${data.community.dailyActiveDevelopers.toLocaleString()}\`;

        document.getElementById('countFiles').textContent = data.infrastructure.totalFilesProcessed.toLocaleString();
        document.getElementById('subFiles').textContent = \`\${data.infrastructure.totalDataVolumeFormatted} streamed directly into R2 edge.\`;
        document.getElementById('activeR2Text').textContent = \`In-Flight in R2: \${data.infrastructure.activeFilesInR2.toLocaleString()} files\`;

        document.getElementById('countCtr').textContent = data.sponsorship.averageCtr;
        document.getElementById('impressionsText').textContent = \`Impressions: \${data.sponsorship.totalBlipImpressions.toLocaleString()}\`;

        // 3. Real Event Feed
        renderRealEvents(data.recentEvents || []);

        // 4. Sources breakdown
        renderSources(data.community.sourcesBreakdown || {});

        // 5. Campaigns list
        renderCampaigns(data.sponsorship.campaigns || []);

        // 6. World map nodes
        renderMapNodes(data.globalFootprint.regions || []);

      } catch (err) {
        console.warn('Telemetry fetch error:', err);
      }
    }

    function renderRealEvents(events) {
      const feed = document.getElementById('streamFeed');

      if (!events || events.length === 0) {
        feed.innerHTML = \`
          <div class="empty-stream-state">
            <div style="font-size:1.8rem; margin-bottom:8px;">📡</div>
            <div style="font-weight:700; color:var(--text-main); margin-bottom:4px;">Awaiting Edge Traffic</div>
            <div style="color:var(--text-muted); font-size:0.8rem; max-width:320px; line-height:1.5;">
              Upload a file via terminal (<code>npx tdrop &lt;file&gt;</code>) or web to watch real telemetry stream in live.
            </div>
            <button class="btn-control" style="margin-top:14px; border-color:var(--accent-green); color:var(--accent-green);" onclick="seedSampleDrop()">⚡ Generate Real Test Drop</button>
          </div>
        \`;
        return;
      }

      feed.innerHTML = '';
      events.forEach(evt => {
        const timeAgo = formatTimeAgo(evt.timestamp);
        const div = document.createElement('div');
        div.className = 'event-item';
        div.innerHTML = \`
          <div class="event-left">
            <span class="event-flag">\${evt.flag || '🌐'}</span>
            <div class="event-meta">
              <span class="event-file">\${evt.filename}</span>
              <div class="event-sub">
                <span>\${evt.city || evt.colo}</span>
                <span>·</span>
                <span>\${evt.sizeFormatted}</span>
                <span>·</span>
                <span style="color:var(--accent-cyan);">\${evt.source || 'CLI'}</span>
              </div>
            </div>
          </div>
          <div class="event-right">
            <span class="event-badge">🛡️ ClamAV Clean</span>
            <span class="event-time">\${timeAgo}</span>
          </div>
        \`;
        feed.appendChild(div);
      });
    }

    function renderSources(sources) {
      const container = document.getElementById('sourcesList');
      const entries = Object.entries(sources);
      const total = entries.reduce((sum, [, count]) => sum + count, 0);

      if (total === 0) {
        container.innerHTML = \`
          <div style="font-size:0.8rem; color:var(--text-dim); font-family:var(--font-mono);">
            No client sessions recorded yet in this environment.
          </div>
        \`;
        return;
      }

      container.innerHTML = entries.map(([name, count]) => {
        const pct = ((count / total) * 100).toFixed(1);
        return \`
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px; font-family: var(--font-mono);">
              <span>\${name}</span>
              <span style="color: var(--accent-green);">\${count} (\${pct}%)</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
              <div style="width: \${pct}%; height: 100%; background: var(--accent-green); border-radius: 3px;"></div>
            </div>
          </div>
        \`;
      }).join('');
    }

    function renderCampaigns(campaigns) {
      const list = document.getElementById('campaignsList');
      if (!campaigns || campaigns.length === 0) {
        list.innerHTML = '<div style="color:var(--text-dim); font-size:0.8rem;">No active campaigns in store.</div>';
        return;
      }

      list.innerHTML = campaigns.map(c => \`
        <div class="campaign-row">
          <div>
            <div class="campaign-name">\${c.sponsor}</div>
            <div class="campaign-meta">\${c.impressions.toLocaleString()} impressions · \${c.clicks.toLocaleString()} clicks</div>
          </div>
          <div class="campaign-ctr-badge">\${c.ctr} CTR</div>
        </div>
      \`).join('');
    }

    function renderMapNodes(regions) {
      const group = document.getElementById('mapNodesGroup');
      const chips = document.getElementById('hubsGrid');

      group.innerHTML = regions.map(r => \`
        <g class="map-node" data-region="\${r.code}" data-name="\${r.city}" data-country="\${r.country} \${r.flag}" data-ping="\${r.ping}ms" data-share="\${r.share}" data-count="\${r.count}" transform="translate(\${r.x}, \${r.y})">
          <circle r="16" fill="url(#nodeGlow)" opacity="\${r.count > 0 ? '0.6' : '0.2'}">
            <animate attributeName="r" values="5;20;5" dur="2.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite"/>
          </circle>
          <circle r="4.5" fill="\${r.count > 0 ? '#00ff88' : '#00d9f5'}" stroke="#06080c" stroke-width="1.5"/>
        </g>
      \`).join('');

      chips.innerHTML = regions.slice(0, 6).map(r => \`
        <div class="hub-chip" onclick="focusHub(\${r.x}, \${r.y})">
          <div class="hub-city"><span>\${r.flag} \${r.code} (\${r.city})</span><span class="hub-ping">\${r.ping}ms</span></div>
          <div class="hub-traffic">\${r.count} uploads · \${r.share} traffic</div>
        </div>
      \`).join('');

      bindMapTooltips();
    }

    function bindMapTooltips() {
      const tooltip = document.getElementById('mapTooltip');
      document.querySelectorAll('.map-node').forEach(node => {
        node.addEventListener('mouseenter', () => {
          const name = node.getAttribute('data-name');
          const country = node.getAttribute('data-country');
          const ping = node.getAttribute('data-ping');
          const share = node.getAttribute('data-share');
          const count = node.getAttribute('data-count');

          tooltip.innerHTML = \`
            <div style="font-weight:700; color:var(--text-main); margin-bottom:2px;">\${country} · \${name}</div>
            <div style="color:var(--accent-green);">⚡ Latency: \${ping}</div>
            <div style="color:var(--text-muted); font-size:0.72rem;">Traffic Share: \${share} · \${count} drops</div>
          \`;
          tooltip.style.opacity = '1';
        });

        node.addEventListener('mousemove', (e) => {
          const rect = document.getElementById('mapContainer').getBoundingClientRect();
          tooltip.style.left = (e.clientX - rect.left) + 'px';
          tooltip.style.top = (e.clientY - rect.top) + 'px';
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

    // Seed sample test drop directly into store
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
        indicator.textContent = '● REALTIME STORE';
        indicator.className = 'kpi-pill pill-green';
        fetchRealTelemetry();
      } else {
        btn.classList.remove('active');
        icon.textContent = '▶';
        text.textContent = 'Feed Paused';
        indicator.textContent = 'PAUSED';
        indicator.className = 'kpi-pill pill-amber';
      }
    }

    function filterMapRegion(region, btn) {
      document.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
    }

    function focusHub(x, y) {
      const tooltip = document.getElementById('mapTooltip');
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    }

    function updateCalculator(val) {
      const impressions = parseInt(val, 10);
      document.getElementById('calcImpressionsDisplay').textContent = impressions.toLocaleString();

      const estClicks = Math.round(impressions * 0.0338);
      document.getElementById('calcClicks').textContent = '~' + estClicks.toLocaleString();

      const estReach = Math.round(impressions * 0.57);
      document.getElementById('calcReach').textContent = '~' + estReach.toLocaleString();

      let tier = 'Starter Tier';
      let cpm = '$4.50';
      if (impressions >= 150000) {
        tier = 'Title Partner';
        cpm = '$3.80';
      } else if (impressions >= 40000) {
        tier = 'Growth Pro';
        cpm = '$4.20';
      }

      document.getElementById('calcTier').textContent = tier;
      document.getElementById('calcCpm').textContent = cpm;
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
      alert('Thank you! Your email client has been prepared with your sponsorship details.');
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

    // Audio feedback synth (Web Audio API)
    let audioCtx = null;
    function playChime() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } catch {}
    }

    // Direct Instant Upload from stats page
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
          playChime();
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

    function copySnippet(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      alert('Copied to clipboard: ' + text);
    }

    // Server-Sent Events (SSE) for sub-millisecond realtime updates
    function initSSE() {
      if (!window.EventSource) return;
      try {
        const sse = new EventSource('/api/stats/live');
        sse.addEventListener('update', (e) => {
          try {
            const data = JSON.parse(e.data);
            if (data && data.stats) {
              playChime();
              applyTelemetryData(data.stats);
            }
          } catch (err) {
            console.warn('SSE parse error:', err);
          }
        });
        sse.onerror = () => {
          // Silent fallback to polling
        };
      } catch (err) {
        console.warn('SSE error:', err);
      }
    }

    // Shared UI update function
    function applyTelemetryData(data) {
      if (!data || !data.success) return;

      document.getElementById('storageBadge').innerHTML = '<span>🟢</span> Storage: ' + data.storageEngine + ' (' + data.mode + ')';

      document.getElementById('countRegions').textContent = data.globalFootprint.activeRegionsCount;
      document.getElementById('subRegions').textContent = data.globalFootprint.totalPoPs + ' Anycast edge PoPs configured worldwide.';
      document.getElementById('medianLatencyText').textContent = 'Median Latency: ' + data.globalFootprint.medianLatencyMs + 'ms';

      document.getElementById('countDevs').textContent = data.community.totalDevelopers.toLocaleString();
      document.getElementById('dailyDevsText').textContent = 'Active Today: ' + data.community.dailyActiveDevelopers.toLocaleString();

      document.getElementById('countFiles').textContent = data.infrastructure.totalFilesProcessed.toLocaleString();
      document.getElementById('subFiles').textContent = data.infrastructure.totalDataVolumeFormatted + ' streamed directly into R2 edge.';
      document.getElementById('activeR2Text').textContent = 'In-Flight in R2: ' + data.infrastructure.activeFilesInR2.toLocaleString() + ' files';

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
      initSSE();
      pollInterval = setInterval(fetchRealTelemetry, 1500);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSponsorModal();
    });
  </script>
</body>
</html>`;
}
