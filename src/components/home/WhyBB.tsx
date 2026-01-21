import Image from "next/image";

const WhyBB = () => {
  const reasons = [
    {
      icon: "/img/clock.svg",
      alt: "clock icon",
      text: "Tailored mathematics lessons designed specifically for your learning style and pace.",
    },
    {
      icon: "/img/hierarchy.svg",
      alt: "hierarchy icon",
      text: "Over 11 years of teaching experience with proven results and student success.",
    },
    {
      icon: "/img/3 stars.svg",
      alt: "3 stars",
      text: "Individual attention to ensure you master every mathematical concept thoroughly.",
    },
  ];

  const displayReasons = reasons.map((reason, index) => {
    return (
      <div
        key={index}
        className="flex gap-2 sm:gap-4 p-4 sm:p-8  flex-col items-center justify-center border-[0.5px] sm:border-[0.5px] border-primary rounded-lg sm:rounded-[10px]"
      >
        <Image
          src={reason.icon}
          alt={reason.alt}
          width={48}
          height={48}
          className="sm:w-12 sm:h-12"
        />
        <p className="text-black text-center text-sm leading-5 max-w-xs">
          {reason.text}
        </p>
      </div>
    );
  });
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 sm:py-20">
      <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-[100%] -tracking-[4%] text-center text-black">
        Why Choose BB Tutors?
      </h2>

      <p className="mt-4 sm:mt-6 text-center text-black leading-7.5 text-base sm:text-lg lg:text-xl">
        Comprehensive mathematics tutoring from Primary 1 through Senior
        Secondary 3. We don&apos;t just help students pass—we help them excel
        with understanding, practice, and exam readiness.
      </p>

      <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6">
        {displayReasons}
      </div>
    </section>
  );
};

export default WhyBB;
