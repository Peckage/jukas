import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Walkthrough } from "@/components/walkthrough/walkthrough";

export const metadata: Metadata = {
  title: "Learn to play - Jukas",
  description: "Jukas in nine animated steps: deal, peek, draw, swap, snatch and call “Jukas!”.",
};

export default function LearnPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6 sm:px-6 sm:py-10">
      <PageHeader
        icon={GraduationCap}
        title="Learn to play"
        description="The whole game in nine steps. Swipe or tap Next."
      />
      <Walkthrough />
    </div>
  );
}
