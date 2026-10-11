"use client";

type Props = {
  equity?: number;
  available?: number;
  pnl?: number;
};

export default function AccountBar({
  equity = 100000,
  available = 96420.5,
  pnl = 1280.4,
}: Props) {
  const isPositive = pnl >= 0;

  return (
    <div className="flex items-center gap-6 text-xs font-mono">
      <div>
        <span className="text-zinc-500 mr-1.5">Equity</span>
        <span className="text-zinc-200 tabular-nums">
          ${equity.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div>
        <span className="text-zinc-500 mr-1.5">Available</span>
        <span className="text-zinc-200 tabular-nums">
          ${available.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div>
        <span className="text-zinc-500 mr-1.5">Day P&L</span>
        <span
          className={`tabular-nums ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          ${pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}
