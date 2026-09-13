// Voxena — Smart Phrase Library persistence utilities.
// Uses localStorage with a simple JSON array serialization.
// Separate from IndexedDB which is used for audio/voice profiles.

export const PHRASES_STORAGE_KEY = "voxena_phrases";

export class StorageError extends Error {
  constructor(message) {
    super(message);
    this.name = "StorageError";
  }
}

/**
 * Load all phrases from localStorage.
 * Returns an empty array if storage is unavailable or data is malformed.
 */
export function loadPhrases() {
  try {
    const raw = localStorage.getItem(PHRASES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Persist the phrases array to localStorage.
 * Throws StorageError if the write fails (e.g. quota exceeded, private browsing).
 */
export function savePhrases(phrases) {
  try {
    localStorage.setItem(PHRASES_STORAGE_KEY, JSON.stringify(phrases));
  } catch (err) {
    throw new StorageError(
      "Phrase could not be saved. Storage may be full or unavailable."
    );
  }
}
