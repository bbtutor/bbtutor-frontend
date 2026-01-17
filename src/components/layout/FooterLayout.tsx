import Image from "next/image";

import Link from "next/link";

/**
 * base container class for footer
 * max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16
 */

function FooterLayout() {
  return (
    <footer className="h-100.25 border-t-2 border-primary max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <section className="mt-12.5 flex flex-col sm:flex-row items-start justify-between gap-8 sm:gap-0">
        <div className="flex flex-col items-center sm:items-start">
          <Image
            src="/img/logo.png"
            alt="BBTutor Logo"
            width={75}
            height={74}
          />
        </div>

        <div className="w-full sm:w-auto text-center sm:text-left">
          <h3 className="text-primary">Quick Links</h3>
          <ul className="mt-7.5 flex flex-col gap-2 text-black text-sm">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/courses"
              className="hover:text-primary transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/book-tutor"
              className="hover:text-primary transition-colors"
            >
              Book a Tutor
            </Link>
          </ul>
        </div>

        <div className="w-full sm:w-auto text-center sm:text-left">
          <h3 className="text-primary">Socials</h3>
          <ul className="mt-7.5 flex flex-col gap-2 text-black text-sm">
            <Link
              href="https://maps.google.com/?q=Murtala+Mohammad+Highway,+Calabar,+CRS"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Address: Murtala Mohammad Highway, Calabar, CRS
            </Link>
            <Link
              href="mailto:bbtutors001@gmail.com"
              className="hover:text-primary transition-colors"
            >
              Email: bbtutors001@gmail.com
            </Link>
            <Link
              href="https://wa.me/2348064982027"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              WhatsApp: 08064982027
            </Link>
            <h3 className="text-primary mt-4">Follow Us</h3>
            <Link
              href="https://facebook.com/BBTutors"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Facebook: BB Tutors
            </Link>
            <Link
              href="https://instagram.com/bb_tutors"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Instagram: @bb_tutors
            </Link>
            <Link
              href="https://twitter.com/BB_tutors"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Twitter: @BB_tutors
            </Link>
          </ul>
        </div>
      </section>

      <p className="mt-12.5 text-xs text-center leading-5 text-black">
        © 2026 BB Tutors. All rights reserved.
      </p>
    </footer>
  );
}

export default FooterLayout;
