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
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
}

export default async function Home() {
  const players = await getLeaderboard();
  const sorted = [...players].sort((a, b) => b.wins - a.wins);

  return (
    <main className="min-h-screen bg-[var(--bg)] relative overflow-hidden">
      {/* Background decorations - green diagonal streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[600px] bg-[var(--green-accent)] opacity-20 rotate-[-25deg] rounded-3xl" />
        <div className="absolute -bottom-40 left-10 w-[200px] h-[700px] bg-[var(--green-accent)] opacity-15 rotate-[-25deg] rounded-3xl" />
        {/* Dot pattern */}
        <svg className="absolute left-4 top-[30%] opacity-30" width="80" height="120">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 14 + 7}
                cy={row * 14 + 7}
                r="2.5"
                fill="var(--green-accent)"
              />
            ))
          )}
        </svg>
      </div>

      {/* Header / Navbar */}
      <header className="pwa-header relative z-10 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* FIFA Heroes Logo */}
            <div className="flex items-center gap-1.5">
              <div className="bg-[var(--bg-dark)] rounded-md px-1.5 py-0.5">
                <span className="text-white text-[10px] sm:text-xs font-black tracking-tight">FIFA</span>
              </div>
              <span
                className="text-xl sm:text-2xl font-black italic text-[var(--bg-dark)] tracking-tight"
                style={{ fontFamily: "'Bangers', cursive" }}
              >
                HEROES
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green-accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--green-accent)]" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-[var(--green-accent)] uppercase tracking-wider">
              Live
            </span>
          </div>
        </div>
        {/* Cyan accent line */}
        <div className="h-1 bg-gradient-to-r from-[var(--cyan)] to-[var(--cyan-dark)]" />
      </header>

      {/* Title */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 mt-6 sm:mt-8">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-black italic text-[var(--bg-dark)] tracking-tight"
          style={{ fontFamily: "'Bangers', cursive", letterSpacing: "1px" }}
        >
          LEADERBOARD
        </h1>
        <div className="mt-1 h-1 w-32 sm:w-40 bg-gradient-to-r from-[var(--cyan)] to-[var(--cyan-dark)] rounded-full" />
      </div>

      {/* Leaderboard */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 mt-8 sm:mt-10 pb-16">
        <Leaderboard players={sorted} />
      </section>
    </main>
  );
}
