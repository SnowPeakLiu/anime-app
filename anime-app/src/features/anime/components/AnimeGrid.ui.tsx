"use client";

import type { AnimeMedia } from "@/graphql/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type AnimeGridProps = {
  items: AnimeMedia[];
  onItemClick?: (item: AnimeMedia) => void;
};

export function AnimeGrid({ items, onItemClick }: AnimeGridProps) {
  if (!items.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No anime found for this page.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((media) => {
        const title =
          media.title.english ||
          media.title.romaji ||
          media.title.native ||
          "Untitled";

        const handleClick = () => {
          if (onItemClick) {
            onItemClick(media);
          }
        };

        return (
          <button
            key={media.id}
            type="button"
            onClick={handleClick}
            className="text-left"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="line-clamp-2">{title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {media.coverImage?.large && (
                  // Using a plain img tag avoids extra Next image config for this challenge.
                  <img
                    src={media.coverImage.large}
                    alt={title}
                    loading="lazy"
                    className="aspect-[3/4] w-full rounded-md object-cover"
                  />
                )}
                {media.description && (
                  <CardDescription className="line-clamp-3 text-xs">
                    {media.description.replace(/<\/?[^>]+(>|$)/g, "")}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
}


