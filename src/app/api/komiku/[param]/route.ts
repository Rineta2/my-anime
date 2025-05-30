import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  context: { params: Promise<{ param: string }> }
) {
  try {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json(
        { error: "Unauthorized - API key is missing" },
        { status: 401 }
      );
    }

    if (apiKey !== process.env.NEXT_PUBLIC_API_KEY_KOMIKU) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API key" },
        { status: 401 }
      );
    }

    // Ensure params is properly awaited
    const params = await context.params;
    const { param } = params;

    const { data } = await axios.get(
      `https://weeb-scraper.onrender.com/api/komiku/${param}`
    );

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error fetching manga details:", error);
    return NextResponse.json(
      { error: "Failed to fetch manga details" },
      { status: 500 }
    );
  }
}
