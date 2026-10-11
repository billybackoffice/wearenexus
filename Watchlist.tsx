"use client";

type Instrument = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
};

const MOCK_DATA: Instrument[] = [
  { symbol: "BTCUSDT", name: "Bitcoin", price: 68420.5, change: 1240.2, changePct: 1.85 },
  { symbol: "ETHUSDT", name: "Ethereum", price: 3421.8, change: -42.1, changePct: -1.22 },
  { symbol: "SOLUSDT", name: "Solana", price: 178.45, change: 5.32, changePct: 3.07 },
  { symbol: "XAUUSD", name: "Gold", price: 2654.3, change: 12.8, changePct: 0.48 },
  { symbol: "EURUSD", name: "EUR/USD", price: 1.0842, change: -0.0012, changePct: -0.11 },
  { symbol: "NAS100", name: "Nasdaq 100", price: 20214.5, change: 145.2, changePct: 0.72 },
  { symbol: "SPX500", name: "S&P 500", price: 5782.1, change: 28.4, changePct: 0.49 },
  { symbol: "USOIL", name: "Crude Oil", price: 72.34, change: -0.86, changePct: -1.17 },
];

type Props = {
  selected: string;
  onSelect: (symbol: string) => void;
};

export default function Watchlist({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2.5 border-b border-zinc-800">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Watchlist
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {MOCK_DATA.map((item) => {
          const isSelected = selected.includes(item.symbol);
          const isPositive = item.change >= 0;
          return (
            <button
              key={item.symbol}
              onClick={() => onSelect(item.symbol)}
              className={`w-full px-3 py-2.5 flex items-center justify-between text-left transition-colors border-b border-zinc-800/50 ${
                isSelected
                  ? "bg-zinc-800/60"
                  : "hover:bg-zinc-900/80"
              }`}
            >
              <div>
                <div className="text-sm font-medium text-zinc-100 font-mono tracking-tight">
                  {item.symbol}
                </div>
                <div className="text-[11px] text-zinc-500">{item.name}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-zinc-200 tabular-nums">
                  {item.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: item.price < 10 ? 4 : 2,
                  })}
                </div>
                <div
                  className={`text-[11px] font-mono tabular-nums ${
                    isPositive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {item.changePct.toFixed(2)}%
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
