import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyAI — AI-Powered Learning Platform",
  description:
    "Transform your course slides into structured summaries, flashcards, quizzes, and visual diagrams with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 ml-[260px] flex flex-col min-h-screen transition-all duration-300">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
