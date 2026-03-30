"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Player {
  player: string;
  wins: number;
}

function formatId(id: string) {
  return `${id.slice(0, 4)} ${id.slice(4, 8)}`;
}

function getPlayerName(id: string) {
  return `Player ${id.slice(0, 6).toUpperCase()}`;
}

export default function Leaderboard({ players }: { players: Player[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const leader = players[0]?.wins ?? 1;

  return (
    <div className="w-full">
      {/* Refresh */}
      <div className="flex items-center justify-end mb-3 sm:mb-4 px-1">
        <button
          onClick={() => startTransition(() => router.refresh())}
          disabled={isPending}
          className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[var(--text-muted)] hover:text-[var(--text)] active:scale-95 transition-all cursor-pointer px-3 py-2 -mr-3 rounded-lg"
        >
          <svg
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isPending ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isPending ? "Updating..." : "Refresh"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
        {/* Desktop/Tablet Header */}
        <div className="hidden sm:grid grid-cols-[72px_1fr_100px_100px] items-center bg-[var(--bg-header)] text-white px-5 py-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest opacity-60">
            Pos
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest opacity-60">
            Player
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest opacity-60 text-right">
            Rate
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest opacity-60 text-right">
            Wins
          </span>
        </div>

        {/* Mobile Header */}
        <div className="sm:hidden flex items-center justify-between bg-[var(--bg-header)] text-white px-4 py-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest opacity-60">
            Player
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest opacity-60">
            Wins
          </span>
        </div>

        {/* Rows */}
        {players.map((p, i) => {
          const rank = i + 1;
          const winRate = ((p.wins / leader) * 100).toFixed(0);
          const isTop3 = rank <= 3;

          return (
            <div key={p.player}>
              {/* Desktop/Tablet Row */}
              <div
                className={`hidden sm:grid grid-cols-[72px_1fr_100px_100px] items-center px-5 py-3.5 border-b border-[var(--border-light)] transition-colors hover:bg-[var(--bg-subtle)] ${
                  isTop3 ? "bg-amber-50/40" : ""
                }`}
              >
                <div>
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      rank === 1
                        ? "bg-yellow-400 text-yellow-900"
                        : rank === 2
                        ? "bg-gray-300 text-gray-700"
                        : rank === 3
                        ? "bg-amber-600 text-white"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {rank}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text)] truncate">
                    {getPlayerName(p.player)}
                  </p>
                  <p className="text-[11px] text-[var(--text-light)] font-mono mt-0.5">
                    {formatId(p.player)}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="w-14 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--accent)] transition-all duration-700"
                      style={{ width: `${winRate}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[var(--text-light)] mt-1">
                    {winRate}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold tabular-nums">
                    {p.wins.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Mobile Row */}
              <div
                className={`sm:hidden flex items-center gap-3 px-4 py-3 border-b border-[var(--border-light)] active:bg-[var(--bg-subtle)] ${
                  isTop3 ? "bg-amber-50/40" : ""
                }`}
              >
                {/* Rank badge */}
                <span
                  className={`flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                    rank === 1
                      ? "bg-yellow-400 text-yellow-900"
                      : rank === 2
                      ? "bg-gray-300 text-gray-700"
                      : rank === 3
                      ? "bg-amber-600 text-white"
                      : "text-[var(--text-muted)] bg-gray-50"
                  }`}
                >
                  {rank}
                </span>

                {/* Player info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text)] truncate">
                    {getPlayerName(p.player)}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-[var(--text-light)] font-mono">
                      {formatId(p.player)}
                    </span>
                    <span className="text-[10px] text-[var(--text-light)]">
                      &middot; {winRate}%
                    </span>
                  </div>
                </div>

                {/* Wins */}
                <span className="flex-shrink-0 text-base font-bold tabular-nums text-[var(--text)]">
                  {p.wins.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs text-[var(--text-light)]">
        {players.length} players ranked by total wins
      </div>
    </div>
  );
}
