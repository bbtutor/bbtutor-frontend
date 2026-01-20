"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import HeaderLink from "./HeaderLinks";

function HeaderLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 z-40 h-16 sm:h-20 lg:h-24 flex items-center justify-between bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}
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
          <HeaderLink href="/video_lesson">Video Lesson</HeaderLink>
          <HeaderLink href="/book_a_lesson">Book a Lesson</HeaderLink>
          <HeaderLink href="/become_a_tutor">Become a Tutor</HeaderLink>
        </ul>
      </nav>

      {/* Mobile navigation with glassmorphism */}
      <nav
        className={`sm:hidden fixed top-0 right-0 h-screen w-72 z-50 transform transition-all duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="p-6 pt-20 h-full flex flex-col">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-Black-fonts-headings hover:opacity-70 transition-opacity duration-200"
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

          <ul className="flex flex-col gap-2 mt-4">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About us" },
              { href: "/video_lesson", label: "Video Lesson" },
              { href: "/book_a_lesson", label: "Book a Lesson" },
              { href: "/become_a_tutor", label: "Become a Tutor" },
            ].map((link, index) => (
              <li
                key={link.href}
                className={`transform transition-all duration-500 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <div onClick={handleLinkClick}>
                  <HeaderLink href={link.href}>
                    <span className="block py-3 px-4 rounded-lg hover:bg-white/40 transition-all duration-200">
                      {link.label}
                    </span>
                  </HeaderLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay with smooth fade */}
      <div
        className={`sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
}

export default HeaderLayout;
