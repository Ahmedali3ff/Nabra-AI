/**
 * Voxena — server startup environment variable validation.
 * Called before any other initialisation in index.js.
 *
 * In production, required variables must be set or the server refuses to start.
 * In development / mock mode, warnings are shown but startup continues.
 */

// Variables that must be present in production.
const REQUIRED_IN_PRODUCTION = [
  "JWT_SECRET",
  "STREAM_SECRET",
];

// Variables that should ideally be set (advisory in dev/mock).
const ADVISORY = [
  "GRADIO_SPACE",
];

export function validateEnv() {
  const isMock = process.env.VITE_MOCK_MODE === "true" || process.env.MOCK_MODE === "true";
  const isProd = process.env.NODE_ENV === "production";

  // Advisory checks — always warn if missing
  const missingAdvisory = ADVISORY.filter((key) => !process.env[key]?.trim());
  if (missingAdvisory.length > 0) {
    console.warn(
      `[Nabra AI] Advisory: optional environment variables not set: ${missingAdvisory.join(", ")}. ` +
      `TTS will fall back to mock mode.`
    );
  }

  // Required checks in production
  if (isProd) {
    const missingRequired = REQUIRED_IN_PRODUCTION.filter(
      (key) => !process.env[key]?.trim()
    );
    if (missingRequired.length > 0) {
      console.error(
        `[Nabra AI] FATAL: Missing required environment variables for production: ${missingRequired.join(", ")}. ` +
        `Set these in your environment and restart.`
      );
      process.exit(1);
    }
  }

  if (!isProd && !isMock) {
    const missing = REQUIRED_IN_PRODUCTION.filter((key) => !process.env[key]?.trim());
    if (missing.length > 0) {
      console.warn(
        `[Nabra AI] Development: environment variables not set: ${missing.join(", ")}. ` +
        `This is fine in local development. Set VITE_MOCK_MODE=true to suppress this warning.`
      );
    }
  }
}
