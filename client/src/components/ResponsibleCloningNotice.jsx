import React, { useEffect, useRef } from "react";
import { Shield, X } from "lucide-react";

/**
 * ResponsibleCloningNotice
 * Gates voice cloning submission. Shown once per session (stored in a React ref,
 * not localStorage — resets on every page reload, by design).
 */
export default function ResponsibleCloningNotice({ isOpen, onAcknowledge, onCancel }) {
  const dialogRef = useRef(null);
  const acknowledgeButtonRef = useRef(null);

  // Trap focus inside the modal while open
  useEffect(() => {
    if (!isOpen) return;

    // Focus the "I Understand" button when the dialog opens
    acknowledgeButtonRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onCancel();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cloning-notice-title"
        aria-describedby="cloning-notice-desc"
        className="relative w-full max-w-md rounded-2xl border border-amber-200 bg-white p-6 shadow-2xl dark:border-amber-800 dark:bg-neutral-900"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/40">
              <Shield size={20} className="text-amber-600 dark:text-amber-400" aria-hidden="true" />
            </div>
            <h2
              id="cloning-notice-title"
              className="text-base font-bold text-neutral-900 dark:text-white"
            >
              Responsible Voice Cloning — Nabra AI
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancel and close"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors dark:hover:bg-neutral-800 dark:hover:text-neutral-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div id="cloning-notice-desc" className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
          <p>You are about to clone a voice.</p>
          <p>
            Voice cloning is a powerful technology. By proceeding, you confirm
            that:
          </p>
          <ul className="space-y-2 pl-1">
            {[
              "You have the explicit, informed consent of the voice owner.",
              "You will not use this voice to impersonate, deceive, or harm anyone.",
              "You accept full responsibility for your use of cloned audio.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2 border-amber-500 flex items-center justify-center" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-1 border-t border-neutral-100 dark:border-neutral-800">
            This notice is shown once per session and resets on page reload.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none sm:w-auto"
          >
            Cancel
          </button>
          <button
            ref={acknowledgeButtonRef}
            type="button"
            onClick={onAcknowledge}
            className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
          >
            I Understand — I Have Permission
          </button>
        </div>
      </div>
    </div>
  );
}
