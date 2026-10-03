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
      --bg: #06080c;
      --surface: #0c0f16;
      --surface-card: #11151f;
      --surface-border: #1a2232;
      --surface-border-subtle: rgba(255, 255, 255, 0.07);
      --surface-hover: #151b27;
      --accent-green: #00ff88;
      --accent-green-dim: rgba(0, 255, 136, 0.12);
      --accent-green-glow: rgba(0, 255, 136, 0.25);
      --accent-cyan: #00d9f5;
      --accent-cyan-dim: rgba(0, 217, 245, 0.12);
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
      background-image: 
        radial-gradient(ellipse 90% 50% at 50% -10%, rgba(0, 255, 136, 0.08), transparent 60%),
        radial-gradient(circle at 10% 40%, rgba(0, 217, 245, 0.04), transparent 30%),
        radial-gradient(circle at 90% 70%, rgba(0, 255, 136, 0.03), transparent 40%);
      background-attachment: fixed;
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }

    /* Fixed Top Glass Navbar */
    .nav-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100%;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background: rgba(6, 8, 12, 0.8);
      border-bottom: 1px solid var(--surface-border-subtle);
    }

    .nav-container {
      max-width: 1280px;
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
      gap: 10px;
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
      gap: 5px;
      background: rgba(0, 255, 136, 0.08);
      border: 1px solid rgba(0, 255, 136, 0.25);
      color: var(--accent-green);
      font-size: 0.65rem;
      font-family: var(--font-mono);
      padding: 3px 8px;
      border-radius: 20px;
      font-weight: 600;
    }

    .beacon-dot {
      width: 6px;
      height: 6px;
      background: var(--accent-green);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-green);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 0.4; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.15); }
      100% { opacity: 0.4; transform: scale(0.9); }
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .cli-pill-nav {
      display: none;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 6px 12px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
    }

    .cli-pill-nav:hover {
      border-color: var(--accent-green);
      color: var(--text-main);
      background: rgba(0, 255, 136, 0.05);
    }

    .cli-pill-nav span {
      color: var(--accent-green);
    }

    @media (min-width: 640px) {
      .cli-pill-nav {
        display: inline-flex;
      }
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
      transition: color 0.15s;
    }

    .nav-link:hover {
      color: var(--accent-green);
    }

    /* Master Layout: 3 Columns (Desktop Gutter Rails) */
    .site-wrapper {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 28px;
      padding: 0 16px 80px;
      min-height: 100vh;
    }

    /* Desktop Sticky Ad Rails */
    .ad-rail {
      display: none;
      width: 160px;
      flex: 0 0 160px;
    }

    @media (min-width: 1180px) {
      .ad-rail {
        display: block;
      }
    }

    .ad-sticky {
      position: sticky;
      top: 80px;
      background: rgba(12, 15, 22, 0.75);
      border: 1px dashed var(--surface-border);
      border-radius: 14px;
      padding: 16px 8px;
      min-height: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-align: center;
      backdrop-filter: blur(8px);
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
      background: rgba(255, 255, 255, 0.02);
      border-radius: 8px;
    }

    .ad-fallback-label {
      font-size: 0.72rem;
      color: var(--text-dim);
    }

    /* Main Central Application Area */
    .content-container {
      width: 100%;
      max-width: 760px;
      flex: 1 1 760px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 24px;
    }

    /* In-Flow Horizontal Ad Banners */
    .ad-banner-inline {
      width: 100%;
      margin: 12px 0 28px;
      background: rgba(12, 15, 22, 0.65);
      border: 1px dashed var(--surface-border);
      border-radius: 12px;
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
      right: 10px;
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-dim);
    }

    /* Hero */
    .hero {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      width: 100%;
      margin-bottom: 24px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(0, 255, 136, 0.06);
      border: 1px solid rgba(0, 255, 136, 0.22);
      border-radius: 30px;
      font-size: clamp(0.72rem, 2.5vw, 0.8rem);
      font-weight: 600;
      color: var(--accent-green);
      line-height: 1.2;
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.1);
    }

    .hero-title {
      font-size: clamp(2rem, 6vw, 3.4rem);
      font-weight: 800;
      letter-spacing: -0.035em;
      line-height: 1.12;
      max-width: 720px;
      text-align: center;
    }

    .hero-title span {
      background: linear-gradient(135deg, #ffffff 40%, var(--accent-green) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: clamp(0.92rem, 2.8vw, 1.12rem);
      color: var(--text-muted);
      max-width: 580px;
      line-height: 1.6;
      text-align: center;
    }

    /* Modern Mode Pills */
    .mode-pills {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 4px;
      margin-top: 4px;
    }

    .mode-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .mode-btn.active {
      background: rgba(0, 255, 136, 0.15);
      color: var(--accent-green);
      border: 1px solid rgba(0, 255, 136, 0.3);
    }

    /* Uploader Card (World-Class Redesign) */
    .uploader-card {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 20px;
      padding: clamp(20px, 4vw, 36px);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      position: relative;
      overflow: hidden;
      margin-bottom: 36px;
    }

    .uploader-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent-green), var(--accent-cyan), transparent);
    }

    /* Retention Options Inside Card */
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
      gap: 6px;
      background: rgba(0, 0, 0, 0.3);
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
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .ttl-tab.active {
      background: rgba(0, 255, 136, 0.15);
      color: var(--accent-green);
    }

    .drop-zone {
      border: 2px dashed rgba(255, 255, 255, 0.16);
      border-radius: 16px;
      padding: clamp(32px, 6vw, 48px) 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      background: rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .drop-zone:hover, .drop-zone:focus {
      border-color: rgba(0, 255, 136, 0.6);
      background: rgba(0, 255, 136, 0.03);
      transform: translateY(-1px);
    }

    .drop-zone.dragover {
      border-color: var(--accent-green);
      background: rgba(0, 255, 136, 0.08);
      box-shadow: 0 0 30px rgba(0, 255, 136, 0.15);
      transform: scale(1.01);
    }

    .drop-icon-wrap {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: rgba(0, 255, 136, 0.08);
      border: 1px solid rgba(0, 255, 136, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-green);
      font-size: 1.8rem;
      transition: transform 0.2s ease;
    }

    .drop-zone:hover .drop-icon-wrap {
      transform: scale(1.08);
      border-color: var(--accent-green);
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
    }

    .drop-title {
      font-size: clamp(1.1rem, 3.2vw, 1.3rem);
      font-weight: 700;
      color: var(--text-main);
    }

    .drop-subtitle {
      font-size: clamp(0.8rem, 2.5vw, 0.9rem);
      color: var(--text-muted);
      line-height: 1.4;
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
    }

    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan));
      transition: width 0.15s ease-out;
      box-shadow: 0 0 10px var(--accent-green);
    }

    /* Result State Card */
    .result-box {
      display: none;
      background: #080b11;
      border: 1px solid rgba(0, 255, 136, 0.35);
      border-radius: 14px;
      padding: clamp(16px, 3.5vw, 24px);
      margin-top: 24px;
      box-shadow: 0 0 25px rgba(0, 255, 136, 0.1);
    }

    .result-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 14px;
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
      font-size: clamp(0.85rem, 2.6vw, 0.95rem);
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
      background: rgba(0, 255, 136, 0.15);
      color: var(--accent-green);
      border: 1px solid rgba(0, 255, 136, 0.35);
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s;
      min-height: 38px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      white-space: nowrap;
    }

    .copy-btn:hover {
      background: var(--accent-green);
      color: #04140b;
      box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
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
      background: rgba(0, 0, 0, 0.4);
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

    .result-curl-text span {
      color: var(--accent-cyan);
    }

    .result-meta-row {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-dim);
    }

    /* Interactive Terminal Demo Widget */
    .terminal-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 40px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
    }

    .section-title {
      font-size: clamp(1.2rem, 3.5vw, 1.45rem);
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .section-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .terminal-box {
      background: #080a0e;
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
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
    }

    .terminal-tab-btn {
      background: transparent;
      border: none;
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .terminal-tab-btn.active {
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-main);
    }

    .terminal-body {
      padding: 18px 20px;
      font-family: var(--font-mono);
      font-size: clamp(0.75rem, 2.3vw, 0.88rem);
      line-height: 1.6;
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

    /* Features Grid (6 High-End Cards) */
    .features-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
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
        gap: 18px;
      }
    }

    .feature-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: clamp(20px, 4vw, 26px);
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s;
    }

    .feature-card:hover {
      transform: translateY(-2px);
      border-color: rgba(0, 255, 136, 0.3);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }

    .feature-icon-box {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--surface-border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      margin-bottom: 2px;
    }

    .feature-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-main);
      letter-spacing: -0.01em;
    }

    .feature-desc {
      font-size: 0.86rem;
      color: var(--text-muted);
      line-height: 1.55;
    }

    /* API Reference Cheat Sheet Section */
    .api-section {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: clamp(20px, 4vw, 28px);
      margin-bottom: 30px;
    }

    .api-title {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
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
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--surface-border);
      border-radius: 10px;
      padding: 10px 14px;
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
      font-size: 0.8rem;
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

    .copy-sm {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--surface-border);
      color: var(--text-muted);
      font-size: 0.7rem;
      padding: 3px 8px;
      border-radius: 4px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .copy-sm:hover {
      color: var(--accent-green);
      border-color: var(--accent-green);
    }

    /* Footer */
    footer {
      width: 100%;
      border-top: 1px solid var(--surface-border);
      padding: 32px 16px;
      font-size: 0.85rem;
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

  <!-- Top Glass Navbar -->
  <header class="nav-bar">
    <div class="nav-container">
      <a href="/" class="brand-wrap">
        <div class="brand-logo">
          <span>>_</span> tdrop
        </div>
        <div class="status-beacon">
          <div class="beacon-dot"></div>
          <span>Edge Live</span>
        </div>
      </a>
      <div class="nav-right">
        <div class="cli-pill-nav" onclick="copySnippet('npx tdrop <file>')">
          <span>$</span> npx tdrop &lt;file&gt;
        </div>
        <a href="#cli" class="nav-link">CLI</a>
        <a href="#features" class="nav-link">Features</a>
        <a href="/stats" class="nav-link" style="color:var(--accent-green);">Live Stats</a>
        <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener" class="nav-link">GitHub</a>
      </div>
    </div>
  </header>

  <!-- 3-Column Master Layout -->
  <div class="site-wrapper">

    <!-- Left Sticky Ad Rail (Desktop >= 1180px only, 160x600) -->
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

    <!-- Center Content: Always Centered & Never Squished -->
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
            <span>ClamAV Clean · $0 Egress · 10MB Free</span>
          </div>
          <h1 class="hero-title">
            Ephemeral file sharing for the <span>terminal generation</span>.
          </h1>
          <p class="hero-subtitle">
            Transfer files instantly from your terminal, cURL, or browser. Streamed directly to Cloudflare R2 edge with zero retention debt.
          </p>
        </section>

        <!-- Interactive Drag-and-Drop & Tap Uploader -->
        <div class="uploader-card">
          
          <!-- Retention TTL Selector -->
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

          <!-- Drop Target -->
          <div class="drop-zone" id="dropZone" onclick="document.getElementById('fileInput').click()">
            <input type="file" id="fileInput" class="file-input" onchange="handleFileSelect(this.files)">
            <div class="drop-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <div class="drop-title">Drop your file here or tap to browse</div>
            <div class="drop-subtitle">Strict 10MB free tier · Auto-expires after selected duration</div>
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

          <!-- Result Card -->
          <div class="result-box" id="resultBox">
            <div class="result-header">
              <span>✔ Upload Complete & Live</span>
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
              <p class="section-desc">Command line first. Pipe stdin, upload files, or curl directly.</p>
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

        <!-- Features Grid (6 Developer Pillars) -->
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
        <p>tdrop · Ephemeral File Sharing for Developers · <a href="/stats">Live Telemetry Dashboard</a> · <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">Open Source (GitHub)</a></p>
        <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">Zero egress fees · No trackers · RFC 5987 Compliant</p>
      </footer>

    </div>

    <!-- Right Sticky Ad Rail (Desktop >= 1180px only, 160x600) -->
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
