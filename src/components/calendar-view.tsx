"use client";

import { cn } from "@/lib/utils";
import { type ScheduleEvent } from "@/lib/fake-data";
import { courses } from "@/lib/fake-data";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isToday,
  parseISO,
  isSameDay,
  addWeeks,
  subWeeks,
} from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CalendarViewProps {
  events: ScheduleEvent[];
}

const eventTypeColors: Record<string, string> = {
  study: "bg-violet-500/20 border-violet-500/40 text-violet-300",
  review: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300",
  exam: "bg-rose-500/20 border-rose-500/40 text-rose-300",
  missed: "bg-red-900/30 border-red-500/40 text-red-400 line-through opacity-60",
};

export function CalendarView({ events }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

  const getEventsForDay = (day: Date) =>
    events.filter((e) => isSameDay(parseISO(e.date), day));

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {format(weekStart, "MMM d")} – {format(weekEnd, "MMM d, yyyy")}
          </h3>
          <p className="text-xs text-muted-foreground">Weekly Study Schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-violet-500" /> Study
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan-500" /> Review
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500" /> Exam
        </span>
        <span className="flex items-center gap-1.5">
          <AlertCircle className="h-3 w-3 text-red-400" /> Missed
        </span>
        <span className="flex items-center gap-1.5">
          <RefreshCw className="h-3 w-3 text-amber-400" /> Rescheduled
        </span>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-xl border border-border overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-8 border-b border-border">
          <div className="p-2 text-xs text-muted-foreground border-r border-border" />
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={cn(
                "p-2 text-center border-r border-border last:border-r-0",
                isToday(day) && "bg-primary/10"
              )}
            >
              <p className="text-[10px] text-muted-foreground uppercase">
                {format(day, "EEE")}
              </p>
              <p
                className={cn(
                  "text-sm font-semibold mt-0.5",
                  isToday(day) && "text-primary"
                )}
              >
                {format(day, "d")}
              </p>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="max-h-[500px] overflow-y-auto">
          {hours.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-8 border-b border-border last:border-b-0 min-h-[50px]"
            >
              <div className="p-2 text-[10px] text-muted-foreground border-r border-border flex items-start justify-end pr-2">
                {format(new Date(2000, 0, 1, hour), "h a")}
              </div>
              {days.map((day) => {
                const dayEvents = getEventsForDay(day);
                const hourEvents = dayEvents.filter((e) => {
                  const eventHour = parseInt(e.startTime.split(":")[0]);
                  return eventHour === hour;
                });

                return (
                  <div
                    key={day.toISOString()}
                    className={cn(
                      "relative border-r border-border last:border-r-0 p-0.5",
                      isToday(day) && "bg-primary/5"
                    )}
                  >
                    {hourEvents.map((event) => {
                      const course = courses.find(
                        (c) => c.id === event.courseId
                      );
                      return (
                        <div
                          key={event.id}
                          className={cn(
                            "rounded-md border p-1.5 text-[10px] leading-tight",
                            eventTypeColors[event.type]
                          )}
                        >
                          <p className="font-medium truncate">{event.title}</p>
                          <p className="opacity-70 mt-0.5">
                            {event.startTime} - {event.endTime}
                          </p>
                          {event.isRescheduled && event.type !== "missed" && (
                            <RefreshCw className="h-2.5 w-2.5 text-amber-400 mt-0.5" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
