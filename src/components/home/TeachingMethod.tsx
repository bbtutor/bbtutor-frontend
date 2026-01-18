import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function TeachingMethod() {
  const teachingMethod = [
    {
      title: "Understanding",
      description:
        "Building strong foundational knowledge through clear explanations and concept mastery",
    },
    {
      title: "Practice",
      description:
        "Extensive problem-solving exercises to reinforce learning and build confidence",
    },
    {
      title: "Exam Readiness",
      description:
        "Strategic preparation for WAEC, NECO, IGCSE, and other standardized exams",
    },
  ];

  const displayTeachingMethod = teachingMethod.map((method, index) => {
    return (
      <div
        key={index}
        className="border-[0.5px] border-primary pt-4 sm:pt-5 px-3 sm:px-3.5 pb-8 sm:pb-10 rounded-[10px] flex flex-col gap-3 sm:gap-4 text-[rgba(0,0,0,1)]"
      >
        <h2 className="font-medium text-2xl sm:text-2xl md:text-3xl leading-[119%] tracking-[0.5px]">
          {method.title}
        </h2>
        <p className="leading-5 text-sm sm:text-sm md:text-sm">
          {method.description}
        </p>
      </div>
    );
  });
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <Title text="Our Teaching Methodology" center />
      <Paragraph
        text="We focus on understanding, practice, and exam readiness ensuring students not only pass but excel."
        center
      />

      <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-9">
        {displayTeachingMethod}
      </div>
    </section>
  );
}

export default TeachingMethod;
