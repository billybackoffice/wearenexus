"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Watchlist from "@/components/dashboard/Watchlist";
import TradingViewChart from "@/components/dashboard/TradingViewChart";
import OrderTicket from "@/components/dashboard/OrderTicket";
import AIChat from "@/components/dashboard/AIChat";
import NewsSignals from "@/components/dashboard/NewsSignals";
import AccountBar from "@/components/dashboard/AccountBar";

// Map simple symbols to TradingView format
const SYMBOL_MAP: Record<string, string> = {
  BTCUSDT: "BINANCE:BTCUSDT",
  ETHUSDT: "BINANCE:ETHUSDT",
  SOLUSDT: "BINANCE:SOLUSDT",
  XAUUSD: "OANDA:XAUUSD",
  EURUSD: "FX:EURUSD",
  NAS100: "PEPPERSTONE:NAS100",
  SPX500: "SP:SPX",
  USOIL: "TVC:USOIL",
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selected, setSelected] = useState("BTCUSDT");
  const [rightTab, setRightTab] = useState<"order" | "ai">("order");
  const [bottomTab, setBottomTab] = useState<"signals" | "positions">("signals");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
        <div className="text-sm text-zinc-500">Loading workspace…</div>
      </div>
    );
  }

  const tvSymbol = SYMBOL_MAP[selected] || `BINANCE:${selected}`;

  return (
    <div className="h-screen flex flex-col bg-[#09090b] overflow-hidden">
      {/* Top bar */}
      <header className="h-12 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-zinc-100 flex items-center justify-center">
              <span className="text-zinc-900 text-[10px] font-bold">N</span>
            </div>
            <span className="text-sm font-medium tracking-tight">Nexus</span>
          </div>
          <AccountBar />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 hidden sm:block">
            {session.user?.email}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="h-7 px-2.5 text-xs rounded border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Main workspace */}
      <div className="flex-1 flex min-h-0">
        {/* Left sidebar - Watchlist */}
        <aside className="w-56 border-r border-zinc-800 flex flex-col shrink-0 hidden md:flex">
          <Watchlist selected={selected} onSelect={setSelected} />
        </aside>

        {/* Center - Chart + bottom panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chart area */}
          <div className="flex-1 p-2 min-h-0">
            <TradingViewChart symbol={tvSymbol} />
          </div>

          {/* Bottom panel */}
          <div className="h-56 border-t border-zinc-800 flex flex-col shrink-0">
            <div className="flex items-center gap-1 px-2 pt-1.5 border-b border-zinc-800/80">
              <button
                onClick={() => setBottomTab("signals")}
                className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${
                  bottomTab === "signals"
                    ? "text-zinc-100 bg-zinc-900"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Signals & News
              </button>
              <button
                onClick={() => setBottomTab("positions")}
                className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${
                  bottomTab === "positions"
                    ? "text-zinc-100 bg-zinc-900"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Positions
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              {bottomTab === "signals" ? (
                <NewsSignals />
              ) : (
                <div className="p-4 text-sm text-zinc-500">
                  No open positions. Place a simulated order to see it here.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar - Order / AI */}
        <aside className="w-72 border-l border-zinc-800 flex flex-col shrink-0 hidden lg:flex">
          <div className="flex border-b border-zinc-800">
            <button
              onClick={() => setRightTab("order")}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                rightTab === "order"
                  ? "text-zinc-100 border-b-2 border-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Trade
            </button>
            <button
              onClick={() => setRightTab("ai")}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                rightTab === "ai"
                  ? "text-zinc-100 border-b-2 border-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              AI Research
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            {rightTab === "order" ? (
              <OrderTicket symbol={selected} />
            ) : (
              <AIChat />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
