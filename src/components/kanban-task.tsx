"use client";

import { cn } from "@/lib/utils";
import { type KanbanTask } from "@/lib/fake-data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, GripVertical } from "lucide-react";
import { format, parseISO } from "date-fns";

interface KanbanTaskCardProps {
  task: KanbanTask;
}

export function KanbanTaskCard({ task }: KanbanTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    high: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-lg border border-border bg-card p-3 cursor-grab active:cursor-grabbing transition-all",
        isDragging && "opacity-50 shadow-lg shadow-primary/10 border-primary/30"
      )}
    >
      <div className="flex items-start gap-2">
        <button
          className="mt-0.5 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="flex-1 min-w-0 space-y-2">
          <p className="text-sm font-medium leading-tight">{task.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            <Badge
              variant="outline"
              className={cn("text-[10px] px-1.5", priorityColors[task.priority])}
            >
              {task.priority}
            </Badge>
            {task.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-1.5 border-border text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            {format(parseISO(task.dueDate), "MMM d")}
          </div>
        </div>
      </div>
    </div>
  );
}
