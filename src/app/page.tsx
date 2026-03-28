import {
  courses,
  dashboardStats,
  scheduleEvents,
  kanbanTasks,
  flashcards,
  user,
} from "@/lib/fake-data";
import { StatCard } from "@/components/stat-card";
import { CourseCard } from "@/components/course-card";
import {
  BookOpen,
  Brain,
  ListTodo,
  GraduationCap,
  Flame,
  Clock,
  CalendarDays,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function DashboardPage() {
  const upcomingEvents = scheduleEvents
    .filter((e) => e.type !== "missed")
    .slice(0, 4);
  const recentTasks = kanbanTasks
    .filter((t) => t.status === "in-progress")
    .slice(0, 3);
  const dueFlashcards = flashcards.filter(
    (f) => f.nextReview <= format(new Date(), "yyyy-MM-dd")
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-fuchsia-600/10 p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-transparent animate-gradient" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            <Badge
              variant="outline"
              className="border-violet-500/30 text-violet-400 text-[10px]"
            >
              AI-Powered
            </Badge>
          </div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-lg">
            You have{" "}
            <span className="text-primary font-medium">
              {dashboardStats.flashcardsDue} flashcards
            </span>{" "}
            due for review and{" "}
            <span className="text-primary font-medium">
              {dashboardStats.tasksInProgress} tasks
            </span>{" "}
            in progress. Let&apos;s keep the momentum going!
          </p>
          <div className="flex gap-3 mt-5">
            <Link href="/upload">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Sparkles className="h-4 w-4" /> Upload New Slides
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" /> Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Courses"
          value={dashboardStats.totalCourses}
          icon={BookOpen}
          accentColor="text-violet-400"
        />
        <StatCard
          title="Flashcards Due"
          value={dashboardStats.flashcardsDue}
          icon={Brain}
          accentColor="text-cyan-400"
          subtitle="Review today"
        />
        <StatCard
          title="Active Tasks"
          value={dashboardStats.tasksInProgress}
          icon={ListTodo}
          accentColor="text-amber-400"
        />
        <StatCard
          title="Upcoming Exams"
          value={dashboardStats.upcomingExams}
          icon={GraduationCap}
          accentColor="text-rose-400"
        />
        <StatCard
          title="Study Streak"
          value={`${dashboardStats.studyStreak}d`}
          icon={Flame}
          accentColor="text-orange-400"
          trend={{ value: "+3 days", positive: true }}
        />
        <StatCard
          title="Study Hours"
          value={dashboardStats.totalStudyHours}
          icon={Clock}
          accentColor="text-emerald-400"
          trend={{ value: "+12h this week", positive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Courses - spans 2 cols */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Courses</h2>
            <Link
              href="/courses"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.slice(0, 4).map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Upcoming Schedule */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                Upcoming Schedule
              </h3>
              <Link
                href="/schedule"
                className="text-[11px] text-primary hover:underline"
              >
                Full calendar →
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const course = courses.find((c) => c.id === event.courseId);
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                  >
                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-[10px] font-medium">
                        {format(parseISO(event.date), "MMM")}
                      </span>
                      <span className="text-sm font-bold -mt-0.5">
                        {format(parseISO(event.date), "d")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {event.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {event.startTime} - {event.endTime} •{" "}
                        {course?.code}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[9px] px-1.5 ${
                        event.type === "exam"
                          ? "border-rose-500/30 text-rose-400"
                          : event.type === "review"
                          ? "border-cyan-500/30 text-cyan-400"
                          : "border-violet-500/30 text-violet-400"
                      }`}
                    >
                      {event.type}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Tasks */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <ListTodo className="h-4 w-4 text-amber-400" />
                In Progress
              </h3>
              <Link
                href="/kanban"
                className="text-[11px] text-primary hover:underline"
              >
                Kanban board →
              </Link>
            </div>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                >
                  <div className="h-2 w-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium">{task.title}</p>
                    <p className="text-[10px] text-muted-foreground line-clamp-1">
                      {task.description}
                    </p>
                    <div className="flex gap-1 mt-1.5">
                      {task.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[9px] px-1 border-border"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flashcards Due */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Brain className="h-4 w-4 text-cyan-400" />
                Flashcards Due
              </h3>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-0 text-[10px]">
                {dueFlashcards.length} cards
              </Badge>
            </div>
            <div className="space-y-2">
              {dueFlashcards.slice(0, 3).map((fc) => (
                <div
                  key={fc.id}
                  className="rounded-lg border border-border bg-secondary/30 p-3"
                >
                  <p className="text-xs font-medium line-clamp-2">
                    {fc.front}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={`text-[9px] px-1 ${
                        fc.difficulty === "hard"
                          ? "border-rose-500/30 text-rose-400"
                          : fc.difficulty === "medium"
                          ? "border-amber-500/30 text-amber-400"
                          : "border-emerald-500/30 text-emerald-400"
                      }`}
                    >
                      {fc.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/courses/1">
              <Button variant="outline" size="sm" className="w-full text-xs gap-2">
                <Brain className="h-3 w-3" />
                Start Review Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
