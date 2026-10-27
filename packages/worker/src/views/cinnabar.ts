/**
 * Cinnabar Design System v1.0 by EthicCode
 * Shared tokens, components, typography, layout, navbar, and footer for tdrop.
 * Specification: ethiccode.in/cinnabar
 */

export const CINNABAR_FONTS_HTML = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Parkinsans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Mukta:wght@400;600&display=swap" rel="stylesheet">
`;

export const CINNABAR_CSS = `
  :root {
    /* 3.1 & 3.2 Core Palette & Extended Neutrals (Dark Theme: "Sindoor on Obsidian") */
    --sindoor: #F2542D;
    --sindoor-hover: #FF6A44;
    --sindoor-pressed: #D9461F;
    --sindoor-text: #FF7A57;
    --sindoor-tint: rgba(242, 84, 45, .14);
    --sindoor-ring: rgba(242, 84, 45, .20);

    --obsidian: #0B0B0D;
    --graphite: #16161A;
    --graphite-raised: #1A1A1F;
    --graphite-input: #222228;
    --paper: #F7F7F5;

    /* Hairlines & Borders */
    --line: #232328;
    --line-strong: #2A2A30;
    --line-stronger: #3A3A42;

    /* Text Colors */
    --text: #F7F7F5;
    --text-soft: #D4D4D8;
    --text-muted: #A1A1AA;
    --text-faint: #8A8A93;
    --placeholder: #8E8E97;

    /* 3.4 Semantic Colours (Strict Rules: Error is Cool Rose-Red, never Sindoor) */
    --success: #22C55E;
    --success-text: #4ADE80;
    --success-tint: rgba(34, 197, 94, .14);

    --warning: #EAB308;
    --warning-text: #FACC15;
    --warning-tint: rgba(234, 179, 8, .14);

    --danger: #E11D48;
    --danger-text: #FB7185;
    --danger-tint: rgba(225, 29, 72, .16);

    /* 4.1 Typography */
    --font-sans: "Parkinsans", "Mukta", system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;

    /* 5.1 Spacing Scale (4px base) */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 20px;
    --space-6: 24px;
    --space-8: 32px;
    --space-12: 48px;
    --space-16: 64px;
    --space-24: 96px;

    /* 5.3 Radius Scale */
    --radius-xs: 6px;
    --radius-sm: 12px;
    --radius-md: 16px;
    --radius-lg: 20px;
    --radius-xl: 24px;
    --radius-pill: 999px;

    /* 8.2 Motion Tokens */
    --dur-fast: 150ms;
    --dur-base: 200ms;
    --dur-slow: 300ms;
    --ease-out: cubic-bezier(.2, 0, 0, 1);
  }

  /* Reset & Baseline */
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
    background-color: var(--obsidian);
    color: var(--text);
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.6;
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    overflow-x: hidden;
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* 9.1 Buttons: "Pill with icon" (44px min touch target on mobile) */
  .btn {
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 500;
    min-height: 44px;
    border-radius: var(--radius-pill);
    border: 1px solid transparent;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all var(--dur-fast) ease;
    text-decoration: none;
    line-height: 1;
    user-select: none;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }

  .btn-primary {
    background: var(--sindoor);
    color: var(--obsidian);
    padding: 8px 10px 8px 18px;
    border-color: transparent;
  }

  .btn-primary:hover {
    background: var(--sindoor-hover);
  }

  .btn-primary:active {
    background: var(--sindoor-pressed);
  }

  .btn-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--obsidian);
    color: var(--sindoor);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-family: var(--font-sans);
    font-weight: 700;
    transition: transform var(--dur-fast) ease;
    flex-shrink: 0;
  }

  .btn-primary:hover .btn-icon,
  .btn:hover .btn-icon {
    transform: rotate(-45deg);
  }

  .btn-secondary {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--line-strong);
    padding: 10px 18px;
  }

  .btn-secondary:hover {
    border-color: var(--sindoor);
    color: var(--sindoor);
  }

  .btn-secondary:active {
    background: var(--sindoor-tint);
  }

  .btn-ghost {
    background: transparent;
    color: var(--text-muted);
    border: none;
    padding: 8px 12px;
  }

  .btn-ghost:hover {
    color: var(--text);
  }

  .btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--sindoor-ring);
  }

  /* 9.2 Cards: "Filled with sindoor hover border" */
  .card {
    background: var(--graphite);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    padding: 20px;
    transition: border-color var(--dur-slow) ease;
  }

  .card:hover {
    border-color: var(--sindoor);
  }

  .card:hover .btn-icon {
    transform: rotate(-45deg);
  }

  /* 9.3 Inputs: "Filled with glow ring" (16px base font on mobile to prevent iOS auto-zoom) */
  .input {
    height: 46px;
    min-height: 46px;
    width: 100%;
    padding: 0 16px;
    font-family: var(--font-sans);
    font-size: 16px;
    color: var(--text);
    background: var(--graphite-input);
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    outline: none;
    transition: all var(--dur-fast) ease;
  }

  @media (min-width: 640px) {
    .input {
      font-size: 14px;
      height: 44px;
      min-height: 44px;
      padding: 0 14px;
    }
  }

  .input::placeholder {
    color: var(--placeholder);
  }

  .input:hover {
    background: #26262C;
  }

  .input:focus {
    background: var(--obsidian);
    border-color: var(--sindoor);
    box-shadow: 0 0 0 3px var(--sindoor-ring);
  }

  .input[aria-invalid="true"] {
    border-color: var(--danger);
    box-shadow: 0 0 0 3px rgba(225, 29, 72, .2);
  }

  .input.mono {
    font-family: var(--font-mono);
  }

  /* 9.4 Badges: "Outline with dot" */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-soft);
    padding: 5px 10px;
    border: 1px solid var(--line-strong);
    border-radius: var(--radius-pill);
    background: transparent;
    user-select: none;
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--sindoor);
    flex-shrink: 0;
  }

  .badge-dot.success { background: var(--success); }
  .badge-dot.warning { background: var(--warning); }
  .badge-dot.danger  { background: var(--danger); }
  .badge-dot.neutral { background: var(--text-faint); }

  /* 9.5 Navigation bar: Floating Island with Sindoor Dot Indicator */
  .nav-wrapper {
    position: sticky;
    top: 16px;
    z-index: 100;
    width: 100%;
    max-width: 880px;
    margin: 0 auto;
    padding: 0 16px;
    pointer-events: none;
  }

  .nav-island {
    pointer-events: auto;
    background: rgba(22, 22, 26, 0.94);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--line);
    border-radius: var(--radius-pill);
    padding: 8px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    transition: border-color var(--dur-fast);
  }

  .nav-island:hover {
    border-color: var(--line-strong);
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.15rem;
    letter-spacing: -0.02em;
    color: var(--text);
    text-decoration: none;
  }

  .brand-spark {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--sindoor);
    margin-left: 1px;
    vertical-align: super;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 22px;
  }

  .nav-link {
    position: relative;
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 500;
    padding: 6px 2px;
    transition: color var(--dur-fast);
  }

  .nav-link:hover {
    color: var(--text);
  }

  .nav-link[aria-current="page"] {
    color: var(--text);
  }

  .nav-link[aria-current="page"]::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -6px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--sindoor);
    transform: translateX(-50%);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .cli-pill-nav {
    display: none;
    align-items: center;
    gap: 7px;
    background: var(--graphite-raised);
    border: 1px solid var(--line-strong);
    border-radius: var(--radius-pill);
    padding: 6px 12px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-soft);
    cursor: pointer;
    transition: all var(--dur-fast) ease;
    user-select: none;
  }

  .cli-pill-nav:hover {
    border-color: var(--sindoor);
    color: var(--text);
  }

  .cli-pill-nav:active {
    transform: scale(0.98);
  }

  @media (min-width: 680px) {
    .cli-pill-nav {
      display: inline-flex;
    }
  }

  /* Responsive Mobile Nav adjustments */
  @media (max-width: 640px) {
    .nav-wrapper {
      top: 10px;
      padding: 0 10px;
    }
    .nav-island {
      padding: 6px 12px;
      gap: 8px;
    }
    .nav-brand {
      font-size: 1.05rem;
    }
    .nav-links {
      gap: 10px;
    }
    .nav-link {
      font-size: 13px;
      padding: 6px 3px;
    }
  }

  @media (max-width: 375px) {
    .nav-links {
      gap: 6px;
    }
    .nav-link {
      font-size: 12px;
      padding: 6px 2px;
    }
  }

  /* Universal Mobile Layout & Bottom-Sheet Modal rules */
  .container, .content-wrapper, .dashboard-wrapper, .site-wrapper {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media (max-width: 640px) {
    .container, .content-wrapper, .dashboard-wrapper, .site-wrapper {
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 18px;
      padding-bottom: 60px;
    }

    .modal-overlay {
      padding: 8px;
      align-items: flex-end;
    }

    .modal-card {
      padding: 22px 18px 28px;
      border-radius: var(--radius-xl) var(--radius-xl) 16px 16px;
      max-height: 88vh;
      overflow-y: auto;
    }

    .footer-links-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px 16px;
      width: 100%;
    }

    .footer-top {
      gap: 28px;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }

  /* 9.7 Toast / Alerts */
  .toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
    background: var(--graphite);
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    padding: 12px 18px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    gap: 12px;
    transform: translateY(12px);
    opacity: 0;
    pointer-events: none;
    transition: transform var(--dur-base) ease, opacity var(--dur-base) ease;
  }

  .toast.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  /* Cinnabar Footer */
  .site-footer {
    width: 100%;
    border-top: 1px solid var(--line);
    background: var(--obsidian);
    padding: 56px 24px 64px;
    margin-top: 96px;
  }

  .footer-container {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 36px;
  }

  .footer-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 36px;
  }

  .footer-brand-col {
    max-width: 320px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-tagline {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .footer-links-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 48px;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-col-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-faint);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .footer-link {
    font-size: 14px;
    color: var(--text-muted);
    transition: color var(--dur-fast);
  }

  .footer-link:hover {
    color: var(--sindoor);
  }

  .footer-bottom {
    border-top: 1px solid var(--line);
    padding-top: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    font-size: 13px;
    color: var(--text-faint);
  }

  .cinnabar-credit {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--text-muted);
  }

  .cinnabar-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--sindoor);
    display: inline-block;
  }

  /* Accessibility / Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0ms !important;
      animation-duration: 0ms !important;
    }
  }
`;

export function renderCinnabarNav(activePage: string, domain: string = "tdrop.link"): string {
  const pages = [
    { id: "drop", label: "Drop", path: "/" },
    { id: "stats", label: "Telemetry", path: "/stats" },
    { id: "docs", label: "Docs", path: "/docs" },
    { id: "sponsor", label: "Sponsor", path: "/sponsor" },
    { id: "about", label: "About", path: "/about" },
  ];

  return `
    <header class="nav-wrapper">
      <nav class="nav-island" aria-label="Main Navigation">
        <a href="/" class="nav-brand" aria-label="tdrop homepage">
          tdrop<span class="brand-spark"></span>
        </a>

        <div class="nav-links">
          ${pages
            .map(
              (p) => `
            <a href="${p.path}" class="nav-link"${activePage === p.id ? ' aria-current="page"' : ""}>
              ${p.label}
            </a>
          `
            )
            .join("")}
        </div>

        <div class="nav-actions">
          <button class="cli-pill-nav" id="navCliPill" onclick="copyNavCli('npx tdrop <file>', this)" title="Copy terminal upload command">
            <span>npx tdrop</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <script>
      function copyNavCli(text, btn) {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(text).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = '<span>Copied!</span>';
          setTimeout(() => { btn.innerHTML = original; }, 1800);
        });
      }
    </script>
  `;
}

export function renderCinnabarFooter(domain: string = "tdrop.link"): string {
  return `
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-top">
          <div class="footer-brand-col">
            <a href="/" class="nav-brand" style="font-size: 1.25rem;">
              tdrop<span class="brand-spark"></span>
            </a>
            <p class="footer-tagline">
              Fast, ephemeral, authless file sharing utility for developers and everyday users. Transfer files with zero disk writes, encryption at rest, and automatic self-destruction.
            </p>
          </div>

          <div class="footer-links-grid">
            <div class="footer-col">
              <span class="footer-col-title">Service</span>
              <a href="/" class="footer-link">Drop File</a>
              <a href="/stats" class="footer-link">Live Telemetry</a>
              <a href="/sponsor" class="footer-link">Sponsor Terminal Blip</a>
            </div>

            <div class="footer-col">
              <span class="footer-col-title">Resources</span>
              <a href="/docs" class="footer-link">Documentation</a>
              <a href="/docs/cli-guide" class="footer-link">CLI Reference</a>
              <a href="/docs/curl-api" class="footer-link">cURL & REST API</a>
              <a href="/docs/security" class="footer-link">Security Architecture</a>
            </div>

            <div class="footer-col">
              <span class="footer-col-title">Company</span>
              <a href="/about" class="footer-link">About Project</a>
              <a href="/contact" class="footer-link">Support & Security</a>
              <a href="https://github.com/TAGISWILD/tdrop" target="_blank" rel="noopener" class="footer-link">GitHub Repository</a>
            </div>

            <div class="footer-col">
              <span class="footer-col-title">Legal</span>
              <a href="/privacy" class="footer-link">Privacy Policy</a>
              <a href="/terms" class="footer-link">Terms of Service</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} tdrop. Open source under MIT.</p>
          <div class="cinnabar-credit">
            <span class="cinnabar-dot"></span>
            <span>Crafted with Cinnabar by EthicCode · Trust is the feature.</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}
