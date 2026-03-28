"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/upload": "Upload Slides",
  "/courses": "My Courses",
  "/kanban": "Task Board",
  "/schedule": "Smart Schedule",
  "/settings": "Settings",
};

export function Header() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.startsWith("/courses/")) return "Course Detail";
    return routeTitles[pathname] || "StudyAI";
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6 py-3">
      <div>
        <h2 className="text-xl font-bold">{getTitle()}</h2>
        <p className="text-xs text-muted-foreground">
          Welcome back! You have a 12-day study streak 🔥
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, flashcards..."
            className="w-64 pl-9 bg-secondary/50 border-border"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-violet-500 text-white border-0">
            3
          </Badge>
        </Button>
      </div>
    </header>
  );
}
