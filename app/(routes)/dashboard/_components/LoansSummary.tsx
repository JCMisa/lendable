"use client";

import { motion } from "motion/react";
import { MoreHorizontal } from "lucide-react";

interface LoanRow {
  borrower: string;
  principal: string;
  totalOwed: string;
  rate: string;
  period: string;
  status: "ACTIVE" | "PAID";
}

const MOCK_LOANS: LoanRow[] = [
  {
    borrower: "Sarah Johnson",
    principal: "$5,000.00",
    totalOwed: "$5,450.00",
    rate: "5.00%",
    period: "Monthly",
    status: "ACTIVE",
  },
  {
    borrower: "Mike Rodriguez",
    principal: "$3,200.00",
    totalOwed: "$2,100.00",
    rate: "3.50%",
    period: "Weekly",
    status: "ACTIVE",
  },
  {
    borrower: "Anna Chen",
    principal: "$1,500.00",
    totalOwed: "$0.00",
    rate: "4.00%",
    period: "Monthly",
    status: "PAID",
  },
  {
    borrower: "David Kim",
    principal: "$8,500.00",
    totalOwed: "$9,200.00",
    rate: "6.00%",
    period: "Monthly",
    status: "ACTIVE",
  },
];

const LoansSummary = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card border border-border rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            Active Loans
          </h3>
          <p className="text-sm text-muted-foreground">
            4 loans across 4 borrowers
          </p>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                Borrower
              </th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                Principal
              </th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3 hidden sm:table-cell">
                Owed
              </th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3 hidden md:table-cell">
                Rate
              </th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LOANS.map((loan, i) => (
              <tr
                key={i}
                className="border-b border-border last:border-0 group cursor-pointer hover:bg-surface/50 transition-colors"
              >
                <td className="py-3.5 text-sm font-semibold group-hover:text-primary transition-colors">
                  {loan.borrower}
                </td>
                <td className="py-3.5 text-sm font-mono-data text-right">
                  {loan.principal}
                </td>
                <td className="py-3.5 text-sm font-mono-data text-right hidden sm:table-cell">
                  {loan.totalOwed}
                </td>
                <td className="py-3.5 text-sm font-mono-data text-right hidden md:table-cell text-muted-foreground">
                  {loan.rate} / {loan.period}
                </td>
                <td className="py-3.5 text-right">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      loan.status === "ACTIVE"
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default LoansSummary;
