import Image from "next/image";

function Laurel() {
  // Animate item.description to read up in 3 seconds
  const laurel = [
    {
      icon: "/img/heart.svg",
      alt: "Heart Icon",
      title: "11+",
      description: "Years Experience",
    },
    {
      icon: "/img/diamond.svg",
      alt: "Diamond Icon",
      title: "100+",
      description: "Students Taught",
    },
    {
      icon: "/img/graduate.svg",
      alt: "Graduate Icon",
      title: "Primary-SS",
      description: "All Levels",
    },
  ];

  const displayLaurel = laurel.map((item, index) => (
    <div className="flex flex-col items-center gap-3 sm:gap-4" key={index}>
      <Image
        src={item.icon}
        alt={item.alt}
        width={48}
        height={48}
        className="sm:w-12 sm:h-12"
      />
      <h2 className="font-semibold text-3xl sm:text-4xl leading-tight sm:leading-[100%] -tracking-[4%] text-white">
        {item.title}
      </h2>
      <p className="text-white text-sm sm:text-base leading-6 sm:leading-7.5">
        {item.description}
      </p>
    </div>
  ));

  return (
    <section className="bg-primary py-7 sm:py-8 min-h-79.5 grid grid-cols-1 sm:grid-cols-3 place-items-center gap-y-8 sm:gap-y-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      {displayLaurel}
    </section>
  );
}

export default Laurel;
