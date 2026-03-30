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
      {/* Hero Header */}
      <header className="bg-[var(--bg-header)] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="flex items-center justify-between py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold tracking-tight">
                FH
              </div>
              <span className="text-sm font-medium tracking-wide uppercase opacity-80">
                FIFA Heroes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-medium text-green-400 uppercase tracking-wider">
                Live
              </span>
            </div>
          </div>

          {/* Title section */}
          <div className="py-10 sm:py-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Leaderboard
            </h1>
            <p className="mt-2 text-base sm:text-lg text-white/50 font-light">
              Season standings &middot; {sorted.length} players
            </p>
          </div>
        </div>
      </header>

      {/* Leaderboard Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-6">
        <Leaderboard players={sorted} />
      </section>

      {/* Footer */}
      <footer className="mt-16 mb-8 text-center text-xs text-[var(--text-light)]">
        <p>FIFA Heroes Leaderboard &middot; Powered by Azure</p>
      </footer>
    </main>
  );
}
