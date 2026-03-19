import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  MessageSquareIcon,
  PlusIcon,
  SearchIcon,
  WalletIcon,
} from "lucide-react";
import StatCard from "./_components/StatCard";
import CashFlowChart from "./_components/CashFlowChart";
import RecentActivity from "./_components/RecentActivity";
import LoansSummary from "./_components/LoansSummary";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import TerminologyDialog from "./_components/TerminologyDialog";

const DashboardPage = async () => {
  const user = await getCurrentUser();

  if (!user.data) {
    redirect("/sign-in");
  }

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 w-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {greeting}, {user.data.name} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here&apos;s what&apos;s happening with your loans today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search loans..."
              className="h-10 pl-10 pr-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
            />
          </div>
          <TerminologyDialog />
          <Button className="h-10 px-5 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 text-sm">
            <PlusIcon className="h-4 w-4" />
            New Loan
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Main Budget"
          value="$42,850.00"
          trend="+12.5%"
          trendTooltip="Your budget increased by 12.5% compared to last month, from repayments received."
          icon={<WalletIcon className="h-5 w-5 text-primary" />}
          delay={0}
        />
        <StatCard
          label="Total Lent"
          value="$18,200.00"
          trend="+4.2%"
          trendTooltip="You've lent 4.2% more this month compared to last month."
          icon={<ArrowUpRightIcon className="h-5 w-5 text-secondary" />}
          delay={0.05}
        />
        <StatCard
          label="Total Borrowed"
          value="$2,400.00"
          trend="-1.5%"
          trendTooltip="Your total borrowings decreased by 1.5% since last month due to repayments."
          icon={<ArrowDownLeftIcon className="h-5 w-5 text-destructive" />}
          delay={0.1}
        />
        <StatCard
          label="AI Sessions"
          value="2 / 3"
          subtext="Refreshes in 4 days"
          icon={<MessageSquareIcon className="h-5 w-5 text-muted-foreground" />}
          delay={0.15}
        />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CashFlowChart />
        <RecentActivity />
      </div>

      {/* Loans Table */}
      <LoansSummary />
    </div>
  );
};

export default DashboardPage;
