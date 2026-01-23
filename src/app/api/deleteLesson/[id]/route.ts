import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/AxiosServerInstance";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
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

    const { id } = params; // Gets from /api/deleteLesson/123

    // ✅ Pass cookie to backend
    const response = await axiosServer.delete(`/lesson/delete-lesson/${id}`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lesson deleted successfully",
        data: response.data,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error deleting lesson:", error);

    // ✅ Handle axios errors properly
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
            "Failed to delete lesson",
          success: false,
        },
        { status: axiosError.response.status },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to delete lesson. Please try again.",
        success: false,
      },
      { status: 500 },
    );
  }
}
