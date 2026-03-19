"use client";

import { motion } from "motion/react";
import ActivityItem from "./ActivityItem";

const MOCK_ACTIVITIES = [
  {
    title: "Repayment from Sarah J.",
    amount: "+$450.00",
    time: "2h ago",
    type: "repayment" as const,
  },
  {
    title: "New Loan: Business Exp.",
    amount: "-$2,000.00",
    time: "5h ago",
    type: "loan" as const,
  },
  {
    title: "Office Supplies",
    amount: "-$120.40",
    time: "Yesterday",
    type: "expense" as const,
  },
  {
    title: "Repayment from Mike R.",
    amount: "+$1,200.00",
    time: "2 days ago",
    type: "repayment" as const,
  },
  {
    title: "Grocery Run",
    amount: "-$85.60",
    time: "3 days ago",
    type: "expense" as const,
  },
];

const RecentActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card border border-border rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.04)]"
    >
      <h3 className="font-semibold text-lg text-foreground mb-6">
        Recent Activity
      </h3>
      <div className="space-y-5">
        {MOCK_ACTIVITIES.map((item, i) => (
          <ActivityItem key={i} {...item} />
        ))}
      </div>
      <button className="w-full mt-6 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border-t border-border">
        View All Transactions
      </button>
    </motion.div>
  );
};

export default RecentActivity;
