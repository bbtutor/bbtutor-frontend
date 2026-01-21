import Achievement from "@/components/about/Achievement";
import Banner from "@/components/about/Banner";
import EmmanuellaTestimonial from "@/components/about/EmmanuellaTestimonial";
import FlexibleLearning from "@/components/about/FlexibleLearning";
import TeachingPhilosophy from "@/components/about/TeachingPhilosophy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Bb Tutors",
  description: "Learn more about Bb Tutors",
};

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
