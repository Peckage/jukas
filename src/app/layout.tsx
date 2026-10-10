import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { JukasLogoMark } from "@/components/jukas-logo";
import { SiteHeader } from "@/components/site-header";
import { TabBar } from "@/components/tab-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
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
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the page reach under the notch and home indicator; the header and
  // the tab bar pad themselves with the safe-area insets.
  viewportFit: "cover",
  // The page background, so the browser chrome blends into it.
  themeColor: "#14161f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} flex min-h-dvh flex-col font-sans antialiased`}
      >
        <SiteHeader />

        {/* Clears the phone tab bar, which is fixed over the bottom edge. */}
        <main className="flex-1 pb-[calc(3.75rem+env(safe-area-inset-bottom,0px))] md:pb-0">
          {children}
        </main>

        <footer className="hidden border-t border-border md:block">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-2.5">
              <JukasLogoMark size={24} />
              <span className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Jukas
              </span>
            </div>
            <a
              href="https://github.com/Peckage"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center gap-1.5 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <svg
                aria-hidden
                className="size-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </footer>

        <TabBar />
      </body>
    </html>
  );
}
