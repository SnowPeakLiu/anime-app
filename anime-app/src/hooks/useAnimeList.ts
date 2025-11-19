import { useQuery } from "@apollo/client/react";
import { GET_ANIME_LIST } from "@/graphql/queries/getAnime.query";
import type { AnimeListResponse, AnimeListVars } from "@/graphql/types";

export const useAnimeList = (page: number) => {
  const { data, loading, error } = useQuery<AnimeListResponse, AnimeListVars>(
    GET_ANIME_LIST,
    {
      variables: { page, perPage: 10 },
      notifyOnNetworkStatusChange: true,
    },
  );

  return { data, loading, error };
};


