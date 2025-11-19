import { cookies } from "next/headers";
import { UserBlockingModal } from "@/features/auth/components/Onboarding/UserBlockingModal";
import { AnimeList } from "@/features/anime/components/AnimeList.component";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("user_session");

  if (!session) {
    // Requirement 7: Blocking element (modal) shown before any data fetching.
    return <UserBlockingModal />;
  }

  const user = JSON.parse(session.value) as {
    username?: string;
    jobTitle?: string;
  };

  if (!user.username || !user.jobTitle) {
    return <UserBlockingModal />;
  }

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-5xl px-4 py-8 space-y-6">
        <header className="text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight">
            Anime Information Page
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome, {user.username} ({user.jobTitle})
          </p>
        </header>
        <AnimeList />
      </div>
    </main>
  );
}