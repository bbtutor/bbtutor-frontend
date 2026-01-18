interface ParagraphProps {
  text: string;
  center?: boolean;
}

export default function Paragraph({ text, center }: ParagraphProps) {
  return (
    <p
      className={
        center
          ? "text-center mt-4 sm:mt-6 text-black leading-7.5 text-base sm:text-lg lg:text-xl"
          : "mt-4 sm:mt-6 text-black leading-7.5 text-base sm:text-lg lg:text-xl"
      }
    >
      {text}
    </p>
  );
}
