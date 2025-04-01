import { EpisodeData } from "@/hooks/pages/types/samehadaku";

export async function getEpisodeData(slug: string): Promise<EpisodeData> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/episode/${slug}`,
      {
        headers: {
          "x-api-key": apiKey,
        },
        next: { revalidate: 3600 },
      }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}
