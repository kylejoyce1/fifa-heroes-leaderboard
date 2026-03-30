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
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <header className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-blue-600 text-xl font-bold">
              FH
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                FIFA Heroes
              </h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Live Leaderboard
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-secondary)]">
              STANDINGS
            </h2>
            <p className="text-sm text-[var(--text-secondary)]/60">
              {sorted.length} players
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--accent)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            Live
          </div>
        </div>

        <Leaderboard players={sorted} />
      </div>
    </main>
  );
}
