import MathematicsVideoLesson from "@/components/videoLesson/MathematicsVideoLesson";
import NeedHelp from "@/components/videoLesson/NeedHelp";
import RealResultVideo from "@/components/videoLesson/RealResultVideo";
import VideoHero from "@/components/videoLesson/VideoHero";

function Page() {
  // ToDO: Add social media pop up

  return (
    <section>
      <VideoHero />
      <MathematicsVideoLesson />
      <RealResultVideo />
      <NeedHelp />
    </section>
  );
}

export default Page;
