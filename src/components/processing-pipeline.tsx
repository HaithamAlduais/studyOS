"use client";

import { cn } from "@/lib/utils";
import { type ProcessingStep } from "@/lib/fake-data";
import { Check, Loader2, Circle } from "lucide-react";

interface ProcessingPipelineProps {
  steps: ProcessingStep[];
}

export function ProcessingPipeline({ steps }: ProcessingPipelineProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-4">
          {/* Connector line */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border transition-all",
                step.status === "completed" &&
                  "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
                step.status === "processing" &&
                  "bg-primary/20 border-primary/40 text-primary animate-pulse-glow",
                step.status === "pending" &&
                  "bg-muted border-border text-muted-foreground",
                step.status === "failed" &&
                  "bg-rose-500/20 border-rose-500/40 text-rose-400"
              )}
            >
              {step.status === "completed" ? (
                <Check className="h-5 w-5" />
              ) : step.status === "processing" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-0.5 h-6 mt-1",
                  step.status === "completed"
                    ? "bg-emerald-500/40"
                    : "bg-border"
                )}
              />
            )}
          </div>

          {/* Content */}
          <div className="pt-1.5 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{step.icon}</span>
              <h4
                className={cn(
                  "text-sm font-semibold",
                  step.status === "pending" && "text-muted-foreground"
                )}
              >
                {step.name}
              </h4>
              {step.status === "processing" && (
                <span className="text-[10px] text-primary font-medium animate-pulse">
                  Processing...
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
