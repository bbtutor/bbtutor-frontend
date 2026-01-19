import BoxList from "../ui/boxList";
import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function Achievement() {
  const contents = [
    {
      text: "Successfully helped hundreds of students improve their grades and confidence in mathematics",
    },
    {
      text: "Featured on Branama TV for delivering quality educational content",
    },
    {
      text: "Proven track record with WAEC, NECO, and IGCSE exam preparation",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <Title text="Notable Achievements" center />
      <Paragraph
        text="A proven track record of student success and educational excellence"
        center
      />

      <BoxList contents={contents} />
    </section>
  );
}

export default Achievement;
