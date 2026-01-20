"use client";
import Image from "next/image";
import Paragraph from "../ui/paragraph";
import Title from "../ui/title";
import { useRef, useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

function RealResultVideo() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const results = [
    "/img/rr1.png",
    "/img/rr2.png",
    "/img/rr3.png",
    "/img/rr4.png",
    "/img/rr5.png",
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const displayResults = results.map((result, index) => {
    return (
      <div
        className="shrink-0 w-80 p-6 rounded-[10px]  flex flex-col justify-center"
        key={index}
      >
        <Image src={result} alt="Testimonies Image" width={500} height={575} />
      </div>
    );
  });
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 gradient-bg py-20 relative">
      <div className="w-full lg:w-[70%]">
        {/* Title and Paragraph */}
        <Title text="Real Results from Real Students" />
        <Paragraph text="See how our students transformed their mathematics journey and achieved remarkable results." />
      </div>

      <div className="absolute top-3 right-3 hidden lg:block">
        {/* Images */}
        <Image
          src={"/img/Ellipse 2.png"}
          alt="Ellipse 2"
          width={200}
          height={200}
        />
      </div>

      <div className="px-6 py-5 rounded-[100px] border-2 border-primary w-50 bg-white absolute right-24 top-24 hidden lg:block">
        {/* Absolute box */}
      </div>

      {/* Scrollable Container */}
      <div className="relative mt-14">
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
          onScroll={checkScrollPosition}
        >
          {displayResults}
        </div>

        {/* Navigation Buttons */}
        <div className="flex mt-8 gap-4 lg:gap-6">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="cursor-pointer"
          >
            <ArrowLeftCircle className="h-12 w-12" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="cursor-pointer"
          >
            <ArrowRightCircle className="h-12 w-12" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default RealResultVideo;
