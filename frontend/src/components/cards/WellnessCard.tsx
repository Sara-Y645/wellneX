import { Leaf, Utensils, Dumbbell, Moon, Heart } from "lucide-react";

interface WellnessTip {
  icon: "leaf" | "food" | "exercise" | "sleep" | "heart";
  title: string;
  description: string;
}

interface WellnessCardProps {
  tips: WellnessTip[];
}

const iconMap = {
  leaf: Leaf,
  food: Utensils,
  exercise: Dumbbell,
  sleep: Moon,
  heart: Heart,
};

export function WellnessCard({ tips }: WellnessCardProps) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-primary/10 p-2">
          <Leaf className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Wellness Guidance</h3>
      </div>

      <div className="space-y-4">
        {tips.map((tip, index) => {
          const Icon = iconMap[tip.icon];
          return (
            <div
              key={index}
              className="flex gap-3 rounded-lg bg-accent/50 p-3 transition-colors hover:bg-accent"
            >
              <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{tip.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg bg-status-moderate-bg/50 p-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Disclaimer:</span> This guidance is for wellness
          support only and does not replace medical advice.
        </p>
      </div>
    </div>
  );
}
