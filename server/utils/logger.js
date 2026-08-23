/**
 * Minimal structured logger compatible with the pino API surface used in this codebase.
 * Outputs JSON-formatted log lines to stdout/stderr.
 */

function formatEntry(level, obj, msg) {
  const entry = {
    level,
    time: new Date().toISOString(),
    ...(typeof obj === "object" && obj !== null ? obj : {}),
    msg: msg ?? (typeof obj === "string" ? obj : ""),
  };
  return JSON.stringify(entry);
}

export const logger = {
  info(obj, msg) {
    console.log(formatEntry("info", obj, msg));
  },
  warn(obj, msg) {
    console.warn(formatEntry("warn", obj, msg));
  },
  error(obj, msg) {
    console.error(formatEntry("error", obj, msg));
  },
  debug(obj, msg) {
    if (process.env.LOG_LEVEL === "debug") {
      console.log(formatEntry("debug", obj, msg));
    }
  },
};
