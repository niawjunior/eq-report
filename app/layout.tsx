import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Earthquake Damage Report",
  description: "Earthquake Damage Report",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${prompt.variable} antialiased`}>
        <Navbar /> {/* ← Add this */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
