import { useState, useCallback } from "react";
import { loadEntries, saveEntries, HISTORY_STORAGE_KEY } from "../utils/historyStorage.js";

const MAX_ENTRIES = 50;

/**
 * useConversationHistory — manages the last 50 speech-generation events.
 *
 * Audio blob URLs are created per-session using URL.createObjectURL.
 * They are stored in the entry but will become invalid after page reload.
 * "Use Again" (text re-insert) works across reloads; audio replay does not.
 */
export function useConversationHistory() {
  const [entries, setEntries] = useState(() => loadEntries());

  /**
   * Called after a successful TTS generation.
   * @param {string} text - The generated phrase text
   * @param {string} voiceName - The voice profile name or label
   * @param {Blob|null} audioBlob - The audio blob, if available
   */
  const addEntry = useCallback((text, voiceName, audioBlob) => {
    const audioUrl = audioBlob instanceof Blob ? URL.createObjectURL(audioBlob) : null;
    const entry = {
      id: crypto.randomUUID(),
      text,
      voiceName: voiceName || "Default",
      timestamp: new Date().toISOString(),
      audioUrl,
    };
    setEntries((prev) => {
      // Prepend newest-first, trim to MAX_ENTRIES (FIFO — oldest dropped)
      const updated = [entry, ...prev].slice(0, MAX_ENTRIES);
      saveEntries(updated);
      return updated;
    });
  }, []);

  /**
   * Play back the audio for a history entry.
   * Marks the entry's audioUrl as null if the blob URL has expired.
   */
  const replayAudio = useCallback((id) => {
    setEntries((prev) => {
      const entry = prev.find((e) => e.id === id);
      if (!entry?.audioUrl) return prev;

      const audio = new Audio(entry.audioUrl);
      audio.play().catch(() => {
        // Blob URL expired (e.g. after page reload) — mark as unplayable
        const updated = prev.map((e) =>
          e.id === id ? { ...e, audioUrl: null } : e
        );
        saveEntries(updated);
        return updated;
      });

      return prev; // no state change needed on successful play
    });
  }, []);

  /**
   * Insert an entry's text into the TTS input without triggering generation.
   */
  const useAgain = useCallback((id, insertToTTSInput) => {
    setEntries((prev) => {
      const entry = prev.find((e) => e.id === id);
      if (entry) insertToTTSInput(entry.text);
      return prev;
    });
  }, []);

  /**
   * Clear all history entries from memory and localStorage.
   */
  const clearAll = useCallback(() => {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    setEntries([]);
  }, []);

  return { entries, addEntry, replayAudio, useAgain, clearAll };
}
