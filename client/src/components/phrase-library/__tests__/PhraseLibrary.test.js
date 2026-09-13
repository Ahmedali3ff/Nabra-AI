import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { mockLocalStorage, mockLocalStorageFailure } from "../../../test-utils/localStorage.js";
import { usePhraseLibrary } from "../../../hooks/usePhraseLibrary.js";

beforeEach(() => {
  mockLocalStorage();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Smart Phrase Library — usePhraseLibrary hook", () => {
  // ── createPhrase ────────────────────────────────────────────────────
  describe("createPhrase", () => {
    it("adds a phrase to the list", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Hello world", "Greetings"));
      expect(result.current.phrases).toHaveLength(1);
      expect(result.current.phrases[0].text).toBe("Hello world");
    });

    it("assigns a unique id", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => {
        result.current.createPhrase("Phrase one", "Daily");
        result.current.createPhrase("Phrase two", "Work");
      });
      const ids = result.current.phrases.map((p) => p.id);
      expect(new Set(ids).size).toBe(2);
    });

    it("assigns a valid ISO 8601 createdAt timestamp", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Test phrase", "Custom"));
      const ts = result.current.phrases[0].createdAt;
      expect(() => new Date(ts).toISOString()).not.toThrow();
    });

    it("persists to localStorage", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Persisted phrase", "Greetings"));
      const stored = JSON.parse(localStorage.getItem("voxena_phrases"));
      expect(stored).toHaveLength(1);
      expect(stored[0].text).toBe("Persisted phrase");
    });

    it("rejects empty text", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("", "Greetings"));
      expect(result.current.phrases).toHaveLength(0);
    });

    it("rejects whitespace-only text", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("   ", "Daily"));
      expect(result.current.phrases).toHaveLength(0);
    });
  });

  // ── updatePhrase ────────────────────────────────────────────────────
  describe("updatePhrase", () => {
    it("updates text and category", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Original", "Daily"));
      const id = result.current.phrases[0].id;
      act(() => result.current.updatePhrase(id, { text: "Updated", category: "Work" }));
      const updated = result.current.phrases.find((p) => p.id === id);
      expect(updated.text).toBe("Updated");
      expect(updated.category).toBe("Work");
    });

    it("persists the update to localStorage", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Before", "Daily"));
      const id = result.current.phrases[0].id;
      act(() => result.current.updatePhrase(id, { text: "After" }));
      const stored = JSON.parse(localStorage.getItem("voxena_phrases"));
      expect(stored[0].text).toBe("After");
    });
  });

  // ── deletePhrase ────────────────────────────────────────────────────
  describe("deletePhrase", () => {
    it("removes the phrase from the list", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("To delete", "Custom"));
      const id = result.current.phrases[0].id;
      act(() => result.current.deletePhrase(id));
      expect(result.current.phrases).toHaveLength(0);
    });

    it("persists deletion to localStorage", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("To delete", "Emergency"));
      const id = result.current.phrases[0].id;
      act(() => result.current.deletePhrase(id));
      const stored = JSON.parse(localStorage.getItem("voxena_phrases"));
      expect(stored).toHaveLength(0);
    });
  });

  // ── toggleFavorite ──────────────────────────────────────────────────
  describe("toggleFavorite", () => {
    it("toggles favorite to true", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Fav phrase", "Greetings"));
      const id = result.current.phrases[0].id;
      expect(result.current.phrases[0].favorite).toBe(false);
      act(() => result.current.toggleFavorite(id));
      expect(result.current.phrases[0].favorite).toBe(true);
    });

    it("toggles back to false (round-trip)", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Fav phrase", "Greetings"));
      const id = result.current.phrases[0].id;
      act(() => result.current.toggleFavorite(id));
      act(() => result.current.toggleFavorite(id));
      expect(result.current.phrases[0].favorite).toBe(false);
    });
  });

  // ── search filter ───────────────────────────────────────────────────
  describe("search filter", () => {
    it("filters phrases by case-insensitive substring", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => {
        result.current.createPhrase("Good morning", "Greetings");
        result.current.createPhrase("Thank you", "Daily");
        result.current.setSearchQuery("good");
      });
      expect(result.current.filteredPhrases).toHaveLength(1);
      expect(result.current.filteredPhrases[0].text).toBe("Good morning");
    });

    it("returns all phrases when query is empty", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => {
        result.current.createPhrase("Hello", "Greetings");
        result.current.createPhrase("Goodbye", "Daily");
      });
      expect(result.current.filteredPhrases).toHaveLength(2);
    });

    it("returns no phrases when no match", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => {
        result.current.createPhrase("Hello world", "Greetings");
        result.current.setSearchQuery("xyz123");
      });
      expect(result.current.filteredPhrases).toHaveLength(0);
    });
  });

  // ── category filter ──────────────────────────────────────────────────
  describe("category filter", () => {
    it("shows only phrases of the selected category", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => {
        result.current.createPhrase("Hi", "Greetings");
        result.current.createPhrase("Work task", "Work");
        result.current.setActiveCategory("Work");
      });
      expect(result.current.filteredPhrases).toHaveLength(1);
      expect(result.current.filteredPhrases[0].category).toBe("Work");
    });

    it('shows all phrases when category is "All"', () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => {
        result.current.createPhrase("Hi", "Greetings");
        result.current.createPhrase("Work task", "Work");
        result.current.setActiveCategory("All");
      });
      expect(result.current.filteredPhrases).toHaveLength(2);
    });
  });

  // ── usePhrase (insertion) ────────────────────────────────────────────
  describe("usePhrase", () => {
    it("calls insertToTTSInput with the exact phrase text", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Insert this", "Daily"));
      const id = result.current.phrases[0].id;
      const insertFn = vi.fn();
      act(() => result.current.usePhrase(id, insertFn));
      expect(insertFn).toHaveBeenCalledWith("Insert this");
    });

    it("does not call insertToTTSInput more than once", () => {
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Once", "Daily"));
      const id = result.current.phrases[0].id;
      const insertFn = vi.fn();
      act(() => result.current.usePhrase(id, insertFn));
      expect(insertFn).toHaveBeenCalledTimes(1);
    });
  });

  // ── storage error ────────────────────────────────────────────────────
  describe("storage error handling", () => {
    it("sets storageError when localStorage throws on create", () => {
      mockLocalStorageFailure();
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Will fail", "Custom"));
      expect(result.current.storageError).not.toBeNull();
      expect(typeof result.current.storageError).toBe("string");
    });

    it("clears storageError on dismissStorageError", () => {
      mockLocalStorageFailure();
      const { result } = renderHook(() => usePhraseLibrary());
      act(() => result.current.createPhrase("Will fail", "Custom"));
      act(() => result.current.dismissStorageError());
      expect(result.current.storageError).toBeNull();
    });
  });
});
