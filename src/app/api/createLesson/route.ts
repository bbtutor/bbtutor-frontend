import { NextRequest, NextResponse } from "next/server";
import axiosServer from "@/lib/AxiosServerInstance";

interface CreateLessonRequest {
  title: string;
  description: string;
  price: string; // Comes as string from form, will be converted to number
  mediaUrl: string;
  paymentLink: string;
  tag: string;
  lessonsCovered: string[]; // ✅ Explicitly typed as string array
}

export async function POST(req: NextRequest) {
  try {
    // Read access token from incoming request cookies
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

    // Parse and type the request body
    const body = (await req.json()) as CreateLessonRequest;
    const {
      title,
      description,
      price,
      mediaUrl,
      paymentLink,
      tag,
      lessonsCovered,
    } = body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !price ||
      !mediaUrl ||
      !paymentLink ||
      !tag ||
      !lessonsCovered
    ) {
      return NextResponse.json(
        {
          error: "All fields are required",
          success: false,
        },
        { status: 400 },
      );
    }

    // Validate lessonsCovered is an array with at least one item
    if (!Array.isArray(lessonsCovered) || lessonsCovered.length === 0) {
      return NextResponse.json(
        {
          error: "At least one lesson topic is required",
          success: false,
        },
        { status: 400 },
      );
    }

    // Validate all items in lessonsCovered are strings
    if (!lessonsCovered.every((lesson) => typeof lesson === "string")) {
      return NextResponse.json(
        {
          error: "All lesson topics must be strings",
          success: false,
        },
        { status: 400 },
      );
    }

    // Validate array length
    if (lessonsCovered.length > 10) {
      return NextResponse.json(
        {
          error: "Maximum 10 lesson topics allowed",
          success: false,
        },
        { status: 400 },
      );
    }

    // Convert price from string to number for backend
    const lessonData = {
      title,
      description,
      price: parseFloat(price),
      mediaUrl,
      paymentLink,
      tag,
      lessonsCovered, // ✅ TypeScript knows this is string[]
    };

    // Call backend create lesson endpoint
    // Send token as cookie header (backend expects req.cookies.accessToken)
    const response = await axiosServer.post(
      "/lesson/create-lesson",
      lessonData,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );

    // Return created lesson data
    return NextResponse.json(
      {
        lesson: response.data.lesson || response.data.data,
        success: true,
        message: "Lesson created successfully",
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Create lesson error:", error);

    // Handle axios errors with backend response
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
            "Failed to create lesson",
          success: false,
          lesson: null,
        },
        { status: axiosError.response.status },
      );
    }

    // Handle network errors or other failures
    return NextResponse.json(
      {
        error: "Failed to create lesson. Please try again.",
        success: false,
        lesson: null,
      },
      { status: 500 },
    );
  }
}
