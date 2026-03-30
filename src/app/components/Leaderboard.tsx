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
  const names: Record<string, string> = {};
  return names[id] || `Player ${id.slice(0, 6).toUpperCase()}`;
}

export default function Leaderboard({ players }: { players: Player[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const leader = players[0]?.wins ?? 1;

  return (
    <div className="w-full">
      {/* Refresh button */}
      <div className="flex items-center justify-end mb-4 px-1">
        <button
          onClick={() => startTransition(() => router.refresh())}
          disabled={isPending}
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
        >
          <svg
            className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`}
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
        {/* Header */}
        <div className="grid grid-cols-[60px_1fr_100px] sm:grid-cols-[80px_1fr_120px_120px] items-center bg-[var(--bg-header)] text-white px-4 sm:px-6 py-3">
          <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
            Pos
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
            Player
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-70 text-right hidden sm:block">
            Win Rate
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-70 text-right">
            Wins
          </span>
        </div>

        {/* Rows */}
        {players.map((p, i) => {
          const rank = i + 1;
          const winRate = ((p.wins / leader) * 100).toFixed(0);
          const isTop3 = rank <= 3;

          return (
            <div
              key={p.player}
              className={`grid grid-cols-[60px_1fr_100px] sm:grid-cols-[80px_1fr_120px_120px] items-center px-4 sm:px-6 py-4 border-b border-[var(--border-light)] transition-colors hover:bg-[var(--bg-subtle)] ${
                isTop3 ? "bg-amber-50/40" : ""
              }`}
            >
              {/* Position */}
              <div className="flex items-center">
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

              {/* Player info */}
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-semibold text-[var(--text)] truncate">
                  {getPlayerName(p.player)}
                </p>
                <p className="text-xs text-[var(--text-light)] font-mono mt-0.5">
                  {formatId(p.player)}
                </p>
              </div>

              {/* Win rate - hidden on mobile */}
              <div className="hidden sm:flex flex-col items-end">
                <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent)] transition-all duration-700"
                    style={{ width: `${winRate}%` }}
                  />
                </div>
                <span className="text-xs text-[var(--text-light)] mt-1">
                  {winRate}%
                </span>
              </div>

              {/* Wins */}
              <div className="text-right">
                <span
                  className={`text-lg sm:text-xl font-bold tabular-nums ${
                    isTop3 ? "text-[var(--text)]" : "text-[var(--text)]"
                  }`}
                >
                  {p.wins.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-[var(--text-light)]">
        {players.length} players ranked by total wins
      </div>
    </div>
  );
}
