"use client";

import "./types";

interface CalendlyButtonProps {
  url?: string;
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CalendlyButton({
  url = "https://calendly.com/drjanduffy/appointment",
  text = "Schedule time with me",
  className = "inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors",
  children,
}: CalendlyButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
      return;
    }
    window.addEventListener(
      "calendly-loaded",
      () => {
        window.Calendly?.initPopupWidget({ url });
      },
      { once: true }
    );
  };

  return (
    <button type="button" onClick={handleClick} className={className} aria-label={text}>
      {children || text}
    </button>
  );
}
