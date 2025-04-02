import axios from "axios";

import { AnimeResponse } from "@/components/ui/home/types/home";

export function getAnimeData(): Promise<AnimeResponse> {
  return axios
    .get<AnimeResponse>(`${process.env.NEXT_PUBLIC_URL}/api/anime`, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    })
    .then((response) => response.data);
}
