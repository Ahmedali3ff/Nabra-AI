import React, { useState } from "react";
import { History, Play, RotateCcw, Trash2, Clock, AlertCircle } from "lucide-react";
import { useConversationHistory } from "../../hooks/useConversationHistory.js";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";

/**
 * Formats an ISO timestamp as a human-readable relative time string.
 * Falls back to a locale date string for old entries.
 */
function formatRelativeTime(isoString) {
  try {
    const diff = Date.now() - new Date(isoString).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(isoString).toLocaleDateString();
  } catch {
    return "";
  }
}

/**
 * Truncates text to maxChars, appending ellipsis if needed.
 */
function truncate(text, maxChars = 80) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + "…";
}

// ── HistoryEntryCard ──────────────────────────────────────────────────────
function HistoryEntryCard({ entry, onReplay, onUseAgain }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3 flex flex-col gap-2 dark:border-neutral-800 dark:bg-neutral-900">
      <p
        className="text-sm text-neutral-900 dark:text-white leading-relaxed"
        title={entry.text}
      >
        {truncate(entry.text)}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="primary">{entry.voiceName}</Badge>
        <div className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
          <Clock size={11} aria-hidden="true" />
          <span>{formatRelativeTime(entry.timestamp)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-neutral-100 dark:border-neutral-800">
        <button
          type="button"
          onClick={() => onReplay(entry.id)}
          disabled={!entry.audioUrl}
          aria-label={entry.audioUrl ? "Replay audio" : "Audio no longer available"}
          title={entry.audioUrl ? "Replay audio" : "Audio unavailable after reload"}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:text-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
        >
          {entry.audioUrl ? (
            <Play size={12} aria-hidden="true" />
          ) : (
            <AlertCircle size={12} aria-hidden="true" />
          )}
          Replay
        </button>

        <button
          type="button"
          onClick={() => onUseAgain(entry.id)}
          className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-primary-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
        >
          <RotateCcw size={12} aria-hidden="true" />
          Use Again
        </button>
      </div>
    </div>
  );
}

// ── HistoryPanel (root export) ─────────────────────────────────────────────
export default function HistoryPanel({ insertToTTSInput }) {
  const { entries, replayAudio, useAgain, clearAll } = useConversationHistory();
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <section
      className="rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950"
      aria-label="Conversation History"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <History size={16} className="text-primary-600" aria-hidden="true" />
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
            Conversation History
          </h2>
          <Badge variant="default">{entries.length}</Badge>
        </div>

        {entries.length > 0 && (
          confirmClear ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Clear all?</span>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => { clearAll(); setConfirmClear(false); }}
              >
                Yes, clear
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setConfirmClear(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-red-500 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded"
              aria-label="Clear all history"
            >
              <Trash2 size={13} aria-hidden="true" />
              Clear all
            </button>
          )
        )}
      </div>

      <div className="p-4">
        {entries.length === 0 ? (
          <div className="py-8 text-center">
            <History size={32} className="mx-auto mb-3 text-neutral-300 dark:text-neutral-700" aria-hidden="true" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No history yet. Generate speech to get started.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {entries.map((entry) => (
              <HistoryEntryCard
                key={entry.id}
                entry={entry}
                onReplay={replayAudio}
                onUseAgain={(id) => useAgain(id, insertToTTSInput)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
