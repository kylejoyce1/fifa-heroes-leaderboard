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
      {/* Header */}
      <header className="pwa-header bg-[var(--bg-header)] text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Top bar */}
          <div className="flex items-center justify-between py-3 sm:py-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 flex items-center justify-center text-xs sm:text-sm font-bold tracking-tight">
                FH
              </div>
              <span className="text-xs sm:text-sm font-medium tracking-wide uppercase opacity-80">
                FIFA Heroes
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-green-400 uppercase tracking-wider">
                Live
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="py-6 sm:py-10">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Leaderboard
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-white/50 font-light">
              Season standings &middot; {sorted.length} players
            </p>
          </div>
        </div>
      </header>

      {/* Leaderboard */}
      <section className="mx-auto max-w-3xl px-3 sm:px-6 -mt-4 sm:-mt-6">
        <Leaderboard players={sorted} />
      </section>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 mb-6 sm:mb-8 text-center text-[11px] sm:text-xs text-[var(--text-light)] px-4">
        <p>FIFA Heroes Leaderboard</p>
      </footer>
    </main>
  );
}
