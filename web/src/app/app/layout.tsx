import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klydo. the app.",
  description: "Fashion in thirty. The app, on the web.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
