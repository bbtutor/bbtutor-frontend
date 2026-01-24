import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/AxiosServerInstance";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "6";

    const response = await axiosServer.get(
      `/lesson/get-lessons?page=${page}&limit=${limit}`,
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching video lessons:", error);

    // Type guard for axios errors
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response: { data?: { message?: string }; status: number };
      };
      return NextResponse.json(
        {
          error:
            axiosError.response.data?.message ||
            "Failed to fetch video lessons",
          success: false,
        },
        { status: axiosError.response.status },
      );
    }

    // Return generic error for network issues
    return NextResponse.json(
      { error: "Failed to fetch video lessons", success: false },
      { status: 500 },
    );
  }
}
