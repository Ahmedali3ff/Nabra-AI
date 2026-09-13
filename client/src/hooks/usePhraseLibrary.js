import { useState, useMemo, useCallback } from "react";
import {
  loadPhrases,
  savePhrases,
  StorageError,
} from "../utils/phraseStorage.js";

export const PHRASE_CATEGORIES = ["Greetings", "Daily", "Work", "Emergency", "Custom"];

/**
 * usePhraseLibrary — full state and CRUD for the Smart Phrase Library.
 * All data is stored in localStorage under "voxena_phrases".
 *
 * Uses functional setState updates so callbacks always operate on the
 * latest state and are safe to call in rapid succession.
 */
export function usePhraseLibrary() {
  const [phrases, setPhrases] = useState(() => loadPhrases());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [storageError, setStorageError] = useState(null);

  /** Write to localStorage; set storageError on failure; always update state. */
  function persist(updated) {
    try {
      savePhrases(updated);
      setStorageError(null);
    } catch (err) {
      if (err instanceof StorageError) {
        setStorageError(err.message);
      }
    }
  }

  const createPhrase = useCallback((text, category) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newPhrase = {
      id: crypto.randomUUID(),
      text: trimmed,
      category,
      favorite: false,
      createdAt: new Date().toISOString(),
    };
    setPhrases((prev) => {
      const updated = [...prev, newPhrase];
      persist(updated);
      return updated;
    });
  }, []);

  const updatePhrase = useCallback((id, updates) => {
    setPhrases((prev) => {
      const updated = prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updates,
              text: updates.text !== undefined ? updates.text.trim() : p.text,
            }
          : p
      );
      persist(updated);
      return updated;
    });
  }, []);

  const deletePhrase = useCallback((id) => {
    setPhrases((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      persist(updated);
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((id) => {
    setPhrases((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, favorite: !p.favorite } : p
      );
      persist(updated);
      return updated;
    });
  }, []);

  const usePhrase = useCallback((id, insertToTTSInput) => {
    setPhrases((prev) => {
      const phrase = prev.find((p) => p.id === id);
      if (phrase) insertToTTSInput(phrase.text);
      return prev; // no mutation
    });
  }, []);

  const dismissStorageError = useCallback(() => {
    setStorageError(null);
  }, []);

  const filteredPhrases = useMemo(() => {
    return phrases
      .filter((p) => activeCategory === "All" || p.category === activeCategory)
      .filter((p) =>
        p.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [phrases, activeCategory, searchQuery]);

  return {
    phrases,
    filteredPhrases,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    storageError,
    dismissStorageError,
    createPhrase,
    updatePhrase,
    deletePhrase,
    toggleFavorite,
    usePhrase,
  };
}
