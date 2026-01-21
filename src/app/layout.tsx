import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import HeaderLayout from "@/components/layout/HeaderLayout";
import FooterLayout from "@/components/layout/FooterLayout";
import { KeepAlive } from "@/hooks/useKeepAlive";

const poppins = Poppins({
  // Import poppins font
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bb Tutors",
  description: "Bb Tutors online tutoring platform",

  icons: {
    icon: "/img/logo.png",
    apple: "/img/logo.png", // For iOS devices
  },

  // Additional metadata
  keywords: ["tutoring", "online learning", "education"],
  authors: [{ name: "Favour Okpara" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

console.log(process.env.BASEURL);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased min-h-screen w-full`}>
        <KeepAlive />
        <HeaderLayout />
        <main className="min-h-screen">{children}</main>
        <FooterLayout />
      </body>
    </html>
  );
}
