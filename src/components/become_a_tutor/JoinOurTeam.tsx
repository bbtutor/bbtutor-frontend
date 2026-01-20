import BoxList from "../ui/boxList";
import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function JoinOurTeam() {
  const contents = [
    {
      icon: "/img/clock.svg",
      text: "Earn competitive rates for your expertise and dedication to student success",
    },
    {
      icon: "/img/hierarchy.svg",
      text: "Set your own hours and work around your personal commitments",
    },
    {
      icon: "/img/3 stars.svg",
      text: "Join a supportive network of passionate educators and tutors",
    },
    {
      icon: "/img/clock.svg",
      text: "Develop your teaching skills and build your educational portfolio",
    },
    {
      icon: "/img/hierarchy.svg",
      text: "Transform students' lives and help them achieve academic excellence",
    },
    {
      icon: "/img/3 stars.svg",
      text: "Access teaching materials, training, and ongoing professional support",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <Title text="Benefits of Joining Our Team" center />

      <Paragraph
        text="We value our tutors and provide an environment where you can thrive professionally and personally"
        center
      />

      <div>
        <BoxList contents={contents} />
      </div>
    </section>
  );
}

export default JoinOurTeam;
