import axios from "axios";

import { AnimeResponse } from "@/components/ui/home/types/home";

export async function getAnimeData(): Promise<AnimeResponse> {
  const response = await axios.get<AnimeResponse>(
    "http://localhost:3000/api/anime",
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
  return response.data;
}
