import Image from "next/image";
import { Button } from "../ui/button";

function Hero() {
  // TODO: Fix he alignment of the master text and the underline image
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 min-h-[704.53px] gradient-bg flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20 py-8 lg:py-0">
      <div className="basis-full lg:basis-[55%] text-left lg:text-left">
        <div className="relative text-black">
          <p className="font-semibold text-4xl sm:text-5xl lg:text-6xl leading-tight lg:leading-18 -tracking-[5%]">
            <span className="block">Master</span>{" "}
            <span className="text-primary">Mathematics</span> with Confidence
          </p>
          {/* Master text */}
          <aside className="absolute top-10 sm:top-13 lg:top-15 left-0 lg:left-0">
            <Image
              src={"/img/master underline.png"}
              alt="Master text"
              width={150}
              height={10}
              className="w-24 sm:w-30 lg:w-35 h-auto"
            />
          </aside>
        </div>

        <p className="my-6 lg:my-10 text-base sm:text-lg lg:text-xl leading-6 lg:leading-8">
          Comprehensive mathematics tutoring from Primary 1 through Senior
          Secondary 3. We don&apos;t just help students pass, we help them excel
          with understanding, practice, and exam readiness.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 text-lg justify-start lg:justify-start">
          {/* Buttons */}
          <Button className="bg-yellow">Book a Lesson</Button>
          <Button className="" variant="outline">
            Whatsapp Us
          </Button>
        </div>
      </div>

      {/* Students image */}
      <div className="basis-full lg:basis-[40%] mt-0 lg:mt-0 flex justify-center">
        <Image
          alt="Students"
          src={"/img/heroImage.png"}
          width={500}
          height={450}
          className="w-full max-w-md lg:max-w-none h-auto"
        />
      </div>
    </section>
  );
}

export default Hero;
