import Hero from "@/components/home/Hero";
import Laurel from "@/components/home/Laurel";
import WhyBB from "@/components/home/WhyBB";
import RealResult from "@/components/home/RealResult";
import HowItWork from "@/components/home/HowItWork";
import Faq from "@/components/home/Faq";
import TeachingMethod from "@/components/home/TeachingMethod";
import ReadyTo from "@/components/home/ReadyTo";

function Home() {
  return (
    <section>
      <Hero />
      <Laurel />
      <WhyBB />
      <RealResult />
      <HowItWork />
      <Faq />
      <TeachingMethod />
      <ReadyTo />
    </section>
  );
}

export default Home;
