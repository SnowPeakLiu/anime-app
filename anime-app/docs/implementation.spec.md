# Project Implementation Spec: Anime

## 1. Architectural Strategy
We will use **Next.js App Router**. To satisfy the requirement of "Smart vs. Dumb" components and specific file extensions, we will group code by **Feature** rather than by technical layer (Feature-Sliced Design lite).

### Dependency Strategy
To align with Leonardo.Ai's preference for **as few dependencies as possible** (challenge brief 28–29), we will:
*   Rely primarily on the tools provided by `create-next-app` (Next.js, React, TypeScript, Tailwind CSS).
*   Add only the minimum extra libraries required by the brief: `@apollo/client`, `graphql`, and `shadcn/ui` (plus its standard peer dependencies such as React Hook Form for the form).
*   Avoid additional state-management, styling, or utility libraries (e.g. Redux, Zustand, styled-components, large UI kits) unless strictly necessary for a requirement.

### Folder Structure
```text
src/
├── app/
│   ├── layout.tsx           # Global layout (Fonts, Metadata)
│   ├── page.tsx             # Main page (Information Page)
│   └── providers.tsx        # Wraps Apollo & Auth Context
├── components/
│   └── ui/                  # Shadcn UI generic components (Button, Input, etc.)
├── features/
│   ├── auth/                # "Blocking Element" logic
│   │   ├── auth.context.tsx # Persist State (User/Job)
│   │   ├── auth.types.ts
│   │   ├── components/
│   │   │   ├── AuthGate.component.tsx   # Smart: Checks context, renders Form or Children
│   │   │   └── OnboardingForm.ui.tsx    # Dumb: UI for inputs
│   ├── anime/               # Anime "Information Page" logic
│   │   ├── anime.types.ts
│   │   ├── components/
│   │   │   ├── AnimeList.component.tsx  # Smart: Calls hooks, manages pagination
│   │   │   ├── AnimeGrid.ui.tsx         # Dumb: Grid layout of cards
│   │   │   ├── Pagination.ui.tsx        # Dumb: Page controls
│   │   │   └── DetailModal.ui.tsx       # Dumb: Dialog content
├── graphql/
│   ├── client.ts            # Shared Apollo Client
│   ├── queries/             # .ts files with gql tag
│   ├── mutations/           # (Empty for now, but structure exists)
│   └── fragments/           # Reusable data parts
├── hooks/
│   └── useAnimeList.ts      # Typed custom hook accessing GraphQL
└── lib/
    └── utils.ts
```

---

## 2. Step-by-Step Implementation Plan

Follow these steps sequentially. Each step represents 1-2 commits.

**Git commit convention:** Use short, Conventional Commit–style prefixes such as `chore:` for setup/maintenance and `feat:` for new features.

### Phase 1: Foundation & Setup

**1. Project Initialization**
*   **Action:** Run `npx create-next-app@latest my-challenge --typescript --tailwind --eslint`. Select "Yes" for App Router.

**2. Install Dependencies & Shadcn**
*   **Action:**
*   **Action:**
    *   Run `npx shadcn@latest init`.
    *   Install required UI components: `npx shadcn@latest add button input label card dialog form`.
    *   Install Apollo: `npm install @apollo/client graphql`.

**3. Clean Up & Footer**
*   **Action:**
*   **Action:**
    *   Clean `globals.css`.
    *   Create `src/components/Footer.ui.tsx` displaying "Challenge v3.5".
    *   Update `app/layout.tsx` to include the Footer.

### Phase 2: The GraphQL Core

#### Centralized Definition Structure
*   **Dedicated directories:** All GraphQL operations live under a centralized structure:
    *   `src/graphql/queries/`
    *   `src/graphql/mutations/`
    *   `src/graphql/fragments/`
*   **Definition placement:** Every GraphQL operation (the `gql` template literal) must be defined and exported as a constant from a file inside `src/graphql/`.  
    *   Example: a query to fetch user details lives in `src/graphql/queries/user.ts` as `GET_USER_DETAILS_QUERY`.
*   **No raw `gql` in components/hooks:** React components, pages, and hooks **outside** `src/graphql/` must not contain `gql` calls directly; they should import pre-defined operations from `src/graphql`.

**4. Centralized Client**
*   **Action:** Create `src/lib/apollo-client.ts`. Configure it to point to `https://graphql.anilist.co`.

**5. Definitions & Hooks**
*   **Action:**
    *   Create `src/graphql/queries/getAnime.query.ts` (Accept `$page` and `$perPage`).
    *   Create `src/hooks/useAnimeList.ts`. This hook imports the query and returns `{ data, loading, error }`.

### Phase 3: The Blocking Gate (Auth)

#### Testing
*   **Blocking behaviour:** Verify that the Information Page (anime list and GraphQL data) is not accessible until a username and job title have been submitted (Challenge steps 7 and 8c).
*   **Persistence:** After refreshing the browser, the saved username and job title should still be present and the blocking element should stay dismissed (Challenge step 7b).
*   **Editing:** Ensure the user can view their stored username and job title and successfully update them, with changes reflected immediately and persisting on reload (Challenge step 7ii and Phase 5 step 12).

**6. Auth Context (State)**
*   **Action:** Create `src/features/auth/auth.context.tsx`.
    *   Use `createContext`.
    *   State: `username`, `jobTitle`.
    *   Logic: Load from `localStorage` on mount. Save to `localStorage` on update.

**7. Auth UI (The Form)**
*   **Action:** Create `src/features/auth/components/OnboardingForm.ui.tsx`.
    *   Use Shadcn Form + React Hook Form (standard in Shadcn).
    *   Inputs for Username and Job Title.

**8. Auth Gate (The Logic)**
*   **Action:** Create `src/features/auth/components/AuthGate.component.tsx`.
    *   Wrap `children`.
    *   If `username` exists in Context -> Render `children` + "Edit Profile" button.
    *   If not -> Render `OnboardingForm.ui`.
    *   Add this to `app/layout.tsx` or `app/providers.tsx`.

### Phase 4: The Information Page (Anime)

**9. Pagination Logic**
*   **Action:** In `src/features/anime/components/AnimeList.component.tsx`:
    *   Read URL Search Params using `useSearchParams()` (e.g., `?page=1`).
    *   Pass page number to `useAnimeList` hook.
    *   **Constraint Check:** Ensure hook is *not* called until Auth Context confirms user is logged in (use `skip` option in Apollo or conditional rendering).

**10. Grid UI**
*   **Action:** Create `src/features/anime/components/AnimeGrid.ui.tsx`.
    *   Map through data.
    *   Display Image and Title (Shadcn Card).

**11. Modal Interaction**
*   **Action:**
    *   Create `src/features/anime/components/DetailModal.ui.tsx` using Shadcn Dialog.
    *   In `AnimeList.component.tsx`, add state `selectedItem`.
    *   On click of an item in Grid, set `selectedItem`, which triggers the Modal to open.

### Phase 5: Final Polish

**12. User Profile Editing**
*   **Action:** Ensure the user can see their name/job at the top of the list and click "Edit" to re-open the blocking form (or a modal version of it).

**13. Responsiveness & Styling**
*   **Action:** Check mobile view. Ensure Grid uses `grid-cols-1 md:grid-cols-3`.

**14. Documentation**
*   **Action:** Add JSDoc comments to complex logic. Update README.

---

## 3. Code Examples for Specific Requirements

### The Hook Structure (Requirement 2)
**`src/hooks/useAnimeList.ts`**
```typescript
import { useQuery } from '@apollo/client';
import { GET_ANIME_LIST } from '@/graphql/queries/getAnime.query';
import { AnimeListResponse, AnimeListVars } from '@/graphql/types'; // Manual types or generated

export const useAnimeList = (page: number) => {
  return useQuery<AnimeListResponse, AnimeListVars>(GET_ANIME_LIST, {
    variables: { page, perPage: 10 },
    notifyOnNetworkStatusChange: true,
  });
};
```

### The Smart/Dumb Component (Requirement 3)

**Dumb (`src/features/anime/components/AnimeGrid.ui.tsx`)**
*   Receives `items` (array) and `onItemClick` (function) as props.
*   Has **no** side effects, no hooks, no API calls.
*   Strictly renders HTML/Tailwind.

**Smart (`src/features/anime/components/AnimeList.component.tsx`)**
*   Uses `useSearchParams`.
*   Uses `useAnimeList` (The custom hook).
*   Passes data down to `AnimeGrid.ui`.
*   Handles the `handlePageChange` logic (pushing to Router).

### The Blocking Element (Requirement 7)

**`src/features/auth/components/AuthGate.component.tsx`**
```tsx
'use client';
import { useAuth } from '../auth.context';
import { OnboardingForm } from './OnboardingForm.ui';

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user.username || !user.jobTitle) {
    return (
        <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
            <OnboardingForm />
        </div>
    );
  }

  return (
    <>
      <header className="p-4 border-b">
        Welcome, {user.username} ({user.jobTitle})
        {/* Edit button logic here */}
      </header>
      {children}
    </>
  );
};
```

## 4. Grading Checklist (Self-Review)

Before submitting, verify:
1.  [ ] **Blocking:** Can I see the list *before* entering a name? (Should be NO).
2.  [ ] **Persistence:** If I refresh, do I stay logged in? (Should be YES).
3.  [ ] **GraphQL:** Are images displayed? Is data fetched via Apollo?
4.  [ ] **Pagination:** Does changing the page change the URL? (`?page=2`). If I reload on `?page=2`, does it load page 2 data?
5.  [ ] **Structure:** Did I respect the `*.ui`, `*.component` naming?
6.  [ ] **Git:** Are commit messages clean? (`feat:`, `chore:`)