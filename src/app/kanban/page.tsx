"use client";

import { useState } from "react";
import { kanbanTasks, type KanbanTask } from "@/lib/fake-data";
import { KanbanColumn } from "@/components/kanban-column";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { KanbanTaskCard } from "@/components/kanban-task";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

const columns = [
  { id: "backlog", title: "Backlog", icon: "📋", accentColor: "bg-muted text-muted-foreground" },
  { id: "todo", title: "To Do", icon: "📌", accentColor: "bg-blue-500/20 text-blue-400" },
  { id: "in-progress", title: "In Progress", icon: "⚡", accentColor: "bg-amber-500/20 text-amber-400" },
  { id: "done", title: "Done", icon: "✅", accentColor: "bg-emerald-500/20 text-emerald-400" },
];

export default function KanbanPage() {
  const [tasks, setTasks] = useState<KanbanTask[]>(kanbanTasks);
  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if dropped on a column
    const targetColumn = columns.find((c) => c.id === overId);
    if (targetColumn) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId
            ? { ...t, status: targetColumn.id as KanbanTask["status"] }
            : t
        )
      );
      return;
    }

    // Check if dropped on another task
    const overTask = tasks.find((t) => t.id === overId);
    if (overTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, status: overTask.status } : t
        )
      );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Task Board</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Drag tasks between columns • AI auto-moves cards when you complete study sessions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="text-[10px] border-primary/30 text-primary"
          >
            <Sparkles className="h-3 w-3 mr-1" /> AI-Managed
          </Badge>
          <Button size="sm" className="bg-primary text-primary-foreground gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" /> Add Task
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              icon={col.icon}
              accentColor={col.accentColor}
              tasks={tasks.filter((t) => t.status === col.id)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && <KanbanTaskCard task={activeTask} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
