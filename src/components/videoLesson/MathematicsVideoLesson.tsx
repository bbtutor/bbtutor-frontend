"use client";
import Title from "../ui/title";
import Paragraph from "../ui/paragraph";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import Loader from "../ui/loader";
import ErrorMessage from "../ui/errorMessage";
import getEmbedUrl from "@/hooks/getEmbedUrl";
import BuyLessonPopUp from "./BuyLessonPopUp";

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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function MathematicsVideoLesson() {
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 6; // Show 6 lessons per page (2 rows of 3 on desktop)

  const {
    data: response,
    error,
    isLoading,
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

        <div>
          <h3 className="text-lg text-bassey-nuetral-900 font-semibold">
            {lesson.title}
          </h3>
          <p className="text-sm mt-0.5 text-bassey-black-500">
            {lesson.description}
          </p>
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
