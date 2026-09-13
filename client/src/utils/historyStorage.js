// Voxena — Conversation History persistence utilities.
// Stores metadata (text, voice name, timestamp) as JSON in localStorage.
// Audio blob URLs are session-only references — they are NOT stored
// as binary data to avoid storage quota issues.

export const HISTORY_STORAGE_KEY = "voxena_history";

/**
 * Load history entries from localStorage.
 * Returns an empty array on any error.
 */
export function loadEntries() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Persist history entries to localStorage.
 * Non-fatal on failure: logs a warning rather than throwing.
 * Audio was still generated — the user just won't have persistent history.
 */
export function saveEntries(entries) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    console.warn("[Nabra AI] Could not persist conversation history.");
  }
}
