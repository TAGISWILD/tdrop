export interface DocPage {
  slug: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
  readTime: string;
  content: string;
}

export const DOCS_PAGES: Record<string, DocPage> = {
  "index": {
    slug: "index",
    title: "Documentation & Architecture Overview",
    category: "Getting Started",
    description: "Welcome to tdrop developer documentation. Learn how ephemeral file sharing works at the edge, explore quickstarts for terminal and web, and understand our zero-retention model.",
    lastUpdated: "October 14, 2026",
    readTime: "5 min read",
    content: `
      <h2>Welcome to tdrop</h2>
      <p><strong>tdrop</strong> (Terminal Drop) is an ultra-fast, zero-friction, ephemeral file sharing service designed specifically for software engineers, systems administrators, DevOps pipelines, and everyday users. It eliminates the tedious overhead of authentication, email verifications, and permanent storage debt when you simply need to move an archive, log file, build artifact, or image across devices.</p>

      <div class="callout callout-info">
        <div class="callout-title">Core Philosophy: Zero Storage Debt</div>
        <p>Every file sent through tdrop is strictly temporary. Files automatically self-destruct after your chosen retention period (1 hour, 24 hours, or 7 days). We store zero activity logs, require zero accounts, and never track your identity.</p>
      </div>

      <h2>Quickstart in 10 Seconds</h2>
      <p>tdrop works wherever you have a command line or a browser. No configuration files or API keys are required:</p>

      <div class="code-block-wrap">
        <div class="code-header">
          <span>Terminal (Node / npx)</span>
          <button class="copy-btn" onclick="copySnippet('npx tdrop my-file.tar.gz')">Copy</button>
        </div>
        <pre><code><span class="tok-comment"># Drop any file directly from your terminal</span>
$ npx tdrop my-file.tar.gz

<span class="tok-comment"># Upload with custom 1-hour expiration</span>
$ npx tdrop server.log --ttl 1h

<span class="tok-comment"># Pipe raw output directly from another command</span>
$ cat /var/log/nginx/error.log | npx tdrop --filename nginx-error.log</code></pre>
      </div>

      <div class="code-block-wrap">
        <div class="code-header">
          <span>cURL (Native on Linux, macOS & Windows)</span>
          <button class="copy-btn" onclick="copySnippet('curl -F &quot;file=@archive.zip&quot; https://tdrop.link/upload')">Copy</button>
        </div>
        <pre><code><span class="tok-comment"># Multipart upload via cURL</span>
$ curl -F "file=@archive.zip" https://tdrop.link/upload

<span class="tok-comment"># Raw binary streaming via stdin</span>
$ cat backup.sql | curl -H "X-TDrop-Filename: backup.sql" --data-binary @- https://tdrop.link/upload/raw</code></pre>
      </div>

      <h2>High-Level System Architecture</h2>
      <p>Traditional file upload services buffer the entire file into server memory or local disk before forwarding it to cold object storage. tdrop uses an edge-native streaming pipeline built on Cloudflare Workers and Cloudflare R2:</p>

      <div class="diagram-box">
        <pre><code>[Client: CLI / cURL / Web]
         │
         ▼  (TLS 1.3 / HTTP/3 Edge Ingestion)
[Cloudflare Edge Worker (Anycast PoP)]
   ┌─────┴───────────────────────────────────┐
   │ 1. Multipart stream chunking            │
   │ 2. Streaming ClamAV virus scan pipeline │
   │ 3. Generate 7-char Base62 shortcode     │
   └─────┬───────────────────────────────────┘
         ├───────────────────────────────────┐
         ▼                                   ▼
[Cloudflare R2 Object Storage]        [Cloudflare KV Metadata]
  • AES-256 Encrypted at rest           • Shortcode mapping
  • $0 Egress Bandwidth                 • Expiration TTL
  • Direct streaming chunks             • Anonymized telemetry
         │                                   │
         ▼                                   ▼
[Target Receiver / Phone QR Code]     [Auto-Incinerator Purge]</code></pre>
      </div>

      <h2>Key Features & Highlights</h2>
      <div class="feature-table-wrap">
        <table class="doc-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Specification</th>
              <th>Benefit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Direct-to-R2 Streaming</strong></td>
              <td>Zero disk writes, zero RAM buffer</td>
              <td>Eliminates edge latency; transfers begin streaming immediately.</td>
            </tr>
            <tr>
              <td><strong>ClamAV Engine</strong></td>
              <td>Real-time streaming heuristic inspection</td>
              <td>Ensures malware, ransomware, and malicious binaries are blocked before distribution.</td>
            </tr>
            <tr>
              <td><strong>Auto-Incinerate TTL</strong></td>
              <td>1 Hour, 24 Hours, or 7 Days</td>
              <td>Guaranteed deletion. Compliant with GDPR data minimization principles.</td>
            </tr>
            <tr>
              <td><strong>Universal Installation</strong></td>
              <td>WinGet, Homebrew, NPM, curl, irm</td>
              <td>Native setup on Windows, macOS, Linux, and FreeBSD.</td>
            </tr>
            <tr>
              <td><strong>Resumable HTTP Range</strong></td>
              <td>RFC 7233 <code>206 Partial Content</code></td>
              <td>Supports interrupted downloads and multithreaded accelerators (curl -C -).</td>
            </tr>
            <tr>
              <td><strong>QR Code Mobile Share</strong></td>
              <td>Client-side SVG generation</td>
              <td>Instant terminal-to-smartphone transfers without typing long URLs.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Next Steps</h2>
      <div class="doc-cards-grid">
        <a href="/docs/cli-guide" class="doc-card">
          <div class="doc-card-tag">Guide</div>
          <div class="doc-card-title">CLI & Package Managers →</div>
          <div class="doc-card-desc">Install via WinGet, Homebrew, NPM, or shell script, and explore all command flags.</div>
        </a>
        <a href="/docs/curl-api" class="doc-card">
          <div class="doc-card-tag">API Reference</div>
          <div class="doc-card-title">cURL & HTTP API →</div>
          <div class="doc-card-desc">Complete specification for multipart uploads, raw stdin streaming, and range requests.</div>
        </a>
        <a href="/docs/security" class="doc-card">
          <div class="doc-card-tag">Whitepaper</div>
          <div class="doc-card-title">Security & ClamAV Architecture →</div>
          <div class="doc-card-desc">Deep dive into edge streaming, ClamAV scanning, zero-knowledge ephemerality, and terminal sanitization.</div>
        </a>
        <a href="/docs/ci-cd-automation" class="doc-card">
          <div class="doc-card-tag">DevOps</div>
          <div class="doc-card-title">CI/CD Pipeline Drops →</div>
          <div class="doc-card-desc">Automate build log exports and crash artifact sharing in GitHub Actions, GitLab, and Docker.</div>
        </a>
      </div>
    `,
  },

  "cli-guide": {
    slug: "cli-guide",
    title: "CLI & Package Manager Reference Guide",
    category: "CLI Tools",
    description: "Complete reference for the tdrop terminal client. Learn how to install on Windows, macOS, Linux, and FreeBSD, master command flags, and configure shell integration.",
    lastUpdated: "October 14, 2026",
    readTime: "7 min read",
    content: `
      <h2>Overview of the tdrop CLI</h2>
      <p>The <code>tdrop</code> command-line utility provides the fastest way to upload files, directories (as auto-tarballs), and piped command output directly from your shell. It supports interactive animated progress bars, live transfer speed calculation, QR code rendering inside modern ANSI terminals, and instant clipboard copy.</p>

      <h2>Installation Options</h2>
      <p>Choose your preferred package manager or operating system below:</p>

      <div class="install-tabs">
        <div class="code-block-wrap">
          <div class="code-header">
            <span>Windows (WinGet)</span>
            <button class="copy-btn" onclick="copySnippet('winget install Tagiswild.tdrop')">Copy</button>
          </div>
          <pre><code>$ winget install Tagiswild.tdrop</code></pre>
        </div>

        <div class="code-block-wrap">
          <div class="code-header">
            <span>macOS & Linux (Homebrew)</span>
            <button class="copy-btn" onclick="copySnippet('brew install tagiswild/tap/tdrop')">Copy</button>
          </div>
          <pre><code>$ brew install tagiswild/tap/tdrop</code></pre>
        </div>

        <div class="code-block-wrap">
          <div class="code-header">
            <span>Node.js / NPM (Cross-Platform)</span>
            <button class="copy-btn" onclick="copySnippet('npm install -g tdrop')">Copy</button>
          </div>
          <pre><code><span class="tok-comment"># Install globally</span>
$ npm install -g tdrop

<span class="tok-comment"># Or run directly without installation</span>
$ npx tdrop &lt;file&gt;</code></pre>
        </div>

        <div class="code-block-wrap">
          <div class="code-header">
            <span>Unix Shell Script (Linux / macOS / WSL)</span>
            <button class="copy-btn" onclick="copySnippet('curl -fsSL https://tdrop.link/install.sh | bash')">Copy</button>
          </div>
          <pre><code>$ curl -fsSL https://tdrop.link/install.sh | bash</code></pre>
        </div>

        <div class="code-block-wrap">
          <div class="code-header">
            <span>Windows PowerShell (Standalone Native Executable)</span>
            <button class="copy-btn" onclick="copySnippet('irm https://tdrop.link/install.ps1 | iex')">Copy</button>
          </div>
          <pre><code>PS> irm https://tdrop.link/install.ps1 | iex</code></pre>
        </div>
      </div>

      <h2>Command-Line Syntax & Usage</h2>
      <p>The basic syntax for uploading a file is:</p>
      <div class="code-block-wrap">
        <pre><code>tdrop [options] &lt;file-path&gt;
cat &lt;file&gt; | tdrop [options]</code></pre>
      </div>

      <h2>Available Flags & Options</h2>
      <div class="feature-table-wrap">
        <table class="doc-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>-t, --ttl &lt;duration&gt;</code></td>
              <td><code>24h</code></td>
              <td>Retention duration. Valid values are <code>1h</code> (1 hour), <code>24h</code> (24 hours), or <code>7d</code> (7 days).</td>
            </tr>
            <tr>
              <td><code>-n, --filename &lt;name&gt;</code></td>
              <td>Basename / <code>stdin.txt</code></td>
              <td>Explicit filename to assign to the download (especially useful when streaming piped stdin).</td>
            </tr>
            <tr>
              <td><code>--json</code></td>
              <td><code>false</code></td>
              <td>Output machine-readable JSON containing shortcode, URL, filename, and expiry timestamp.</td>
            </tr>
            <tr>
              <td><code>-q, --quiet</code></td>
              <td><code>false</code></td>
              <td>Suppress progress bars and banners; prints only the final download URL.</td>
            </tr>
            <tr>
              <td><code>--qr</code></td>
              <td><code>false</code></td>
              <td>Render an ANSI ASCII QR code directly in the terminal for rapid mobile scanning.</td>
            </tr>
            <tr>
              <td><code>--no-ad</code></td>
              <td><code>false</code></td>
              <td>Suppress sponsor blip text in terminal output.</td>
            </tr>
            <tr>
              <td><code>-v, --version</code></td>
              <td>—</td>
              <td>Print the current CLI version and exit.</td>
            </tr>
            <tr>
              <td><code>-h, --help</code></td>
              <td>—</td>
              <td>Display help and options manual.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Practical Real-World Examples</h2>

      <h3>1. Ephemeral Log Drop with 1-Hour Expiration</h3>
      <p>Send a quick debug log to a colleague that auto-deletes in 60 minutes:</p>
      <div class="code-block-wrap">
        <pre><code>$ tdrop --ttl 1h debug.log
Uploading [████████████] 100% | 1.4 MB/s
✔ Upload complete!
  Scan: Verified Clean (ClamAV)
  Link: https://tdrop.link/k8mP2x1
  TTL:  1 hour (auto-incinerates at 15:42 UTC)</code></pre>
      </div>

      <h3>2. Piping Stdin from Commands</h3>
      <p>Stream command output without creating temporary files on your hard drive:</p>
      <div class="code-block-wrap">
        <pre><code><span class="tok-comment"># Share the last 500 lines of systemd journal</span>
$ journalctl -u nginx -n 500 | tdrop --filename nginx-journal.log

<span class="tok-comment"># Share git diff output with a coworker</span>
$ git diff HEAD~1 | tdrop --filename pr-review.patch</code></pre>
      </div>

      <h3>3. Scripting with Machine-Readable JSON Output</h3>
      <p>Integrate tdrop into bash scripts or CI/CD pipelines using <code>--json</code> and <code>jq</code>:</p>
      <div class="code-block-wrap">
        <pre><code>$ DROP_JSON=$(tdrop build.tar.gz --json)
$ DROP_URL=$(echo "$DROP_JSON" | jq -r '.url')
$ echo "Artifact ready at: $DROP_URL"</code></pre>
      </div>

      <h2>Troubleshooting & Exit Codes</h2>
      <p>The CLI returns standard POSIX exit codes to simplify automation:</p>
      <ul>
        <li><code>0</code>: Upload succeeded and verified clean by ClamAV.</li>
        <li><code>1</code>: General network or server connection failure.</li>
        <li><code>2</code>: File size exceeded the 10MB limit.</li>
        <li><code>3</code>: Malicious binary detected by ClamAV antivirus engine (upload rejected).</li>
      </ul>
    `,
  },

  "curl-api": {
    slug: "curl-api",
    title: "cURL & HTTP REST API Guide",
    category: "API & Developers",
    description: "Learn how to use tdrop directly with cURL, HTTPie, and fetch. Explore multipart form uploads, raw binary streaming, resumable range downloads, and RFC 5987 headers.",
    lastUpdated: "October 14, 2026",
    readTime: "8 min read",
    content: `
      <h2>Native cURL Philosophy</h2>
      <p>Many servers in production environments lack Node.js, Python, or package managers. They are minimal container base images or hardened virtual machines. <strong>tdrop treats cURL as a tier-1 first-class client</strong>. You can drop files, stream archives, and retrieve downloads using nothing more than stock cURL, available on every modern operating system.</p>

      <h2>API Endpoints Summary</h2>
      <div class="feature-table-wrap">
        <table class="doc-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
              <th>Content-Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>POST</code></td>
              <td><code>/upload</code></td>
              <td>Multipart form-data file upload</td>
              <td><code>multipart/form-data</code></td>
            </tr>
            <tr>
              <td><code>POST / PUT</code></td>
              <td><code>/upload/raw</code></td>
              <td>Raw binary byte stream upload</td>
              <td><code>application/octet-stream</code></td>
            </tr>
            <tr>
              <td><code>GET / HEAD</code></td>
              <td><code>/:code</code></td>
              <td>Interactive web landing page or curl redirect</td>
              <td><code>text/html</code></td>
            </tr>
            <tr>
              <td><code>GET / HEAD</code></td>
              <td><code>/:code/:filename</code></td>
              <td>Direct raw binary file download (supports Range)</td>
              <td>Original file MIME type</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/api/stats</code></td>
              <td>Public edge telemetry & node metrics</td>
              <td><code>application/json</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>1. Multipart Upload: <code>POST /upload</code></h2>
      <p>The standard way to upload a local file with form parameters:</p>

      <div class="code-block-wrap">
        <div class="code-header">
          <span>cURL Multipart Example</span>
          <button class="copy-btn" onclick="copySnippet('curl -F &quot;file=@dist.zip&quot; -F &quot;ttl=24h&quot; https://tdrop.link/upload')">Copy</button>
        </div>
        <pre><code>$ curl -F "file=@dist.zip" -F "ttl=24h" https://tdrop.link/upload</code></pre>
      </div>

      <h3>JSON Response Structure</h3>
      <div class="code-block-wrap">
        <pre><code>{
  "success": true,
  "code": "a7kX9b2",
  "filename": "dist.zip",
  "size": 4821094,
  "sizeFormatted": "4.60 MB",
  "url": "https://tdrop.link/a7kX9b2",
  "downloadUrl": "https://tdrop.link/a7kX9b2/dist.zip",
  "expiresIn": "24h",
  "expiresAt": "2026-10-15T18:30:00.000Z",
  "qrSvg": "&lt;svg ... /&gt;"
}</code></pre>
      </div>

      <h2>2. Raw Binary Streaming: <code>POST /upload/raw</code></h2>
      <p>When piping stdout directly into cURL, multipart form boundaries are unnecessary. Use the raw stream endpoint with <code>--data-binary @-</code>:</p>

      <div class="code-block-wrap">
        <div class="code-header">
          <span>Streaming Stdin via cURL</span>
          <button class="copy-btn" onclick="copySnippet('cat database.sql | curl -H &quot;X-TDrop-Filename: database.sql&quot; -H &quot;X-TDrop-TTL: 1h&quot; --data-binary @- https://tdrop.link/upload/raw')">Copy</button>
        </div>
        <pre><code>$ cat database.sql | curl -H "X-TDrop-Filename: database.sql" \
                          -H "X-TDrop-TTL: 1h" \
                          --data-binary @- \
                          https://tdrop.link/upload/raw</code></pre>
      </div>

      <h3>Custom Request Headers for Raw Uploads</h3>
      <ul>
        <li><code>X-TDrop-Filename</code>: The desired download filename (e.g., <code>build-artifact.tar.gz</code>). Defaults to <code>stdin.txt</code> if omitted.</li>
        <li><code>X-TDrop-TTL</code>: Retention duration (<code>1h</code>, <code>24h</code>, <code>7d</code>). Defaults to <code>24h</code>.</li>
      </ul>

      <h2>3. Resumable Range Downloads: <code>GET /:code/:filename</code></h2>
      <p>tdrop supports RFC 7233 partial content range requests. If a large download is interrupted, cURL can resume where it left off:</p>

      <div class="code-block-wrap">
        <div class="code-header">
          <span>Resume Interrupted Download</span>
          <button class="copy-btn" onclick="copySnippet('curl -C - -O https://tdrop.link/a7kX9b2/dist.zip')">Copy</button>
        </div>
        <pre><code><span class="tok-comment"># The -C - flag tells cURL to automatically determine where to resume</span>
$ curl -C - -O https://tdrop.link/a7kX9b2/dist.zip</code></pre>
      </div>

      <h2>4. Useful Shell Aliases</h2>
      <p>Add these handy functions to your <code>~/.bashrc</code> or <code>~/.zshrc</code> for instant terminal shortcuts without installing anything:</p>

      <div class="code-block-wrap">
        <div class="code-header">
          <span>~/.bashrc / ~/.zshrc</span>
          <button class="copy-btn" onclick="copySnippet('drop() { curl -sF &quot;file=@$1&quot; https://tdrop.link/upload | grep -o &quot;https://tdrop.link/[^\&quot;]*&quot; | head -n 1; }')">Copy</button>
        </div>
        <pre><code><span class="tok-comment"># Instant drop alias</span>
drop() {
  if [ -z "$1" ]; then
    echo "Usage: drop &lt;filename&gt;"
    return 1
  fi
  curl -sF "file=@$1" https://tdrop.link/upload | grep -o 'https://tdrop.link/[^"]*' | head -n 1
}</code></pre>
      </div>
    `,
  },

  "security": {
    slug: "security",
    title: "Security Architecture, ClamAV & Zero-Knowledge Ephemerality",
    category: "Architecture & Security",
    description: "Deep dive into tdrop security model: zero-disk streaming to Cloudflare R2, ClamAV antivirus inspection, terminal escape injection sanitization, and cryptographic ephemerality.",
    lastUpdated: "October 14, 2026",
    readTime: "9 min read",
    content: `
      <h2>The Security Philosophy of Ephemeral Systems</h2>
      <p>In modern computer security, <strong>data that does not exist cannot be breached</strong>. Traditional file storage repositories accumulate years of forgotten spreadsheets, database dumps, API credentials, and log files. This creates an ever-growing attack surface subject to subpoena, extortion, credential stuffing, and data leaks.</p>
      <p>tdrop is architected under the principle of <strong>Aggressive Ephemerality</strong>. We treat every file as a hot potato: stream it directly to edge storage, verify it for malware, make it available for the exact duration requested by the sender, and incinerate it permanently.</p>

      <h2>1. Zero-Disk & Zero-RAM Edge Streaming</h2>
      <p>Most file-sharing applications write incoming HTTP payloads to temporary disk directories (like <code>/tmp</code>) on a monolithic application server before re-uploading them to cloud storage. This introduces serious vulnerabilities:</p>
      <ul>
        <li>Disk fill attacks (denial of service by exhausting server disk space).</li>
        <li>Cold remnants left in unallocated disk sectors after unlinking.</li>
        <li>Server memory dumps containing decrypted file contents.</li>
      </ul>
      <p>tdrop utilizes <strong>Cloudflare Workers edge nodes</strong> that handle requests across 300+ cities globally. Data streams directly from the client's socket into Cloudflare R2 object storage via chunked transfer encoding. At no point is the entire file held in memory or written to persistent server storage.</p>

      <h2>2. ClamAV Streaming Malware Inspection</h2>
      <p>To prevent malicious actors from using tdrop as a malware distribution network (C2 staging, payload hosting, or ransomware deployment), all uploads are subjected to automated antivirus inspection powered by the open-source <strong>ClamAV</strong> heuristic engine:</p>

      <div class="diagram-box">
        <pre><code>Incoming HTTP Stream
        │
        ├─────────────────────────────┐
        ▼                             ▼
[Stream to Cloudflare R2]      [Stream to ClamAV Engine]
  (Encrypted Chunk Storage)       (Signature & Heuristic Scan)
                                      │
                                      ▼
                             [Scan Verdict Ready]
                                      │
                   ┌──────────────────┴──────────────────┐
                   ▼                                     ▼
             [CLEAN (100%)]                       [INFECTED]
                   │                                     │
           Confirm Upload & Shortcode           Immediate R2 Abort & Purge
                                                HTTP 403 Forbidden Response</code></pre>
      </div>

      <p>If ClamAV detects a trojan, macro virus, ransomware dropper, or known signature in the stream, the transfer is immediately terminated, the partial object is purged from R2 storage, and the client receives a <code>403 Forbidden: Malicious payload detected</code> response.</p>

      <h2>3. Terminal Escape Injection Protection (Anti-ANSI)</h2>
      <p>When developers use terminal tools, malicious file names can exploit terminal emulators. An attacker can name a file with ANSI escape codes (such as cursor movement sequences, screen clearing codes, or OSC 8 hyperlink sequences) that trick the developer's terminal into executing hidden commands or spoofing credentials.</p>
      <p>tdrop implements strict terminal text sanitization in <code>@tdrop/shared</code>:</p>
      <div class="code-block-wrap">
        <pre><code><span class="tok-comment">// Strip ANSI escape codes, cursor repositions, and OSC sequences</span>
export function sanitizeTerminalText(input: string): string {
  return input
    .replace(/\\x1B\\[[0-?]*[ -/]*[@-~]/g, "") // ANSI CSI commands
    .replace(/\\x1B\\]8;;.*?(\\x1B\\\\|\\x07)/g, "") // OSC 8 hyperlinks
    .replace(/[\\r\\n\\t\\x00-\\x1F]/g, " "); // Control characters
}</code></pre>
      </div>

      <h2>4. Cryptographic Shortcodes & Entropy</h2>
      <p>File access keys are generated as <strong>7-character Base62 shortcodes</strong> (e.g., <code>a7kX9b2</code>):</p>
      <ul>
        <li>Base62 character set: <code>[0-9a-zA-Z]</code> (62 possible characters).</li>
        <li>Combinatorial space: $62^7 = 3,521,614,606,208$ possible combinations (3.52 trillion keys).</li>
        <li>With an average active concurrent file pool under 100,000 items, the probability of an attacker guessing an active shortcode is negligible ($< 0.000003\%$).</li>
        <li>Strict rate limiters block brute-force directory enumeration across all edge nodes.</li>
      </ul>

      <h2>5. Telemetry Filename Privacy</h2>
      <p>Our public telemetry stream at <code>/stats</code> provides transparency into network throughput and edge traffic. However, real user file names are <strong>never</strong> displayed in cleartext. Filenames are automatically masked to <code>drop_••••&lt;token&gt;.&lt;ext&gt;</code>, preserving the file format indicator while fully protecting personal identifiers and confidential filenames.</p>
    `,
  },

  "ci-cd-automation": {
    slug: "ci-cd-automation",
    title: "Automated CI/CD Artifact Drops in GitHub Actions & GitLab",
    category: "DevOps & Automation",
    description: "Learn how to use tdrop in continuous integration pipelines to automatically share test failure logs, mobile screenshots, and ephemeral build outputs with zero storage bloat.",
    lastUpdated: "October 14, 2026",
    readTime: "6 min read",
    content: `
      <h2>The Problem with CI Artifact Storage</h2>
      <p>Modern CI/CD pipelines (GitHub Actions, GitLab CI, CircleCI, Jenkins) frequently generate temporary artifacts during test runs: screenshot diffs from failed Playwright/Cypress runs, core dumps, bundle size analyzer reports, and diagnostic logs. Storing these artifacts in standard cloud storage or native CI artifact storage creates two major problems:</p>
      <ol>
        <li><strong>Permanent Cost & Storage Quotas:</strong> Storage buckets accumulate thousands of gigabytes of old test runs that nobody will ever inspect again.</li>
        <li><strong>Friction for Engineers:</strong> Downloading an artifact from GitHub Actions requires navigating through the GitHub web UI, authenticating, and downloading an entire multi-megabyte ZIP archive just to read a single error log.</li>
      </ol>

      <div class="callout callout-info">
        <div class="callout-title">The tdrop Solution</div>
        <p>Drop the artifact to tdrop with a 24-hour expiration. Print the direct link directly into the CI build log or post it as a pull request comment. The artifact auto-deletes when you're done debugging.</p>
      </div>

      <h2>GitHub Actions Workflow Example</h2>
      <p>Here is a complete, production-ready GitHub Actions step to upload Playwright test failure videos and screenshots directly to tdrop:</p>

      <div class="code-block-wrap">
        <div class="code-header">
          <span>.github/workflows/test.yml</span>
          <button class="copy-btn" onclick="copySnippet('# Upload Playwright Test Failures\n- name: Share Test Artifacts\n  if: failure()\n  run: |\n    tar -czf test-results.tar.gz ./test-results\n    DROP_URL=$(npx tdrop test-results.tar.gz --ttl 24h --quiet)\n    echo &quot;::warning title=Test Artifacts::Debug artifacts available for 24h at: $DROP_URL&quot;')">Copy</button>
        </div>
        <pre><code>name: End-to-End Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Run Test Suite
        run: npm test

      <span class="tok-comment"># Drop failure artifacts only when tests fail</span>
      - name: Share Test Artifacts via tdrop
        if: failure()
        run: |
          tar -czf failure-logs.tar.gz ./logs ./coverage
          DROP_URL=$(npx tdrop failure-logs.tar.gz --ttl 24h --quiet)
          echo "::error title=Debug Artifacts::Inspect failure logs at: $DROP_URL"</code></pre>
      </div>

      <h2>GitLab CI Pipeline Example</h2>
      <p>Use cURL inside lightweight Docker runners in GitLab CI:</p>

      <div class="code-block-wrap">
        <div class="code-header">
          <span>.gitlab-ci.yml</span>
          <button class="copy-btn" onclick="copySnippet('after_script:\n  - tar -czf crash-dump.tar.gz /var/log/app\n  - curl -F &quot;file=@crash-dump.tar.gz&quot; -F &quot;ttl=1h&quot; https://tdrop.link/upload')">Copy</button>
        </div>
        <pre><code>test_suite:
  stage: test
  image: alpine:latest
  script:
    - ./run-tests.sh
  after_script:
    - apk add --no-cache curl tar
    - tar -czf crash-dump.tar.gz ./crash.log
    - DROP_RESPONSE=$(curl -sF "file=@crash-dump.tar.gz" -F "ttl=1h" https://tdrop.link/upload)
    - echo "Ephemeral crash dump: $(echo $DROP_RESPONSE | grep -o 'https://tdrop.link/[^"]*')"</code></pre>
      </div>

      <h2>Slack / Discord Webhook Notifications</h2>
      <p>Combine tdrop with incoming webhooks to send instant download links directly to your engineering team's channel:</p>

      <div class="code-block-wrap">
        <pre><code>$ RES=$(npx tdrop release-preview.apk --ttl 24h --json)
$ URL=$(echo "$RES" | jq -r '.url')
$ curl -X POST -H 'Content-type: application/json' \\
    --data "{\"text\":\"🚀 New preview build uploaded: $URL (expires in 24h)\"}" \\
    $SLACK_WEBHOOK_URL</code></pre>
      </div>
    `,
  },

  "ephemeral-vs-cloud-storage": {
    slug: "ephemeral-vs-cloud-storage",
    title: "Ephemeral Drops vs. Persistent Cloud Storage",
    category: "Architecture & Security",
    description: "An in-depth technical comparison between ephemeral file transfer (tdrop) and permanent cloud storage (AWS S3, Google Drive, Dropbox). Learn when to use each.",
    lastUpdated: "October 14, 2026",
    readTime: "7 min read",
    content: `
      <h2>The Cloud Storage Dilemma</h2>
      <p>Cloud storage providers like Amazon S3, Google Drive, Microsoft OneDrive, and Dropbox are designed for <strong>indefinite durability</strong>. Their infrastructure is engineered to ensure that a file stored today will remain intact 10 years from now. However, the majority of daily file exchanges are transient:</p>
      <ul>
        <li>Sending a temporary diagnostic log to a vendor.</li>
        <li>Transferring a zipped build archive from a workstation to a staging server.</li>
        <li>Sharing a firmware image with a remote hardware test bench.</li>
        <li>Transferring a mobile APK to an Android test phone.</li>
      </ul>
      <p>Using permanent cloud storage for transient transfers creates substantial technical, financial, and legal liabilities.</p>

      <h2>Comparison Matrix</h2>
      <div class="feature-table-wrap">
        <table class="doc-table">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>tdrop (Ephemeral)</th>
              <th>AWS S3 Presigned URLs</th>
              <th>Dropbox / Google Drive</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Account Required</strong></td>
              <td>None (0 signups)</td>
              <td>AWS Root/IAM Account</td>
              <td>Google / Dropbox Account</td>
            </tr>
            <tr>
              <td><strong>Retention Model</strong></td>
              <td>Guaranteed Auto-Purge (1h / 24h / 7d)</td>
              <td>Permanent unless S3 Lifecycle configured</td>
              <td>Permanent until manual user deletion</td>
            </tr>
            <tr>
              <td><strong>Setup Friction</strong></td>
              <td>Zero: <code>npx tdrop &lt;file&gt;</code> or cURL</td>
              <td>High: IAM roles, bucket policies, SDK code</td>
              <td>Medium: OAuth tokens, web dashboards</td>
            </tr>
            <tr>
              <td><strong>Malware Protection</strong></td>
              <td>Built-in ClamAV edge scan</td>
              <td>Requires custom Lambda + AWS GuardDuty</td>
              <td>Proprietary scan / delayed sync</td>
            </tr>
            <tr>
              <td><strong>Terminal Native</strong></td>
              <td>Yes (CLI, WinGet, Brew, cURL)</td>
              <td>AWS CLI (requires credentials)</td>
              <td>Third-party unofficial scripts</td>
            </tr>
            <tr>
              <td><strong>Egress Bandwidth Cost</strong></td>
              <td>$0 (Powered by Cloudflare R2)</td>
              <td>$0.09 per GB (Standard S3 egress)</td>
              <td>Tiered subscription limits</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Why Ephemerality Wins for DevOps</h2>
      <h3>1. Elimination of Storage Debt</h3>
      <p>Every engineering organization has Amazon S3 buckets containing hundreds of gigabytes of files named <code>test-dump-2023.sql</code> or <code>debug-output.tar.gz</code> that nobody dares to delete because nobody remembers who created them. With tdrop, the file is automatically purged as soon as its retention window elapses.</p>

      <h3>2. GDPR & CCPA Compliance</h3>
      <p>Under modern data privacy regulations (GDPR Article 5(1)(e) - Storage Limitation), organizations are required by law to keep personal data in a form which permits identification of data subjects for no longer than is necessary. By using auto-incinerating storage for temporary technical transfers, compliance is enforced by architecture rather than human discipline.</p>

      <h3>3. Zero Credential Exposure</h3>
      <p>Generating AWS S3 presigned URLs requires deploying AWS access keys to developer laptops or CI runners. If an access key leaks, attackers can access your entire cloud infrastructure. tdrop requires zero API keys or credentials, rendering credential leakage physically impossible.</p>
    `,
  },

  "faq": {
    slug: "faq",
    title: "Frequently Asked Questions & Technical Knowledge Base",
    category: "Support & Reference",
    description: "Detailed answers to common questions about file size limits, encryption, antivirus scanning, shortcode entropy, retention policies, and open-source contributions.",
    lastUpdated: "October 14, 2026",
    readTime: "6 min read",
    content: `
      <h2>General Questions</h2>

      <h3>What is tdrop?</h3>
      <p>tdrop is an open-source, ephemeral file sharing service designed for the command line and modern web browsers. It lets you send files instantly from your terminal (via <code>npx tdrop &lt;file&gt;</code>, WinGet, Homebrew, or cURL) or web interface with automatic short links, QR codes, and automated self-destruction.</p>

      <h3>Is tdrop completely free?</h3>
      <p>Yes. tdrop is 100% free to use for files up to 10MB under our standard retention tiers (1 hour, 24 hours, or 7 days). There are no hidden fees, subscriptions, or credit card requirements.</p>

      <h3>Why is there a 10MB free limit?</h3>
      <p>The 10MB limit is intentionally designed to optimize tdrop for its core purpose: sharing code archives, configuration files, screenshots, logs, patches, and documents. Keeping uploads under 10MB allows our Cloudflare Workers edge network to stream and inspect files instantaneously with near-zero latency while preventing abuse.</p>

      <h2>Security & Privacy Questions</h2>

      <h3>How long do files stay on tdrop?</h3>
      <p>Files expire and are permanently deleted after your chosen retention period:</p>
      <ul>
        <li><strong>1 hour:</strong> Ideal for rapid developer drops and real-time debugging sessions.</li>
        <li><strong>24 hours (default):</strong> Perfect for daily team sharing and CI/CD artifact inspection.</li>
        <li><strong>7 days:</strong> Maximum duration for weekly sprint reviews and asynchronous reviews.</li>
      </ul>

      <h3>Can an expired file ever be recovered?</h3>
      <p>No. Once the TTL timestamp elapses, the object is immediately unlinked from Cloudflare KV and deleted from Cloudflare R2 object storage. Because we do not take secondary backups of temporary drops, expired files are cryptographically unrecoverable.</p>

      <h3>Do you scan files for viruses?</h3>
      <p>Yes. All incoming files are inspected in real time by the ClamAV antivirus engine. Known malware, ransomware droppers, and infected binaries are rejected before distribution.</p>

      <h3>Do you track users or log IP addresses?</h3>
      <p>No. We do not set tracking cookies, require user logins, or store raw IP addresses. Rate limiting uses one-way salted hashes that are periodically discarded from edge memory.</p>

      <h2>Developer & CLI Questions</h2>

      <h3>How do I share a folder or directory?</h3>
      <p>Tar or zip the directory and pipe it directly to tdrop:</p>
      <div class="code-block-wrap">
        <pre><code>$ tar -czf - ./my-folder | npx tdrop --filename my-folder.tar.gz</code></pre>
      </div>

      <h3>Can I resume an interrupted download?</h3>
      <p>Yes! tdrop supports standard HTTP Range requests (RFC 7233). If a download terminates unexpectedly, pass the <code>-C -</code> flag to cURL to resume downloading from the last received byte:</p>
      <div class="code-block-wrap">
        <pre><code>$ curl -C - -O https://tdrop.link/a7kX9b2/dist.zip</code></pre>
      </div>

      <h3>Is tdrop open source?</h3>
      <p>Yes. The entire codebase (CLI client, Cloudflare Worker backend, ClamAV scanner bridge, and shared types) is open source under the MIT License on <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">GitHub</a>.</p>
    `,
  },
};

export function renderDocsPage(domain: string = "tdrop.link", slug: string = "index"): string {
  const page = DOCS_PAGES[slug] || DOCS_PAGES["index"];
  const currentSlug = page.slug;

  const categories: Record<string, DocPage[]> = {};
  for (const p of Object.values(DOCS_PAGES)) {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <title>${page.title} · tdrop Documentation</title>
  <meta name="description" content="${page.description}">
  
  <link rel="canonical" href="https://${domain}/docs${currentSlug === "index" ? "" : `/${currentSlug}`}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#09090b">
  <link rel="manifest" href="/manifest.json">

  <!-- Favicons & App Icons -->
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="tdrop Documentation">
  <meta property="og:url" content="https://${domain}/docs${currentSlug === "index" ? "" : `/${currentSlug}`}">
  <meta property="og:title" content="${page.title} · tdrop Documentation">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="https://${domain}/assets/preview.png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="537">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title} · tdrop Documentation">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="https://${domain}/assets/preview.png">

  <!-- Structured Data: TechArticle Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "${page.title}",
    "description": "${page.description}",
    "dateModified": "${page.lastUpdated}",
    "author": {
      "@type": "Organization",
      "name": "tdrop",
      "url": "https://${domain}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "tdrop",
      "logo": {
        "@type": "ImageObject",
        "url": "https://${domain}/assets/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://${domain}/docs${currentSlug === "index" ? "" : `/${currentSlug}`}"
    }
  }
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

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
      --surface-raised: #18191f;
      --surface-border: rgba(255, 255, 255, 0.08);
      --surface-border-subtle: rgba(255, 255, 255, 0.04);
      --surface-border-hover: rgba(255, 255, 255, 0.18);
      --text-main: #f4f4f5;
      --text-muted: #a1a1aa;
      --text-dim: #71717a;
      --status-green: #10b981;
      --status-blue: #38bdf8;
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
      width: 100%;
      overflow-x: hidden;
      background-image: radial-gradient(ellipse 70% 30% at 50% 0%, rgba(255, 255, 255, 0.03), transparent 60%);
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
      background: rgba(9, 10, 14, 0.85);
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
      gap: 10px;
      text-decoration: none;
      color: var(--text-main);
    }

    .brand-logo {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.15rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .badge-docs {
      font-size: 0.65rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--surface-border);
      color: var(--status-blue);
      font-family: var(--font-mono);
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: 8px;
      transition: all 0.15s;
    }

    .nav-link:hover, .nav-link.active {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }

    .btn-action-nav {
      background: #ffffff;
      color: #09090b !important;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 0.8rem;
      transition: all 0.2s;
    }

    .btn-action-nav:hover {
      background: #f4f4f5;
      transform: translateY(-1px);
    }

    /* Master Docs Layout: Sidebar + Article Content */
    .docs-layout {
      max-width: 1380px;
      margin: 0 auto;
      display: flex;
      min-height: calc(100vh - 65px);
    }

    /* Sidebar Navigation */
    .docs-sidebar {
      width: 280px;
      flex-shrink: 0;
      border-right: 1px solid var(--surface-border-subtle);
      padding: 32px 20px;
      position: sticky;
      top: 65px;
      height: calc(100vh - 65px);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    @media (max-width: 860px) {
      .docs-sidebar {
        display: none;
      }
    }

    .sidebar-category {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .category-title {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      font-weight: 700;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
      padding-left: 8px;
    }

    .sidebar-link {
      font-size: 0.86rem;
      color: var(--text-muted);
      text-decoration: none;
      padding: 7px 12px;
      border-radius: 8px;
      transition: all 0.15s;
      display: block;
      line-height: 1.35;
    }

    .sidebar-link:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.04);
    }

    .sidebar-link.active {
      color: #ffffff;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.25);
      font-weight: 600;
    }

    /* Article Content Area */
    .docs-main {
      flex: 1;
      min-width: 0;
      padding: 40px clamp(20px, 5vw, 64px) 100px;
      max-width: 900px;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      font-family: var(--font-mono);
      color: var(--text-dim);
      margin-bottom: 16px;
    }

    .breadcrumb a {
      color: var(--text-muted);
      text-decoration: none;
    }

    .breadcrumb a:hover {
      color: #ffffff;
    }

    .doc-meta-row {
      display: flex;
      align-items: center;
      gap: 16px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--surface-border-subtle);
    }

    .article-title {
      font-size: clamp(2rem, 4vw, 2.75rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #ffffff;
      line-height: 1.2;
      margin-bottom: 14px;
    }

    .article-lead {
      font-size: 1.1rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 32px;
    }

    /* Article Typography */
    .article-body {
      line-height: 1.75;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .article-body h2 {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #ffffff;
      margin-top: 36px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--surface-border-subtle);
    }

    .article-body h3 {
      font-size: 1.15rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: #ffffff;
      margin-top: 24px;
      margin-bottom: 8px;
    }

    .article-body p {
      font-size: 0.96rem;
      color: #d4d4d8;
    }

    .article-body ul, .article-body ol {
      padding-left: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 0.95rem;
      color: #d4d4d8;
    }

    .article-body li strong {
      color: #ffffff;
    }

    .article-body a {
      color: var(--status-blue);
      text-decoration: none;
      border-bottom: 1px solid rgba(56, 189, 248, 0.3);
      transition: border-color 0.15s;
    }

    .article-body a:hover {
      border-color: var(--status-blue);
    }

    /* Code Blocks */
    .code-block-wrap {
      background: #090a0d;
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      overflow: hidden;
      margin: 14px 0 24px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid var(--surface-border);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
    }

    .copy-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--surface-border);
      color: var(--text-muted);
      font-size: 0.72rem;
      font-family: var(--font-mono);
      padding: 3px 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .copy-btn:hover {
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.25);
    }

    pre {
      padding: 16px 18px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      line-height: 1.6;
      overflow-x: auto;
      color: #f4f4f5;
    }

    code {
      font-family: var(--font-mono);
      font-size: 0.88em;
      background: rgba(255, 255, 255, 0.06);
      padding: 2px 6px;
      border-radius: 4px;
      color: #ffffff;
    }

    pre code {
      background: transparent;
      padding: 0;
      border-radius: 0;
    }

    .tok-comment { color: #71717a; }

    /* Callout Boxes */
    .callout {
      background: rgba(255, 255, 255, 0.02);
      border-left: 3px solid var(--status-blue);
      border-radius: 0 12px 12px 0;
      padding: 16px 20px;
      margin: 18px 0;
    }

    .callout-title {
      font-weight: 700;
      font-size: 0.92rem;
      color: #ffffff;
      margin-bottom: 6px;
    }

    .callout p {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* Tables */
    .feature-table-wrap {
      overflow-x: auto;
      margin: 20px 0 30px;
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      background: var(--surface);
    }

    .doc-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
      text-align: left;
    }

    .doc-table th, .doc-table td {
      padding: 12px 18px;
      border-bottom: 1px solid var(--surface-border-subtle);
    }

    .doc-table th {
      background: rgba(255, 255, 255, 0.02);
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .doc-table td {
      color: #d4d4d8;
    }

    .doc-table tr:last-child td {
      border-bottom: none;
    }

    /* Diagram Boxes */
    .diagram-box {
      background: #08090d;
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
      overflow-x: auto;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      line-height: 1.5;
      color: #a1a1aa;
    }

    /* Docs Cards Grid */
    .doc-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }

    .doc-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 14px;
      padding: 20px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .doc-card:hover {
      border-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
      background: var(--surface-raised);
    }

    .doc-card-tag {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--status-blue);
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 600;
    }

    .doc-card-title {
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
    }

    .doc-card-desc {
      font-size: 0.82rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* Google AdSense container in Docs */
    .docs-ad-container {
      margin: 40px 0;
      padding: 16px;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--surface-border-subtle);
      border-radius: 12px;
      text-align: center;
    }

    .docs-ad-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--text-dim);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    /* Mobile docs category drawer */
    .mobile-doc-selector {
      display: none;
      width: 100%;
      margin-bottom: 24px;
      padding: 10px 14px;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 10px;
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 0.9rem;
    }

    @media (max-width: 860px) {
      .mobile-doc-selector {
        display: block;
      }
    }

    footer {
      border-top: 1px solid var(--surface-border-subtle);
      padding: 40px 20px;
      font-size: 0.82rem;
      color: var(--text-dim);
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 18px;
      flex-wrap: wrap;
    }

    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s;
    }

    .footer-links a:hover {
      color: #ffffff;
    }
  </style>
</head>
<body>

  <!-- Top Navigation -->
  <header class="nav-bar">
    <div class="nav-container">
      <a href="/" class="brand-wrap">
        <div class="brand-logo">
          <img src="/assets/logo-128.png" alt="tdrop" width="22" height="22" style="border-radius: 5px;">
          tdrop
        </div>
        <span class="badge-docs">Docs</span>
      </a>

      <div class="nav-right">
        <a href="/" class="nav-link">Home</a>
        <a href="/docs" class="nav-link active">Documentation</a>
        <a href="/stats" class="nav-link">Stats</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/sponsor" class="btn-action-nav">Sponsor</a>
      </div>
    </div>
  </header>

  <div class="docs-layout">

    <!-- Desktop Sidebar -->
    <aside class="docs-sidebar">
      ${Object.entries(categories)
        .map(
          ([category, pages]) => `
        <div class="sidebar-category">
          <div class="category-title">${category}</div>
          ${pages
            .map(
              (p) => `
            <a href="/docs${p.slug === "index" ? "" : `/${p.slug}`}" 
               class="sidebar-link ${p.slug === currentSlug ? "active" : ""}">
              ${p.title}
            </a>
          `
            )
            .join("")}
        </div>
      `
        )
        .join("")}
    </aside>

    <!-- Main Content -->
    <main class="docs-main">

      <!-- Mobile Document Selector Dropdown -->
      <select class="mobile-doc-selector" onchange="window.location.href=this.value">
        ${Object.values(DOCS_PAGES)
          .map(
            (p) => `
          <option value="/docs${p.slug === "index" ? "" : `/${p.slug}`}" ${p.slug === currentSlug ? "selected" : ""}>
            ${p.category}: ${p.title}
          </option>
        `
          )
          .join("")}
      </select>

      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">tdrop</a>
        <span>/</span>
        <a href="/docs">Docs</a>
        <span>/</span>
        <span>${page.category}</span>
      </nav>

      <article>
        <h1 class="article-title">${page.title}</h1>
        <div class="doc-meta-row">
          <span>Last Updated: ${page.lastUpdated}</span>
          <span>•</span>
          <span>${page.readTime}</span>
          <span>•</span>
          <span>Category: ${page.category}</span>
        </div>

        <p class="article-lead">${page.description}</p>

        <div class="article-body">
          ${page.content}
        </div>
      </article>

      <!-- Google AdSense Unit (In-Article Contextual Placement) -->
      <div class="docs-ad-container" aria-label="Advertisement">
        <div class="docs-ad-label">ADVERTISEMENT</div>
        <ins class="adsbygoogle"
             style="display:block; text-align:center;"
             data-ad-layout="in-article"
             data-ad-format="fluid"
             data-ad-client="ca-pub-2876380604791121"
             data-ad-slot="default"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      <!-- Quick Navigation Footer -->
      <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--surface-border-subtle); display:flex; justify-content:space-between; flex-wrap:wrap; gap:16px;">
        <a href="/docs" style="color:var(--text-muted); text-decoration:none; font-size:0.85rem;">← Back to Docs Overview</a>
        <a href="https://github.com/tagiswild/tdrop/issues" target="_blank" rel="noopener" style="color:var(--text-muted); text-decoration:none; font-size:0.85rem;">Edit on GitHub / Report Issue →</a>
      </div>

    </main>

  </div>

  <footer>
    <div class="footer-links">
      <a href="/">Home</a>
      <a href="/docs">Documentation</a>
      <a href="/about">About</a>
      <a href="/stats">Telemetry Stats</a>
      <a href="/sponsor">Sponsorship</a>
      <a href="/contact">Contact</a>
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <a href="/sitemap.xml">Sitemap</a>
      <a href="https://github.com/tagiswild/tdrop" target="_blank" rel="noopener">GitHub</a>
    </div>
    <p>tdrop · Ephemeral File Sharing · Open Source under the MIT License</p>
    <p style="font-size: 0.72rem; color: var(--text-dim); margin-top: 4px;">Zero egress fees · No tracking cookies · RFC 5987 / RFC 7233 Compliant</p>
  </footer>

  <script>
    function copySnippet(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          const btn = event.target;
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = orig, 2000);
        });
      }
    }
  </script>
</body>
</html>`;
}
