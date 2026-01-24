import axiosServer from "@/lib/AxiosServerInstance";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // ✅ Read access token from cookies
    const accessToken = req.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "Authentication required. Please login.",
          success: false,
        },
        { status: 401 },
      );
    }

    const { id } = await params;

    console.log("Received ID in API route:", id);
    console.log("ID type:", typeof id);

    // ✅ Get the request body (the data to update)
    const body = await req.json();

    // ✅ CORRECT: axiosServer.patch(url, data, config)
    const response = await axiosServer.patch(
      `/lesson/update-lesson/${id}`,
      body, // ← The data to send to backend
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );

    return NextResponse.json(
      {
        success: true,
        message: "Lesson updated successfully",
        data: response.data,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error updating lesson:", error);

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response: {
          data?: { message?: string; error?: string };
          status: number;
        };
      };

      return NextResponse.json(
        {
          error:
            axiosError.response.data?.message ||
            axiosError.response.data?.error ||
            "Failed to update lesson",
          success: false,
        },
        { status: axiosError.response.status },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to update lesson. Please try again.",
        success: false,
      },
      { status: 500 },
    );
  }
}
