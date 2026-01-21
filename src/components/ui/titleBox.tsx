interface BoxContents {
  title: string;
  text: string;
}

function TitleBox({ contents }: { contents: BoxContents[] }) {
  const displayContents = contents.map((content, index) => {
    return (
      <div
        key={index}
        className="flex gap-2 sm:gap-4 p-3 sm:p-4 lg:p-8 flex-col items-center justify-center border-[0.5px] border-primary rounded-lg sm:rounded-[10px] hover:scale-105 transition-all duration-300"
      >
        <h3 className="my-4 font-semibold leading-7.5 text-xl lg:text-xl text-blue-gray-900 text-center ">
          {content.title}
        </h3>

        <p className=" text-black text-center text-sm leading-5 max-w-xs  ">
          {content.text}
        </p>
      </div>
    );
  });
  return (
    <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-20">
      {displayContents}
    </div>
  );
}

export default TitleBox;
