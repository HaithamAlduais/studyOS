import { courses } from "@/lib/fake-data";
import { CourseCard } from "@/components/course-card";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Courses</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {courses.length} courses with AI-processed study materials
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-9 w-full sm:w-60 bg-secondary/50"
            />
          </div>
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </div>
  );
}
