import React from "react";

export default function Input({ label, id, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={[
          "w-full px-3 py-2 text-sm text-neutral-900 bg-white",
          "border border-neutral-300 rounded-lg",
          "placeholder:text-neutral-400",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
          "disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed",
          "dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700",
          "dark:placeholder:text-neutral-600 dark:focus:ring-primary-400",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}
