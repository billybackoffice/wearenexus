"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView?: any;
  }
}

type Props = {
  symbol?: string;
  interval?: string;
};

export default function TradingViewChart({
  symbol = "BINANCE:BTCUSDT",
  interval = "60",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.widget({
          container_id: containerRef.current.id,
          symbol,
          interval,
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#0c0c0e",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          backgroundColor: "#0c0c0e",
          gridColor: "rgba(39, 39, 42, 0.5)",
          width: "100%",
          height: "100%",
          allow_symbol_change: true,
          studies: [
            "MASimple@tv-basicstudies",
            "RSI@tv-basicstudies",
          ],
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // cleanup handled by clearing innerHTML
    };
  }, [symbol, interval]);

  return (
    <div className="w-full h-full min-h-[420px] rounded-lg overflow-hidden border border-zinc-800">
      <div
        id="tv-chart-container"
        ref={containerRef}
        className="w-full h-full"
      />
    </div>
  );
}
