import Image from "next/image";
import Title from "../ui/title";
import Paragraph from "../ui/paragraph";

function Banner() {
  const qualifications = [
    "Bachelor's Degree in Mathematics/Statistics",
    "Featured on Branama TV for Quality Educational Content",
    "Hundreds of Students Improved Their Grades",
    "Over 11 Years of Teaching Experience",
    "Specialized in Primary to Senior Secondary Mathematics",
    "Expert in WAEC, NECO & IGCSE Preparation",
  ];

  const displayQualifications = qualifications.map((qualification, index) => (
    <li className="pl-2 text-sm sm:text-base lg:text-lg" key={index}>
      {qualification}
    </li>
  ));
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 min-h-231.5 gradient-bg flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20 py-8 lg:py-8">
      {/* Bassey Image */}
      <aside className="basis-full lg:basis-[40%] mt-0 lg:mt-0 flex justify-center">
        <Image
          alt="Image of BB Tutors C.E.O Mr. Bassey"
          src={"/img/Bassey.png"}
          width={500}
          height={450}
          className="w-full max-w-md lg:max-w-none h-auto"
        />
      </aside>

      <aside className="basis-full lg:basis-[55%] text-left lg:text-left">
        <div className="relative text-black">
          <Title text="About BB Tutors" />

          <p className="mt-4 sm:mt-6 text-black leading-7.5 text-base sm:text-lg lg:text-xl font-medium">
            Meet our Ceo Mr. Bassey Bassey Ekpenyong -{" "}
            <span className="text-primary">
              A passionate educator dedicated to mathematics excellence.
            </span>
          </p>

          <Paragraph text="As a passionate educator and business owner with over 11 years of experience, I have dedicated my career to teaching mathematics to students from primary to senior secondary levels. My mission is simple: help students not just pass their exams, but truly excel." />

          <Paragraph text="I believe that every student can master mathematics with the right approach. My teaching methodology focuses on three key pillars: understanding, practice, and exam readiness. This ensures students build solid foundations and develop the confidence needed to tackle any mathematical challenge." />

          <div className="mt-4 sm:mt-6 bg-white py-5 px-4 gap-2.5 flex flex-col rounded-lg border-[0.5px] border-[#000000]">
            <p className="font-semibold text-base sm:text-lg lg:text-xl">
              Qualifications & Experience
            </p>
            <ul className="list-decimal list-inside space-y-1 sm:space-y-2">
              {displayQualifications}
            </ul>
          </div>
        </div>
      </aside>
    </section>
  );
}

export default Banner;
