import ClickToBuyNow from "@/components/videoLesson/ClickToBuyNow";
import JoinSocialMedia from "@/components/videoLesson/JoinSocialMedia";
import MathematicsVideoLesson from "@/components/videoLesson/MathematicsVideoLesson";
import NeedHelp from "@/components/videoLesson/NeedHelp";
import RealResultVideo from "@/components/videoLesson/RealResultVideo";
import VideoHero from "@/components/videoLesson/VideoHero";

function Page() {
  return (
    <section>
      <ClickToBuyNow />
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
