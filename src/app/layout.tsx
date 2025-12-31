import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import MobileNav from "@/components/mobile-nav";

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
  themeColor: "#0a0a0f",
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
        {/* Animated background */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl" />
          <div className="absolute top-1/3 -left-32 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-accent/8 via-accent/4 to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="sticky top-0 z-40 hidden md:block glass border-b border-border/50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-shadow">
                <span className="text-primary-foreground font-bold text-sm">
                  J
                </span>
              </div>
              <span className="font-semibold text-lg tracking-tight">
                Jukas
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/setup"
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
              >
                Setup
              </Link>
              <Link
                href="/scores"
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
              >
                Scores
              </Link>
              <Link
                href="/cards"
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
              >
                Cards
              </Link>
              <Link
                href="/rules"
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
              >
                Rules
              </Link>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main>{children}</main>

        {/* Mobile Navigation - hidden on desktop */}
        <MobileNav />
      </body>
    </html>
  );
}
