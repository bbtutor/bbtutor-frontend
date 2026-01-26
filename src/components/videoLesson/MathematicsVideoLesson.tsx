"use client";
import Title from "../ui/title";
import Paragraph from "../ui/paragraph";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Loader from "../ui/loader";
import ErrorMessage from "../ui/errorMessage";
import getEmbedUrl from "@/hooks/getEmbedUrl";
import BuyLessonPopUp from "./BuyLessonPopUp";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useUserStore } from "@/store/useUserStore";
import axiosClient from "@/lib/AxiosClientInstance";
import { Settings, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import UpdateLesson from "./UpdateLesson";

// TypeScript interfaces for type safety
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

// SWR fetcher function - fetches data from Next.js API route
const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

function MathematicsVideoLesson() {
  // Get user from store to check admin role
  const user = useUserStore((state) => state.user);

  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    lesson: Lesson | null;
  }>({ isOpen: false, lesson: null });

  // State for update lesson popup
  const [updateDialog, setUpdateDialog] = useState<{
    isOpen: boolean;
    lesson: Lesson | null;
  }>({ isOpen: false, lesson: null });

  // Add click outside handler to close all dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close all dropdowns when clicking outside
      const dropdowns = document.querySelectorAll('[id^="dropdown-"]');
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target as Node)) {
          dropdown.classList.add("hidden");
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 6; // Show 6 lessons per page (2 rows of 3 on desktop)

  // Fetch lessons using SWR with pagination
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<ApiResponse>(
    `/getVideoLessons?page=${currentPage}&limit=${lessonsPerPage}`,
    fetcher,
    {
      revalidateOnFocus: false, // Don't refetch on window focus
      revalidateOnReconnect: false, // Don't refetch on reconnect
      dedupingInterval: 5_000, // Dedupe requests within 5 seconds
    },
  );

  // Show loader while fetching initial data
  if (isLoading) {
    return <Loader />;
  }

  // Show error message if fetch fails
  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Extract lessons and pagination data from response
  const lessons = response?.data || [];
  const pagination = response?.pagination;

  // Confirm delete function (outside map)
  const confirmDelete = async () => {
    if (!deleteDialog.lesson) return;

    try {
      await axiosClient.delete(`/deleteLesson/${deleteDialog.lesson._id}`);

      toast.success(deleteDialog.lesson.title + " deleted successfully", {
        id: "delete-lesson",
      });

      mutate();
    } catch (error: unknown) {
      console.error("Delete lesson error:", error);

      // Type guard for axios errors
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to delete lesson";
        toast.error(message, { id: "delete-lesson" });

        if (error.response?.status === 401) {
          toast.error("Please login to continue");
        }
      } else {
        toast.error("Failed to delete lesson. Please try again.", {
          id: "delete-lesson",
        });
      }
    }
  };

  // Map through lessons and create display cards
  const displayLessons = lessons.map((lesson) => {
    /**
     * Delete lesson handler (Admin only)
     * Calls backend API to delete lesson and refreshes the list
     */
    const handleDelete = async (data: Lesson) => {
      // Open custom confirmation dialog
      setDeleteDialog({ isOpen: true, lesson: data });
    };
    return (
      <div
        key={lesson._id}
        className="border border-primary rounded-2xl pt-3 px-3 flex flex-col gap-4"
      >
        {/* YouTube Video Embed */}
        <div className="relative w-full pb-[56.25%] bg-black rounded-xl overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getEmbedUrl(lesson.mediaUrl)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Lesson Title, Description, and Admin Actions */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg text-bassey-nuetral-900 font-semibold">
              {lesson.title}
            </h3>
            <p className="text-sm mt-0.5 text-bassey-black-500">
              {lesson.description}
            </p>
          </div>

          {/* Admin Controls - Settings Dropdown */}
          {/* Only show for admin users */}
          {user?.role === "admin" && (
            <div className="relative">
              <button
                onClick={() => {
                  // Toggle dropdown visibility for this specific lesson
                  const dropdownId = `dropdown-${lesson._id}`;
                  const dropdown = document.getElementById(dropdownId);
                  if (dropdown) {
                    dropdown.classList.toggle("hidden");
                  }
                }}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                aria-label="Lesson settings"
              >
                <Settings className="h-4 w-4 text-gray-600" />
              </button>

              {/* Dropdown Menu with Update and Delete options */}
              <div
                id={`dropdown-${lesson._id}`}
                className="hidden absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10"
              >
                <div className="py-1">
                  {/* Update Button */}
                  <button
                    onClick={() => {
                      // Open update popup
                      setUpdateDialog({ isOpen: true, lesson });
                      // Close dropdown after action
                      document
                        .getElementById(`dropdown-${lesson._id}`)
                        ?.classList.add("hidden");
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <Edit className="h-3 w-3 mr-2" />
                    Update
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      handleDelete(lesson);
                      // Close dropdown after action
                      document
                        .getElementById(`dropdown-${lesson._id}`)
                        ?.classList.add("hidden");
                    }}
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

        {/* Lesson Tag and Topics Info */}
        <div className="flex items-center justify-between text-xs leading-4.5 text-[#9C9898]">
          <p className="font-bold">{lesson.tag}</p>
          <p>All topics covered</p>
        </div>

        {/* Lesson Fee Display */}
        <div className="rounded-md flex items-center justify-between py-1.75 px-4 bg-[#CCE0F0]">
          <p className="text-xs font-light">Lesson Fee</p>
          <p className="bg-[#D0AA12] text-primary rounded-xl py-1.5 px-3 font-bold">
            ₦{lesson.price.toLocaleString()}
          </p>
        </div>

        {/* Topics Covered Section Header */}
        <div>
          <p className="text-bassey-nuetral-900 text-[13px]">Topics Covered:</p>
        </div>

        {/* Topics Covered List */}
        <ul className="flex flex-wrap gap-3">
          {lesson.lessonsCovered.map((topic) => (
            <li
              className="py-0.5 px-2 bg-[#F4F2F2] rounded-2xl font-light text-[10px]"
              key={topic}
            >
              {topic}
            </li>
          ))}
        </ul>

        {/* Buy Lesson Button/Popup */}
        <BuyLessonPopUp
          lessonTitle={lesson.title}
          paymentLink={lesson.paymentLink}
        />
      </div>
    );
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      {/* Section Header */}
      <Title text="Mathematics Video Lessons" center />
      <Paragraph
        text="Comprehensive mathematics tutoring from Primary 1 through Senior Secondary 3, with specialized preparation for WAEC, NECO, and IGCSE examinations."
        center
      />

      {/* Lessons Grid - Responsive layout */}
      <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-20">
        {displayLessons}
      </div>

      {/* Pagination Controls - Only show if more than 1 page */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            {/* Previous Page Button */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Page Number Buttons */}
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

            {/* Next Page Button */}
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

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, lesson: null })}
        onConfirm={confirmDelete}
        lessonTitle={deleteDialog.lesson?.title || ""}
        isLoading={false}
      />

      {/* Update Lesson Popup */}
      {updateDialog.isOpen && updateDialog.lesson && (
        <UpdateLesson
          lesson={updateDialog.lesson}
          onClose={() => setUpdateDialog({ isOpen: false, lesson: null })}
          onUpdateSuccess={() => {
            // Refresh the lessons list after successful update
            mutate();
          }}
        />
      )}
    </section>
  );
}

export default MathematicsVideoLesson;
