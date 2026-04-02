import { Badge } from "@/components/ui/badge";
import { Droplet, Heart, Activity, Beaker } from "lucide-react";

interface AnalysisCardProps {
  parameter: string;
  value: string | number;
  unit: string;
  status: "normal" | "low" | "moderate" | "high";
  referenceRange?: string;
  icon?: "blood" | "heart" | "activity" | "beaker";
}

const iconMap = {
  blood: Droplet,
  heart: Heart,
  activity: Activity,
  beaker: Beaker,
};

export function AnalysisCard({
  parameter,
  value,
  unit,
  status,
  referenceRange,
  icon = "beaker",
}: AnalysisCardProps) {
  const Icon = iconMap[icon];

  const statusStyles = {
    normal: "border-status-good/20 bg-card",
    low: "border-status-low/20 bg-status-low-bg/30",
    moderate: "border-status-moderate/20 bg-status-moderate-bg/30",
    high: "border-status-high/20 bg-status-high-bg/30",
  };

  const iconBgStyles = {
    normal: "bg-status-good/10 text-status-good",
    low: "bg-status-low/10 text-status-low",
    moderate: "bg-status-moderate/10 text-status-moderate",
    high: "bg-status-high/10 text-status-high",
  };

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 hover:shadow-md ${statusStyles[status]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-2 ${iconBgStyles[status]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">{parameter}</p>
            {referenceRange && (
              <p className="text-xs text-muted-foreground">Normal: {referenceRange}</p>
            )}
          </div>
        </div>
        <Badge variant={status}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}
