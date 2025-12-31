import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jukas - The Card Game",
  description:
    "A fast-paced, memory-driven elimination game of risk, deduction, and sabotage. Stay under 100 points to survive!",
  keywords: [
    "card game",
    "memory game",
    "party game",
    "strategy game",
    "elimination game",
  ],
  authors: [{ name: "Jukas" }],
  openGraph: {
    title: "Jukas - The Card Game",
    description:
      "A fast-paced, memory-driven elimination game. Stay under 100 points to survive!",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
