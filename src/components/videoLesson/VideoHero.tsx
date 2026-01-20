import Image from "next/image";
import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function VideoHero() {
  const content = [
    {
      icon: "/img/blueHierarchy.png",
      title: "Results-Driven",
      text: "Proven track record of improving student grades by an average of 85%",
    },
    {
      icon: "/img/thumbsup.png",
      title: "Interactive Learning",
      text: "Engaging sessions that make mathematics fun and easy to understand",
    },
    {
      icon: "/img/upload.png",
      title: "Expert Tutor",
      text: "11+ years of experience with hundreds of successful students",
    },
    {
      icon: "/img/squareMesh.png",
      title: "Comprehensive Support",
      text: "Study materials, homework help, and continuous guidance",
    },
  ];

  const displayContents = content.map((content, index) => {
    return (
      <div className="flex flex-col items-center justify-center" key={index}>
        <Image
          src={content.icon}
          alt={"Image of " + content.title}
          width={64}
          height={64}
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
        />

        <h3 className="my-4 font-semibold leading-7.5 text-xl lg:text-xl text-blue-gray-900 text-center ">
          {content.title}
        </h3>
        <p className="text-center text-blue-gray-900 text-sm leading-5 max-w-xs">
          {content.text}
        </p>
      </div>
    );
  });
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20 gradient-bg">
      <Title text="Why Our Video Lessons Stand Out" center />
      <Paragraph
        text="Experience mathematics education that truly works"
        center
      />

      <div className="pt-12 lg:py-20 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-18 lg:gap-24">
        {displayContents}
      </div>
    </section>
  );
}

export default VideoHero;
