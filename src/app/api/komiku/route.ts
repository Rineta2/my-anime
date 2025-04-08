import { NextResponse } from "next/server";

import axios from "axios";

export async function GET(request: Request) {
  try {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API key" },
        { status: 401 }
      );
    }

    // Get the page parameter from the URL if it exists
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const tag = searchParams.get("tag") || "hot";

    const { data } = await axios.get(
      `https://weeb-scraper.onrender.com/api/komiku?page=${page}&tag=${tag}`
    );

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error fetching komiku data:", error);
    return NextResponse.json(
      { error: "Failed to fetch komiku data" },
      { status: 500 }
    );
  }
}
