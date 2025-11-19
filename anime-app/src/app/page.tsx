import { cookies } from "next/headers";
import { UserBlockingModal } from "@/components/UserBlockingModal";

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

  // Information Page and GraphQL will be implemented in a later phase.
  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Anime Information Page
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome, {user.username} ({user.jobTitle})
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Anime list and GraphQL data will be wired in next.
        </p>
      </div>
    </main>
  );
}