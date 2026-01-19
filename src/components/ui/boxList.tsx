import Image from "next/image";

interface BoxContents {
  icon?: string;
  text: string;
}

function BoxList({ contents }: { contents: BoxContents[] }) {
  const displayContents = contents.map((content, index) => {
    return (
      <div
        key={index}
        className="flex gap-2 sm:gap-4 p-3 sm:p-4 lg:p-8 flex-col items-center justify-center border-[0.5px] border-primary rounded-lg sm:rounded-[10px]"
      >
        {content.icon && (
          <Image
            src={content.icon}
            alt={"Icon of " + content.text}
            width={48}
            height={48}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
          />
        )}
        <p className="text-center text-black leading-5 text-xs sm:text-sm lg:text-base sm:leading-6">
          {content.text}
        </p>
      </div>
    );
  });
  return (
    <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
      {displayContents}
    </div>
  );
}

export default BoxList;
