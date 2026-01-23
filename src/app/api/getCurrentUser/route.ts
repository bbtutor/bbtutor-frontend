import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/AxiosServerInstance";

export async function GET(req: NextRequest) {
  try {
    // Fetch current user from backend
    // Auth token is automatically added by axiosServer interceptor from cookies
    console.log(req);
    const response = await axiosServer.get("/auth/current-user");

    // Return user data from backend
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching current user:", error);

    // Handle axios errors with backend response
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response: {
          data?: { message?: string };
          status: number;
        };
      };

      return NextResponse.json(
        {
          error:
            axiosError.response.data?.message || "Failed to fetch current user",
          success: false,
          user: null,
        },
        { status: axiosError.response.status },
      );
    }

    // Handle network errors or other failures
    return NextResponse.json(
      { error: "Failed to fetch current user", success: false, user: null },
      { status: 500 },
    );
  }
}
