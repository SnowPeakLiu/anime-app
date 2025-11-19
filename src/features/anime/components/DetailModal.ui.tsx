"use client";

import type { AnimeMedia } from "@/graphql/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

type DetailModalProps = {
  item: AnimeMedia | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DetailModal({ item, open, onOpenChange }: DetailModalProps) {
  if (!item) return null;

  const title =
    item.title.english || item.title.romaji || item.title.native || "Untitled";

  const plainDescription = item.description
    ? item.description.replace(/<\/?[^>]+(>|$)/g, "")
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {plainDescription && (
            <DialogDescription className="line-clamp-4">
              {plainDescription}
            </DialogDescription>
          )}
        </DialogHeader>
        <Card className="border-0 shadow-none p-0">
          <CardContent className="flex flex-col items-start gap-4 px-0">
            {item.coverImage?.large && (
              <img
                src={item.coverImage.large}
                alt={title}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-md object-cover"
              />
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}


