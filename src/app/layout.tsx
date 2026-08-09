import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Billennium Divas Fund - Empowering Women Entrepreneurs",
  description: "A venture capital fund empowering women entrepreneurs in India. We combine capital, mentorship, and network access to help women-led startups scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AOSInit />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
