import Achievement from "@/components/about/Achievement";
import Banner from "@/components/about/Banner";
import EmmanuellaTestimonial from "@/components/about/EmmanuellaTestimonial";
import FlexibleLearning from "@/components/about/FlexibleLearning";
import TeachingPhilosophy from "@/components/about/TeachingPhilosophy";

function About() {
  return (
    <section>
      <Banner />
      <Achievement />
      <TeachingPhilosophy />
      <FlexibleLearning />
      <EmmanuellaTestimonial />
    </section>
  );
}

export default About;
