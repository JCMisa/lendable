import { TrendingUp, Clock, ArrowDownLeft } from "lucide-react";

interface ActivityItemProps {
  title: string;
  amount: string;
  time: string;
  type: "repayment" | "loan" | "expense";
}

const ActivityItem = ({ title, amount, time, type }: ActivityItemProps) => {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3.5">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center border shrink-0 ${
            type === "repayment"
              ? "bg-success/5 border-success/20"
              : type === "loan"
                ? "bg-primary/5 border-primary/20"
                : "bg-surface border-transparent"
          }`}
        >
          {type === "repayment" ? (
            <TrendingUp className="h-4 w-4 text-success" />
          ) : type === "loan" ? (
            <ArrowDownLeft className="h-4 w-4 text-primary" />
          ) : (
            <Clock className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold group-hover:text-primary transition-colors">
            {title}
          </p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </div>
      <p
        className={`text-sm font-mono-data font-bold ${
          amount.startsWith("+") ? "text-success" : "text-foreground"
        }`}
      >
        {amount}
      </p>
    </div>
  );
};

export default ActivityItem;
