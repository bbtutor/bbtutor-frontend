"use client";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// TypeScript declaration for Facebook Pixel
declare global {
  interface Window {
    fbq?: (command: string, eventName: string, parameters?: object) => void;
  }
}

function JoinSocialMedia() {
  // Floating button on the left for the social media groups
  const [showSocialButtons, setShowSocialButtons] = useState(false);
  return (
    <section className="z-50">
      <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
        {showSocialButtons && (
          <button
            onClick={() => {
              // Track WhatsApp button click with Meta Pixel
              if (typeof window !== "undefined" && window.fbq) {
                window.fbq("track", "Lead", {
                  content_name: "WhatsApp Group Join",
                  content_category: "Social Media",
                });
              }
              window.open(
                "https://chat.whatsapp.com/BlaqO3WNrvI2XBa8yvwW4R",
                "_blank",
              );
            }}
            className="rounded-4xl border border-primary p-1.5 sm:p-2 lg:p-2.5 flex gap-1 sm:gap-1.5 lg:gap-2 items-center justify-center w-full max-w-60 sm:max-w-70 lg:max-w-[320px] bg-white cursor-pointer"
          >
            <Image
              src={"/img/whatsapp Message circle.png"}
              alt="Whatsapp icon"
              width={16}
              height={16}
              className="sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            />
            <span className="text-xs sm:text-sm lg:text-lg font-semibold">
              Whatsapp
            </span>
          </button>
        )}

        {showSocialButtons && (
          <button
            onClick={() => {
              // Track Telegram button click with Meta Pixel
              if (typeof window !== "undefined" && window.fbq) {
                window.fbq("track", "Lead", {
                  content_name: "Telegram Group Join",
                  content_category: "Social Media",
                });
              }
              window.open("https://t.me/bbtutors", "_blank");
            }}
            className="rounded-4xl border border-primary p-1.5 sm:p-2 lg:p-2.5 flex gap-1 sm:gap-1.5 lg:gap-2 items-center justify-center w-full max-w-60 sm:max-w-70 lg:max-w-[320px] bg-white cursor-pointer"
          >
            <Image
              src={"/img/Variant2.svg"}
              alt="Telegram icon"
              width={16}
              height={16}
              className="sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            />
            <span className="text-xs sm:text-sm lg:text-lg font-semibold">
              Telegram
            </span>
          </button>
        )}

        {/* Big button below telegram icon*/}
        <button
          onClick={() => setShowSocialButtons(!showSocialButtons)}
          className="gradient-btn rounded-[20.55px] p-3 sm:p-4 lg:p-5 flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2 relative w-full max-w-65 sm:max-w-75 lg:max-w-87.5 cursor-pointer"
        >
          <aside className="flex flex-col gap-0.5">
            <Image
              src={"/img/whatsappBtnIcon.png"}
              alt="Whatsapp icon"
              width={16}
              height={16}
              className="sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            />

            <Image
              src={"/img/paperPlane.png"}
              alt="Whatsapp icon"
              width={16}
              height={16}
              className="sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            />
          </aside>

          <aside>
            <p className="font-bold text-white leading-6">
              <span className="block text-xs sm:text-sm lg:text-base">
                JOIN OUR FREE{" "}
              </span>
              <span className="block text-[10px] sm:text-xs lg:text-sm">
                Learning groups!
              </span>
              <span className="block text-[7px] sm:text-[8px] lg:text-[10px] font-normal">
                WhatsApp & Telegram
              </span>
            </p>
          </aside>

          <aside className="text-white text-lg sm:text-xl lg:text-2xl semi-bold">
            +
          </aside>

          <CircleAlert className="absolute -top-2 animate-pulse right-0 z-50 bg-red-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
        </button>
      </div>
    </section>
  );
}

export default JoinSocialMedia;
