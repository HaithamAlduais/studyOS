"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/file-dropzone";
import { ProcessingPipeline } from "@/components/processing-pipeline";
import { processingSteps } from "@/lib/fake-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Play,
  CheckCircle,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

export default function UploadPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const startProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 60) {
          clearInterval(interval);
          return 60;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Upload Course Slides</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload your raw course slides and let AI transform them into
          structured study materials.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: Zap,
            title: "Smart Chunking",
            desc: "AI breaks your slides into logical sections",
            color: "text-violet-400",
          },
          {
            icon: Shield,
            title: "Global Dedup",
            desc: "If someone uploaded this before, get instant results",
            color: "text-emerald-400",
          },
          {
            icon: Clock,
            title: "~3 min Processing",
            desc: "Full analysis in under 3 minutes",
            color: "text-amber-400",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border border-border bg-card/50 p-4 flex items-start gap-3"
          >
            <feature.icon className={`h-5 w-5 ${feature.color} flex-shrink-0 mt-0.5`} />
            <div>
              <p className="text-xs font-semibold">{feature.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <FileDropzone />

      {/* Start Processing */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-[10px] border-primary/30 text-primary"
          >
            <Sparkles className="h-3 w-3 mr-1" /> Dify Pipeline
          </Badge>
          <span className="text-xs text-muted-foreground">
            Powered by Claude 4.6 + Gemini 2.5
          </span>
        </div>
        <Button
          onClick={startProcessing}
          disabled={isProcessing}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          {isProcessing ? (
            <>Processing...</>
          ) : (
            <>
              <Play className="h-4 w-4" /> Start Processing
            </>
          )}
        </Button>
      </div>

      {/* Processing Pipeline */}
      {isProcessing && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-6 animate-fade-in-up">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> AI Processing
                Pipeline
              </h3>
              <span className="text-xs text-muted-foreground">{progress}% complete</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          <ProcessingPipeline steps={processingSteps} />

          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 mt-0.5">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary">
                  🎨 Illustrator Agent Working
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Generating educational diagram for &quot;Big-O Complexity
                  Comparison&quot; using Gemini 2.5 Flash Image Preview. The Art
                  Director will review once complete...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
