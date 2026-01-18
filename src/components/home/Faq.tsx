"use client";
import { useState } from "react";
import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    {
      question: "Who are the lessons for?",
      answer:
        "Lessons are for primary, junior secondary, and senior secondary students. They are suitable for beginners who need strong foundations and for students who want to improve their understanding, confidence, and exam performance.",
    },
    {
      question: "What subject is available?",
      answer: "Mathematics",
    },
    {
      question: "How are the lessons delivered?",
      answer:
        "Lessons are delivered through well structured video lessons. Students can learn at their own pace, pause, replay, and practice along with the lessons.",
    },
    {
      question: "Are the lessons aligned with the school curriculum?",
      answer:
        "Yes. All lessons are aligned with the Nigerian and international curricula used in schools. This helps students perform better in school tests, exams, and assessments.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayFaq = questions.map((item, index) => {
    const isOpen = openIndex === index;
    return (
      <div
        className="shadow-lg p-4 sm:p-6 md:p-8 bg-white rounded-[10px] relative text-black transition-all duration-300 hover:scale-105 cursor-pointer"
        key={index}
        onClick={() => toggleFaq(index)}
      >
        <button
          className="w-full font-semibold text-base sm:text-lg leading-6.75 flex justify-between items-center text-left pointer-events-none"
          aria-expanded={isOpen}
        >
          <span className="pr-4">{item.question}</span>
          <span className="text-2xl transition-all duration-300 shrink-0">
            {isOpen ? "−" : "+"}
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 mt-2 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-sm sm:text-base leading-6">{item.answer}</p>
        </div>
      </div>
    );
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 gradient-bg py-12 sm:py-16 md:py-20">
      <Title text="Frequently asked questions" center />
      <Paragraph
        text="Get answers to common questions about our tutoring services."
        center
      />

      <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col gap-4 sm:gap-5 md:gap-6">
        {displayFaq}
      </div>
    </section>
  );
}

export default Faq;
