import FormBook from "./FormBook";
import InfoBox from "./InfoBox";

const BookLessonForm = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <aside>
          <FormBook />
        </aside>
        <aside className="">
          <InfoBox />
        </aside>
      </div>
    </section>
  );
};

export default BookLessonForm;
