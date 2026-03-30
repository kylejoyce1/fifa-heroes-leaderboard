"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Player {
  player: string;
  wins: number;
}

function getPlayerDisplay(id: string) {
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
  return { firstName: firstNames[idx1], lastName: lastNames[idx2] };
}

function getAvatarColors(id: string) {
  const pairs = [
    { ring: "#00e5ff", bg: "#e0f7fa" },
    { ring: "#7c4dff", bg: "#ede7f6" },
    { ring: "#ff6d00", bg: "#fff3e0" },
    { ring: "#00e676", bg: "#e8f5e9" },
    { ring: "#ff1744", bg: "#fce4ec" },
    { ring: "#ffea00", bg: "#fffde7" },
    { ring: "#00b0ff", bg: "#e1f5fe" },
    { ring: "#d500f9", bg: "#f3e5f5" },
    { ring: "#1de9b6", bg: "#e0f2f1" },
    { ring: "#ff9100", bg: "#fff8e1" },
  ];
  return pairs[parseInt(id.slice(0, 2), 16) % pairs.length];
}

function Avatar({
  id,
  size = "md",
}: {
  id: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const display = getPlayerDisplay(id);
  const colors = getAvatarColors(id);
  const dims = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-20 h-20 sm:w-24 sm:h-24",
    xl: "w-28 h-28 sm:w-36 sm:h-36",
  };
  const textSize = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl sm:text-2xl",
    xl: "text-3xl sm:text-4xl",
  };
  const ringWidth = {
    sm: "3px",
    md: "3px",
    lg: "4px",
    xl: "5px",
  };

  return (
    <div
      className={`${dims[size]} rounded-full flex items-center justify-center flex-shrink-0 relative`}
      style={{
        background: colors.bg,
        border: `${ringWidth[size]} solid ${colors.ring}`,
        boxShadow: `0 0 0 2px rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.1)`,
      }}
    >
      <span className={`font-extrabold ${textSize[size]}`} style={{ color: colors.ring }}>
        {display.firstName[0]}
        {display.lastName[0]}
      </span>
    </div>
  );
}

function Podium({ top3 }: { top3: Player[] }) {
  if (top3.length < 3) return null;

  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd
  const podiumSizes: ("lg" | "xl" | "lg")[] = ["lg", "xl", "lg"];
  const podiumLabels = ["2nd", "1st", "3rd"];
  const podiumHeights = ["h-20 sm:h-24", "h-28 sm:h-32", "h-16 sm:h-20"];
  const podiumColors = ["bg-gray-300", "bg-[var(--gold)]", "bg-amber-600"];

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 pt-4">
      {podiumOrder.map((p, i) => {
        const display = getPlayerDisplay(p.player);
        const isFirst = i === 1;
        return (
          <div key={p.player} className="flex flex-col items-center">
            {/* Crown for #1 */}
            {isFirst && (
              <div className="text-3xl sm:text-4xl mb-1 animate-bounce" style={{ animationDuration: "2s" }}>
                👑
              </div>
            )}
            {/* Avatar */}
            <Avatar id={p.player} size={isFirst ? "xl" : "lg"} />
            {/* Name */}
            <p className={`mt-2 font-extrabold text-[var(--bg-dark)] ${isFirst ? "text-base sm:text-lg" : "text-sm"}`}>
              {display.firstName}
            </p>
            {/* Wins */}
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              {p.wins.toLocaleString()} wins
            </p>
            {/* Podium block */}
            <div
              className={`mt-2 w-20 sm:w-28 ${podiumHeights[i]} ${podiumColors[i]} rounded-t-xl flex items-start justify-center pt-2 sm:pt-3`}
            >
              <span className="text-lg sm:text-xl font-black text-[var(--bg-dark)] opacity-80">
                {podiumLabels[i]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getRowStyle(rank: number) {
  if (rank === 1)
    return "bg-[var(--gold)] text-[var(--text-dark)]";
  if (rank === 2)
    return "bg-[var(--silver)] text-[var(--text-dark)]";
  if (rank === 3)
    return "bg-[var(--orange-row)] text-white";
  return "bg-transparent text-white";
}

export default function Leaderboard({ players }: { players: Player[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const top3 = players.slice(0, 3);
  const rest = players.slice(3);

  return (
    <div className="w-full">
      {/* Refresh */}
      <div className="flex items-center justify-end mb-4 px-1">
        <button
          onClick={() => startTransition(() => router.refresh())}
          disabled={isPending}
          className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-dark)] active:scale-95 transition-all cursor-pointer px-3 py-2 -mr-2 rounded-lg"
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

      {/* Podium - Top 3 */}
      <Podium top3={top3} />

      {/* Ranked List */}
      <div className="rounded-3xl bg-[var(--bg-dark)] p-4 sm:p-6 shadow-xl">
        {/* Top 3 in list */}
        <div className="flex flex-col gap-2 sm:gap-3 mb-3">
          {top3.map((p, i) => {
            const rank = i + 1;
            const display = getPlayerDisplay(p.player);
            const rowStyle = getRowStyle(rank);

            return (
              <div
                key={p.player}
                className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full ${rowStyle} transition-transform hover:scale-[1.01]`}
              >
                {/* Rank indicator */}
                <div className="flex items-center gap-1 w-8 sm:w-10 flex-shrink-0">
                  <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                  <span className="text-base sm:text-lg font-extrabold">{rank}</span>
                </div>

                {/* Avatar */}
                <Avatar id={p.player} size="sm" />

                {/* Name */}
                <span className="flex-1 text-base sm:text-lg font-bold truncate">
                  {display.firstName}
                </span>

                {/* Points */}
                <span className="text-sm sm:text-base font-bold opacity-80 flex-shrink-0">
                  {p.wins.toLocaleString()}{" "}
                  <span className="text-xs font-normal">pts.</span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Remaining players */}
        <div className="flex flex-col gap-2 sm:gap-2.5">
          {rest.map((p, i) => {
            const rank = i + 4;
            const display = getPlayerDisplay(p.player);

            return (
              <div
                key={p.player}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full transition-colors hover:bg-white/5"
              >
                {/* Rank indicator */}
                <div className="flex items-center gap-1 w-8 sm:w-10 flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-[var(--green-accent)] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                  <span className="text-base sm:text-lg font-extrabold text-white">{rank}</span>
                </div>

                {/* Avatar */}
                <Avatar id={p.player} size="sm" />

                {/* Name */}
                <span className="flex-1 text-base sm:text-lg font-bold text-white truncate">
                  {display.firstName}
                </span>

                {/* Points */}
                <span className="text-sm sm:text-base text-[var(--text-muted)] font-bold flex-shrink-0">
                  {p.wins.toLocaleString()}{" "}
                  <span className="text-xs font-normal">pts.</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
