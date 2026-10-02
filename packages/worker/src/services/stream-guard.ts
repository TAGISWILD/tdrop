import { MAX_FREE_BYTES } from "@tdrop/shared";

export class PayloadTooLargeError extends Error {
  constructor(message = "File exceeds the 10MB free tier limit.") {
    super(message);
    this.name = "PayloadTooLargeError";
  }
}

/**
 * Creates a TransformStream that counts bytes in-flight and aborts with
 * PayloadTooLargeError if the stream exceeds maxBytes.
 */
export function createByteLimitGuard(maxBytes: number = MAX_FREE_BYTES): {
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<Uint8Array>;
  getBytesRead: () => number;
} {
  let bytesRead = 0;

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      bytesRead += chunk.byteLength;
      if (bytesRead > maxBytes) {
        controller.error(new PayloadTooLargeError());
        return;
      }
      controller.enqueue(chunk);
    },
  });

  return {
    readable: transform.readable,
    writable: transform.writable,
    getBytesRead: () => bytesRead,
  };
}
