"use client";

import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type KanbanTask } from "@/lib/fake-data";
import { KanbanTaskCard } from "./kanban-task";

interface KanbanColumnProps {
  id: string;
  title: string;
  icon: string;
  tasks: KanbanTask[];
  accentColor: string;
}

export function KanbanColumn({
  id,
  title,
  icon,
  tasks,
  accentColor,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-border bg-card/50 min-w-[280px] w-[280px] flex-shrink-0 transition-all",
        isOver && "border-primary/40 bg-primary/5"
      )}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-medium",
            accentColor
          )}
        >
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div
        ref={setNodeRef}
        className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-220px)]"
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <KanbanTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex items-center justify-center py-8 text-xs text-muted-foreground">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}
