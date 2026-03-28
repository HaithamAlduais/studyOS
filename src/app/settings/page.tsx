import { user } from "@/lib/fake-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Brain, Palette, Shield, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your profile and AI preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">Profile</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-purple-600/40 text-2xl font-bold text-primary">
            {user.avatar}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Full Name
            </label>
            <Input defaultValue={user.name} className="bg-secondary/50" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Email
            </label>
            <Input defaultValue={user.email} className="bg-secondary/50" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              University
            </label>
            <Input defaultValue={user.university} className="bg-secondary/50" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Major
            </label>
            <Input defaultValue={user.major} className="bg-secondary/50" />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-amber-400" />
          <h2 className="text-sm font-semibold">Notifications</h2>
        </div>

        {[
          {
            label: "Flashcard review reminders",
            description: "Get notified when flashcards are due for review",
            enabled: true,
          },
          {
            label: "Study session alerts",
            description: "Reminder 15 minutes before scheduled sessions",
            enabled: true,
          },
          {
            label: "Processing complete",
            description: "When AI finishes processing your uploaded slides",
            enabled: true,
          },
          {
            label: "Weekly progress report",
            description: "Summary of your study activity every Sunday",
            enabled: false,
          },
        ].map((pref) => (
          <div
            key={pref.label}
            className="flex items-center justify-between py-2"
          >
            <div>
              <p className="text-sm font-medium">{pref.label}</p>
              <p className="text-xs text-muted-foreground">
                {pref.description}
              </p>
            </div>
            <div
              className={`w-10 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${
                pref.enabled ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-white transition-transform ${
                  pref.enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AI Preferences */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-violet-400" />
          <h2 className="text-sm font-semibold">AI Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Summary Style
            </label>
            <div className="flex gap-2">
              {["Concise", "Detailed", "Visual-Heavy"].map((style) => (
                <Badge
                  key={style}
                  variant="outline"
                  className={`cursor-pointer text-xs px-3 py-1.5 transition-all ${
                    style === "Detailed"
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {style}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Flashcard Difficulty
            </label>
            <div className="flex gap-2">
              {["Easy", "Balanced", "Challenging"].map((diff) => (
                <Badge
                  key={diff}
                  variant="outline"
                  className={`cursor-pointer text-xs px-3 py-1.5 transition-all ${
                    diff === "Balanced"
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {diff}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              AI Models
            </label>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span>Synthesizer & Inquisitor</span>
                <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                  Claude 4.6 Opus
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span>Illustrator</span>
                <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-400">
                  Gemini 2.5 Flash
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span>Router</span>
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">
                  GPT-4o
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button className="bg-primary text-primary-foreground gap-2">
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>
    </div>
  );
}
