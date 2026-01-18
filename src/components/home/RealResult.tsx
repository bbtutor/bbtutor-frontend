import Image from "next/image";
import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function RealResult() {
  const results = [
    {
      icon: "/img/3 stars.svg",
      desc: "I benefited greatly from the dedication, patience and effective teaching methods of you and your teachers.The lessons were well organised and easy to understand, which helped me improve my knowledge and confidence in my jamb subjects. I am truly obliged for the guidance, encouragement, and support I received throughout the program.The experience has contributed positively to my academic progress , and I will always remember the impact your brand  (BB tutors) made on my education.",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 gradient-bg py-20 relative">
      <div className="w-[70%]">
        {/* Title and Paragraph */}
        <Title text="Real Results from Real Students" />

        <Paragraph text="See how our students transformed their mathematics journey and achieved remarkable results." />
      </div>

      <div className="absolute top-3 right-3">
        {/* Images */}
        <Image
          src={"/img/Ellipse 2.png"}
          alt="Ellipse 2"
          width={200}
          height={200}
        />
      </div>

      <div className="px-6 py-5 rounded-[100px] border-2 border-primary shadow-[0px_0px_2px_0px_rgba(0,0,0,0.07),0px_1px_3px_0px_rgba(0,0,0,0.1)] w-50 bg-white absolute right-24 top-24">
        {/* Absolute box */}
      </div>

      <div></div>
    </section>
  );
}

export default RealResult;
