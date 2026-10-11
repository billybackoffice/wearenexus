"use client";

const ITEMS = [
  {
    type: "signal" as const,
    title: "BTCUSDT · Long bias",
    body: "Higher low formed on 4H. Volume supporting the move. Target 69.2k, invalidation below 66.8k.",
    time: "12m ago",
  },
  {
    type: "news" as const,
    title: "Fed speakers in focus",
    body: "Multiple FOMC members scheduled. Markets pricing limited rate path changes this week.",
    time: "34m ago",
  },
  {
    type: "signal" as const,
    title: "EURUSD · Range bound",
    body: "Price consolidating between 1.0790–1.0880. Wait for break and retest.",
    time: "1h ago",
  },
  {
    type: "news" as const,
    title: "Oil inventories decline",
    body: "API data showed larger-than-expected draw. Energy complex reacting positively.",
    time: "2h ago",
  },
  {
    type: "signal" as const,
    title: "SOLUSDT · Momentum",
    body: "Strong relative strength vs majors. Watching 180 resistance for continuation.",
    time: "3h ago",
  },
];

export default function NewsSignals() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2.5 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Signals & News
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="px-3 py-3 border-b border-zinc-800/60 hover:bg-zinc-900/40 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  item.type === "signal"
                    ? "bg-blue-500/15 text-blue-400"
                    : "bg-zinc-700/50 text-zinc-400"
                }`}
              >
                {item.type}
              </span>
              <span className="text-[10px] text-zinc-600 font-mono">
                {item.time}
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-200 mb-0.5">
              {item.title}
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
