import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/AxiosServerInstance";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Call a backend endpoint that returns current user info
    // Ask your backend dev what endpoint returns current user
    // It might be /api/auth/me or /api/user/profile
    const response = await axiosServer.get("/auth/current-user", {
      // ❓ Ask backend dev for this endpoint
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    return NextResponse.json({
      user: response.data,
      isAdmin: response.data.user?.role === "admin",
    });
  } catch (error) {
    console.error("Check user error:", error);
    return NextResponse.json(
      { error: "Failed to get user info" },
      { status: 500 },
    );
  }
}
