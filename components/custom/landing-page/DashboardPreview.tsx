"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Highlighter } from "./magic-ui/highlighter";
import { BorderBeam } from "./magic-ui/border-beam";

interface MockLoan {
  borrower: string;
  principalAmount: string;
  totalOwed: string;
  interestRate: string;
  interestPeriod: "DAILY" | "WEEKLY" | "MONTHLY";
  status: "ACTIVE" | "PAID";
  nextAccrual: string;
}

const MOCK_LOAN: MockLoan = {
  borrower: "Sarah J.",
  principalAmount: "5,000.00",
  totalOwed: "5,250.00",
  interestRate: "5.00",
  interestPeriod: "MONTHLY",
  status: "ACTIVE",
  nextAccrual: "Oct 24, 2024",
};

interface ActivityItem {
  id: number;
  type: "repayment" | "disbursement";
  description: string;
  method: string;
  date: string;
  amount: string;
}

const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: 1,
    type: "repayment",
    description: "Repayment Received",
    method: "GCash",
    date: "Oct 12, 2024",
    amount: "+₱250.00",
  },
  {
    id: 2,
    type: "repayment",
    description: "Repayment Received",
    method: "Maya",
    date: "Oct 5, 2024",
    amount: "+₱250.00",
  },
  {
    id: 3,
    type: "disbursement",
    description: "Loan Disbursed",
    method: "Bank Transfer",
    date: "Sep 24, 2024",
    amount: "-₱5,000.00",
  },
];

export const DashboardPreview = () => {
  return (
    <section id="dashboard" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold tracking-[-0.04em] md:text-5xl">
          Your lending dashboard,{" "}
          <span className="text-primary">
            <Highlighter action="underline" color="#ff8b20">
              reimagined
            </Highlighter>
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Real-time visibility into your loans, repayments, and financial health
          — all in one place.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-xl border bg-card p-2 shadow-2xl shadow-foreground/5 md:p-4"
      >
        <BorderBeam duration={8} size={100} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Main Budget */}
          <Card className="border-none bg-muted/50 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Main Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₱12,450.00</div>
              <p className="mt-1 flex items-center text-xs text-primary">
                <TrendingUp className="mr-1 h-3 w-3" /> +12% from last month
              </p>
            </CardContent>
          </Card>

          {/* Active Loan */}
          <Card className="col-span-1 border-none bg-muted/50 shadow-none md:col-span-2">
            <div className="flex h-full flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Loan to &quot;{MOCK_LOAN.borrower}&quot;
                </p>
                <div className="mt-1 text-3xl font-bold">
                  ₱{MOCK_LOAN.totalOwed}
                </div>
              </div>
              <div className="sm:text-right">
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary"
                >
                  {MOCK_LOAN.interestRate}% {MOCK_LOAN.interestPeriod}
                </Badge>
                <p className="mt-2 text-xs text-muted-foreground">
                  Next accrual: {MOCK_LOAN.nextAccrual}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity */}
        <div className="mt-4 rounded-lg border bg-background p-6">
          <h4 className="mb-4 text-sm font-semibold">Recent Activity</h4>
          <div className="space-y-4">
            {MOCK_ACTIVITY.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ₱{
                      item.type === "repayment"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {item.type === "repayment" ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.method} • {item.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-mono text-sm font-bold ₱{
                    item.type === "repayment"
                      ? "text-primary"
                      : "text-secondary"
                  }`}
                >
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
