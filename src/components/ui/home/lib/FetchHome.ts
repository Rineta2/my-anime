import { AnimeResponse } from "@/components/ui/home/types/home";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

export async function fetchAnimeData(): Promise<AnimeResponse["data"]> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime`, {
      cache: "no-store", // 🔥 agar tidak cache
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data: AnimeResponse = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    throw error;
  }
}

export async function FetchBannerData(): Promise<AnimeResponse["data"]> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime`, {
      cache: "no-store", // 🔥 agar tidak cache
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    throw error;
  }
}
