import { cookies } from "next/headers";
import { UserBlockingModal } from "@/features/auth/components/Onboarding/UserBlockingModal.ui";
import { AnimeList } from "@/features/anime/components/AnimeList.component";

type SessionUser = {
  username?: string;
  jobTitle?: string;
};

function parseSessionUser(value: string | undefined): SessionUser | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as SessionUser;
  } catch {
    return null;
  }
}

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("user_session");

  const parsed = parseSessionUser(session?.value);
  const username = parsed?.username?.trim();
  const jobTitle = parsed?.jobTitle?.trim();

  // Only allow access when both username and job title are non-empty strings.
  if (!username || !jobTitle) {
    return <UserBlockingModal />;
  }

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-5xl px-4 py-8 space-y-6">
        <header className="text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight">
            Anime App
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome, {username} ({jobTitle})
          </p>
        </header>
        <AnimeList />
      </div>
    </main>
  );
}