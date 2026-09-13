import React from "react";

const variantClasses = {
  default: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  primary: "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300",
  accent:  "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  danger:  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

export default function Badge({ children, variant = "default", className = "" }) {
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full",
        variantClasses[variant] ?? variantClasses.default,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
