import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function TeachingPhilosophy() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20 gradient-bg">
      <Title text="Teaching Philosophy" center />
      <Paragraph
        text="Core principles that guide every tutoring session"
        center
      />
    </section>
  );
}

export default TeachingPhilosophy;
