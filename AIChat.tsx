"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const INITIAL: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "I'm your research assistant. Ask about market structure, indicators, risk, or strategy ideas. This is a simulation environment.",
  },
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulated AI response (replace with real API later)
    await new Promise((r) => setTimeout(r, 900));

    const replies = [
      "Based on recent price action, the instrument is trading near a key support zone. Watch volume confirmation before entering.",
      "RSI is approaching oversold territory on the 1H timeframe. A bounce is possible but wait for a higher low structure.",
      "Consider position sizing at 1–2% risk per trade. With current volatility, a tighter stop may be appropriate.",
      "The broader market correlation with risk assets remains elevated. Monitor USD strength and yields for directional bias.",
      "This looks like a classic range. Mean-reversion setups near the edges tend to offer better risk/reward than breakouts in low-volume conditions.",
    ];

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: replies[Math.floor(Math.random() * replies.length)],
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2.5 border-b border-zinc-800">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          AI Research
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`text-sm leading-relaxed ${
              m.role === "user"
                ? "text-zinc-200 ml-4"
                : "text-zinc-400 mr-2"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider text-zinc-600 block mb-0.5">
              {m.role === "user" ? "You" : "Assistant"}
            </span>
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="text-xs text-zinc-600 animate-pulse">Thinking…</div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-zinc-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about markets…"
            className="flex-1 h-9 px-3 rounded-md bg-zinc-900 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-9 px-3 rounded-md bg-zinc-100 text-zinc-900 text-sm font-medium disabled:opacity-40 hover:bg-white transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
