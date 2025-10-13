import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "blue" | "green" | "red" | "lightblue";
  className?: string;
}

const variantStyles = {
  blue: "bg-primary text-primary-foreground",
  green: "bg-success text-success-foreground",
  red: "bg-destructive text-destructive-foreground",
  lightblue: "bg-info text-info-foreground",
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  variant = "blue",
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("p-6", variantStyles[variant], className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-5xl font-bold mb-2">{value}</p>
          <p className="text-sm opacity-90">{title}</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </Card>
  );
}
