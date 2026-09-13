import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ContextSuggestionsPanel from "../ContextSuggestionsPanel.jsx";
import { contextSuggestions, CONTEXT_NAMES } from "../../../data/contextSuggestions.js";

describe("Context Suggestions — ContextSuggestionsPanel", () => {
  // ── Context selector ─────────────────────────────────────────────
  describe("ContextSelector", () => {
    it("renders exactly 5 context options (plus the placeholder)", () => {
      render(<ContextSuggestionsPanel insertToTTSInput={() => {}} />);
      const select = screen.getByRole("combobox");
      // 5 contexts + 1 placeholder option
      expect(select.options).toHaveLength(CONTEXT_NAMES.length + 1);
    });

    it("displays placeholder text when no context is selected", () => {
      render(<ContextSuggestionsPanel insertToTTSInput={() => {}} />);
      expect(
        screen.getByText(/select a context above/i)
      ).toBeTruthy();
    });
  });

  // ── Rule-based label ─────────────────────────────────────────────
  it('shows the "Rule-based — no AI" label', () => {
    render(<ContextSuggestionsPanel insertToTTSInput={() => {}} />);
    expect(screen.getByText(/rule-based/i)).toBeTruthy();
  });

  // ── Suggestion display per context ───────────────────────────────
  CONTEXT_NAMES.forEach((contextName) => {
    it(`displays correct suggestions for ${contextName} context`, () => {
      render(<ContextSuggestionsPanel insertToTTSInput={() => {}} />);
      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: contextName } });

      const expectedSuggestions = contextSuggestions[contextName];
      expectedSuggestions.forEach((suggestion) => {
        expect(screen.getByText(suggestion)).toBeTruthy();
      });
    });
  });

  // ── Suggestion insertion ─────────────────────────────────────────
  describe("suggestion insertion", () => {
    it("calls insertToTTSInput with the suggestion text on click", () => {
      const insertFn = vi.fn();
      render(<ContextSuggestionsPanel insertToTTSInput={insertFn} />);

      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "Meeting" } });

      const firstSuggestion = contextSuggestions["Meeting"][0];
      const button = screen.getByText(firstSuggestion);
      fireEvent.click(button);

      expect(insertFn).toHaveBeenCalledWith(firstSuggestion);
    });

    it("calls insertToTTSInput with exact text (no transformation)", () => {
      const insertFn = vi.fn();
      render(<ContextSuggestionsPanel insertToTTSInput={insertFn} />);

      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "Emergency" } });

      const emergencyPhrase = contextSuggestions["Emergency"][0];
      fireEvent.click(screen.getByText(emergencyPhrase));

      expect(insertFn).toHaveBeenCalledWith(emergencyPhrase);
    });
  });

  // ── No network requests ──────────────────────────────────────────
  describe("network isolation", () => {
    it("does not call fetch during context selection or suggestion click", () => {
      const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({});
      const insertFn = vi.fn();
      render(<ContextSuggestionsPanel insertToTTSInput={insertFn} />);

      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "Daily Conversation" } });

      const phrase = contextSuggestions["Daily Conversation"][0];
      fireEvent.click(screen.getByText(phrase));

      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });
  });
});
