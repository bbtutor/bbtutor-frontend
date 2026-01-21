import JoinSocialMedia from "@/components/videoLesson/JoinSocialMedia";
import MathematicsVideoLesson from "@/components/videoLesson/MathematicsVideoLesson";
import NeedHelp from "@/components/videoLesson/NeedHelp";
import RealResultVideo from "@/components/videoLesson/RealResultVideo";
import VideoHero from "@/components/videoLesson/VideoHero";

function Page() {
  // ToDO: Add social media pop up

  return (
    <section>
      <VideoHero />
      <div className="z-50 fixed bottom-20 right-5">
        <JoinSocialMedia />
      </div>
      <MathematicsVideoLesson />
      <RealResultVideo />
      <NeedHelp />
    </section>
  );
}

export default Page;
