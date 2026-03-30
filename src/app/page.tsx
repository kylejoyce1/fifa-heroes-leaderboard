import Leaderboard from "./components/Leaderboard";

export const dynamic = "force-dynamic";

interface Player {
  player: string;
  wins: number;
}

async function getLeaderboard(): Promise<Player[]> {
  const res = await fetch(
    "https://leaderboards-d2dwf8cwhwfuegde.eastus-01.azurewebsites.net/api/GetLeaderboard",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch leaderboard");
  }

  return res.json();
}

export default async function Home() {
  const players = await getLeaderboard();
  const sorted = [...players].sort((a, b) => b.wins - a.wins);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Top Nav Bar */}
      <nav className="pwa-header bg-white border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 36 36" className="w-8 h-8 sm:w-9 sm:h-9">
              <rect width="36" height="36" rx="8" fill="var(--green)" />
              <text
                x="50%"
                y="54%"
                fontFamily="-apple-system, sans-serif"
                fontSize="14"
                fontWeight="800"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                FH
              </text>
            </svg>
            <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--text)]">
              FIFA HEROES
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Live
            </span>
          </div>
        </div>
      </nav>

      {/* Column Headers */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 mt-6 sm:mt-10">
        <div className="flex items-center px-2 sm:px-4 pb-3 sm:pb-4 border-b border-[var(--border)]">
          <span className="w-16 sm:w-20 text-sm sm:text-base font-semibold text-[var(--text)]">
            Pos
          </span>
          <span className="flex-1 text-sm sm:text-base font-semibold text-[var(--text)] pl-2 sm:pl-16">
            Player
          </span>
          <span className="text-sm sm:text-base font-semibold text-[var(--text)] w-20 text-right">
            Wins
          </span>
        </div>
      </div>

      {/* Leaderboard Cards */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 mt-3 sm:mt-4">
        <Leaderboard players={sorted} />
      </section>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 mb-6 sm:mb-8 text-center text-[11px] sm:text-xs text-[var(--text-muted)] px-4">
        <p>FIFA Heroes Leaderboard &middot; {sorted.length} players</p>
      </footer>
    </main>
  );
}
