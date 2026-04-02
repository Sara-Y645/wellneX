import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HealthScoreCardProps {
  score: number;
  status: "good" | "moderate" | "high";
  trend?: "up" | "down" | "stable";
  onViewDetails?: () => void;
}

export function HealthScoreCard({ score, status, trend = "stable", onViewDetails }: HealthScoreCardProps) {
  const statusConfig = {
    good: {
      label: "Good",
      bgClass: "bg-status-good-bg",
      textClass: "text-status-good",
      borderClass: "border-status-good/20",
      gradientClass: "from-status-good/10 to-status-good/5",
    },
    moderate: {
      label: "Needs Attention",
      bgClass: "bg-status-moderate-bg",
      textClass: "text-status-moderate",
      borderClass: "border-status-moderate/20",
      gradientClass: "from-status-moderate/10 to-status-moderate/5",
    },
    high: {
      label: "High Risk",
      bgClass: "bg-status-high-bg",
      textClass: "text-status-high",
      borderClass: "border-status-high/20",
      gradientClass: "from-status-high/10 to-status-high/5",
    },
  };

  const config = statusConfig[status];

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-status-good" : trend === "down" ? "text-status-high" : "text-muted-foreground";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${config.borderClass} bg-gradient-to-br ${config.gradientClass} p-6 shadow-card transition-all duration-300 hover:shadow-elevated`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Your Health Score</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-6xl font-bold ${config.textClass}`}>{score}</span>
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
        </div>
        <div className={`flex items-center gap-1 rounded-full ${config.bgClass} px-3 py-1.5`}>
          <span className={`text-sm font-semibold ${config.textClass}`}>{config.label}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <TrendIcon className="h-4 w-4" />
          <span className="text-sm font-medium">
            {trend === "up" ? "+3 from last check" : trend === "down" ? "-2 from last check" : "No change"}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        className={`mt-4 ${config.textClass} hover:${config.bgClass}`}
        onClick={onViewDetails}
      >
        View Score Details
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>

      {/* Decorative element */}
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${config.bgClass} opacity-50 blur-3xl`} />
    </div>
  );
}
