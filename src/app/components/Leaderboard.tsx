"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Player {
  player: string;
  wins: number;
}

function getPlayerDisplay(id: string) {
  // When API is updated, this will use real names.
  // For now, generate readable names from the hex ID.
  const firstNames = [
    "Marcus", "Leo", "Kai", "Andre", "Diego",
    "Riku", "Mateo", "Noel", "Sven", "Tomas",
  ];
  const lastNames = [
    "Silva", "Muller", "Tanaka", "Costa", "Rivera",
    "Nakamura", "Santos", "Berg", "Reyes", "Torres",
  ];

  const idx1 = parseInt(id.slice(0, 2), 16) % firstNames.length;
  const idx2 = parseInt(id.slice(2, 4), 16) % lastNames.length;

  return {
    firstName: firstNames[idx1],
    lastName: lastNames[idx2],
    shortId: id.slice(0, 8),
  };
}

function getAvatarGradient(id: string) {
  const gradients = [
    "from-emerald-600 to-emerald-800",
    "from-blue-600 to-blue-800",
    "from-amber-600 to-amber-800",
    "from-rose-600 to-rose-800",
    "from-violet-600 to-violet-800",
    "from-cyan-600 to-cyan-800",
    "from-orange-600 to-orange-800",
    "from-teal-600 to-teal-800",
    "from-indigo-600 to-indigo-800",
    "from-pink-600 to-pink-800",
  ];
  return gradients[parseInt(id.slice(0, 2), 16) % gradients.length];
}

export default function Leaderboard({ players }: { players: Player[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="w-full">
      {/* Refresh */}
      <div className="flex items-center justify-end mb-3 px-1">
        <button
          onClick={() => startTransition(() => router.refresh())}
          disabled={isPending}
          className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text)] active:scale-95 transition-all cursor-pointer px-3 py-2 -mr-2 rounded-lg"
        >
          <svg
            className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`}
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

      {/* Player Cards */}
      <div className="flex flex-col gap-2 sm:gap-3">
        {players.map((p, i) => {
          const rank = i + 1;
          const display = getPlayerDisplay(p.player);
          const gradient = getAvatarGradient(p.player);

          return (
            <div
              key={p.player}
              className="bg-[var(--bg-card)] rounded-xl sm:rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-shadow duration-200"
            >
              {/* Desktop */}
              <div className="hidden sm:flex items-center px-5 py-4 lg:px-6 lg:py-5 gap-4">
                {/* Rank */}
                <div className="w-16 flex items-center gap-1.5 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[var(--text-muted)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="text-xl font-bold text-[var(--text)]">
                    {rank}
                  </span>
                </div>

                {/* Avatar */}
                <div
                  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-md`}
                >
                  <span className="text-white text-lg lg:text-xl font-bold">
                    {display.firstName[0]}
                    {display.lastName[0]}
                  </span>
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0 pl-1">
                  <p className="text-sm text-[var(--text-secondary)]">
                    {display.firstName}
                  </p>
                  <p className="text-xl lg:text-2xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
                    {display.lastName}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                    {display.shortId}
                  </p>
                </div>

                {/* Wins */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[var(--green-bg)] flex items-center justify-center">
                    <span className="text-white text-lg lg:text-xl font-extrabold tabular-nums">
                      {p.wins}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div className="sm:hidden flex items-center px-3.5 py-3.5 gap-3">
                {/* Rank */}
                <div className="w-10 flex items-center gap-1 flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-[var(--text-muted)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="text-base font-bold text-[var(--text)]">
                    {rank}
                  </span>
                </div>

                {/* Avatar */}
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}
                >
                  <span className="text-white text-sm font-bold">
                    {display.firstName[0]}
                    {display.lastName[0]}
                  </span>
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
                    {display.firstName}
                  </p>
                  <p className="text-base font-extrabold text-[var(--text)] tracking-tight leading-tight">
                    {display.lastName}
                  </p>
                </div>

                {/* Wins */}
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[var(--green-bg)] flex items-center justify-center">
                    <span className="text-white text-sm font-extrabold tabular-nums">
                      {p.wins}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
