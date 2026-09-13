import React, { useState } from "react";
import { Plus, Search, Star, Pencil, Trash2, BookOpen, X, AlertTriangle } from "lucide-react";
import { usePhraseLibrary, PHRASE_CATEGORIES } from "../../hooks/usePhraseLibrary.js";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";

// ── Category badge color map ──────────────────────────────────────────────
const CATEGORY_BADGE = {
  Greetings: "success",
  Daily:     "primary",
  Work:      "default",
  Emergency: "danger",
  Custom:    "accent",
};

// ── StorageErrorBanner ────────────────────────────────────────────────────
function StorageErrorBanner({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200"
    >
      <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss storage error"
        className="flex-shrink-0 rounded hover:bg-red-100 dark:hover:bg-red-900/40 p-0.5 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

// ── PhraseModal (shared for create and edit) ──────────────────────────────
function PhraseModal({ title, initialText = "", initialCategory = "Daily", onSave, onClose }) {
  const [text, setText] = useState(initialText);
  const [category, setCategory] = useState(initialCategory);
  const textId = React.useId();
  const catId = React.useId();

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSave(text, category);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="phrase-modal-title"
        className="relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-700 dark:bg-neutral-900"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="phrase-modal-title" className="text-base font-bold text-neutral-900 dark:text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor={textId} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Phrase text
            </label>
            <textarea
              id={textId}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your phrase..."
              rows={3}
              required
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={catId} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Category
            </label>
            <select
              id={catId}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            >
              {PHRASE_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm" disabled={!text.trim()}>Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── DeleteConfirmDialog ────────────────────────────────────────────────────
function DeleteConfirmDialog({ phraseText, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
        className="relative w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-700 dark:bg-neutral-900"
      >
        <h2 id="delete-confirm-title" className="text-base font-bold text-neutral-900 dark:text-white mb-2">
          Delete phrase?
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5 line-clamp-2">
          "{phraseText}"
        </p>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="button" variant="danger" size="sm" onClick={() => { onConfirm(); onClose(); }}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

// ── PhraseCard ────────────────────────────────────────────────────────────
function PhraseCard({ phrase, onUse, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 flex flex-col gap-2 hover:border-primary-200 transition-colors dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary-700">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-neutral-900 dark:text-white flex-1 leading-relaxed">
          {phrase.text}
        </p>
        <button
          type="button"
          onClick={() => onToggleFavorite(phrase.id)}
          aria-label={phrase.favorite ? "Remove from favorites" : "Add to favorites"}
          className="flex-shrink-0 rounded-md p-1 text-neutral-400 hover:text-amber-500 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
        >
          <Star
            size={15}
            aria-hidden="true"
            className={phrase.favorite ? "fill-amber-400 text-amber-400" : ""}
          />
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Badge variant={CATEGORY_BADGE[phrase.category] ?? "default"}>
          {phrase.category}
        </Badge>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          {new Date(phrase.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-neutral-100 dark:border-neutral-800">
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => onUse(phrase.id)}
          className="flex-1"
        >
          Use Phrase
        </Button>
        <button
          type="button"
          onClick={() => onEdit(phrase)}
          aria-label="Edit phrase"
          className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors dark:hover:bg-neutral-800 dark:hover:text-neutral-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
        >
          <Pencil size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(phrase)}
          aria-label="Delete phrase"
          className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-colors dark:hover:bg-red-950/40 dark:hover:text-red-400 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ── PhraseLibraryPanel (root export) ──────────────────────────────────────
export default function PhraseLibraryPanel({ insertToTTSInput }) {
  const {
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
  } = usePhraseLibrary();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPhrase, setEditingPhrase] = useState(null);
  const [deletingPhrase, setDeletingPhrase] = useState(null);

  const categories = ["All", ...PHRASE_CATEGORIES];

  return (
    <section
      className="rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950"
      aria-label="Smart Phrase Library"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-primary-600" aria-hidden="true" />
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
            Smart Phrase Library
          </h2>
          <Badge variant="default">{filteredPhrases.length}</Badge>
        </div>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={14} aria-hidden="true" />
          New Phrase
        </Button>
      </div>

      <div className="p-4 space-y-3">
        <StorageErrorBanner message={storageError} onDismiss={dismissStorageError} />

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search phrases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search phrases"
            className="w-full rounded-lg border border-neutral-300 bg-white pl-8 pr-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={[
                "rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none",
                activeCategory === cat
                  ? "bg-primary-600 text-white"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Phrase list */}
        {filteredPhrases.length === 0 ? (
          <div className="py-8 text-center">
            <BookOpen size={32} className="mx-auto mb-3 text-neutral-300 dark:text-neutral-700" aria-hidden="true" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {searchQuery ? "No phrases match your search." : "No phrases yet. Add your first phrase."}
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredPhrases.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                onUse={(id) => usePhrase(id, insertToTTSInput)}
                onEdit={setEditingPhrase}
                onDelete={setDeletingPhrase}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <PhraseModal
          title="New Phrase"
          onSave={(text, category) => createPhrase(text, category)}
          onClose={() => setShowCreateModal(false)}
        />
      )}
      {editingPhrase && (
        <PhraseModal
          title="Edit Phrase"
          initialText={editingPhrase.text}
          initialCategory={editingPhrase.category}
          onSave={(text, category) => updatePhrase(editingPhrase.id, { text, category })}
          onClose={() => setEditingPhrase(null)}
        />
      )}
      {deletingPhrase && (
        <DeleteConfirmDialog
          phraseText={deletingPhrase.text}
          onConfirm={() => deletePhrase(deletingPhrase.id)}
          onClose={() => setDeletingPhrase(null)}
        />
      )}
    </section>
  );
}
