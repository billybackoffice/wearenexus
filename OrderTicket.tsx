"use client";

import { useState } from "react";

type Props = {
  symbol: string;
};

export default function OrderTicket({ symbol }: Props) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [size, setSize] = useState("0.01");
  const [price, setPrice] = useState("");
  const [leverage, setLeverage] = useState("10");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(
      `Simulated ${side.toUpperCase()} ${size} ${symbol} @ ${
        orderType === "market" ? "market" : price
      } · ${leverage}x`
    );
    setTimeout(() => setMessage(""), 4000);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2.5 border-b border-zinc-800">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Order Ticket
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-3 space-y-3 flex-1">
        {/* Side toggle */}
        <div className="grid grid-cols-2 gap-1 p-0.5 bg-zinc-900 rounded-md">
          <button
            type="button"
            onClick={() => setSide("buy")}
            className={`h-8 text-xs font-medium rounded transition-colors ${
              side === "buy"
                ? "bg-emerald-600 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Buy / Long
          </button>
          <button
            type="button"
            onClick={() => setSide("sell")}
            className={`h-8 text-xs font-medium rounded transition-colors ${
              side === "sell"
                ? "bg-red-600 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sell / Short
          </button>
        </div>

        {/* Order type */}
        <div className="flex gap-2">
          {(["market", "limit"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setOrderType(t)}
              className={`flex-1 h-7 text-[11px] font-medium rounded border transition-colors ${
                orderType === t
                  ? "border-zinc-500 bg-zinc-800 text-zinc-100"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Size */}
        <div>
          <label className="block text-[11px] text-zinc-500 mb-1">Size</label>
          <input
            type="number"
            step="0.001"
            min="0.001"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full h-9 px-2.5 rounded-md bg-zinc-900 border border-zinc-700 text-sm font-mono text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        {/* Limit price */}
        {orderType === "limit" && (
          <div>
            <label className="block text-[11px] text-zinc-500 mb-1">
              Limit Price
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-9 px-2.5 rounded-md bg-zinc-900 border border-zinc-700 text-sm font-mono text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>
        )}

        {/* Leverage */}
        <div>
          <label className="block text-[11px] text-zinc-500 mb-1">
            Leverage
          </label>
          <select
            value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
            className="w-full h-9 px-2.5 rounded-md bg-zinc-900 border border-zinc-700 text-sm font-mono text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          >
            {["1", "2", "5", "10", "20", "50", "100"].map((v) => (
              <option key={v} value={v}>
                {v}x
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`w-full h-10 rounded-md text-sm font-medium transition-colors ${
            side === "buy"
              ? "bg-emerald-600 hover:bg-emerald-500 text-white"
              : "bg-red-600 hover:bg-red-500 text-white"
          }`}
        >
          {side === "buy" ? "Buy" : "Sell"} {symbol}
        </button>

        {message && (
          <p className="text-[11px] text-center text-zinc-400 pt-1">
            {message}
          </p>
        )}

        <p className="text-[10px] text-zinc-600 text-center pt-2">
          Simulation only · No real funds
        </p>
      </form>
    </div>
  );
}
