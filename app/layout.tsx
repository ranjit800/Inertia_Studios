// app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist } from "next/font/google"; // We only need Geist Sans
import "./globals.css";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

// Default font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Your manual font
const neueMontreal = localFont({
  src: "../public/fonts/PPNeueMontreal-Medium.woff2",
  display: "swap",
  variable: "--font-neue-montreal",
});

export const metadata = {
  title: "Inertia Clone",
  description: "Frontend Developer Assignment",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${neueMontreal.variable} antialiased`}>
        <LenisProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}