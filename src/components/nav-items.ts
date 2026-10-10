import { BarChart3, BookOpen, GraduationCap, House, Layers } from "lucide-react";

/** Every page, in the order the header and the phone tab bar show them. */
export const NAV_ITEMS = [
  { href: "/", label: "Home", icon: House },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/scores", label: "Scores", icon: BarChart3 },
  { href: "/cards", label: "Cards", icon: Layers },
  { href: "/rules", label: "Rules", icon: BookOpen },
] as const;
