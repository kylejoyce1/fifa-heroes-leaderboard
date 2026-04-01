import Leaderboard from "./components/Leaderboard";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface Player {
    player: string;
    userName: string;
    country: string;
    wins: number;
    losses: number;
    matches: number;
}

async function getLeaderboard(): Promise<Player[]> {
    try {
        const res = await fetch(
            "https://leaderboards-d2dwf8cwhwfuegde.eastus-01.azurewebsites.net/api/GetLeaderboard",
            { cache: "no-store" }
        );
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export default async function Home() {
    const players = await getLeaderboard();
    const sorted = [...players].sort((a, b) => b.wins - a.wins);

    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Full-page white background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/white-bg-opt.png"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Bottom-left decorative diagonal background */}
            <div className="absolute bottom-0 left-0 w-[50%] h-[65%] z-0 pointer-events-none">
                <Image
                    src="/assets/green-diagonal-bg.png"
                    alt=""
                    fill
                    className="object-contain object-bottom-left"
                />
            </div>

            {/* Header / Navbar */}
            <header className="pwa-header sticky top-0 z-20">
                <div className="relative">
                    <Image
                        src="/assets/header-bar.svg"
                        alt=""
                        width={1920}
                        height={6}
                        className="w-full h-[6px] object-cover"
                    />
                </div>

                <div className="relative bg-white/95 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                    <Image
                        src="/assets/header-texture.png"
                        alt=""
                        fill
                        className="object-cover opacity-40"
                    />
                    <div className="relative w-full max-w-[960px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16 sm:h-[72px]">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/logo-fifa-text.svg"
                                alt="FIFA"
                                width={80}
                                height={36}
                                className="h-7 sm:h-9 w-auto"
                            />
                            <Image
                                src="/assets/logo-heroes-text.svg"
                                alt="Heroes"
                                width={120}
                                height={48}
                                className="h-10 sm:h-12 w-auto"
                            />
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4">
                            <Image
                                src="/assets/icon-globe.svg"
                                alt="Website"
                                width={24}
                                height={24}
                                className="w-5 h-5 sm:w-6 sm:h-6 opacity-50"
                            />
                            <Image
                                src="/assets/divider-line.svg"
                                alt=""
                                width={1}
                                height={32}
                                className="h-6 sm:h-8 w-px opacity-20"
                            />
                            <Image
                                src="/assets/icon-tiktok.svg"
                                alt="TikTok"
                                width={24}
                                height={24}
                                className="w-5 h-5 sm:w-6 sm:h-6 opacity-50 hover:opacity-100 transition-opacity"
                            />
                            <Image
                                src="/assets/icon-instagram.svg"
                                alt="Instagram"
                                width={24}
                                height={24}
                                className="w-5 h-5 sm:w-6 sm:h-6 opacity-50 hover:opacity-100 transition-opacity"
                            />
                            <Image
                                src="/assets/icon-youtube.svg"
                                alt="YouTube"
                                width={24}
                                height={24}
                                className="w-5 h-5 sm:w-6 sm:h-6 opacity-50 hover:opacity-100 transition-opacity"
                            />
                            <Image
                                src="/assets/icon-x.svg"
                                alt="X"
                                width={24}
                                height={24}
                                className="w-5 h-5 sm:w-6 sm:h-6 opacity-50 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <div className="w-full max-w-[960px] mx-auto px-4 sm:px-10 pb-24 relative z-10 flex-1">
                {/* Title */}
                <div className="pt-8 sm:pt-12 pb-8 sm:pb-10 text-center">
                    <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-extrabold italic leading-none">
                        Leaderboard
                    </h1>
                    <div className="mt-2 flex justify-center">
                        <Image
                            src="/assets/leaderboard-underline.svg"
                            alt=""
                            width={300}
                            height={8}
                            className="w-[200px] sm:w-[260px]"
                        />
                    </div>
                </div>

                {sorted.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 text-lg">
                        Leaderboard data is temporarily unavailable. Please try again shortly.
                    </div>
                ) : (
                    <>
                        {/* Column headers */}
                        <div className="flex items-center gap-6 sm:gap-7 px-8 sm:px-10 mb-3 sm:mb-4">
                            <div className="w-10 flex-shrink-0 text-center text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                                #
                            </div>
                            <div className="w-12 sm:w-14 flex-shrink-0" />
                            <div className="w-9 sm:w-10 flex-shrink-0" />
                            <div className="flex-1 min-w-0 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                                Player
                            </div>
                            <div className="w-[80px] sm:w-[90px] flex-shrink-0 text-right text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                                Wins
                            </div>
                        </div>

                        {/* Leaderboard rows */}
                        <Leaderboard players={sorted} />
                    </>
                )}
            </div>
        </main>
    );
}
