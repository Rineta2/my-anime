import { NextResponse } from "next/server";

import axios from "axios";
interface ServerResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    url: string;
  };
  pagination: null;
}

const createErrorResponse = (statusCode: number, message: string) => {
  return NextResponse.json(
    {
      statusCode,
      statusMessage: "Error",
      message,
      ok: false,
      error: {
        title: "Server Tidak Ditemukan",
        description:
          "Mohon maaf, server yang Anda cari tidak tersedia saat ini",
        suggestion: "Silakan coba server lain atau coba lagi nanti",
      },
      data: null,
      pagination: null,
    },
    { status: statusCode }
  );
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const apiKey = request.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return createErrorResponse(
        401,
        "Akses tidak diizinkan - API key tidak valid"
      );
    }

    const { serverId } = await params;
    const { data } = await axios.get<ServerResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/samehadaku/server/${serverId}`,
      {
        timeout: 1000,
        validateStatus: (status) => status < 500,
        headers: {
          Accept: "application/json",
          "Cache-Control": "public, max-age=300",
        },
      }
    );

    if (!data?.data?.url) {
      return createErrorResponse(404, "Server tidak tersedia");
    }

    return NextResponse.json({
      statusCode: 200,
      statusMessage: "OK",
      message: "Berhasil mendapatkan server",
      ok: true,
      data: {
        url: data.data.url
          .replace(/\/samehadaku\//, "/")
          .replace(/\/samehadaku$/, ""),
      },
      pagination: null,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        return createErrorResponse(408, "Waktu permintaan server habis");
      }

      const status = error.response?.status;
      if (status === 404)
        return createErrorResponse(404, "Server tidak ditemukan");
      if (status === 403) return createErrorResponse(403, "Akses ditolak");
    }

    return createErrorResponse(500, "Gagal mengambil data server");
  }
}
