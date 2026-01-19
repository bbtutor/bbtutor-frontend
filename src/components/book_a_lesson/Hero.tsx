import Title from "../ui/title";
import Paragraph from "../ui/paragraph";

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <Title text="Book a Lesson" center />
      <Paragraph
        text="Choose your preferred way to get in touch. Fill out the form below or connect instantly via WhatsApp."
        center
      />

      <div className="mt-20 flex items-center justify-center gap-16">
        <aside></aside>
        <aside></aside>
      </div>
    </section>
  );
}

export default Hero;
