"use client";

import { CalendarView } from "@/components/calendar-view";
import { scheduleEvents, courses } from "@/lib/fake-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Plus, Brain, Clock } from "lucide-react";

export default function SchedulePage() {
  const studyHoursThisWeek = 14;
  const plannedHours = 20;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Smart Schedule</h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI autonomously plans and reschedules your study sessions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="text-[10px] border-primary/30 text-primary"
          >
            <Sparkles className="h-3 w-3 mr-1" /> Auto-Replan Active
          </Badge>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground gap-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" /> Add Session
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20">
            <Clock className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">This Week</p>
            <p className="text-lg font-bold">
              {studyHoursThisWeek}h{" "}
              <span className="text-xs text-muted-foreground font-normal">
                / {plannedHours}h planned
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
            <Brain className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Missed Sessions</p>
            <p className="text-lg font-bold">
              1{" "}
              <span className="text-xs text-emerald-400 font-normal">
                (auto-rescheduled)
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/20">
            <span className="text-lg">📝</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Upcoming Exams</p>
            <p className="text-lg font-bold">
              {scheduleEvents.filter((e) => e.type === "exam").length}
            </p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <CalendarView events={scheduleEvents} />

      {/* Course Legend */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold mb-3">Active Courses</h3>
        <div className="flex flex-wrap gap-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"
            >
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-medium">{course.code}</span>
              <span className="text-xs text-muted-foreground">
                {course.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
