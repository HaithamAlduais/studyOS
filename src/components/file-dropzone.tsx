"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: "ready" | "uploading" | "complete";
}

interface FileDropzoneProps {
  onFilesAdded?: (files: UploadedFile[]) => void;
}

export function FileDropzone({ onFilesAdded }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "demo1",
      name: "CS201_Chapter4_Graphs.pdf",
      size: "2.4 MB",
      status: "ready",
    },
    {
      id: "demo2",
      name: "CS201_Chapter5_Hashing.pdf",
      size: "1.8 MB",
      status: "ready",
    },
  ]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // In production, process the dropped files
  }, []);

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all duration-300 cursor-pointer",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-primary/5"
        )}
      >
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4 transition-transform",
            isDragging && "scale-110 animate-pulse-glow"
          )}
        >
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-base font-semibold">
          Drop your course slides here
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          or click to browse files
        </p>
        <p className="text-xs text-muted-foreground mt-3">
          Supports PDF, PPTX, DOCX • Max 50 MB per file
        </p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">
            Uploaded Files ({files.length})
          </h4>
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size}</p>
              </div>
              {file.status === "complete" ? (
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              ) : (
                <Badge
                  variant="outline"
                  className="text-[10px] border-emerald-500/30 text-emerald-400"
                >
                  Ready
                </Badge>
              )}
              <button
                onClick={() => removeFile(file.id)}
                className="text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
