import Image from "next/image";

interface BoxContents {
  icon?: string;
  title?: string;
  text: string;
}

function NoBoxList({ contents }: { contents: BoxContents[] }) {
  const displayContents = contents.map((content, index) => {
    return (
      <div className="flex flex-col items-center justify-center" key={index}>
        {content.icon && (
          <Image
            src={content.icon}
            alt={"Image of " + content.title}
            width={64}
            height={64}
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
          />
        )}

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
    <div className="pt-12 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
      {displayContents}
    </div>
  );
}

export default NoBoxList;
