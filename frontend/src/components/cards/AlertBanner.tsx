import { AlertTriangle, Stethoscope, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AlertBannerProps {
  type: "warning" | "info";
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
}

export function AlertBanner({
  type,
  title,
  message,
  actionLabel,
  onAction,
  dismissible = true,
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const styles = {
    warning: {
      bg: "bg-status-moderate-bg border-status-moderate/30",
      icon: AlertTriangle,
      iconColor: "text-status-moderate",
    },
    info: {
      bg: "bg-status-low-bg border-status-low/30",
      icon: Stethoscope,
      iconColor: "text-status-low",
    },
  };

  const config = styles[type];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border p-4 ${config.bg}`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          {actionLabel && (
            <Button
              variant="link"
              className={`mt-2 h-auto p-0 ${config.iconColor}`}
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
            onClick={() => setDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
