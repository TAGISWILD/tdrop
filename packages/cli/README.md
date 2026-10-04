<p align="center">
  <img src="https://tdrop.link/assets/preview.png" alt="tdrop — Ephemeral file sharing, built for the command line" width="100%" />
</p>

# tdrop (Terminal Drop)

> Ultra-fast, ephemeral, authless file-sharing from your terminal.

```bash
npx tdrop <file>
```

---

## ⚡ Usage

### Upload a File
```bash
# Upload a file (default 24h retention)
npx tdrop archive.tar.gz

# Specify retention duration (1h, 24h, 7d)
npx tdrop backup.sql --ttl 1h
npx tdrop dataset.csv --ttl 7d
```

### Pipe Stdin
```bash
cat server.log | npx tdrop --filename server.log
curl -sL https://example.com/data.json | npx tdrop --filename data.json
```

### Download via cURL
```bash
# Download preserving original filename
curl -O https://tdrop.link/a7kX9b2/archive.tar.gz

# Resumable download with range
curl -C - -O https://tdrop.link/a7kX9b2/archive.tar.gz
```

---

## 🔒 Security & Privacy

* **Strict 10MB Limit**: Free uploads are capped at 10MB with zero server RAM accumulation.
* **Malware Scanning**: Files are verified with ClamAV before distribution.
* **Ephemeral Storage**: Files are permanently purged after the requested TTL.
* **Zero Telemetry**: Strict opt-in policy. No tracking, no analytics, no hidden phone-home calls.
* **Zero Egress Fees**: Powered by Cloudflare Workers and Cloudflare R2.

---

## 📄 License

MIT © Atharva Chauhan
