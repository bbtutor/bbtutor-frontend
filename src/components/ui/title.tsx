interface TitleProps {
  text: string;
  center?: boolean;
}

function Title({ text, center }: TitleProps) {
  return (
    <h2
      className={
        center
          ? "text-center font-semibold text-3xl sm:text-4xl lg:text-5xl leading-[100%] -tracking-[4%] text-black"
          : "font-semibold text-3xl sm:text-4xl lg:text-5xl leading-[100%] -tracking-[4%] text-black"
      }
    >
      {text}
    </h2>
  );
}

export default Title;
