"use client";

import { useEffect, useRef } from "react";
import "./types";

interface CalendlyWidgetProps {
  url?: string;
  minWidth?: string;
  height?: string;
}

export default function CalendlyWidget({
  url = "https://calendly.com/drjanduffy/showing",
  minWidth = "320px",
  height = "700px",
}: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const initWidget = () => {
      if (!window.Calendly || !widgetRef.current || initializedRef.current) return;

      widgetRef.current.innerHTML = "";
      const widgetDiv = document.createElement("div");
      widgetDiv.className = "calendly-inline-widget";
      widgetDiv.setAttribute("data-url", url);
      widgetDiv.style.minWidth = minWidth;
      widgetDiv.style.height = height;
      widgetDiv.style.width = "100%";

      widgetRef.current.appendChild(widgetDiv);

      window.Calendly.initInlineWidget({
        url,
        parentElement: widgetDiv,
      });
      initializedRef.current = true;
    };

    if (window.Calendly) {
      initWidget();
    } else {
      window.addEventListener("calendly-loaded", initWidget);
    }

    return () => {
      window.removeEventListener("calendly-loaded", initWidget);
    };
  }, [url, minWidth, height]);

  return <div ref={widgetRef} style={{ minWidth, height, width: "100%" }} />;
}
