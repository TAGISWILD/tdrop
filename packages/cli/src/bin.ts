#!/usr/bin/env node
import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import ora from "ora";
import type { RetentionClass } from "@tdrop/shared";
import { DEFAULT_DOMAIN, DEFAULT_RETENTION } from "@tdrop/shared";
import { uploadFile, uploadStdin } from "./uploader.js";
import { fetchAndFormatBlip } from "./ui/blip.js";
import { createProgressBar, formatBytes } from "./ui/progress.js";
import { renderUnicodeCompact } from "uqr";

const program = new Command();

program
  .name("tdrop")
  .description("Ultra-fast, ephemeral, authless file-sharing from your terminal")
  .version("1.0.1")
  .argument("[file]", "Path to the file to upload")
  .option("-t, --ttl <retention>", "Retention duration: 1h, 24h, 7d", DEFAULT_RETENTION)
  .option("-n, --filename <name>", "Custom filename (especially for piped stdin)")
  .option("-u, --url <url>", "Backend API URL", process.env.TDROP_SERVER || `https://${DEFAULT_DOMAIN}`)
  .option("--no-qr", "Disable rendering QR code in terminal output")
  .option("--json", "Output response as raw JSON")
  .action(async (fileArg, options) => {
    const isPiped = !process.stdin.isTTY;
    const apiUrl = options.url.replace(/\/$/, "");
    const ttl = options.ttl as RetentionClass;

    if (!fileArg && !isPiped) {
      console.error("\x1b[31mError:\x1b[0m Please specify a file to upload or pipe via stdin.");
      console.log("\nExamples:");
      console.log("  npx tdrop archive.tar.gz");
      console.log("  cat server.log | npx tdrop --filename server.log");
      process.exit(1);
    }

    // 1. Fetch & display sponsored terminal blip cleanly
    if (!options.json) {
      const blipText = await fetchAndFormatBlip(apiUrl);
      if (blipText) {
        console.log(`\n${blipText}\n`);
      }
      console.log(`\x1b[90mBy uploading, you have already accepted the Terms of Service and Privacy Policy.\x1b[0m`);
      console.log(`\x1b[90m• Terms:   ${apiUrl}/terms\x1b[0m`);
      console.log(`\x1b[90m• Privacy: ${apiUrl}/privacy\x1b[0m\n`);
    }

    const spinner = ora({
      text: "Preparing upload...",
      color: "cyan",
    });

    if (!options.json) {
      spinner.start();
    }

    try {
      let result;

      if (isPiped) {
        // Piped stdin stream
        const filename = options.filename || "stdin.bin";
        spinner.text = `Streaming stdin to ${options.url}...`;

        result = await uploadStdin(process.stdin, {
          apiUrl,
          filename,
          ttl,
          onProgress: (bytes) => {
            if (!options.json) {
              spinner.text = `Streaming stdin: ${formatBytes(bytes)} uploaded`;
            }
          },
        });
      } else {
        // Local file
        const resolvedPath = path.resolve(fileArg);
        if (!fs.existsSync(resolvedPath)) {
          spinner.fail(`File not found: ${resolvedPath}`);
          process.exit(1);
        }

        const stats = fs.statSync(resolvedPath);
        const filename = options.filename || path.basename(resolvedPath);
        const bar = !options.json ? createProgressBar(stats.size) : null;

        spinner.stop();

        if (bar) {
          bar.start(stats.size, 0, {
            valueFormatted: formatBytes(0),
            totalFormatted: formatBytes(stats.size),
            speedFormatted: "Starting...",
          });
        }

        const startTime = Date.now();

        result = await uploadFile(resolvedPath, {
          apiUrl,
          filename,
          ttl,
          onProgress: (bytes) => {
            if (bar) {
              const elapsedSec = Math.max(0.1, (Date.now() - startTime) / 1000);
              const speedMBs = (bytes / 1024 / 1024 / elapsedSec).toFixed(1);
              bar.update(bytes, {
                valueFormatted: formatBytes(bytes),
                totalFormatted: formatBytes(stats.size),
                speedFormatted: `${speedMBs} MB/s`,
              });
            }
          },
        });

        if (bar) {
          bar.stop();
        }
      }

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
        process.exit(0);
      }

      // Display Final Beautiful Success Box
      console.log("\n\x1b[32m✔ Upload complete!\x1b[0m\n");
      console.log(`  \x1b[1m🛡️  Malware Scan:\x1b[0m \x1b[32m${result.malwareScan}\x1b[0m`);
      console.log(`  \x1b[1m🔗 Link:\x1b[0m         \x1b[36m\x1b[4m${result.url}\x1b[0m`);
      console.log(`  \x1b[1m📥 Direct Curl:\x1b[0m  curl -O ${result.url}/${result.filename}`);
      console.log(`  \x1b[1m⏳ Retention:\x1b[0m    ${result.expiresIn} (Expires ${new Date(result.expiresAt).toLocaleTimeString()})`);
      console.log(`  \x1b[90mℹ  By uploading, you have already accepted the Terms of Service & Privacy Policy:\x1b[0m`);
      console.log(`  \x1b[90m   • Terms:   ${apiUrl}/terms\x1b[0m`);
      console.log(`  \x1b[90m   • Privacy: ${apiUrl}/privacy\x1b[0m\n`);

      if (options.qr) {
        try {
          const qrCode = renderUnicodeCompact(result.url, { border: 2 });
          const indentedQr = qrCode
            .split("\n")
            .map((line) => "  " + line)
            .join("\n");
          console.log("  \x1b[1m📱 Scan to open on mobile:\x1b[0m\n");
          console.log(indentedQr);
          console.log("");
        } catch {
          // Gracefully omit QR if rendering fails
        }
      }

      process.exit(0);
    } catch (err: any) {
      if (spinner.isSpinning) {
        spinner.fail("Upload failed");
      }
      console.error(`\n\x1b[31mError:\x1b[0m ${err.message || err}\n`);
      process.exit(1);
    }
  });

program.parse(process.argv);
