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
  description:
    "Report and view earthquake damage across Thailand in real-time.",
  keywords: [
    "earthquake",
    "damage report",
    "Thailand",
    "disaster response",
    "emergency",
  ],
  authors: [{ name: "Your Name", url: "https://www.facebook.com/pasupol.b" }],
  creator: "Your Name",
  openGraph: {
    title: "Earthquake Damage Report",
    description:
      "Help communities by reporting earthquake damage and view real-time updates.",
    url: "https://eq-report.vercel.app",
    siteName: "EQ Report",
    images: [
      {
        url: "https://eq-report.vercel.app/preview.png", // <-- upload a good preview image
        width: 1200,
        height: 630,
        alt: "Earthquake Damage Report",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earthquake Damage Report",
    description: "Real-time earthquake damage reports across Thailand.",
    creator: "@yourhandle", // optional
    images: ["https://eq-report.vercel.app/preview.png"],
  },
  metadataBase: new URL("https://eq-report.vercel.app"), // Your domain
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
