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

        {/* Global Footer - hidden on mobile (MobileNav takes its place) */}
        <footer className="hidden md:block border-t border-border/50 bg-card/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-linear-to-br from-primary to-primary/70 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">J</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Jukas
                </span>
              </div>
              <a
                href="https://github.com/mirkodandrea"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </footer>

        {/* Mobile Navigation - hidden on desktop */}
        <MobileNav />
      </body>
    </html>
  );
}
