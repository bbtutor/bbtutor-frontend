import Image from "next/image";
import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function HowItWork() {
  const procedure = [
    {
      icon: "/img/pin.png",
      alt: "pin icon",
      title: "Contact Us",
      description:
        "Reach out via WhatsApp or our booking form to discuss your needs and schedule.",
    },
    {
      icon: "/img/analysis.png",
      alt: "analysis icon",
      title: "Assessment",
      description:
        "We evaluate your current level and create a personalized learning plan tailored to you.",
    },
    {
      icon: "/img/timer.png",
      alt: "timer icon",
      title: "Start Learning",
      description:
        "Begin your sessions with engaging lessons focused on understanding and mastery.",
    },
    {
      icon: "/img/brokenWheel.png",
      alt: "Broken Wheel icon",
      title: "Excel & Succeed",
      description:
        "Watch your grades improve and confidence soar as you master mathematics",
    },
  ];

  const displayProcedure = procedure.map((procedure, index) => {
    return (
      <div className="flex flex-col items-center justify-center" key={index}>
        <Image
          src={procedure.icon}
          alt={procedure.alt}
          width={64}
          height={64}
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
        />

        <h3 className="my-4 font-semibold leading-7.5 text-xl lg:text-xl text-blue-gray-900 text-center ">
          {procedure.title}
        </h3>
        <p className="text-center text-blue-gray-900 text-sm leading-5 max-w-xs">
          {procedure.description}
        </p>
      </div>
    );
  });
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <Title text="How It Works" center />
      <Paragraph
        text="Getting started with BB Tutors is easy! Follow these simple steps to begin your mathematics excellence journey"
        center
      />
      <div className="pt-12 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
        {displayProcedure}
      </div>

      <div className="w-full mt-12 lg:mt-16">
        <Image
          src={"/img/howItwork.png"}
          alt="how it work"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}

export default HowItWork;
