import React from "react";

const variantClasses = {
  default:   "bg-white border border-neutral-200 rounded-xl shadow-sm dark:bg-surface dark:border-border",
  elevated:  "bg-white border border-neutral-200 rounded-xl shadow-md dark:bg-surface dark:border-border",
  highlight: "bg-primary-50/30 border border-primary-200 rounded-xl shadow-sm dark:bg-primary-900/10 dark:border-primary-800",
};

export default function Card({ children, variant = "default", className = "", ...props }) {
  return (
    <div
      {...props}
      className={[variantClasses[variant] ?? variantClasses.default, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
