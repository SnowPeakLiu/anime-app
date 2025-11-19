export interface AnimeTitle {
  romaji: string | null;
  english: string | null;
  native: string | null;
}

export interface AnimeCoverImage {
  large: string | null;
  color: string | null;
}

export interface AnimeMedia {
  id: number;
  title: AnimeTitle;
  description: string | null;
  coverImage: AnimeCoverImage;
}

export interface AnimePageInfo {
  total: number | null;
  currentPage: number;
  lastPage: number | null;
  perPage: number | null;
  hasNextPage: boolean | null;
}

export interface AnimeListResponse {
  Page: {
    pageInfo: AnimePageInfo;
    media: AnimeMedia[];
  };
}

export interface AnimeListVars {
  page: number;
  perPage: number;
}


