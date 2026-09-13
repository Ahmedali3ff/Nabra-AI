import React, { useState } from "react";
import { Zap, Info } from "lucide-react";
import { CONTEXT_NAMES, contextSuggestions } from "../../data/contextSuggestions.js";

/**
 * ContextSuggestionsPanel — rule-based phrase suggestions by communication context.
 *
 * Explicitly labeled as rule-based (no ML/AI).
 * No network requests are made. Works fully offline.
 * Clicking a suggestion calls insertToTTSInput — does NOT trigger TTS directly.
 */
export default function ContextSuggestionsPanel({ insertToTTSInput }) {
  const [selectedContext, setSelectedContext] = useState(null);
  const selectId = React.useId();

  const suggestions = selectedContext ? (contextSuggestions[selectedContext] ?? []) : [];

  return (
    <section
      className="rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950"
      aria-label="Context Suggestions — Nabra AI"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-accent-dark dark:text-amber-400" aria-hidden="true" />
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
            Context Suggestions
          </h2>
        </div>
        {/* Rule-based label — required by spec */}
        <div
          className="flex items-center gap-1.5 rounded-full bg-neutral-200/70 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
          title="These suggestions are pre-written static phrases. No AI or machine learning is used."
        >
          <Info size={12} aria-hidden="true" />
          <span>Rule-based — no AI</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Context selector */}
        <div className="flex flex-col gap-1">
          <label htmlFor={selectId} className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Select a communication context
          </label>
          <select
            id={selectId}
            value={selectedContext ?? ""}
            onChange={(e) => setSelectedContext(e.target.value || null)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          >
            <option value="">— Choose context —</option>
            {CONTEXT_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Suggestions or placeholder */}
        {!selectedContext ? (
          <p className="py-4 text-center text-sm text-neutral-400 dark:text-neutral-600">
            Select a context above to see relevant phrase suggestions.
          </p>
        ) : (
          <div
            className="grid gap-2 sm:grid-cols-2"
            role="list"
            aria-label={`${selectedContext} suggestions`}
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                role="listitem"
                onClick={() => insertToTTSInput(suggestion)}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-left text-sm text-neutral-800 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-primary-600 dark:hover:bg-primary-950/40"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Emergency notice */}
        {selectedContext === "Emergency" && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">
            ⚠ For genuine emergencies, always contact emergency services directly if possible.
          </p>
        )}
      </div>
    </section>
  );
}
