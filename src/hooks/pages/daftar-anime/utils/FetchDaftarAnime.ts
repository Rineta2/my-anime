export async function getAnimeList() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const [listResponse, recentResponse] = await Promise.all([
      fetch(`${baseUrl}/api/anime/list`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }),
      fetch(`${baseUrl}/api/anime/recent`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }),
    ]);

    if (!listResponse.ok || !recentResponse.ok) {
      throw new Error(
        `Failed to fetch anime data: ${listResponse.status} ${listResponse.statusText}`
      );
    }

    const [listData, recentData] = await Promise.all([
      listResponse.json(),
      recentResponse.json(),
    ]);

    return {
      ...listData,
      data: {
        ...listData.data,
        recent: recentData.data,
      },
    };
  } catch (error) {
    throw error;
  }
}
