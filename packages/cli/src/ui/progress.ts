import cliProgress from "cli-progress";

export function createProgressBar(totalBytes: number): cliProgress.SingleBar {
  return new cliProgress.SingleBar(
    {
      format: "\x1b[36mUploading\x1b[0m [\x1b[32m{bar}\x1b[0m] {percentage}% | {valueFormatted} / {totalFormatted} | {speedFormatted}",
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
      stopOnComplete: true,
    },
    cliProgress.Presets.shades_classic
  );
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
