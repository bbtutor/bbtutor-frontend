"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Paragraph from "../ui/paragraph";
import Title from "../ui/title";

function BookAHeroHero() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/2348064982027", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <Title text="Book a Lesson" center />
      <Paragraph
        text="Choose your preferred way to get in touch. Fill out the form below or connect instantly via WhatsApp."
        center
      />

      <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8 lg:gap-16 text-black">
        <aside className="bg-[#E4F3FF] p-6 sm:p-8 gap-4 rounded-[10px] flex flex-col items-center flex-1 md:max-w-md justify-center">
          <div className="w-7.5 h-7.5 rounded-full flex items-center justify-center">
            <Image
              src={"/img/emailIcon.png"}
              alt="Email Icon"
              height={30}
              width={30}
            />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold leading-7.5 text-center">
            Email Form
          </h3>

          <p className="leading-5 text-sm text-center">
            Send your inquiry directly through the website form below.
            <span className="hidden sm:inline"></span>
            <span className="sm:hidden"> </span>
            I&apos;ll respond within 24 hours.
          </p>
        </aside>

        <aside className="bg-[#E7FFE3] p-6 sm:p-8 gap-4 rounded-[10px] flex flex-col items-center flex-1 md:max-w-md justify-center">
          <h3 className="text-lg sm:text-xl font-semibold leading-7.5 text-center">
            Whatsapp Integration
          </h3>
          <p className="leading-5 text-sm text-center">
            Individual attention to ensure you master every
            <span className="hidden sm:inline">
              <br />
            </span>
            <span className="sm:hidden"> </span>
            mathematical concept thoroughly.
          </p>

          <Button
            className="mt-4 bg-[#04D546] flex items-center gap-3 text-white hover:bg-[#03c03e] transition-colors"
            onClick={handleWhatsAppClick}
          >
            <div className="w-7.5 h-7.5 bg-transparent rounded-full flex items-center justify-center">
              <Image
                src={"/img/whatsappBtnIcon.png"}
                alt="WhatsApp Icon"
                height={30}
                width={30}
              />
            </div>
            <span>WhatsApp</span>
          </Button>
        </aside>
      </div>
    </section>
  );
}

export default BookAHeroHero;
