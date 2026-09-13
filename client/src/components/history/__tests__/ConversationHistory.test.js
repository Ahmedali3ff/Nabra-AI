import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { mockLocalStorage } from "../../../test-utils/localStorage.js";
import { useConversationHistory } from "../../../hooks/useConversationHistory.js";

// Mock URL.createObjectURL since jsdom doesn't implement it
global.URL.createObjectURL = vi.fn(() => "blob:mock-url");
global.URL.revokeObjectURL = vi.fn();

// Mock Audio
class MockAudio {
  constructor(src) { this.src = src; }
  play() { return Promise.resolve(); }
}
global.Audio = MockAudio;

beforeEach(() => {
  mockLocalStorage();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Conversation History — useConversationHistory hook", () => {
  // ── addEntry ──────────────────────────────────────────────────────
  describe("addEntry", () => {
    it("records text, voiceName, and timestamp on generation", () => {
      const { result } = renderHook(() => useConversationHistory());
      act(() => result.current.addEntry("Hello there", "My Voice", null));
      const entry = result.current.entries[0];
      expect(entry.text).toBe("Hello there");
      expect(entry.voiceName).toBe("My Voice");
      expect(() => new Date(entry.timestamp).toISOString()).not.toThrow();
    });

    it("places new entries at the front (newest-first)", () => {
      const { result } = renderHook(() => useConversationHistory());
      act(() => result.current.addEntry("First", "Voice A", null));
      act(() => result.current.addEntry("Second", "Voice B", null));
      expect(result.current.entries[0].text).toBe("Second");
      expect(result.current.entries[1].text).toBe("First");
    });

    it("persists entries to localStorage", () => {
      const { result } = renderHook(() => useConversationHistory());
      act(() => result.current.addEntry("Persisted", "Voice", null));
      const stored = JSON.parse(localStorage.getItem("voxena_history"));
      expect(stored).toHaveLength(1);
      expect(stored[0].text).toBe("Persisted");
    });

    it("creates a blob URL when audioBlob is provided", () => {
      const { result } = renderHook(() => useConversationHistory());
      const fakeBlob = new Blob(["audio"], { type: "audio/webm" });
      act(() => result.current.addEntry("With audio", "Voice", fakeBlob));
      expect(result.current.entries[0].audioUrl).toBe("blob:mock-url");
    });

    it("sets audioUrl to null when no blob provided", () => {
      const { result } = renderHook(() => useConversationHistory());
      act(() => result.current.addEntry("No audio", "Voice", null));
      expect(result.current.entries[0].audioUrl).toBeNull();
    });
  });

  // ── ordering ──────────────────────────────────────────────────────
  describe("ordering", () => {
    it("displays entries in reverse-chronological order", () => {
      const { result } = renderHook(() => useConversationHistory());
      act(() => {
        result.current.addEntry("Oldest", "V", null);
        result.current.addEntry("Middle", "V", null);
        result.current.addEntry("Newest", "V", null);
      });
      expect(result.current.entries[0].text).toBe("Newest");
      expect(result.current.entries[2].text).toBe("Oldest");
    });
  });

  // ── FIFO overflow ─────────────────────────────────────────────────
  describe("FIFO overflow", () => {
    it("never exceeds 50 entries", () => {
      const { result } = renderHook(() => useConversationHistory());
      act(() => {
        for (let i = 0; i < 55; i++) {
          result.current.addEntry(`Phrase ${i}`, "Voice", null);
        }
      });
      expect(result.current.entries).toHaveLength(50);
    });

    it("removes the oldest entry when limit is exceeded", () => {
      const { result } = renderHook(() => useConversationHistory());
      // Add exactly 51 entries — "Phrase 0" (the very first) should be trimmed
      act(() => {
        for (let i = 0; i < 51; i++) {
          result.current.addEntry(`Phrase ${i}`, "Voice", null);
        }
      });
      // "Phrase 0" was the oldest — it must be gone
      expect(result.current.entries.find((e) => e.text === "Phrase 0")).toBeFalsy();
      expect(result.current.entries).toHaveLength(50);
    });
  });

  // ── replayAudio ───────────────────────────────────────────────────
  describe("replayAudio", () => {
    it("does not call TTS backend (just creates Audio object)", () => {
      const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({});
      const { result } = renderHook(() => useConversationHistory());
      const fakeBlob = new Blob(["audio"], { type: "audio/webm" });
      act(() => result.current.addEntry("Replay me", "Voice", fakeBlob));
      const id = result.current.entries[0].id;
      act(() => result.current.replayAudio(id));
      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });
  });

  // ── useAgain ──────────────────────────────────────────────────────
  describe("useAgain", () => {
    it("calls insertToTTSInput with the entry text", () => {
      const { result } = renderHook(() => useConversationHistory());
      act(() => result.current.addEntry("Reuse this text", "Voice", null));
      const id = result.current.entries[0].id;
      const insertFn = vi.fn();
      act(() => result.current.useAgain(id, insertFn));
      expect(insertFn).toHaveBeenCalledWith("Reuse this text");
    });
  });

  // ── clearAll ──────────────────────────────────────────────────────
  describe("clearAll", () => {
    it("empties the in-memory entries list", () => {
      const { result } = renderHook(() => useConversationHistory());
      act(() => result.current.addEntry("Temp", "Voice", null));
      act(() => result.current.clearAll());
      expect(result.current.entries).toHaveLength(0);
    });

    it('removes "voxena_history" key from localStorage', () => {
      const { result } = renderHook(() => useConversationHistory());
      act(() => result.current.addEntry("Temp", "Voice", null));
      act(() => result.current.clearAll());
      expect(localStorage.getItem("voxena_history")).toBeNull();
    });
  });

  // ── persistence ───────────────────────────────────────────────────
  describe("persistence", () => {
    it("restores entries from localStorage on mount", () => {
      // Pre-populate localStorage with an entry
      const existing = [{
        id: "test-id",
        text: "Persisted entry",
        voiceName: "Voice",
        timestamp: new Date().toISOString(),
        audioUrl: null,
      }];
      localStorage.setItem("voxena_history", JSON.stringify(existing));

      const { result } = renderHook(() => useConversationHistory());
      expect(result.current.entries).toHaveLength(1);
      expect(result.current.entries[0].text).toBe("Persisted entry");
    });
  });
});
