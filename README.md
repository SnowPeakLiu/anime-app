# Anime GraphQL Challenge

This project is a Next.js App Router application that displays anime information from the AniList GraphQL API.  
It is designed to demonstrate clean architecture, a clear Smart/Dumb component split, and a centralized GraphQL definition strategy.

## Tech Stack

- Next.js (App Router, TypeScript)
- React
- Tailwind CSS
- Apollo Client & GraphQL
- shadcn/ui (for core UI components and forms)

## Folder Structure

All feature logic and GraphQL operations are organized for clarity and reusability:

```text
src/
├── app/
│   ├── layout.tsx           # Global layout (Fonts, Metadata, Providers)
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
│   ├── queries/             # .ts files with gql tag (queries)
│   ├── mutations/           # Mutations (structure in place for future use)
│   └── fragments/           # Reusable data fragments
├── hooks/
│   └── useAnimeList.ts      # Typed custom hook accessing GraphQL
└── lib/
    └── utils.ts
```

## Smart vs. Dumb Components

The project follows a strict Smart/Dumb component separation, reinforced by file naming:

- `*.component.tsx` **(Smart components)**  
  - Contain application logic, state management, data fetching, and routing.
  - Example: `AnimeList.component.tsx`
    - Uses `useSearchParams` to read pagination from the URL.
    - Calls the `useAnimeList` hook to fetch data from GraphQL.
    - Handles page changes (updates the URL) and selected item state for the detail modal.

- `*.ui.tsx` **(Dumb components)**  
  - Purely presentational components.
  - Receive all data and callbacks via props.
  - Contain no side effects, no GraphQL, no routing logic.
  - Examples:
    - `AnimeGrid.ui.tsx`: renders a grid of anime cards.
    - `Pagination.ui.tsx`: renders pagination controls.
    - `DetailModal.ui.tsx`: displays details in a dialog.
    - `OnboardingForm.ui.tsx`: renders the auth form UI.

This pattern keeps business logic testable and localized, while ensuring UI components remain reusable and easy to reason about.

## Centralized GraphQL Definition Structure

All GraphQL operations are defined in a single, centralized module tree under `src/graphql/`:

- `src/graphql/queries/` – Query definitions (e.g. `getAnime.query.ts`).
- `src/graphql/mutations/` – Mutation definitions (currently scaffolded).
- `src/graphql/fragments/` – Reusable fragments (e.g. `media.fragment.ts`).

**Key rules:**

- Every GraphQL operation (the `gql` template literal) is defined and exported from a file inside `src/graphql/`.
- React components, pages, and hooks **must not** define `gql` operations inline.
- Instead, components and hooks import pre-defined operations from `src/graphql`, for example:
  - `useAnimeList` imports `GET_ANIME_LIST` from `src/graphql/queries/getAnime.query.ts`.

This guarantees a single source of truth for GraphQL documents and keeps UI code free from query definitions.

## Git Commit Conventions (Conventional Commits)

Commits should follow a short, Conventional Commit–style prefix.  
Use concise, descriptive messages, for example:

- `feat: add anime list pagination`
- `feat: implement onboarding auth gate`
- `chore: setup shadcn ui components`
- `chore: configure apollo client`
- `fix: handle empty anime list state`
- `docs: update readme with folder structure`
- `refactor: extract auth context into feature folder`

Keeping commit messages consistent improves the review process and makes the history easy to scan.

## Development

Basic workflow:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open the app at `http://localhost:3000`:
   - You will first see a **blocking onboarding modal**.
   - Enter a **username** and **job title** and click **Continue**. This stores a `user_session` cookie and unlocks the Anime Information Page.
4. Explore the Information Page:
   - Use the pagination controls to move between pages (the `?page=` URL query param updates).
   - Click any anime card to open a modal with more details.
5. To re-test the onboarding flow, clear the `user_session` cookie in your browser devtools and refresh the page.


