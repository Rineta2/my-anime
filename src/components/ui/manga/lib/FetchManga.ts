import axios from "axios";

export interface MangaResponse {
  next_page: string | null;
  prev_page: string | null;
  data: MangaItem[];
}

export interface MangaItem {
  title: string;
  description: string;
  latest_chapter: string;
  thumbnail: string;
  param: string;
  detail_url: string;
}

export async function getMangaData(
  page: string = "1",
  tag: string = "hot",
  search?: string
): Promise<MangaResponse> {
  try {
    const apiUrl = `/api/komiku?page=${page}&tag=${tag}${
      search ? `&s=${encodeURIComponent(search)}` : ""
    }`;
    const response = await axios.get(apiUrl, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY_KOMIKU,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching manga data:", error);
    throw error;
  }
}
