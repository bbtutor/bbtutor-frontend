"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import HeaderLink from "./HeaderLinks";

function HeaderLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 z-40 h-16 sm:h-20 lg:h-24 flex items-center justify-between bg-white"
    >
      <Image
        alt="Logo image"
        src={"/img/logosvg.svg"}
        height={60}
        width={60}
        className="h-12 w-12 sm:h-14 sm:w-14 lg:h-20 lg:w-20"
      />

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`sm:hidden flex flex-col justify-center items-center w-8 h-8 transition-opacity duration-300 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-Black-fonts-headings transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-Black-fonts-headings my-1 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-Black-fonts-headings transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
        ></span>
      </button>

      {/* Desktop navigation */}
      <nav className="hidden sm:block w-full max-w-xs sm:max-w-sm md:max-w-xl xl:max-w-2xl">
        <ul className="flex justify-between gap-1 sm:gap-2 md:gap-3 lg:gap-5 items-center">
          <HeaderLink href="/">Home</HeaderLink>
          <HeaderLink href="/about">About us</HeaderLink>
          <HeaderLink href="/contact">Video Lesson</HeaderLink>
          <HeaderLink href="/contact">Book a Lesson</HeaderLink>
          <HeaderLink href="/contact">Become a Tutor</HeaderLink>
        </ul>
      </nav>

      {/* Mobile navigation */}
      {/* TODO: Move the logo to the center of the mobile nav */}
      {isMenuOpen && (
        <nav className="sm:hidden fixed top-0 left-0 h-screen w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
          <div className="p-4 pt-20">
            <div className="mb-8">
              <Image
                alt="Logo image"
                src={"/img/logosvg.svg"}
                height={60}
                width={60}
                className="h-16 w-16"
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-Black-fonts-headings hover:text-primary"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="flex flex-col gap-6">
              <HeaderLink href="/">Home</HeaderLink>
              <HeaderLink href="/about">About us</HeaderLink>
              <HeaderLink href="/contact">Video Lesson</HeaderLink>
              <HeaderLink href="/contact">Book a Lesson</HeaderLink>
              <HeaderLink href="/contact">Become a Tutor</HeaderLink>
            </ul>
          </div>
        </nav>
      )}

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-transparent z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default HeaderLayout;
