"use client";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function JoinSocialMedia() {
  const [showSocialButtons, setShowSocialButtons] = useState(false);
  return (
    <section className="z-50">
      <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
        {showSocialButtons && (
          <button
            onClick={() =>
              window.open(
                "https://chat.whatsapp.com/BlaqO3WNrvI2XBa8yvwW4R",
                "_blank",
              )
            }
            className="rounded-4xl border border-primary p-2 sm:p-3 lg:p-4 flex gap-1.5 sm:gap-2 lg:gap-3 items-center justify-center w-full max-w-70 sm:max-w-[320px] bg-white"
          >
            <Image
              src={"/img/whatsapp Message circle.png"}
              alt="Whatsapp icon"
              width={20}
              height={20}
              className="sm:w-6 sm:h-6 lg:w-8 lg:h-8"
            />
            <span className="text-xs sm:text-sm lg:text-lg font-semibold">
              Whatsapp
            </span>
          </button>
        )}

        {showSocialButtons && (
          <button
            onClick={() => window.open("https://t.me/bbtutors", "_blank")}
            className="rounded-4xl border border-primary p-2 sm:p-3 lg:p-4 flex gap-1.5 sm:gap-2 lg:gap-3 items-center justify-center w-full max-w-70 sm:max-w-[320px] bg-white"
          >
            <Image
              src={"/img/Variant2.svg"}
              alt="Telegram icon"
              width={20}
              height={20}
              className="sm:w-6 sm:h-6 lg:w-8 lg:h-8"
            />
            <span className="text-xs sm:text-sm lg:text-lg font-semibold">
              Telegram
            </span>
          </button>
        )}

        {/* Big button below telegram icon*/}
        <button
          onClick={() => setShowSocialButtons(!showSocialButtons)}
          className="gradient-btn rounded-[20.55px] p-4 sm:p-6 lg:p-10 flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-4 relative w-full max-w-75 sm:max-w-87.5"
        >
          <aside className="flex flex-col gap-0.5 sm:gap-1">
            <Image
              src={"/img/whatsappBtnIcon.png"}
              alt="Whatsapp icon"
              width={20}
              height={20}
              className="sm:w-6 sm:h-6 lg:w-8 lg:h-8"
            />

            <Image
              src={"/img/paperPlane.png"}
              alt="Whatsapp icon"
              width={20}
              height={20}
              className="sm:w-6 sm:h-6 lg:w-8 lg:h-8"
            />
          </aside>

          <aside>
            <p className="font-bold text-white leading-6">
              <span className="text-sm sm:text-base lg:text-xl block">
                JOIN OUR FREE{" "}
              </span>
              <span className="block text-xs sm:text-sm lg:text-base">
                Learning groups!
              </span>
              <span className="block text-[8px] sm:text-[10px] lg:text-[11px] font-normal">
                WhatsApp & Telegram
              </span>
            </p>
          </aside>

          <aside className="text-white text-xl sm:text-2xl lg:text-4xl semi-bold">
            +
          </aside>

          <CircleAlert className="absolute -top-2 animate-pulse right-0 z-50 bg-red-500 text-white rounded-full" />
        </button>
      </div>
    </section>
  );
}

export default JoinSocialMedia;
