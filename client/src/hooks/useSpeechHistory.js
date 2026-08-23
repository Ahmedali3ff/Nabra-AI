/**
 * useSpeechHistory.js
 * Custom hook that manages speech history, favorites, and localStorage persistence.
 * Drop this into src/hooks/useSpeechHistory.js in the VoiceForge project.
 */

import { useState, useEffect, useCallback } from "react";
import { saveTranscript } from "../utils/db.js";

const HISTORY_KEY = "vf_history";
const FAVS_KEY = "vf_favorites";
const TRANSCRIPT_KEY = "vf_transcript";
const MAX_HISTORY = 25;

/**
 * Safely reads a JSON value from localStorage.
 * Returns `fallback` if the key is missing or the value is unparseable.
 */
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);

    // Ensure correct structure
    if (Array.isArray(fallback)) {
      return Array.isArray(parsed) ? parsed : fallback;
    }

    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safely reads a JSON value from sessionStorage.
 * Returns `fallback` if the key is missing or the value is unparseable.
 */
function readSessionStorage(key, fallback) {
  try {
    const raw = sessionStorage.getItem(key);

    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);

    // Ensure correct structure
    if (Array.isArray(fallback)) {
      return Array.isArray(parsed) ? parsed : fallback;
    }

    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}
/**
 * Manages speech history and pinned favorites.
 * Persists history and favorite IDs to localStorage.
 *
 * Features:
 * - duplicate prevention
 * - favorite persistence
 * - capped history size
 * - safe storage parsing
 *
 * @returns {Object} Speech history state and actions
 */

export function pruneHistory(history, favorites = [], policy = "forever") {
  if (!Array.isArray(history)) return [];
  if (policy === "forever" || policy === "session") return history;

  const now = Date.now();
  const days = policy === "7days" ? 7 : policy === "30days" ? 30 : 0;
  if (!days) return history;

  const cutoff = now - days * 24 * 60 * 60 * 1000;
  const favSet = new Set(favorites);

  return history.filter((item) => {
    if (!item) return false;
    if (favSet.has(item.id)) return true;
    return item.timestamp ? item.timestamp >= cutoff : true;
  });
}

export function trimHistoryPreservingFavorites(entries, favoriteIds = new Set(), maxHistory = 25) {
  if (!Array.isArray(entries)) return [];
  const favSet = favoriteIds instanceof Set ? favoriteIds : new Set(favoriteIds);

  const favoritedEntries = [];
  const unpinnedEntries = [];

  for (const entry of entries) {
    if (!entry) continue;
    if (favSet.has(entry.id)) {
      favoritedEntries.push(entry);
    } else {
      unpinnedEntries.push(entry);
    }
  }

  const keptUnpinned = unpinnedEntries.slice(0, maxHistory);
  const keptIds = new Set([...favoritedEntries.map((e) => e.id), ...keptUnpinned.map((e) => e.id)]);

  return entries.filter((e) => e && keptIds.has(e.id));
}

export function toggleFavoriteWithCap(currentSet, id, maxFavorites = 50) {
  const nextSet = new Set(currentSet);
  if (nextSet.has(id)) {
    nextSet.delete(id);
    return { favorites: nextSet, applied: true };
  }
  if (nextSet.size >= maxFavorites) {
    return { favorites: currentSet, applied: false };
  }
  nextSet.add(id);
  return { favorites: nextSet, applied: true };
}

export function clampFavorites(ids, maxFavorites = 50) {
  if (maxFavorites <= 0) return new Set();
  const arr = Array.from(ids || []);
  if (arr.length <= maxFavorites) return new Set(arr);
  return new Set(arr.slice(arr.length - maxFavorites));
}

export function reconcileFavoritesWithHistory(favoriteIds, history) {
  if (!favoriteIds) return new Set();
  const historySet = new Set(
    (history || [])
      .filter((m) => m && typeof m === "object" && m.id)
      .map((m) => m.id)
  );
  const arr = Array.from(favoriteIds);
  return new Set(arr.filter((id) => historySet.has(id)));
}

export function useSpeechHistory() {
  // ── State ────────────────────────────────────────────────────────────────
  const [history, setHistory] = useState(() => readStorage(HISTORY_KEY, []));
  const [favorites, setFavorites] = useState(
    () => new Set(readStorage(FAVS_KEY, []))
  );
  const [sessionTranscript, setSessionTranscript] = useState(() => readSessionStorage(TRANSCRIPT_KEY, []));

  // ── Persistence ──────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      /* storage quota exceeded — silently skip */
    }
  }, [history]);

  useEffect(() => {
    try {
      sessionStorage.setItem(TRANSCRIPT_KEY, JSON.stringify(sessionTranscript));
    } catch {
      /* storage quota exceeded — silently skip */
    }
  }, [sessionTranscript]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVS_KEY, JSON.stringify([...favorites]));
    } catch {
      /* storage quota exceeded — silently skip */
    }
  }, [favorites]);


  // ── Cross-Tab Synchronization ─────────────────────────────────────────────
  useEffect(() => {
    function handleStorage(event) {
      if (event.key === HISTORY_KEY) {
        setHistory(readStorage(HISTORY_KEY, []));
      } else if (event.key === FAVS_KEY) {
        setFavorites(new Set(readStorage(FAVS_KEY, [])));
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }
  }, []);

  // ── Actions ──────────────────────────────────────────────────────────────

  const addMessage = useCallback((text, id) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const timestamp = Date.now();
    const resolvedId = id || crypto.randomUUID();

    setSessionTranscript((prev) => [
      ...prev,
      {
        text: trimmed,
        timestamp,
        status: "success",
      },
    ]);

    setHistory((prev) => {
      const existing = prev.find((m) => m.text === trimmed);
      const entry = existing
        ? { ...existing, timestamp: Date.now() }
        : { id: resolvedId, text: trimmed, timestamp: Date.now() };

      const updated = [
        entry,
        ...prev.filter((m) => m.id !== entry.id),
      ];

      return trimHistoryPreservingFavorites(updated, favorites, MAX_HISTORY);
    });

    return resolvedId;
  }, [favorites]);

  const removeMessage = useCallback((id) => {
    setHistory((prev) => prev.filter((m) => m.id !== id));
    setFavorites((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const { favorites: next } = toggleFavoriteWithCap(prev, id, 50);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setFavorites(new Set());
    setSessionTranscript([]);
  }, []);

  return {
    history,
    favorites,
    sessionTranscript,
    addMessage,
    removeMessage,
    toggleFavorite,
    clearHistory,
  };
}