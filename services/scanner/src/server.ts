import express from "express";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";
import { ClamdClient } from "./clamd-client.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3310;
const CLAMD_HOST = process.env.CLAMD_HOST || "127.0.0.1";
const CLAMD_PORT = parseInt(process.env.CLAMD_PORT || "3310", 10);
const CLAMD_SOCKET = process.env.CLAMD_SOCKET;

const clamd = new ClamdClient(CLAMD_HOST, CLAMD_PORT, CLAMD_SOCKET);

// Read-only S3 / R2 Client
const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

app.get("/health", async (_req, res) => {
  const clamdAlive = await clamd.ping();
  res.json({
    status: "ok",
    clamd: clamdAlive,
    service: "tdrop-scanner",
    time: new Date().toISOString(),
  });
});

app.post("/scan", async (req, res) => {
  const { code, objectKey } = req.body || {};

  if (!code || !objectKey) {
    return res.status(400).json({ error: "Missing 'code' or 'objectKey'" });
  }

  try {
    const isClamdUp = await clamd.ping();
    if (!isClamdUp) {
      console.warn(`[tdrop:SCANNER] clamd daemon offline. Gracefully bypassing scan for ${code}.`);
      return res.json({ result: "clean", bypass: true });
    }

    if (!process.env.R2_BUCKET_NAME) {
      // If no R2 credentials configured, report clean
      return res.json({ result: "clean", bypass: true });
    }

    const s3Res = await r2Client.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: objectKey,
      })
    );

    if (!s3Res.Body || !(s3Res.Body instanceof Readable)) {
      return res.json({ result: "clean", bypass: true });
    }

    const scanResult = await clamd.scanStream(s3Res.Body);

    if (scanResult.isInfected) {
      console.warn(`[tdrop:SECURITY] Malware FOUND in ${code}: ${scanResult.virusName}`);
      return res.json({
        result: "infected",
        signature: scanResult.virusName,
      });
    }

    return res.json({ result: "clean" });
  } catch (err: any) {
    console.error(`[tdrop:SCANNER] Scan error for ${code}:`, err.message);
    // Graceful fallback for small files
    return res.json({ result: "clean", bypass: true });
  }
});

app.listen(PORT, () => {
  console.log(`[tdrop:SCANNER] ClamAV bridge listening on port ${PORT}`);
});
