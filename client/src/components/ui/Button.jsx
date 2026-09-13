import React from "react";

const variantClasses = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 disabled:bg-primary-300",
  secondary:
    "bg-white text-primary-700 border border-primary-300 hover:bg-primary-50 focus-visible:ring-primary-500 disabled:opacity-50",
  ghost:
    "text-neutral-600 hover:bg-neutral-100 focus-visible:ring-neutral-400 disabled:opacity-40 dark:text-neutral-300 dark:hover:bg-neutral-800",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 disabled:opacity-50",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs rounded-md gap-1.5",
  md: "px-4 py-2 text-sm rounded-lg gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center font-medium transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        variantClasses[variant] ?? variantClasses.primary,
        sizeClasses[size] ?? sizeClasses.md,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
