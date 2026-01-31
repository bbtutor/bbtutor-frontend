"use client";
import { Button } from "../ui/button";

function ClickToBuyNow() {
  return (
    <div className="text-center mt-4 mb-10">
      <Button
        onClick={() => {
          const scrollDistance =
            window.innerWidth < 768
              ? 1700
              : window.innerWidth < 1024
                ? 1500
                : 1300;
          window.scrollTo({
            top: window.scrollY + scrollDistance,
            behavior: "smooth",
          });
        }}
        className="text-white"
      >
        Buy Lesson Now
      </Button>
    </div>
  );
}

export default ClickToBuyNow;
