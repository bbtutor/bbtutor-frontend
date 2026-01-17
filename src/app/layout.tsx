import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import HeaderLayout from "@/components/layout/HeaderLayout";
import FooterLayout from "@/components/layout/FooterLayout";

const poppins = Poppins({
  // Import poppins font
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bb Tutor",
  description: "Bb Tutor online tutoring platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased min-h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full`}
      >
        <HeaderLayout />
        <main className="flex-1 w-full min-h-screen">{children}</main>
        <FooterLayout />
      </body>
    </html>
  );
}
