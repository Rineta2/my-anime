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

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/samehadaku/schedule`
    );

    const scheduleData = response.data.data;

    const transformedData = JSON.parse(
      JSON.stringify(scheduleData),
      (key, value) => {
        if (
          key === "href" &&
          typeof value === "string" &&
          value.includes("/samehadaku/")
        ) {
          return value.replace("/samehadaku/", "/");
        }
        return value;
      }
    );

    return NextResponse.json({
      statusCode: 200,
      statusMessage: "OK",
      message: "",
      ok: true,
      data: transformedData,
      pagination: null,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error:
            error.response?.data?.error ||
            "Failed to fetch anime schedule data",
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch anime schedule data" },
      { status: 500 }
    );
  }
}
