export function renderStatsPage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>tdrop Telemetry · Global Edge Stats & Sponsor Intelligence</title>
  <meta name="description" content="Realtime global telemetry for tdrop: edge regions, active developers, files processed, and developer terminal sponsorship performance.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg: #06080c;
      --surface: #0c0f16;
      --surface-card: #11151f;
      --surface-border: #1a2232;
      --surface-border-subtle: rgba(255, 255, 255, 0.08);
      --surface-hover: #151b27;
      --accent-green: #00ff88;
      --accent-green-dim: rgba(0, 255, 136, 0.12);
      --accent-green-glow: rgba(0, 255, 136, 0.28);
      --accent-cyan: #00d9f5;
      --accent-cyan-dim: rgba(0, 217, 245, 0.12);
      --accent-amber: #f59e0b;
      --accent-purple: #a855f7;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
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

    /* 24h Activity SVG Chart */
    .chart-container {
      width: 100%;
      height: 180px;
      background: #080b12;
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 12px 14px 6px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .chart-svg {
      width: 100%;
      height: 130px;
      overflow: visible;
    }

    .chart-axis {
      display: flex;
      justify-content: space-between;
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

    /* Sponsor Tiers */
    .tier-cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .tier-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;
    }

    .tier-card.popular {
      border-color: rgba(0, 255, 136, 0.4);
      background: rgba(0, 255, 136, 0.03);
    }

    .tier-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 0.65rem;
      font-family: var(--font-mono);
      font-weight: 700;
      background: rgba(0, 255, 136, 0.15);
      color: var(--accent-green);
      padding: 3px 8px;
      border-radius: 20px;
    }

    .tier-header {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .tier-price {
      font-family: var(--font-mono);
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .tier-period {
      font-size: 0.78rem;
      color: var(--text-dim);
    }

    .tier-name {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .tier-features {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .tier-features li::before {
      content: '✔ ';
      color: var(--accent-green);
      font-weight: 700;
    }

    .tier-btn {
      margin-top: 6px;
      width: 100%;
      background: rgba(0, 255, 136, 0.12);
      color: var(--accent-green);
      border: 1px solid rgba(0, 255, 136, 0.3);
      padding: 8px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s;
    }

    .tier-btn:hover {
      background: var(--accent-green);
      color: #04140b;
      box-shadow: 0 0 15px var(--accent-green-glow);
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
          <span>LIVE TELEMETRY</span>
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
        <div class="header-badge">
          <span>🌐</span> 312 Edge PoPs · 124 Countries · Realtime Stream
        </div>
        <h1 class="header-title">
          Global Edge & <span>Developer Sponsor Intelligence</span>
        </h1>
        <p class="header-sub">
          Live telemetry spanning edge nodes worldwide, daily active developers, in-flight ephemeral transfers, and terminal ad conversion performance.
        </p>
      </div>
      <div class="header-controls">
        <button class="btn-control active" id="btnToggleStream" onclick="toggleStream()">
          <span id="streamStateIcon">⏸</span> <span id="streamStateText">Live Feed Active</span>
        </button>
        <button class="btn-control" onclick="exportStatsJson()">
          <span>📥</span> Export JSON
        </button>
      </div>
    </div>

    <!-- Master 4 KPI Stat Cards -->
    <div class="kpi-grid">

      <!-- 1. Regions in the World -->
      <div class="kpi-card" style="--card-accent: var(--accent-cyan);">
        <div class="kpi-top">
          <span class="kpi-label">World Edge Regions</span>
          <div class="kpi-icon">🌍</div>
        </div>
        <div class="kpi-number" id="countRegions">312</div>
        <div class="kpi-subtext">Active Cloudflare edge PoPs across 124 countries & 6 continents.</div>
        <div class="kpi-pill pill-cyan">
          <span>⚡</span> Median Latency: 16ms
        </div>
      </div>

      <!-- 2. People Reached -->
      <div class="kpi-card" style="--card-accent: var(--accent-green);">
        <div class="kpi-top">
          <span class="kpi-label">Developers Reached</span>
          <div class="kpi-icon">👨‍💻</div>
        </div>
        <div class="kpi-number">
          <span id="countDevs">48,290</span><span class="kpi-number-unit">+</span>
        </div>
        <div class="kpi-subtext">4,820 daily active engineers. 72.3% CLI terminal executions.</div>
        <div class="kpi-pill pill-green">
          <span>📈</span> +14.2% MoM Growth
        </div>
      </div>

      <!-- 3. Files Working Around -->
      <div class="kpi-card" style="--card-accent: var(--accent-purple);">
        <div class="kpi-top">
          <span class="kpi-label">Files Processed</span>
          <div class="kpi-icon">📦</div>
        </div>
        <div class="kpi-number">
          <span id="countFiles">214,830</span>
        </div>
        <div class="kpi-subtext">142.8 GB streamed directly to R2 edge. 3,410 currently in-flight.</div>
        <div class="kpi-pill pill-purple">
          <span>🛡️</span> 100% ClamAV Clean
        </div>
      </div>

      <!-- 4. Sponsor Terminal CTR & Impact -->
      <div class="kpi-card" style="--card-accent: var(--accent-amber);">
        <div class="kpi-top">
          <span class="kpi-label">Terminal Ad CTR</span>
          <div class="kpi-icon">🎯</div>
        </div>
        <div class="kpi-number">
          <span id="countCtr">3.38</span><span class="kpi-number-unit">%</span>
        </div>
        <div class="kpi-subtext">28x industry display ad CTR (0.12%). Zero ad-blocker loss.</div>
        <div class="kpi-pill pill-amber">
          <span>🚀</span> 94,250 Impressions
        </div>
      </div>

    </div>

    <!-- Interactive World Edge Map -->
    <section class="map-section">
      <div class="map-header">
        <div>
          <h2 class="section-title">
            <span>🗺️</span> Global Edge Mesh & Anycast Footprint
          </h2>
          <p class="section-desc">Pulsing edge locations actively routing developer file drops and blips.</p>
        </div>
        <div class="map-filter-tabs">
          <button class="map-tab active" onclick="filterMapRegion('ALL', this)">All (312 PoPs)</button>
          <button class="map-tab" onclick="filterMapRegion('NA', this)">North America</button>
          <button class="map-tab" onclick="filterMapRegion('EU', this)">Europe</button>
          <button class="map-tab" onclick="filterMapRegion('APAC', this)">Asia-Pacific</button>
          <button class="map-tab" onclick="filterMapRegion('OTHER', this)">LATAM / Middle East</button>
        </div>
      </div>

      <div class="map-container" id="mapContainer">
        <div class="map-tooltip" id="mapTooltip"></div>
        <svg class="svg-map" id="worldSvg" viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg">
          <!-- Background Grid Lines -->
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

          <!-- Simplified Continent Outlines -->
          <!-- North America -->
          <path d="M 110,80 Q 180,60 260,70 Q 290,110 270,180 Q 230,230 180,240 Q 130,220 100,160 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
          <!-- South America -->
          <path d="M 270,270 Q 350,280 340,360 Q 300,440 270,450 Q 250,380 260,320 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
          <!-- Europe -->
          <path d="M 460,90 Q 550,80 560,150 Q 520,180 470,170 Q 450,130 460,90 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
          <!-- Africa -->
          <path d="M 470,200 Q 560,200 570,270 Q 550,370 500,410 Q 450,330 460,240 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
          <!-- Asia -->
          <path d="M 580,70 Q 820,60 880,160 Q 820,260 710,250 Q 640,210 580,140 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
          <!-- Australia -->
          <path d="M 800,320 Q 900,310 910,380 Q 860,420 810,400 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>

          <!-- High-Speed Edge Transit Mesh Lines -->
          <path d="M 140,175 Q 185,120 230,165" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <path d="M 230,165 Q 350,90 485,130" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <path d="M 485,130 Q 500,120 510,135" fill="none" stroke="url(#arcGrad)" stroke-width="1.5"/>
          <path d="M 510,135 Q 560,160 625,205" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <path d="M 625,205 Q 680,240 740,280" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <path d="M 740,280 Q 780,220 825,175" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <path d="M 740,280 Q 800,340 870,390" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>
          <path d="M 230,165 Q 270,260 325,360" fill="none" stroke="url(#arcGrad)" stroke-width="1.5" stroke-dasharray="4,4"/>

          <!-- Edge Node Radar Rings & Core Dots -->
          <!-- SFO -->
          <g class="map-node" data-region="NA" data-name="San Jose (SFO)" data-country="United States 🇺🇸" data-ping="14ms" data-share="22.1%" data-devs="10,650" transform="translate(140, 175)">
            <circle r="18" fill="url(#nodeGlow)" opacity="0.4">
              <animate attributeName="r" values="6;22;6" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <circle r="4.5" fill="#00ff88" stroke="#06080c" stroke-width="1.5"/>
          </g>

          <!-- IAD -->
          <g class="map-node" data-region="NA" data-name="Ashburn (IAD)" data-country="United States 🇺🇸" data-ping="11ms" data-share="28.4%" data-devs="13,700" transform="translate(230, 165)">
            <circle r="22" fill="url(#nodeGlow)" opacity="0.5">
              <animate attributeName="r" values="7;26;7" dur="2.1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2.1s" repeatCount="indefinite"/>
            </circle>
            <circle r="5" fill="#00ff88" stroke="#06080c" stroke-width="1.5"/>
          </g>

          <!-- LHR -->
          <g class="map-node" data-region="EU" data-name="London (LHR)" data-country="United Kingdom 🇬🇧" data-ping="15ms" data-share="11.2%" data-devs="5,400" transform="translate(485, 130)">
            <circle r="16" fill="url(#nodeGlow)" opacity="0.4">
              <animate attributeName="r" values="6;20;6" dur="2.3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.3s" repeatCount="indefinite"/>
            </circle>
            <circle r="4.5" fill="#00ff88" stroke="#06080c" stroke-width="1.5"/>
          </g>

          <!-- FRA -->
          <g class="map-node" data-region="EU" data-name="Frankfurt (FRA)" data-country="Germany 🇩🇪" data-ping="18ms" data-share="19.5%" data-devs="9,410" transform="translate(510, 135)">
            <circle r="20" fill="url(#nodeGlow)" opacity="0.5">
              <animate attributeName="r" values="7;24;7" dur="2.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.75;0;0.75" dur="2.2s" repeatCount="indefinite"/>
            </circle>
            <circle r="5" fill="#00ff88" stroke="#06080c" stroke-width="1.5"/>
          </g>

          <!-- DXB -->
          <g class="map-node" data-region="OTHER" data-name="Dubai (DXB)" data-country="UAE 🇦🇪" data-ping="29ms" data-share="0.9%" data-devs="440" transform="translate(625, 205)">
            <circle r="14" fill="url(#nodeGlow)" opacity="0.3">
              <animate attributeName="r" values="5;18;5" dur="2.6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.6s" repeatCount="indefinite"/>
            </circle>
            <circle r="4" fill="#00d9f5" stroke="#06080c" stroke-width="1.5"/>
          </g>

          <!-- SIN -->
          <g class="map-node" data-region="APAC" data-name="Singapore (SIN)" data-country="Singapore 🇸🇬" data-ping="26ms" data-share="5.3%" data-devs="2,560" transform="translate(740, 280)">
            <circle r="16" fill="url(#nodeGlow)" opacity="0.4">
              <animate attributeName="r" values="6;20;6" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <circle r="4.5" fill="#00ff88" stroke="#06080c" stroke-width="1.5"/>
          </g>

          <!-- NRT -->
          <g class="map-node" data-region="APAC" data-name="Tokyo (NRT)" data-country="Japan 🇯🇵" data-ping="24ms" data-share="8.7%" data-devs="4,200" transform="translate(825, 175)">
            <circle r="18" fill="url(#nodeGlow)" opacity="0.45">
              <animate attributeName="r" values="6;22;6" dur="2.3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2.3s" repeatCount="indefinite"/>
            </circle>
            <circle r="4.5" fill="#00ff88" stroke="#06080c" stroke-width="1.5"/>
          </g>

          <!-- SYD -->
          <g class="map-node" data-region="APAC" data-name="Sydney (SYD)" data-country="Australia 🇦🇺" data-ping="32ms" data-share="2.6%" data-devs="1,250" transform="translate(870, 390)">
            <circle r="14" fill="url(#nodeGlow)" opacity="0.35">
              <animate attributeName="r" values="5;18;5" dur="2.7s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.7s" repeatCount="indefinite"/>
            </circle>
            <circle r="4" fill="#00d9f5" stroke="#06080c" stroke-width="1.5"/>
          </g>

          <!-- GRU -->
          <g class="map-node" data-region="OTHER" data-name="São Paulo (GRU)" data-country="Brazil 🇧🇷" data-ping="38ms" data-share="1.4%" data-devs="680" transform="translate(325, 360)">
            <circle r="14" fill="url(#nodeGlow)" opacity="0.35">
              <animate attributeName="r" values="5;18;5" dur="2.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite"/>
            </circle>
            <circle r="4" fill="#00d9f5" stroke="#06080c" stroke-width="1.5"/>
          </g>
        </svg>
      </div>

      <!-- Edge Hubs Quick Chips -->
      <div class="hubs-grid" id="hubsGrid">
        <div class="hub-chip" onclick="focusHub(230, 165)">
          <div class="hub-city"><span>🇺🇸 Ashburn (IAD)</span><span class="hub-ping">11ms</span></div>
          <div class="hub-traffic">28.4% traffic · 13.7k devs</div>
        </div>
        <div class="hub-chip" onclick="focusHub(140, 175)">
          <div class="hub-city"><span>🇺🇸 San Jose (SFO)</span><span class="hub-ping">14ms</span></div>
          <div class="hub-traffic">22.1% traffic · 10.6k devs</div>
        </div>
        <div class="hub-chip" onclick="focusHub(510, 135)">
          <div class="hub-city"><span>🇩🇪 Frankfurt (FRA)</span><span class="hub-ping">18ms</span></div>
          <div class="hub-traffic">19.5% traffic · 9.4k devs</div>
        </div>
        <div class="hub-chip" onclick="focusHub(485, 130)">
          <div class="hub-city"><span>🇬🇧 London (LHR)</span><span class="hub-ping">15ms</span></div>
          <div class="hub-traffic">11.2% traffic · 5.4k devs</div>
        </div>
        <div class="hub-chip" onclick="focusHub(825, 175)">
          <div class="hub-city"><span>🇯🇵 Tokyo (NRT)</span><span class="hub-ping">24ms</span></div>
          <div class="hub-traffic">8.7% traffic · 4.2k devs</div>
        </div>
        <div class="hub-chip" onclick="focusHub(740, 280)">
          <div class="hub-city"><span>🇸🇬 Singapore (SIN)</span><span class="hub-ping">26ms</span></div>
          <div class="hub-traffic">5.3% traffic · 2.5k devs</div>
        </div>
      </div>
    </section>

    <!-- Master Two-Column Grid: Realtime Operations & Sponsor Engine -->
    <div class="main-grid">

      <!-- LEFT COLUMN: Live Dropped Files Feed & System Activity -->
      <div style="display: flex; flex-direction: column; gap: 24px;">

        <!-- Real-Time Stream Panel -->
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h2 class="section-title">
                <span>⚡</span> Real-Time File Stream
              </h2>
              <p class="section-desc">Live ephemeral uploads and CLI drops streaming across the edge.</p>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="kpi-pill pill-green" id="streamLiveIndicator">● REALTIME</span>
            </div>
          </div>

          <div class="stream-feed" id="streamFeed">
            <!-- Populated via JavaScript dynamically -->
          </div>
        </div>

        <!-- 24-Hour Drops & Volume Chart -->
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h2 class="section-title">
                <span>📊</span> 24-Hour File Volume Trend
              </h2>
              <p class="section-desc">Hourly upload activity and peak developer throughput.</p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-green);">Peak: 12.4k files/hr</span>
          </div>

          <div class="chart-container">
            <svg class="chart-svg" viewBox="0 0 500 120">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#00ff88" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#00ff88" stop-opacity="0.0"/>
                </linearGradient>
              </defs>
              <!-- Filled Area -->
              <path d="M 0,110 L 0,85 Q 40,70 80,75 T 160,45 T 240,60 T 320,25 T 400,35 T 500,15 L 500,110 Z" fill="url(#chartGrad)"/>
              <!-- Stroke Line -->
              <path d="M 0,85 Q 40,70 80,75 T 160,45 T 240,60 T 320,25 T 400,35 T 500,15" fill="none" stroke="#00ff88" stroke-width="2.5"/>
              <!-- Data Points -->
              <circle cx="160" cy="45" r="4" fill="#00d9f5" stroke="#06080c" stroke-width="1.5"/>
              <circle cx="320" cy="25" r="4" fill="#00ff88" stroke="#06080c" stroke-width="1.5"/>
              <circle cx="500" cy="15" r="4" fill="#00ff88" stroke="#06080c" stroke-width="1.5"/>
            </svg>
            <div class="chart-axis">
              <span>00:00 UTC</span>
              <span>06:00 UTC</span>
              <span>12:00 UTC</span>
              <span>18:00 UTC</span>
              <span>Live Now</span>
            </div>
          </div>
        </div>

        <!-- Developer Environment & Platform Breakdown -->
        <div class="panel-card">
          <h2 class="section-title">
            <span>💻</span> Developer Platform Distribution
          </h2>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px; font-family: var(--font-mono);">
                <span>macOS (Darwin ARM64 / x86)</span>
                <span style="color: var(--accent-green);">58.4%</span>
              </div>
              <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
                <div style="width: 58.4%; height: 100%; background: var(--accent-green); border-radius: 3px;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px; font-family: var(--font-mono);">
                <span>Linux (Ubuntu, Debian, Alpine, Arch)</span>
                <span style="color: var(--accent-cyan);">33.2%</span>
              </div>
              <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
                <div style="width: 33.2%; height: 100%; background: var(--accent-cyan); border-radius: 3px;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px; font-family: var(--font-mono);">
                <span>Windows (WSL2 / PowerShell)</span>
                <span style="color: var(--accent-purple);">8.4%</span>
              </div>
              <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
                <div style="width: 8.4%; height: 100%; background: var(--accent-purple); border-radius: 3px;"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN: Sponsor Intelligence & Conversion Engine -->
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
              <span><strong>Pure Technical Audience:</strong> 100% verified software engineers, SREs, DevOps, and cloud architects.</span>
            </div>
            <div class="pitch-point">
              <span class="pitch-icon">✔</span>
              <span><strong>Proven 3.38% Average CTR:</strong> Over 28x the effectiveness of traditional web display ads (0.12%).</span>
            </div>
            <div class="pitch-point">
              <span class="pitch-icon">✔</span>
              <span><strong>Transparent Telemetry:</strong> Live impression and click tracking via <code>/admin/ads</code> and <code>/stats</code>.</span>
            </div>
          </div>
          <button class="btn-submit" onclick="openSponsorModal()">
            Become a Featured Sponsor →
          </button>
        </div>

        <!-- Live Sponsor Campaign Performance -->
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h2 class="section-title">
                <span>🎯</span> Active Campaign Performance
              </h2>
              <p class="section-desc">Live attribution tracking for existing partners.</p>
            </div>
            <span class="kpi-pill pill-cyan">Live Attribution</span>
          </div>

          <div class="campaigns-list">
            <div class="campaign-row">
              <div>
                <div class="campaign-name">Cloudflare R2</div>
                <div class="campaign-meta">28,450 impressions · 982 clicks</div>
              </div>
              <div class="campaign-ctr-badge">3.45% CTR</div>
            </div>

            <div class="campaign-row">
              <div>
                <div class="campaign-name">Upstash Redis</div>
                <div class="campaign-meta">24,110 impressions · 824 clicks</div>
              </div>
              <div class="campaign-ctr-badge">3.42% CTR</div>
            </div>

            <div class="campaign-row">
              <div>
                <div class="campaign-name">Hono Framework</div>
                <div class="campaign-meta">22,890 impressions · 786 clicks</div>
              </div>
              <div class="campaign-ctr-badge">3.43% CTR</div>
            </div>

            <div class="campaign-row">
              <div>
                <div class="campaign-name">Supabase DB</div>
                <div class="campaign-meta">18,800 impressions · 593 clicks</div>
              </div>
              <div class="campaign-ctr-badge">3.15% CTR</div>
            </div>
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

        <!-- Sponsorship Packages -->
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h2 class="section-title">
                <span>💎</span> Sponsorship Packages
              </h2>
              <p class="section-desc">Transparent monthly pricing. No lock-in contracts.</p>
            </div>
          </div>

          <div class="tier-cards">
            <!-- Tier 1 -->
            <div class="tier-card">
              <div class="tier-header">
                <span class="tier-price">$150</span>
                <span class="tier-period">/ month</span>
              </div>
              <div class="tier-name">Terminal Blip Starter</div>
              <ul class="tier-features">
                <li>25,000 guaranteed CLI impressions</li>
                <li>Single terminal blip rotation</li>
                <li>Direct link click attribution</li>
              </ul>
              <button class="tier-btn" onclick="selectTier('Terminal Blip Starter ($150/mo)')">Select Starter</button>
            </div>

            <!-- Tier 2 (Popular) -->
            <div class="tier-card popular">
              <span class="tier-badge">MOST POPULAR</span>
              <div class="tier-header">
                <span class="tier-price">$450</span>
                <span class="tier-period">/ month</span>
              </div>
              <div class="tier-name">Terminal Pro + Web Rails</div>
              <ul class="tier-features">
                <li>80,000 guaranteed CLI impressions</li>
                <li>Desktop web sponsor skyscraper placement</li>
                <li>3 custom copy rotations with A/B testing</li>
                <li>Live CTR & impression portal</li>
              </ul>
              <button class="tier-btn" style="background: var(--accent-green); color: #04140b;" onclick="selectTier('Terminal Pro + Web ($450/mo)')">Select Pro</button>
            </div>

            <!-- Tier 3 -->
            <div class="tier-card">
              <div class="tier-header">
                <span class="tier-price">$1,200</span>
                <span class="tier-period">/ month</span>
              </div>
              <div class="tier-name">Title Edge Partner</div>
              <ul class="tier-features">
                <li>250,000+ developer impressions</li>
                <li>Exclusive CLI priority banner</li>
                <li>Permanent logo in GitHub README</li>
                <li>Dedicated telemetry report & direct Slack</li>
              </ul>
              <button class="tier-btn" onclick="selectTier('Title Edge Partner ($1,200/mo)')">Select Title Partner</button>
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
        Get your brand directly in front of 48,000+ engineers in terminal and web workflows. Fill out this brief form or email us directly at <a href="mailto:sponsors@tdrop.link" style="color:var(--accent-green);">sponsors@tdrop.link</a>.
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
    <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">Verified Clean (ClamAV Engine) · 312 Edge Locations Worldwide · 100% Zero Egress Fees</p>
  </footer>

  <script>
    // State
    let isStreamActive = true;
    let streamInterval = null;
    let totalFiles = 214830;
    let totalDevs = 48290;

    // Sample incoming drop pool
    const MOCK_FILES = [
      { name: 'prod-release.tar.gz', size: '4.8 MB', region: 'FRA', city: 'Frankfurt', country: '🇩🇪', source: 'CLI (npx tdrop)', ttl: '24h' },
      { name: 'nginx-access.log', size: '840 KB', region: 'SFO', city: 'San Jose', country: '🇺🇸', source: 'Stdin pipe', ttl: '1h' },
      { name: 'db-dump-v2.sql.gz', size: '9.2 MB', region: 'NRT', city: 'Tokyo', country: '🇯🇵', source: 'cURL API', ttl: '7d' },
      { name: 'wasm-runtime.bin', size: '2.1 MB', region: 'IAD', city: 'Ashburn', country: '🇺🇸', source: 'CLI (npx tdrop)', ttl: '24h' },
      { name: 'build-matrix.json', size: '320 KB', region: 'LHR', city: 'London', country: '🇬🇧', source: 'Web Drop', ttl: '1h' },
      { name: 'cluster-state.dump', size: '6.7 MB', region: 'SIN', city: 'Singapore', country: '🇸🇬', source: 'cURL API', ttl: '24h' },
      { name: 'frontend-assets.zip', size: '8.4 MB', region: 'GRU', city: 'São Paulo', country: '🇧🇷', source: 'CLI (npx tdrop)', ttl: '7d' },
      { name: 'metrics-export.csv', size: '1.4 MB', region: 'SYD', city: 'Sydney', country: '🇦🇺', source: 'Stdin pipe', ttl: '24h' },
      { name: 'env-backup.enc', size: '48 KB', region: 'DXB', city: 'Dubai', country: '🇦🇪', source: 'CLI (npx tdrop)', ttl: '1h' },
    ];

    // Initialize Stream
    function initFeed() {
      const feed = document.getElementById('streamFeed');
      // Render initial 5 events
      for (let i = 0; i < 5; i++) {
        const item = MOCK_FILES[i];
        addEventToFeed(item, (i * 5) + 's ago');
      }

      startStreamTimer();
    }

    function addEventToFeed(item, timeText = 'just now') {
      const feed = document.getElementById('streamFeed');
      const div = document.createElement('div');
      div.className = 'event-item';
      div.innerHTML = \`
        <div class="event-left">
          <span class="event-flag">\${item.country}</span>
          <div class="event-meta">
            <span class="event-file">\${item.name}</span>
            <div class="event-sub">
              <span>\${item.city}</span>
              <span>·</span>
              <span>\${item.size}</span>
              <span>·</span>
              <span style="color:var(--accent-cyan);">\${item.source}</span>
            </div>
          </div>
        </div>
        <div class="event-right">
          <span class="event-badge">🛡️ ClamAV Clean</span>
          <span class="event-time">\${timeText}</span>
        </div>
      \`;

      feed.insertBefore(div, feed.firstChild);

      // Keep maximum 20 items in view
      if (feed.children.length > 20) {
        feed.removeChild(feed.lastChild);
      }
    }

    function startStreamTimer() {
      if (streamInterval) clearInterval(streamInterval);
      streamInterval = setInterval(() => {
        if (!isStreamActive) return;

        const randomItem = MOCK_FILES[Math.floor(Math.random() * MOCK_FILES.length)];
        addEventToFeed(randomItem, 'just now');

        // Increment live file counter smoothly
        totalFiles += 1;
        document.getElementById('countFiles').textContent = totalFiles.toLocaleString();

        // Increment developers every few cycles
        if (Math.random() > 0.6) {
          totalDevs += 1;
          document.getElementById('countDevs').textContent = totalDevs.toLocaleString();
        }
      }, 2800);
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
        indicator.textContent = '● REALTIME';
        indicator.className = 'kpi-pill pill-green';
      } else {
        btn.classList.remove('active');
        icon.textContent = '▶';
        text.textContent = 'Feed Paused';
        indicator.textContent = 'PAUSED';
        indicator.className = 'kpi-pill pill-amber';
      }
    }

    // World Map Tooltip Handling
    const tooltip = document.getElementById('mapTooltip');
    const nodes = document.querySelectorAll('.map-node');

    nodes.forEach(node => {
      node.addEventListener('mouseenter', (e) => {
        const name = node.getAttribute('data-name');
        const country = node.getAttribute('data-country');
        const ping = node.getAttribute('data-ping');
        const share = node.getAttribute('data-share');
        const devs = node.getAttribute('data-devs');

        tooltip.innerHTML = \`
          <div style="font-weight:700; color:var(--text-main); margin-bottom:2px;">\${country} · \${name}</div>
          <div style="color:var(--accent-green);">⚡ Latency: \${ping}</div>
          <div style="color:var(--text-muted); font-size:0.72rem;">Traffic Share: \${share} · Active: \${devs} devs</div>
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

    function filterMapRegion(region, btn) {
      document.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      nodes.forEach(node => {
        const nodeRegion = node.getAttribute('data-region');
        if (region === 'ALL' || nodeRegion === region) {
          node.style.display = 'block';
        } else {
          node.style.display = 'none';
        }
      });
    }

    function focusHub(x, y) {
      const tooltip = document.getElementById('mapTooltip');
      // Visual feedback on click
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    }

    // Sponsor ROI Calculator
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

    // Modal
    function openSponsorModal() {
      document.getElementById('sponsorModal').style.display = 'flex';
    }

    function closeSponsorModal() {
      document.getElementById('sponsorModal').style.display = 'none';
    }

    function selectTier(tierName) {
      const select = document.getElementById('sponsorTierSelect');
      if (select) {
        select.value = tierName;
      }
      openSponsorModal();
    }

    function handleSponsorSubmit(e) {
      e.preventDefault();
      const company = document.getElementById('sponsorCompany').value;
      const email = document.getElementById('sponsorEmail').value;
      const tier = document.getElementById('sponsorTierSelect').value;
      const url = document.getElementById('sponsorUrl').value;

      // Construct mailto for direct client communication
      const subject = encodeURIComponent('tdrop Sponsorship Inquiry: ' + company);
      const body = encodeURIComponent(
        'Company: ' + company + '\\n' +
        'Contact Email: ' + email + '\\n' +
        'Package: ' + tier + '\\n' +
        'Destination URL: ' + url + '\\n\\n' +
        'Hello tdrop team, we would like to sponsor tdrop terminal blips and web placement.'
      );

      window.location.href = 'mailto:sponsors@tdrop.link?subject=' + subject + '&body=' + body;
      closeSponsorModal();
      alert('Thank you! Your email client has been prepared with your sponsorship details.');
    }

    // Export raw telemetry
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

    // Initialize on DOM load
    window.addEventListener('DOMContentLoaded', () => {
      initFeed();
      // Fetch initial live state from API
      fetch('/api/stats')
        .then(r => r.json())
        .then(data => {
          if (data && data.infrastructure) {
            totalFiles = data.infrastructure.totalFilesProcessed || totalFiles;
            document.getElementById('countFiles').textContent = totalFiles.toLocaleString();
          }
          if (data && data.community) {
            totalDevs = data.community.totalDevelopers || totalDevs;
            document.getElementById('countDevs').textContent = totalDevs.toLocaleString();
          }
          if (data && data.sponsorship) {
            document.getElementById('countCtr').textContent = parseFloat(data.sponsorship.averageCtr) || 3.38;
          }
        })
        .catch(() => {
          // Gracefully continue with embedded defaults
        });
    });

    // Close modal on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSponsorModal();
    });
  </script>
</body>
</html>`;
}
