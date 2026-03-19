"use client";

import { motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendTooltip?: string;
  subtext?: string;
  icon: React.ReactNode;
  delay?: number;
}

const StatCard = ({
  label,
  value,
  trend,
  trendTooltip,
  subtext,
  icon,
  delay = 0,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card border border-border p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.04)] relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-background rounded-xl">{icon}</div>
        {trend && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full cursor-help ${
                  trend.startsWith("+")
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {trend}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[200px] text-center">
              <p className="text-xs">
                {trendTooltip || "Change from last period"}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">
          {label}
        </p>
        <h2 className="text-2xl font-bold tracking-tight font-mono-data">
          {value}
        </h2>
        {subtext && (
          <p className="text-[10px] text-muted-foreground mt-1.5 uppercase tracking-wider font-semibold">
            {subtext}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
