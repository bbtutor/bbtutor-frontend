"use client";
import Title from "../ui/title";
import Paragraph from "../ui/paragraph";
import axios from "axios";
import useSWR from "swr";
import Loader from "../ui/loader";
import ErrorMessage from "../ui/errorMessage";

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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function MathematicsVideoLesson() {
  const { data, error, isLoading } = useSWR<Lesson[]>(
    `${process.env.NEXT_PUBLIC_BASEURL}/lesson/get-lessons`,
    fetcher,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  console.log(data);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <Title text="Mathematics Video Lessons" center />
      <Paragraph
        text="Comprehensive mathematics tutoring from Primary 1 through Senior Secondary 3, with specialized preparation for WAEC, NECO, and IGCSE examinations."
        center
      />
    </section>
  );
}

export default MathematicsVideoLesson;
