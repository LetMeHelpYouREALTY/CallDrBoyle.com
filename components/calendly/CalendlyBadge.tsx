"use client";

import { useEffect } from "react";
import "./types";

interface CalendlyBadgeProps {
  url?: string;
  text?: string;
  color?: string;
  textColor?: string;
  branding?: boolean;
}

export default function CalendlyBadge({
  url = "https://calendly.com/drjanduffy/showing",
  text = "Schedule time with me",
  color = "#0069ff",
  textColor = "#ffffff",
  branding = true,
}: CalendlyBadgeProps) {
  useEffect(() => {
    const initBadge = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url,
          text,
          color,
          textColor,
          branding,
        });
      }
    };

    if (window.Calendly) {
      initBadge();
    } else {
      window.addEventListener("calendly-loaded", initBadge);
    }

    return () => {
      window.removeEventListener("calendly-loaded", initBadge);
    };
  }, [url, text, color, textColor, branding]);

  return null;
}
