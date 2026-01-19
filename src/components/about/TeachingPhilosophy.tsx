import NoBoxList from "../ui/noBoxList";
import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function TeachingPhilosophy() {
  const content = [
    {
      icon: "/img/redIcon.png",
      title: "Understanding First",
      text: "Focus on building strong conceptual foundations before moving to complex topics.",
    },
    {
      icon: "/img/yellowIcon.png",
      title: "Passionate Teaching",
      text: "Genuine enthusiasm for mathematics education and student success drives everything we do.",
    },
    {
      icon: "/img/blueIcon.png",
      title: "Continous Practice",
      text: "Regular exercises and problem-solving to reinforce learning and build confidence.",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20 gradient-bg">
      <Title text="Teaching Philosophy" center />
      <Paragraph
        text="Core principles that guide every tutoring session"
        center
      />

      <NoBoxList contents={content} />
    </section>
  );
}

export default TeachingPhilosophy;
