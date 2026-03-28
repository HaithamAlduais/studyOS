"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import {
  courses,
  chapters,
  flashcards,
  questions,
  visualAssets,
} from "@/lib/fake-data";
import { Flashcard } from "@/components/flashcard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Brain,
  HelpCircle,
  Image,
  ChevronLeft,
  CheckCircle,
  Clock,
  Loader2,
  Eye,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TabType = "chapters" | "flashcards" | "questions" | "visuals";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<TabType>("chapters");
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(
    new Set()
  );

  const course = courses.find((c) => c.id === id);
  if (!course) return notFound();

  const courseChapters = chapters.filter((ch) => ch.courseId === id);
  const courseFlashcards = flashcards.filter((fc) => fc.courseId === id);
  const courseQuestions = questions.filter((q) => q.courseId === id);
  const courseVisuals = visualAssets.filter((v) => v.courseId === id);

  const tabs: { id: TabType; label: string; icon: React.ElementType; count: number }[] = [
    { id: "chapters", label: "Chapters", icon: BookOpen, count: courseChapters.length },
    { id: "flashcards", label: "Flashcards", icon: Brain, count: courseFlashcards.length },
    { id: "questions", label: "Questions", icon: HelpCircle, count: courseQuestions.length },
    { id: "visuals", label: "Visuals", icon: Image, count: courseVisuals.length },
  ];

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const statusIcons = {
    generating: <Loader2 className="h-4 w-4 animate-spin text-primary" />,
    reviewing: <Eye className="h-4 w-4 text-amber-400" />,
    approved: <CheckCircle className="h-4 w-4 text-emerald-400" />,
    rejected: <AlertCircle className="h-4 w-4 text-rose-400" />,
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Back + Header */}
      <div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-3 w-3" /> Back to Courses
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="text-[10px] border-primary/30 text-primary"
              >
                {course.code}
              </Badge>
              <Badge
                variant="outline"
                className="text-[10px] border-emerald-500/30 text-emerald-400"
              >
                {course.progress}% complete
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {course.description}
            </p>
          </div>
        </div>

        <Progress value={course.progress} className="h-1.5 mt-4" />
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50 border border-border w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
            <span
              className={cn(
                "ml-0.5 text-[10px] px-1.5 rounded-full",
                activeTab === tab.id
                  ? "bg-primary-foreground/20"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {/* Chapters Tab */}
        {activeTab === "chapters" && (
          <div className="space-y-4">
            {courseChapters.map((chapter) => (
              <div
                key={chapter.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
                      {chapter.order}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">
                        {chapter.title}
                      </h3>
                      {chapter.isProcessed ? (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                          <CheckCircle className="h-3 w-3" /> AI Processed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {chapter.isProcessed && chapter.content && (
                  <div className="p-5 prose prose-invert prose-sm max-w-none
                    prose-headings:text-foreground prose-p:text-foreground/80
                    prose-strong:text-foreground prose-code:text-primary
                    prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-blockquote:border-primary/30 prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1
                    prose-th:text-foreground prose-td:text-foreground/80
                    prose-table:border-border
                  ">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: chapter.content
                          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/^\- (.*$)/gim, '<li>$1</li>')
                          .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')
                          .replace(/\n\n/g, '</p><p>')
                          .replace(/^\> (.*$)/gim, '<blockquote><p>$1</p></blockquote>')
                          .replace(/\|(.*)\|/g, (match) => {
                            const cells = match.split('|').filter(Boolean).map(c => c.trim());
                            return '<tr>' + cells.map(c => `<td class="border border-border px-3 py-2">${c}</td>`).join('') + '</tr>';
                          })
                      }}
                    />
                  </div>
                )}
                
                {!chapter.isProcessed && (
                  <div className="p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      This chapter hasn&apos;t been processed yet.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 text-xs"
                    >
                      Process with AI
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Flashcards Tab */}
        {activeTab === "flashcards" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Click any card to flip and reveal the answer
              </p>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-0 text-[10px]">
                {courseFlashcards.filter(
                  (f) =>
                    f.nextReview <=
                    new Date().toISOString().split("T")[0]
                ).length}{" "}
                due today
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courseFlashcards.map((fc) => (
                <Flashcard key={fc.id} flashcard={fc} />
              ))}
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <div className="space-y-4">
            {courseQuestions.map((q) => (
              <div
                key={q.id}
                className="rounded-xl border border-border bg-card p-5 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      q.type === "mcq"
                        ? "border-violet-500/30 text-violet-400"
                        : q.type === "analytical"
                        ? "border-amber-500/30 text-amber-400"
                        : "border-cyan-500/30 text-cyan-400"
                    )}
                  >
                    {q.type === "mcq"
                      ? "Multiple Choice"
                      : q.type === "analytical"
                      ? "Analytical"
                      : "Short Answer"}
                  </Badge>
                </div>

                <h4 className="text-sm font-medium">{q.question}</h4>

                {/* MCQ Options */}
                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, i) => (
                      <button
                        key={i}
                        className={cn(
                          "text-left rounded-lg border p-3 text-xs transition-all",
                          revealedAnswers.has(q.id) && opt === q.correctAnswer
                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                            : "border-border hover:border-primary/30 hover:bg-primary/5"
                        )}
                      >
                        <span className="font-mono text-muted-foreground mr-2">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Reveal / Answer */}
                <div>
                  {!revealedAnswers.has(q.id) ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => toggleAnswer(q.id)}
                    >
                      Reveal Answer
                    </Button>
                  ) : (
                    <div className="space-y-2 animate-fade-in rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <p className="text-xs font-semibold text-emerald-400">
                        ✓ Answer
                      </p>
                      <p className="text-xs text-foreground/80">
                        {q.correctAnswer}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Explanation: </span>
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Visuals Tab */}
        {activeTab === "visuals" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courseVisuals.map((visual) => (
              <div
                key={visual.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                {/* Placeholder visual */}
                <div className="h-40 bg-gradient-to-br from-primary/10 via-card to-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <Image className="h-8 w-8 text-primary/40 mx-auto" />
                    <p className="text-[10px] text-muted-foreground mt-2">
                      AI-Generated Diagram
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{visual.title}</h4>
                    {statusIcons[visual.status]}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {visual.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px]",
                        visual.status === "approved"
                          ? "border-emerald-500/30 text-emerald-400"
                          : visual.status === "reviewing"
                          ? "border-amber-500/30 text-amber-400"
                          : visual.status === "generating"
                          ? "border-primary/30 text-primary"
                          : "border-rose-500/30 text-rose-400"
                      )}
                    >
                      {visual.status}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {visual.iterationCount} iteration
                      {visual.iterationCount > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
