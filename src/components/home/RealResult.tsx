"use client";
import Image from "next/image";
import Paragraph from "../ui/paragraph";
import Title from "../ui/title";
import { useRef, useState } from "react";

function RealResult() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const results = [
    {
      icon: "/img/3 stars.svg",
      desc: "I benefited greatly from the dedication, patience and effective teaching methods of you and your teachers.The lessons were well organised and easy to understand, which helped me improve my knowledge and confidence in my jamb subjects. I am truly obliged for the guidance, encouragement, and support I received throughout the program.The experience has contributed positively to my academic progress , and I will always remember the impact your brand  (BB tutors) made on my education.",
      name: "Emmanuella",
      status: "Jamb student",
      image: "/img/Emmanuella.png",
    },
    {
      icon: "/img/3 stars.svg",
      desc: "My name is David, and I want to sincerely appreciate BB tutor. I was struggling with mathematics while in senior secondary class, but after classes with BB tutor to prepare for that term exam, everything changed. They were professional, reliable, and ready to deliver and  tutor you from where you find it difficult in your study, because of them, I was able to scale through and began to love mathematics again. I highly recommend BB tutor to everyone looking or finding it difficult in mathematics ,they are the best and very understanding",
      name: "David",
      status: "Senior Secondary Student",
      image: "/img/David.png",
    },
    {
      icon: "/img/3 stars.svg",
      desc: "Chairo was always intelligent but he used to Miss little marks here and there but now he always have full marks.He is permanently top in his class.He gets math wiz every other day… Thank you for teaching him consistently.",
      name: "Mrs. Mfon",
      status: "Parent",
      image: "/img/human icon.png",
    },
    {
      icon: "/img/3 stars.svg",
      desc: "Thanks to Mr. Bassey's thorough preparation, I scored 100% in my final mathematics exam. His teaching methods are exceptional and easy to understand!",
      name: "Tunde E",
      status: "Jss3 student",
      image: "/img/human icon.png",
    },
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
        className="shrink-0 w-80 p-6 rounded-[10px] border border-blue-gray bg-white flex flex-col justify-center"
        key={index}
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <Image src={result.icon} alt="3 stars" width={64} height={64} />
        <p className="my-4 text-sm leading-5">{result.desc}</p>

        <div className="flex items-center gap-4">
          <Image
            className="my-8"
            src={result.image}
            alt={result.name}
            width={64}
            height={64}
          />

          <aside className="text-black">
            <p className="text-lg leading-[160%]">{result.name}</p>
            <p className=" text-primary text-xs leading-4">{result.status}</p>
          </aside>
        </div>
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

      <div className="px-6 py-5 rounded-[100px] border-2 border-primary shadow-[0px_0px_2px_0px_rgba(0,0,0,0.07),0px_1px_3px_0px_rgba(0,0,0,0.1)] w-50 bg-white absolute right-24 top-24 hidden lg:block">
        {/* Absolute box */}
      </div>

      {/* Scrollable Container */}
      <div className="relative mt-14">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
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
          >
            <Image
              src={"/img/moveleft.png"}
              alt="Move left"
              width={40}
              height={40}
              className="lg:w-12 lg:h-12"
            />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <Image
              src={"/img/moveright.png"}
              alt="Move right"
              width={40}
              height={40}
              className="lg:w-12 lg:h-12"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default RealResult;
