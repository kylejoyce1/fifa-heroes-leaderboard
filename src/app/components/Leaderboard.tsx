"use client";

import { useState } from "react";

interface Player {
  player: string;
  wins: number;
}

function getRankStyle(rank: number) {
  if (rank === 1)
    return {
      badge: "bg-gradient-to-r from-yellow-500 to-amber-400 text-black",
      row: "bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-500",
      icon: "🥇",
    };
  if (rank === 2)
    return {
      badge: "bg-gradient-to-r from-gray-300 to-gray-400 text-black",
      row: "bg-gradient-to-r from-gray-400/10 to-transparent border-l-4 border-gray-400",
      icon: "🥈",
    };
  if (rank === 3)
    return {
      badge: "bg-gradient-to-r from-amber-700 to-amber-600 text-white",
      row: "bg-gradient-to-r from-amber-700/10 to-transparent border-l-4 border-amber-700",
      icon: "🥉",
    };
  return {
    badge: "bg-[var(--bg-card)] text-[var(--text-secondary)]",
    row: "border-l-4 border-transparent",
    icon: "",
  };
}

function getPlayerAvatar(id: string) {
  const colors = [
    "from-red-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-violet-500",
    "from-orange-500 to-yellow-500",
    "from-teal-500 to-green-500",
    "from-indigo-500 to-blue-500",
    "from-rose-500 to-red-500",
    "from-sky-500 to-blue-500",
    "from-fuchsia-500 to-purple-500",
  ];
  const index =
    parseInt(id.slice(0, 4), 16) % colors.length;
  return colors[index];
}

function formatPlayerId(id: string) {
  return `${id.slice(0, 4)}...${id.slice(-4)}`;
}

export default function Leaderboard({ players }: { players: Player[] }) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const maxWins = players[0]?.wins ?? 1;

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl">
      {/* Table Header */}
      <div className="grid grid-cols-[80px_1fr_200px] items-center gap-4 border-b border-[var(--border)] bg-[var(--bg-card)] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
        <span>Rank</span>
        <span>Player</span>
        <span className="text-right">Wins</span>
      </div>

      {/* Player Rows */}
      <div>
        {players.map((p, i) => {
          const rank = i + 1;
          const style = getRankStyle(rank);
          const barWidth = (p.wins / maxWins) * 100;
          const avatarGradient = getPlayerAvatar(p.player);

          return (
            <div
              key={p.player}
              className={`grid grid-cols-[80px_1fr_200px] items-center gap-4 px-6 py-4 transition-all duration-200 cursor-default ${style.row} ${
                hoveredRow === i
                  ? "bg-[var(--bg-row-hover)]"
                  : i % 2 === 0
                  ? "bg-transparent"
                  : "bg-white/[0.02]"
              }`}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Rank */}
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${style.badge}`}
                >
                  {rank}
                </span>
                {style.icon && (
                  <span className="text-lg">{style.icon}</span>
                )}
              </div>

              {/* Player */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradient} text-sm font-bold text-white shadow-lg`}
                >
                  {p.player.slice(0, 2)}
                </div>
                <div>
                  <p className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                    {formatPlayerId(p.player)}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    ID: {p.player}
                  </p>
                </div>
              </div>

              {/* Wins */}
              <div className="flex flex-col items-end gap-1">
                <span className="text-lg font-bold tabular-nums">
                  {p.wins.toLocaleString()}
                </span>
                <div className="h-1.5 w-full max-w-[160px] overflow-hidden rounded-full bg-[var(--bg-card)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-blue-500 transition-all duration-500"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border)] bg-[var(--bg-card)] px-6 py-3 text-center text-xs text-[var(--text-secondary)]">
        Data refreshed on page load
      </div>
    </div>
  );
}
