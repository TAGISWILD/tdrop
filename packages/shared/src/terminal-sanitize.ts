/**
 * Terminal Sanitization Utility
 * Protects developer terminals against ANSI injection, cursor repositioning,
 * screen clears, and OSC hyperlink hijacking.
 */

// Matches ANSI escape codes, OSC sequences, and CSI sequences
// eslint-disable-next-line no-control-regex
const ANSI_REGEX = /[\u001B\u009B][[\]()#;?]*(?:(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-ntqry=><~]))/g;

// Matches dangerous terminal control characters (bell, backspace, carriage return, tabs, linefeed can be kept or handled)
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/**
 * Strips all ANSI sequences and harmful control codes from text before printing to terminal.
 */
export function sanitizeTerminalText(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }
  return input
    .replace(ANSI_REGEX, "")
    .replace(CONTROL_CHARS_REGEX, "")
    .trim();
}
