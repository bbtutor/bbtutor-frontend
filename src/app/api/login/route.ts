import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/AxiosServerInstance";
import { setAuthCookie } from "@/lib/authCookiesHelper";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
          success: false,
        },
        { status: 400 },
      );
    }

    // Call backend login endpoint
    const response = await axiosServer.post("/auth/login", {
      email,
      password,
    });

    // Extract access token and user data from backend response
    const { accessToken, user } = response.data;

    if (!accessToken) {
      console.log("❌ NO ACCESS TOKEN IN RESPONSE!");
      return NextResponse.json(
        { error: "Login failed - no token received", success: false },
        { status: 500 },
      );
    }

    console.log("About to set cookie with token length:", accessToken.length);

    // Set httpOnly cookie with access token
    await setAuthCookie(accessToken);

    console.log("✅ Cookie set");

    return NextResponse.json(
      {
        user,
        success: true,
        message: "Login successful",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Login error:", error);

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
          error: axiosError.response.data?.message || "Login failed",
          success: false,
          user: null,
        },
        { status: axiosError.response.status },
      );
    }

    // Handle network errors or other failures
    return NextResponse.json(
      { error: "Login failed. Please try again.", success: false, user: null },
      { status: 500 },
    );
  }
}
