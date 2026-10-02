import net from "node:net";
import { Readable } from "node:stream";

export interface ScanResult {
  isInfected: boolean;
  virusName?: string;
  rawResponse: string;
}

export class ClamdClient {
  constructor(
    private readonly host: string = "127.0.0.1",
    private readonly port: number = 3310,
    private readonly socketPath?: string
  ) {}

  /**
   * Ping clamd (PONG response)
   */
  async ping(): Promise<boolean> {
    return new Promise((resolve) => {
      const socket = this.createSocket();
      socket.setTimeout(1500);

      socket.on("connect", () => {
        socket.write("zPING\0");
      });

      socket.on("data", (data) => {
        resolve(data.toString().includes("PONG"));
        socket.end();
      });

      socket.on("error", () => resolve(false));
      socket.on("timeout", () => {
        socket.destroy();
        resolve(false);
      });
    });
  }

  /**
   * Streams a Readable stream directly to clamd using the zINSTREAM protocol.
   */
  async scanStream(stream: Readable): Promise<ScanResult> {
    return new Promise((resolve, reject) => {
      const socket = this.createSocket();
      let response = "";

      socket.on("connect", () => {
        socket.write("zINSTREAM\0");

        stream.on("data", (chunk: Buffer) => {
          // Send 4-byte big-endian length prefix
          const lengthHeader = Buffer.alloc(4);
          lengthHeader.writeUInt32BE(chunk.length, 0);
          socket.write(lengthHeader);
          socket.write(chunk);
        });

        stream.on("end", () => {
          // Send 4-byte zero length to terminate stream
          const zeroHeader = Buffer.alloc(4);
          socket.write(zeroHeader);
        });

        stream.on("error", (err) => {
          socket.destroy();
          reject(err);
        });
      });

      socket.on("data", (data) => {
        response += data.toString();
      });

      socket.on("end", () => {
        const trimmed = response.trim();
        if (trimmed.includes("FOUND")) {
          const match = trimmed.match(/stream:\s+(.+)\s+FOUND/);
          resolve({
            isInfected: true,
            virusName: match ? match[1] : "MALWARE_GENERIC",
            rawResponse: trimmed,
          });
        } else {
          resolve({
            isInfected: false,
            rawResponse: trimmed,
          });
        }
      });

      socket.on("error", reject);
    });
  }

  private createSocket(): net.Socket {
    if (this.socketPath) {
      return net.createConnection(this.socketPath);
    }
    return net.createConnection(this.port, this.host);
  }
}
