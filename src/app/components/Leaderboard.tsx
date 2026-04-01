"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Player {
    player: string;
    userName: string;
    country: string;
    wins: number;
    losses: number;
    matches: number;
}

const avatarColors = [
    { bg: "#00b3d9", border: "#00e5ff" },
    { bg: "#a855f7", border: "#bf73ff" },
    { bg: "#fb923c", border: "#ffb366" },
    { bg: "#4ade80", border: "#66f099" },
    { bg: "#f472b6", border: "#ff99cc" },
    { bg: "#facc15", border: "#ffe64d" },
    { bg: "#38bdf8", border: "#59d9ff" },
    { bg: "#e879f9", border: "#f099ff" },
    { bg: "#2dd4bf", border: "#66f0e0" },
    { bg: "#fbbf24", border: "#ffd966" },
];

function Avatar({ id, userName }: { id: string; userName: string }) {
    const colors = avatarColors[parseInt(id.slice(0, 2), 16) % avatarColors.length];
    return (
        <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base"
            style={{
                background: colors.bg,
                border: `2.5px solid ${colors.border}`,
                color: "#fff",
                boxShadow: `0 0 14px ${colors.border}40`,
            }}
        >
            {userName.slice(0, 2).toUpperCase()}
        </div>
    );
}

function countryFlag(country: string): string {
    return String.fromCodePoint(
        ...Array.from(country.toUpperCase()).map(
            (c) => 127462 + c.charCodeAt(0) - 65
        )
    );
}

const topRankStyles: Record<number, { bg: string; border: string; color: string }> = {
    1: { bg: "#fffceb", border: "rgba(255,214,0,0.30)", color: "#ffd600" },
    2: { bg: "#f9fafb", border: "rgba(184,196,207,0.30)", color: "#b8c4cf" },
    3: { bg: "#fbf5ef", border: "rgba(204,128,51,0.30)", color: "#cc8033" },
};

export default function Leaderboard({ players }: { players: Player[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    return (
        // bg-white ensures the flex gaps between rows don't show the background decoration
        <div className="w-full bg-white">
            <div className="flex flex-col gap-3 sm:gap-4">
                {players.map((player, index) => {
                    const rank = index + 1;
                    const isTop = rank <= 3;
                    const rankStyle = isTop ? topRankStyles[rank] : null;
                    return (
                        <div
                            key={player.player}
                            className="flex items-center gap-6 sm:gap-7 px-6 sm:px-10 py-4 sm:py-5 rounded-[16px] sm:rounded-[20px] transition-colors hover:brightness-[0.98]"
                            style={
                                rankStyle
                                    ? { background: rankStyle.bg, border: `2px solid ${rankStyle.border}` }
                                    : { background: "#f2f2f5", border: "2px solid transparent" }
                            }
                        >
                            {/* Rank number */}
                            <div
                                className="w-10 flex-shrink-0 text-center"
                                style={{ color: rankStyle ? rankStyle.color : "#737380" }}
                            >
                                <span
                                    className={`font-extrabold italic tabular-nums ${
                                        isTop ? "text-2xl sm:text-[28px]" : "text-lg sm:text-xl"
                                    }`}
                                >
                                    {rank}
                                </span>
                            </div>

                            {/* Avatar */}
                            <Avatar id={player.player} userName={player.userName} />

                            {/* Country flag */}
                            <div className="w-9 sm:w-10 flex-shrink-0 text-center text-[28px] sm:text-[32px] leading-none">
                                {countryFlag(player.country)}
                            </div>

                            {/* Player info */}
                            <div className="flex-1 min-w-0">
                                <p className="truncate" style={{ color: "#1a1a26" }}>
                                    <span
                                        className={`leading-tight ${
                                            isTop
                                                ? "font-bold text-lg sm:text-[22px]"
                                                : "font-semibold text-base sm:text-[18px]"
                                        }`}
                                    >
                                        {player.userName}
                                    </span>
                                </p>
                                <p
                                    className="text-[11px] sm:text-xs mt-0.5 font-medium tabular-nums"
                                    style={{ color: "#a0a0ab" }}
                                >
                                    {player.wins}W &ndash; {player.losses}L &middot; {player.matches} played
                                </p>
                            </div>

                            {/* Wins count */}
                            <div
                                className="w-[80px] sm:w-[90px] flex-shrink-0 text-right"
                                style={{ color: rankStyle ? rankStyle.color : "#4d4d59" }}
                            >
                                <span
                                    className={`font-extrabold italic tabular-nums ${
                                        isTop ? "text-2xl sm:text-[28px]" : "text-xl sm:text-[22px]"
                                    }`}
                                >
                                    {player.wins.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Refresh button */}
            <div className="flex justify-center mt-12">
                <button
                    onClick={() => startTransition(() => router.refresh())}
                    disabled={isPending}
                    className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest cursor-pointer px-7 py-4 rounded-2xl transition-all hover:brightness-95 active:scale-[0.98]"
                    style={{
                        color: "#00b1fd",
                        background: "rgba(0,177,253,0.06)",
                        border: "1.5px solid rgba(0,177,253,0.15)",
                    }}
                >
                    <svg
                        className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
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
        </div>
    );
}
