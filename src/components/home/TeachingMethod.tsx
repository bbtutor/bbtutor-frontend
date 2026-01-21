import Paragraph from "../ui/paragraph";
import Title from "../ui/title";
import TitleBox from "../ui/titleBox";

function TeachingMethod() {
  const teachingMethod = [
    {
      title: "Understanding",
      text: "Building strong foundational knowledge through clear explanations and concept mastery",
    },
    {
      title: "Practice",
      text: "Extensive problem-solving exercises to reinforce learning and build confidence",
    },
    {
      title: "Exam Readiness",
      text: "Strategic preparation for WAEC, NECO, IGCSE, and other standardized exams",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <Title text="Our Teaching Methodology" center />
      <Paragraph
        text="We focus on understanding, practice, and exam readiness ensuring students not only pass but excel."
        center
      />

      <div className="">
        <TitleBox contents={teachingMethod} />
      </div>
    </section>
  );
}

export default TeachingMethod;
