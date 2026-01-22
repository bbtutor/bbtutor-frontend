"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function NeedHelp() {
  const router = useRouter();

  const handleBookLesson = () => {
    router.push("/book_a_lesson");
  };
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-16 sm:py-20 bg-primary relative overflow-hidden">
      <div className="absolute bottom-0 left-0 z-10">
        {/* Left side shape */}
        <Image
          src="/img/plentyEllipse.png"
          alt="ellipse shapes for aesthetics improvement"
          height={120}
          width={120}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40"
        />
      </div>
      <div className="absolute bottom-0 right-0 z-10">
        {/* right side shape */}
        <Image
          src="/img/halfEllipse.png"
          alt="ellipse shapes for aesthetics improvement"
          height={100}
          width={100}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36"
        />
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center min-h-50 sm:min-h-62.5">
        {/* Content */}
        <h2 className="text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[100%] -tracking-[4%] text-white">
          Need Help? Our Customer Care is Here!
        </h2>
        <p className="text-center mt-3 sm:mt-4 md:mt-6 text-white leading-6 sm:leading-7 text-sm sm:text-base md:text-lg lg:text-xl max-w-5xl">
          Have questions about our courses, pricing, or scheduling? Our
          dedicated customer care team is ready to assist you anytime.
        </p>

        <div className="mt-6 sm:mt-8">
          <Button onClick={handleBookLesson} className="bg-yellow text-primary">
            Contact us now
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NeedHelp;
