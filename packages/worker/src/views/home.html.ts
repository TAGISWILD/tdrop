export function renderHomePage(domain: string = "tdrop.link"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>tdrop · Ephemeral File Sharing for Terminals & Modern Workflows</title>
  <meta name="description" content="Authless, ephemeral file sharing designed for developers. 10MB free tier, zero egress fees, ClamAV malware scanning.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Active Google AdSense Tag -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2876380604791121" crossorigin="anonymous"></script>

  <style>
    :root {
      --bg: #07090e;
      --surface: #0e111a;
      --surface-card: #131722;
      --surface-border: rgba(255, 255, 255, 0.08);
      --surface-border-subtle: rgba(255, 255, 255, 0.04);
      --surface-border-hover: rgba(0, 255, 136, 0.35);
      --accent-green: #00ff88;
      --accent-green-dim: rgba(0, 255, 136, 0.12);
      --accent-green-glow: rgba(0, 255, 136, 0.22);
      --accent-cyan: #00e5ff;
      --accent-cyan-dim: rgba(0, 229, 255, 0.12);
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
      min-height: 100dvh;
      width: 100%;
      overflow-x: hidden;
      /* Architectural micro-grid + subtle ambient glow inspired by componentry.dev and spaceui */
      background-image: 
        radial-gradient(ellipse 70% 40% at 50% -10%, rgba(0, 255, 136, 0.08), transparent 70%),
        linear-gradient(to right, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
      background-size: 100% 100%, 36px 36px, 36px 36px;
      background-attachment: fixed;
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }

    /* Floating Pill Navigation Header (Inspired by spaceui.one & componentry.dev) */
    .nav-wrapper {
      position: sticky;
      top: 16px;
      z-index: 100;
      width: 100%;
      max-width: 820px;
      margin: 0 auto;
      padding: 0 16px;
      pointer-events: none;
    }

    .nav-island {
      pointer-events: auto;
      background: rgba(14, 17, 26, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--surface-border);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      padding: 8px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: border-color 0.2s, box-shadow 0.2s;
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
      font-weight: 800;
      font-size: 1.15rem;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .brand-logo span {
      color: var(--accent-green);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(0, 255, 136, 0.08);
      border: 1px solid rgba(0, 255, 136, 0.25);
      color: var(--accent-green);
      font-size: 0.65rem;
      font-family: var(--font-mono);
      padding: 2px 8px;
      border-radius: 20px;
      font-weight: 600;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      background: var(--accent-green);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-green);
      animation: pulse 2s infinite ease-in-out;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.15); }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .cli-copy-pill {
      display: none;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--surface-border);
      border-radius: 9999px;
      padding: 6px 14px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .cli-copy-pill:hover {
      border-color: var(--accent-green);
      color: var(--text-main);
      background: rgba(0, 255, 136, 0.06);
      transform: translateY(-1px);
    }

    .cli-copy-pill:active {
      transform: scale(0.98);
    }

    .cli-copy-pill span {
      color: var(--accent-green);
      font-weight: 700;
    }

    @media (min-width: 640px) {
      .cli-copy-pill {
        display: inline-flex;
      }
    }

    .nav-btn {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 8px;
      transition: color 0.15s;
    }

    .nav-btn:hover {
      color: var(--accent-green);
    }

    /* Master Layout: 3 Columns with Desktop Gutter Rails */
    .site-wrapper {
      width: 100%;
      max-width: 1320px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 32px;
      padding: 30px 16px 80px;
      min-height: 100vh;
    }

    /* Desktop Sticky Ad Rails */
    .ad-rail {
      display: none;
      width: 160px;
      flex: 0 0 160px;
    }

    @media (min-width: 1220px) {
      .ad-rail {
        display: block;
      }
    }

    .ad-sticky {
      position: sticky;
      top: 96px;
      background: rgba(14, 17, 26, 0.75);
      border: 1px dashed var(--surface-border);
      border-radius: 16px;
      padding: 16px 8px;
      min-height: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-align: center;
      backdrop-filter: blur(12px);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .ad-tag {
      font-size: 0.62rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--text-dim);
    }

    .ad-box-skyscraper {
      width: 100%;
      max-width: 160px;
      min-height: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.015);
      border-radius: 8px;
    }

    .ad-fallback-label {
      font-size: 0.72rem;
      color: var(--text-dim);
    }

    /* Center Main Application Area */
    .content-container {
      width: 100%;
      max-width: 780px;
      flex: 1 1 780px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* In-Flow Horizontal Ad Banners */
    .ad-banner-inline {
      width: 100%;
      margin: 12px 0 28px;
      background: rgba(14, 17, 26, 0.65);
      border: 1px dashed var(--surface-border);
      border-radius: 14px;
      padding: 12px 10px;
      text-align: center;
      min-height: 65px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .ad-banner-tag {
      position: absolute;
      top: 4px;
      right: 12px;
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-dim);
    }

    /* Hero Section */
    .hero {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
      margin-bottom: 28px;
      margin-top: 10px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background: rgba(0, 255, 136, 0.06);
      border: 1px solid rgba(0, 255, 136, 0.22);
      border-radius: 9999px;
      font-size: clamp(0.72rem, 2.5vw, 0.8rem);
      font-weight: 600;
      color: var(--accent-green);
      line-height: 1.2;
      box-shadow: 0 0 24px rgba(0, 255, 136, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      transition: all 0.2s;
    }

    .hero-badge:hover {
      border-color: rgba(0, 255, 136, 0.4);
      box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
    }

    .hero-title {
      font-size: clamp(2.1rem, 6.5vw, 3.6rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.1;
      max-width: 740px;
      text-align: center;
    }

    .hero-title span {
      background: linear-gradient(180deg, #FFFFFF 30%, #a1a1aa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-title .accent-text {
      background: linear-gradient(135deg, var(--accent-green) 20%, var(--accent-cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    .hero-subtitle {
      font-size: clamp(0.95rem, 2.8vw, 1.15rem);
      color: var(--text-muted);
      max-width: 600px;
      line-height: 1.6;
      text-align: center;
      font-weight: 400;
    }

    /* Tactile Physical Uploader Console (Inspired by useplanes.com & skecher-ui) */
    .uploader-card {
      width: 100%;
      background: linear-gradient(180deg, rgba(18, 22, 32, 0.85) 0%, rgba(10, 13, 20, 0.95) 100%);
      border: 1px solid var(--surface-border);
      border-radius: 24px;
      padding: clamp(20px, 4.5vw, 38px);
      box-shadow: 
        0 30px 60px -15px rgba(0, 0, 0, 0.7),
        inset 0 1px 0 rgba(255, 255, 255, 0.12),
        inset 0 -1px 0 rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
      margin-bottom: 40px;
    }

    .uploader-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent-green), var(--accent-cyan), transparent);
    }

    /* Physical Segmented Control for Retention */
    .retention-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--surface-border-subtle);
    }

    .retention-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-dim);
      font-family: var(--font-mono);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .retention-tabs {
      display: flex;
      gap: 4px;
      background: rgba(0, 0, 0, 0.4);
      padding: 4px;
      border-radius: 10px;
      border: 1px solid var(--surface-border);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .ttl-tab {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 0.75rem;
      font-family: var(--font-mono);
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 7px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .ttl-tab:hover {
      color: var(--text-main);
    }

    .ttl-tab.active {
      background: rgba(0, 255, 136, 0.15);
      color: var(--accent-green);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(0, 255, 136, 0.3);
    }

    /* Precision Drop Zone */
    .drop-zone {
      border: 2px dashed rgba(255, 255, 255, 0.14);
      border-radius: 18px;
      padding: clamp(34px, 6vw, 50px) 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }

    .drop-zone:hover, .drop-zone:focus {
      border-color: rgba(0, 255, 136, 0.55);
      background: rgba(0, 255, 136, 0.025);
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    }

    .drop-zone.dragover {
      border-color: var(--accent-green);
      background: rgba(0, 255, 136, 0.08);
      box-shadow: 0 0 35px rgba(0, 255, 136, 0.2);
      transform: scale(1.015);
    }

    .drop-icon-wrap {
      width: 68px;
      height: 68px;
      border-radius: 18px;
      background: rgba(0, 255, 136, 0.08);
      border: 1px solid rgba(0, 255, 136, 0.25);
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-green);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s;
    }

    .drop-zone:hover .drop-icon-wrap {
      transform: scale(1.08) translateY(-2px);
      border-color: var(--accent-green);
      box-shadow: 0 0 30px rgba(0, 255, 136, 0.35);
    }

    .drop-title {
      font-size: clamp(1.15rem, 3.4vw, 1.35rem);
      font-weight: 700;
      color: var(--text-main);
      letter-spacing: -0.01em;
    }

    .drop-subtitle {
      font-size: clamp(0.82rem, 2.5vw, 0.92rem);
      color: var(--text-muted);
      line-height: 1.5;
    }

    .file-input { display: none; }

    /* Live Upload Progress */
    .upload-state {
      display: none;
      margin-top: 24px;
      flex-direction: column;
      gap: 12px;
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      font-family: var(--font-mono);
    }

    .progress-bar-bg {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 4px;
      overflow: hidden;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan));
      transition: width 0.15s ease-out;
      box-shadow: 0 0 12px var(--accent-green);
    }

    /* Result State Card */
    .result-box {
      display: none;
      background: #080b11;
      border: 1px solid rgba(0, 255, 136, 0.4);
      border-radius: 16px;
      padding: clamp(18px, 3.5vw, 24px);
      margin-top: 24px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 255, 136, 0.12);
      animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .result-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 16px;
      font-size: clamp(0.85rem, 2.5vw, 0.95rem);
      color: var(--accent-green);
      font-weight: 700;
    }

    .result-url-block {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 12px 16px;
    }

    @media (min-width: 480px) {
      .result-url-block {
        flex-direction: row;
        align-items: center;
      }
    }

    .result-url {
      font-family: var(--font-mono);
      font-size: clamp(0.88rem, 2.6vw, 0.98rem);
      color: var(--accent-cyan);
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .action-btns {
      display: flex;
      gap: 8px;
    }

    .copy-btn {
      background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1));
      color: var(--accent-green);
      border: 1px solid rgba(0, 255, 136, 0.4);
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      min-height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      white-space: nowrap;
      user-select: none;
    }

    .copy-btn:hover {
      background: var(--accent-green);
      color: #04140b;
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.45);
      transform: translateY(-1px);
    }

    .copy-btn:active {
      transform: scale(0.97);
    }

    .result-details {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid var(--surface-border-subtle);
    }

    .result-curl-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: rgba(0, 0, 0, 0.4);
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--surface-border);
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }

    .result-curl-text {
      color: var(--text-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .result-curl-text span {
      color: var(--accent-cyan);
    }

    .copy-sm {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      color: var(--text-muted);
      font-size: 0.72rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s;
    }

    .copy-sm:hover {
      color: var(--accent-green);
      border-color: var(--accent-green);
    }

    .result-meta-row {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-dim);
    }

    /* Interactive Terminal Demo Widget (Inspired by uiarc.dev & componentry.dev) */
    .terminal-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 48px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
    }

    .section-title {
      font-size: clamp(1.25rem, 3.5vw, 1.55rem);
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .section-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .terminal-box {
      background: #080a0f;
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }

    .terminal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 18px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid var(--surface-border);
    }

    .terminal-dots {
      display: flex;
      gap: 7px;
    }

    .terminal-dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
    }
    .dot-red { background: #ff5f56; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #27c93f; }

    .terminal-tabs {
      display: flex;
      gap: 4px;
      background: rgba(0, 0, 0, 0.35);
      padding: 3px;
      border-radius: 8px;
      border: 1px solid var(--surface-border);
    }

    .terminal-tab-btn {
      background: transparent;
      border: none;
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .terminal-tab-btn.active {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-main);
      box-shadow: 0 1px 4px rgba(0,0,0,0.4);
    }

    .terminal-body {
      padding: 20px 22px;
      font-family: var(--font-mono);
      font-size: clamp(0.75rem, 2.3vw, 0.88rem);
      line-height: 1.65;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .terminal-line {
      display: flex;
      flex-wrap: nowrap;
      gap: 8px;
      white-space: pre;
    }

    .terminal-prompt { color: var(--accent-green); font-weight: 700; flex-shrink: 0; }
    .terminal-dim { color: var(--text-dim); }
    .terminal-cyan { color: var(--accent-cyan); }

    /* Bento Grid Features (6 Developer Pillars) */
    .features-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 48px;
    }

    .features-grid {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;
    }

    @media (min-width: 600px) {
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }

    .feature-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      padding: clamp(22px, 4vw, 28px);
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s, box-shadow 0.25s;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .feature-card:hover {
      transform: translateY(-2px);
      border-color: rgba(0, 255, 136, 0.35);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .feature-icon-box {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      margin-bottom: 4px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    .feature-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-main);
      letter-spacing: -0.015em;
    }

    .feature-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* API Reference Cheat Sheet Section */
    .api-section {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 18px;
      padding: clamp(22px, 4vw, 30px);
      margin-bottom: 36px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .api-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      letter-spacing: -0.02em;
    }

    .api-code-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .api-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 12px 16px;
    }

    .api-row-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .api-row-code {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--text-main);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      overflow-x: auto;
    }

    .api-row-code span {
      color: var(--accent-cyan);
    }

    /* Footer */
    footer {
      width: 100%;
      border-top: 1px solid var(--surface-border);
      padding: 36px 16px;
      font-size: 0.88rem;
      color: var(--text-muted);
      text-align: center;
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

  <!-- Floating Pill Navbar (spaceui.one & componentry.dev style) -->
  <header class="nav-wrapper">
    <nav class="nav-island">
      <a href="/" class="brand-wrap">
        <div class="brand-logo">
          <span>>_</span> tdrop
        </div>
        <div class="status-badge">
          <div class="status-dot"></div>
          <span>Edge Live</span>
        </div>
      </a>
      <div class="nav-actions">
        <div class="cli-copy-pill" onclick="copySnippet('npx tdrop <file>')">
          <span>$</span> npx tdrop &lt;file&gt;
        </div>
        <a href="#cli" class="nav-btn">CLI</a>
        <a href="#features" class="nav-btn">Features</a>
        <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener" class="nav-btn">GitHub</a>
      </div>
    </nav>
  </header>

  <!-- 3-Column Master Layout (Desktop Gutter Rails) -->
  <div class="site-wrapper">

    <!-- Left Sticky Ad Rail (Desktop >= 1220px only, 160x600) -->
    <aside class="ad-rail">
      <div class="ad-sticky">
        <span class="ad-tag">Sponsor</span>
        <div class="ad-box-skyscraper">
          <ins class="adsbygoogle"
               style="display:inline-block;width:160px;height:600px"
               data-ad-client="ca-pub-2876380604791121"
               data-ad-slot="1010101010"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <div class="ad-fallback-label">[160x600 Skyscraper]</div>
        </div>
      </div>
    </aside>

    <!-- Center Content: Guaranteed Centered & Un-squashed -->
    <div class="content-container">

      <!-- Top Horizontal In-Flow Google AdSense Leaderboard -->
      <div class="ad-banner-inline">
        <span class="ad-banner-tag">Advertisement</span>
        <ins class="adsbygoogle"
             style="display:block; width:100%; min-height:60px;"
             data-ad-client="ca-pub-2876380604791121"
             data-ad-slot="9988776655"
             data-ad-format="horizontal"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <div class="ad-fallback-label">[Google AdSense Responsive Leaderboard]</div>
      </div>

      <main style="width: 100%;">

        <!-- Hero Section -->
        <section class="hero">
          <div class="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>v1.0.1 Ready · ClamAV Clean · $0 Egress</span>
          </div>
          <h1 class="hero-title">
            Ephemeral file sharing for the <span class="accent-text">terminal generation</span>.
          </h1>
          <p class="hero-subtitle">
            Transfer files instantly from your CLI, cURL, or browser. Streamed directly to Cloudflare R2 edge with zero retention debt and zero telemetry.
          </p>
        </section>

        <!-- Tactile Uploader Console -->
        <div class="uploader-card">
          
          <!-- Physical Retention Segmented Control -->
          <div class="retention-bar">
            <div class="retention-label">
              <span>⏳</span> Retention Duration
            </div>
            <div class="retention-tabs">
              <button type="button" class="ttl-tab" onclick="setTtl('1h', this)">1 Hour</button>
              <button type="button" class="ttl-tab active" onclick="setTtl('24h', this)">24 Hours</button>
              <button type="button" class="ttl-tab" onclick="setTtl('7d', this)">7 Days</button>
            </div>
          </div>

          <!-- Precision Drop Zone -->
          <div class="drop-zone" id="dropZone" onclick="document.getElementById('fileInput').click()">
            <input type="file" id="fileInput" class="file-input" onchange="handleFileSelect(this.files)">
            <div class="drop-icon-wrap">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <div class="drop-title">Drop your file here or tap to browse</div>
            <div class="drop-subtitle">Strict 10MB free tier · Auto-expires after chosen retention · Encrypted at rest</div>
          </div>

          <!-- Live Upload Progress -->
          <div class="upload-state" id="uploadState">
            <div class="progress-info">
              <span id="uploadFilename">uploading...</span>
              <span id="uploadPercent">0%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" id="progressBar"></div>
            </div>
          </div>

          <!-- Result State Card -->
          <div class="result-box" id="resultBox">
            <div class="result-header">
              <span>✔ Upload Complete & Distributed</span>
              <span style="color:var(--accent-green); font-size:0.75rem; font-family:var(--font-mono);">🛡️ ClamAV Verified Clean</span>
            </div>
            
            <div class="result-url-block">
              <span class="result-url" id="resultUrl">https://${domain}/...</span>
              <div class="action-btns">
                <button class="copy-btn" id="copyUrlBtn" onclick="copyResultUrl()">Copy Link</button>
              </div>
            </div>

            <div class="result-details">
              <div class="result-curl-row">
                <div class="result-curl-text" id="resultCurl">curl -O ...</div>
                <button class="copy-sm" onclick="copyResultCurl()">Copy</button>
              </div>
              <div class="result-meta-row">
                <span id="resultExpiry">Retention: 24h</span>
                <span style="color: var(--accent-cyan);">Zero Egress Fee</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Terminal Interactive Showcase -->
        <section class="terminal-section" id="cli">
          <div class="section-header">
            <div>
              <h2 class="section-title">Terminal Native</h2>
              <p class="section-desc">Drop files from your command line, pipe stdin, or cURL directly.</p>
            </div>
          </div>

          <div class="terminal-box">
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="terminal-dot dot-red"></span>
                <span class="terminal-dot dot-yellow"></span>
                <span class="terminal-dot dot-green"></span>
              </div>
              <div class="terminal-tabs">
                <button class="terminal-tab-btn active" onclick="switchTerminalTab('npx', this)">npx</button>
                <button class="terminal-tab-btn" onclick="switchTerminalTab('stdin', this)">stdin</button>
                <button class="terminal-tab-btn" onclick="switchTerminalTab('curl', this)">curl</button>
              </div>
            </div>
            <div class="terminal-body" id="terminalContent">
              <div class="terminal-line"><span class="terminal-prompt">$</span><span>npx tdrop release-v1.tar.gz</span></div>
              <div class="terminal-line terminal-dim"><span>[Sponsored] High-speed serverless infra -> https://${domain}/ad/r2</span></div>
              <div class="terminal-line"><span class="terminal-cyan">Uploading [████████████] 100% | 4.8 MB/s</span></div>
              <div class="terminal-line" style="color:var(--accent-green); margin-top:4px;"><span>✔ Upload complete!</span></div>
              <div class="terminal-line"><span class="terminal-dim">  🛡️ Malware Scan:</span> <span style="color:var(--accent-green);">Clean (ClamAV Engine)</span></div>
              <div class="terminal-line"><span class="terminal-dim">  🔗 Link:</span> <span class="terminal-cyan">https://${domain}/a7kX9b2</span></div>
              <div class="terminal-line"><span class="terminal-dim">  📥 Direct Curl:</span> <span>curl -O https://${domain}/a7kX9b2/release-v1.tar.gz</span></div>
            </div>
          </div>
        </section>

        <!-- Bento Grid Features (6 Developer Pillars) -->
        <section class="features-section" id="features">
          <div class="section-header">
            <div>
              <h2 class="section-title">Built for Developers</h2>
              <p class="section-desc">Engineered for security, zero bloat, and minimal latency.</p>
            </div>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon-box">🛡️</div>
              <h3 class="feature-title">ClamAV Malware Scanning</h3>
              <p class="feature-desc">Every uploaded file is inspected with over 3.6 million antivirus signatures before edge availability.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box">⚡</div>
              <h3 class="feature-title">Edge Direct-to-R2</h3>
              <p class="feature-desc">Zero RAM accumulation. Files stream directly to Cloudflare R2 globally with $0 egress bandwidth fees.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box">⏳</div>
              <h3 class="feature-title">Auto-Incinerate Lifecycle</h3>
              <p class="feature-desc">Guaranteed ephemerality. Objects are permanently deleted from KV & R2 storage after 1h, 24h, or 7d.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box">💻</div>
              <h3 class="feature-title">Stdin Pipeline Ready</h3>
              <p class="feature-desc">Pipe logs, database dumps, and build artifacts straight from CI/CD pipelines without temporary files.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box">🔒</div>
              <h3 class="feature-title">Strict Zero-Telemetry</h3>
              <p class="feature-desc">Developer trust invariant. No tracking cookies, no Google Analytics trackers, and no hidden phone-homes.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box">📦</div>
              <h3 class="feature-title">RFC 5987 / 6266 Headers</h3>
              <p class="feature-desc">Preserves complex UTF-8 filenames, strips path traversals, and ensures safe cURL downloads across platforms.</p>
            </div>
          </div>
        </section>

        <!-- API Reference Cheat Sheet -->
        <section class="api-section">
          <h2 class="api-title">
            <span>⚙️</span> Quick cURL Cheat Sheet
          </h2>
          <div class="api-code-list">
            <div class="api-row">
              <div class="api-row-label">Upload a file via cURL</div>
              <div class="api-row-code">
                <code>curl -F "file=@app.zip" https://${domain}/upload</code>
                <button class="copy-sm" onclick="copySnippet('curl -F \\"file=@app.zip\\" https://${domain}/upload')">Copy</button>
              </div>
            </div>
            <div class="api-row">
              <div class="api-row-label">Stream piped stdin via cURL</div>
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

      </main>

      <!-- Bottom Horizontal In-Flow Google AdSense Unit -->
      <div class="ad-banner-inline" style="margin-top: 16px;">
        <span class="ad-banner-tag">Advertisement</span>
        <ins class="adsbygoogle"
             style="display:block; width:100%; min-height:90px;"
             data-ad-client="ca-pub-2876380604791121"
             data-ad-slot="1122334455"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <div class="ad-fallback-label">[Google AdSense Responsive Unit]</div>
      </div>

      <footer>
        <p>tdrop · Ephemeral File Sharing for Developers · <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">Open Source (GitHub)</a></p>
        <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">Zero egress fees · No trackers · RFC 5987 Compliant</p>
      </footer>

    </div>

    <!-- Right Sticky Ad Rail (Desktop >= 1220px only, 160x600) -->
    <aside class="ad-rail">
      <div class="ad-sticky">
        <span class="ad-tag">Sponsor</span>
        <div class="ad-box-skyscraper">
          <ins class="adsbygoogle"
               style="display:inline-block;width:160px;height:600px"
               data-ad-client="ca-pub-2876380604791121"
               data-ad-slot="2020202020"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          <div class="ad-fallback-label">[160x600 Skyscraper]</div>
        </div>
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
            document.getElementById('resultCurl').innerHTML = '<span>curl -O</span> ' + res.url + '/' + encodeURIComponent(res.filename);
            document.getElementById('resultCurl').setAttribute('data-cmd', 'curl -O ' + res.url + '/' + encodeURIComponent(res.filename));
            document.getElementById('resultExpiry').textContent = 'Retention: ' + res.expiresIn;
          } catch(e) {
            alert('Upload succeeded but response could not be parsed.');
          }
        } else {
          alert('Upload failed: ' + xhr.responseText);
          uploadState.style.display = 'none';
        }
      };

      xhr.onerror = () => {
        alert('Network upload failed. Please check your connection.');
        uploadState.style.display = 'none';
      };

      xhr.send(formData);
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
        box.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">$</span><span>npx tdrop release-v1.tar.gz</span></div>' +
          '<div class="terminal-line terminal-dim"><span>[Sponsored] High-speed serverless infra -> https://${domain}/ad/r2</span></div>' +
          '<div class="terminal-line"><span class="terminal-cyan">Uploading [████████████] 100% | 4.8 MB/s</span></div>' +
          '<div class="terminal-line" style="color:var(--accent-green); margin-top:4px;"><span>✔ Upload complete!</span></div>' +
          '<div class="terminal-line"><span class="terminal-dim">  🛡️ Malware Scan:</span> <span style="color:var(--accent-green);">Clean (ClamAV Engine)</span></div>' +
          '<div class="terminal-line"><span class="terminal-dim">  🔗 Link:</span> <span class="terminal-cyan">https://${domain}/a7kX9b2</span></div>' +
          '<div class="terminal-line"><span class="terminal-dim">  📥 Direct Curl:</span> <span>curl -O https://${domain}/a7kX9b2/release-v1.tar.gz</span></div>';
      } else if (tab === 'stdin') {
        box.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">$</span><span>cat production.log | npx tdrop --filename prod.log</span></div>' +
          '<div class="terminal-line terminal-dim"><span>Streaming stdin to https://${domain}... 1.2 MB uploaded</span></div>' +
          '<div class="terminal-line" style="color:var(--accent-green); margin-top:4px;"><span>✔ Stdin upload complete!</span></div>' +
          '<div class="terminal-line"><span class="terminal-dim">  🛡️ Malware Scan:</span> <span style="color:var(--accent-green);">Clean (ClamAV Engine)</span></div>' +
          '<div class="terminal-line"><span class="terminal-dim">  🔗 Link:</span> <span class="terminal-cyan">https://${domain}/b9mW2q1</span></div>';
      } else if (tab === 'curl') {
        box.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">$</span><span>curl -F "file=@backup.sql" -F "ttl=7d" https://${domain}/upload</span></div>' +
          '<div class="terminal-line terminal-cyan"><span>{"success":true,"code":"m4kL8z9","url":"https://${domain}/m4kL8z9","expiresIn":"7d"}</span></div>' +
          '<div class="terminal-line" style="margin-top:8px;"><span class="terminal-prompt">$</span><span>curl -O https://${domain}/m4kL8z9/backup.sql</span></div>';
      }
    }
  </script>
</body>
</html>`;
}
