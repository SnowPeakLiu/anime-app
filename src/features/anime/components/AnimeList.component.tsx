"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAnimeList } from "@/hooks/useAnimeList";
import { AnimeGrid } from "./AnimeGrid.ui";
import { DetailModal } from "./DetailModal.ui";
import type { AnimeMedia } from "@/graphql/types";

export function AnimeList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page") ?? "1";
  const page = Number(pageParam) || 1;

  const { data, loading, error } = useAnimeList(page);
  const [selectedItem, setSelectedItem] = useState<AnimeMedia | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/?${params.toString()}`);
  };

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading anime list…</p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Failed to load anime data. Please try again.
      </p>
    );
  }

  const pageInfo = data?.Page.pageInfo;
  // TODO: handle cases where `page` is greater than `pageInfo.lastPage`.
  const hasNextPage = Boolean(pageInfo?.hasNextPage);
  const hasPrevPage = page > 1;

  const items: AnimeMedia[] = data?.Page.media ?? [];

  const handleItemClick = (media: AnimeMedia) => {
    setSelectedItem(media);
    setIsDetailOpen(true);
  };

  return (
    <section className="space-y-4">
      <header className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold tracking-tight">
          Anime List (page {page})
        </h2>
      </header>

      <AnimeGrid items={items} onItemClick={handleItemClick} />

      <DetailModal
        item={selectedItem}
        open={isDetailOpen}
        onOpenChange={(open) => {
          setIsDetailOpen(open);
          if (!open) {
            setSelectedItem(null);
          }
        }}
      />

      <div className="flex items-center justify-between pt-2 text-xs">
        <button
          type="button"
          disabled={!hasPrevPage}
          onClick={() => hasPrevPage && handlePageChange(page - 1)}
          className="rounded border px-2 py-1 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-muted-foreground">
          Page {pageInfo?.currentPage ?? page}
        </span>
        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => hasNextPage && handlePageChange(page + 1)}
          className="rounded border px-2 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}


