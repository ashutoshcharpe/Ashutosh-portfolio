import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import CameraCursor from "@/components/CameraCursor";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "PORTFOLIO | Video Editor & Visual Storyteller",
  description:
    "I transform ideas into visual stories through editing, motion and creativity. Explore my work, film rolls, software skills, and experience.",
  keywords: [
    "Ashutosh Charpe",
    "Video Editor",
    "Motion Designer",
    "Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "CapCut",
    "Cinematic Editing",
  ],
  authors: [{ name: "Ashutosh Charpe" }],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.variable} ${outfit.variable} antialiased min-h-screen relative selection:bg-indigo-500/20 selection:text-indigo-900`}
      >
        {/* Custom DSLR Camera Focus Cursor & Audio Feedback */}
        <CameraCursor />
        {children}
      </body>
    </html>
  );
}
