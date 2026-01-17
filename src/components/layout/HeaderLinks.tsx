"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
}

const HeaderLink = ({ href, children }: HeaderLinkProps) => {
  const pathName = usePathname();
  return (
    <Link
      href={href}
      className={`font-semibold text-xs sm:text-sm md:text-base leading-4 sm:leading-5 md:leading-6 text-Black-fonts-headings hover:text-primary transition-colors delay-200 cursor-pointer ${pathName === href ? "text-primary underline decoration-2 underline-offset-4" : ""}`}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
