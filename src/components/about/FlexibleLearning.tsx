import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function FlexibleLearning() {
  const content = [
    {
      icon: "",
      title: "Online Classes",
      text: "Convenient virtual sessions that allow you to learn from anywhere. Perfect for busy schedules and remote learning.",
    },
    {
      icon: "",
      title: "Physical Classes",
      text: 'In-person tutoring sessions available through our "Book a Tutor" page. Experience face-to-face instruction for personalized learning.',
    },
  ];

  const displayContents = content.map((content, index) => {
    return (
      <div className="flex flex-col items-center justify-center" key={index}>
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <Title text="Flexible learning Options" center />
      <Paragraph
        text="Choose the learning format that works best for you"
        center
      />

      <div className="pt-12 lg:py-20 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
        {displayContents}
      </div>
    </section>
  );
}

export default FlexibleLearning;
