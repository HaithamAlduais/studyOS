import Link from "next/link";
import { cn } from "@/lib/utils";
import { type Course } from "@/lib/fake-data";
import { BookOpen, Brain, HelpCircle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
        )}
      >
        {/* Top gradient bar */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
            course.color.replace("/20", "")
          )}
        />

        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono text-muted-foreground">
                {course.code}
              </span>
              <h3 className="text-sm font-semibold mt-0.5 line-clamp-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {course.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" /> {course.chaptersCount}
            </span>
            <span className="flex items-center gap-1">
              <Brain className="h-3 w-3" /> {course.flashcardsCount}
            </span>
            <span className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3" /> {course.questionsCount}
            </span>
          </div>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>

          {/* Footer */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {course.lastAccessed}
          </div>
        </div>
      </div>
    </Link>
  );
}
