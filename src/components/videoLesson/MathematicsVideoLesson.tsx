"use client";
import Title from "../ui/title";
import Paragraph from "../ui/paragraph";
import useSWR from "swr";
import { useState } from "react";
import Loader from "../ui/loader";
import ErrorMessage from "../ui/errorMessage";
import getEmbedUrl from "@/hooks/getEmbedUrl";
import BuyLessonPopUp from "./BuyLessonPopUp";
import api from "@/lib/AxiosInstance";
import { Settings, Edit, Trash2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

interface Instructor {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Lesson {
  _id: string;
  title: string;
  description: string;
  tag: string;
  price: number;
  mediaUrl: string;
  paymentLink: string;
  instructor: Instructor;
  lessonsCovered: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  data: Lesson[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

function MathematicsVideoLesson() {
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 6; // Show 6 lessons per page (2 rows of 3 on desktop)
  const user = useUserStore((state) => state.user);

  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<ApiResponse>(
    `${process.env.NEXT_PUBLIC_BASEURL}/lesson/get-lessons?page=${currentPage}&limit=${lessonsPerPage}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5_000, // 5 seconds
    },
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const lessons = response?.data || [];
  const pagination = response?.pagination;

  const displayLessons = lessons.map((lesson) => {
    const handleDelete = async (data: Lesson) => {
      try {
        await api.delete(
          `${process.env.NEXT_PUBLIC_BASEURL}/lesson/delete-lesson/${data._id}`,
        );

        toast.success(data.title + " deleted successfully");

        // ✅ Revalidate SWR cache to refetch data
        mutate();
      } catch (error) {
        toast.error("Failed to delete lesson");
        console.log(error);
      }
    };
    return (
      <div
        key={lesson._id}
        className="border border-primary rounded-2xl pt-3 px-3 flex flex-col gap-4"
      >
        {/* YouTube Video */}
        <div className="relative w-full pb-[56.25%] bg-black rounded-xl overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getEmbedUrl(lesson.mediaUrl)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg text-bassey-nuetral-900 font-semibold">
              {lesson.title}
            </h3>
            <p className="text-sm mt-0.5 text-bassey-black-500">
              {lesson.description}
            </p>
          </div>

          {/* Gear Icon with Dropdown */}
          {user?.role === "admin" && (
            <div className="relative">
              <button
                onClick={() => {
                  // Toggle dropdown for this specific lesson
                  const dropdownId = `dropdown-${lesson._id}`;
                  const dropdown = document.getElementById(dropdownId);
                  if (dropdown) {
                    dropdown.classList.toggle("hidden");
                  }
                }}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
              >
                <Settings className="h-4 w-4 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              <div
                id={`dropdown-${lesson._id}`}
                className="hidden absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10"
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      // Handle update
                      console.log("Update lesson:", lesson._id);
                      // Close dropdown
                      document
                        .getElementById(`dropdown-${lesson._id}`)
                        ?.classList.add("hidden");
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <Edit className="h-3 w-3 mr-2" />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(lesson)}
                    className="flex items-center cursor-pointer w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs leading-4.5 text-[#9C9898]">
          <p className="font-bold">{lesson.tag}</p>
          <p>All topics covered</p>
        </div>

        <div className="rounded-md flex items-center justify-between py-1.75 px-4 bg-[#CCE0F0]">
          <p className="text-xs font-light">Lesson Fee</p>
          <p className="bg-[#D0AA12] text-primary rounded-xl py-1.5 px-3 font-bold">
            {lesson.price}
          </p>
        </div>

        <div>
          <p className="text-bassey-nuetral-900 text-[13px] ">
            Topics Covered:
          </p>
        </div>

        <ul className="flex flex-wrap gap-3">
          {lesson.lessonsCovered.map((lesson) => (
            <li
              className="py-0.5 px-2 bg-[#F4F2F2] rounded-2xl font-light text-[10px]"
              key={lesson}
            >
              {lesson}
            </li>
          ))}
        </ul>

        <BuyLessonPopUp
          lessonTitle={lesson.title}
          paymentLink={lesson.paymentLink}
        />
      </div>
    );
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <Title text="Mathematics Video Lessons" center />
      <Paragraph
        text="Comprehensive mathematics tutoring from Primary 1 through Senior Secondary 3, with specialized preparation for WAEC, NECO, and IGCSE examinations."
        center
      />

      <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-20">
        {displayLessons}
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from(
                { length: pagination.totalPages },
                (_, index) => index + 1,
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? "bg-primary text-white"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default MathematicsVideoLesson;
