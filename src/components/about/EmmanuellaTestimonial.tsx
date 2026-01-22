import { Quote } from "lucide-react";
import Image from "next/image";

function EmmanuellaTestimonial() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20 gradient-bg">
      <Image
        src="/img/EmmanuellaLatern.png"
        alt="Testimonial Box"
        width={870}
        height={412}
        className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
      />

      <div className="w-full bg-white rounded-[5px] border-[#E2E8F0] border shadow px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-8 sm:pb-10 md:pb-12 lg:pb-12 xl:pb-12 pt-16 sm:pt-20 md:pt-24 lg:pt-24 xl:pt-24">
        <Quote className="text-[#D0AA12] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" />

        <div className="text-blue-gray-900 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg leading-5 sm:leading-6 md:leading-6.75 lg:leading-6.75 xl:leading-6.75 font-semibold mt-4 sm:mt-5 md:mt-5 lg:mt-5 xl:mt-5 pb-16 sm:pb-20 md:pb-24 lg:pb-24 xl:pb-24 flex flex-col gap-2">
          <span>
            {" "}
            I am writing to delineate my sincere appreciation to you for the
            quality JAMB lesson I received two years ago.
          </span>
          <span className="indent-4 sm:indent-5 block">
            I benefited greatly from the dedication, patience and effective
            teaching methods of you and your teachers.The lessons were well
            organised and easy to understand, which helped me improve my
            knowledge and confidence in my jamb subjects.
          </span>
          <span className="indent-4 sm:indent-5 block">
            {" "}
            I am truly obliged for the guidance, encouragement, and support I
            received throughout the program.The experience has contributed
            positively to my academic progress , and I will always remember the
            impact your brand (BB tutors) made on my education.
          </span>
          <span className="indent-4 sm:indent-5 block">
            I would really like to recommend BB tutors to all those who aspire
            to have an excellent result in their utme examinations,it would be a
            fantastic decision cos I promise you won&apos;t regret it.
          </span>
        </div>

        <p className="text-sm sm:text-base md:text-base lg:text-base xl:text-base tracking-[0.5px] font-medium text-primary">
          Emmanuella
        </p>
      </div>
    </section>
  );
}

export default EmmanuellaTestimonial;
