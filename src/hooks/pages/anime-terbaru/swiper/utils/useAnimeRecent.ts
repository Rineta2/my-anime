import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import { ApiResponse } from "@/hooks/pages/types/AnimeTerbaru";

export function useAnimeRecent() {
  return useQuery<ApiResponse>({
    queryKey: ["anime-recent", 1],
    queryFn: async () => {
      const baseUrl = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "");
      const apiUrl = `${baseUrl}/api/anime/recent`;

      const response = await axios.get<ApiResponse>(apiUrl, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        params: {
          page: 1,
        },
      });

      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
