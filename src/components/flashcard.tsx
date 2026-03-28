"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { type Flashcard as FlashcardType } from "@/lib/fake-data";
import { Badge } from "@/components/ui/badge";
import { RotateCcw } from "lucide-react";

interface FlashcardProps {
  flashcard: FlashcardType;
}

export function Flashcard({ flashcard }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const difficultyColors = {
    easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    hard: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };

  return (
    <div
      className="perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "relative w-full min-h-[220px] transition-transform duration-500 preserve-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-xl border border-border bg-card p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] px-2",
                difficultyColors[flashcard.difficulty]
              )}
            >
              {flashcard.difficulty}
            </Badge>
            <RotateCcw className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-sm font-medium leading-relaxed mt-4">
            {flashcard.front}
          </p>
          <p className="text-[10px] text-muted-foreground mt-4">
            Click to reveal answer
          </p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-card p-6 flex flex-col justify-between">
          <Badge
            variant="outline"
            className="text-[10px] px-2 w-fit border-primary/30 text-primary"
          >
            Answer
          </Badge>
          <p className="text-sm leading-relaxed mt-4 text-foreground/90">
            {flashcard.back}
          </p>
          <p className="text-[10px] text-muted-foreground mt-4">
            Click to flip back
          </p>
        </div>
      </div>
    </div>
  );
}
