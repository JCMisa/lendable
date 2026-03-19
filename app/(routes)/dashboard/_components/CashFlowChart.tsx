"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MOCK_CHART_DATA = [
  { date: "May", repayments: 4500, expenses: 2100 },
  { date: "Jun", repayments: 5200, expenses: 2800 },
  { date: "Jul", repayments: 4800, expenses: 3200 },
  { date: "Aug", repayments: 6100, expenses: 2400 },
  { date: "Sep", repayments: 5900, expenses: 1800 },
  { date: "Oct", repayments: 7200, expenses: 3100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
      <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground capitalize">
            {entry.dataKey}:
          </span>
          <span className="font-mono-data font-bold text-foreground">
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

const CashFlowChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-semibold text-lg text-foreground">Cash Flow</h3>
          <p className="text-sm text-muted-foreground">
            Repayments vs. Expenses
          </p>
        </div>
        <select className="bg-surface text-xs font-medium px-3 py-1.5 rounded-lg border-none focus:ring-0 text-foreground">
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_CHART_DATA}>
            <defs>
              <linearGradient id="colorRepay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eb003f" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#eb003f" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff8b20" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ff8b20" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(180, 181, 192, 0.3)"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#b4b5c0", fontSize: 12 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="repayments"
              stroke="#eb003f"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRepay)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ff8b20"
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorExpense)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span>Repayments</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-2.5 w-2.5 rounded-full bg-secondary" />
          <span>Expenses</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CashFlowChart;
