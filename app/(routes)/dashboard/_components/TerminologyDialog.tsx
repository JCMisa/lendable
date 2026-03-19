import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
interface Term {
  term: string;
  definition: string;
}
const terms: Term[] = [
  {
    term: "Main Budget",
    definition:
      "Your total available funds. This is the money you currently have on hand, excluding amounts that are already lent out.",
  },
  {
    term: "Total Lent",
    definition:
      "The combined principal amount of all active loans you've given to borrowers. This is money currently out with others.",
  },
  {
    term: "Total Borrowed",
    definition:
      "The total amount you owe to other lenders across all your active loans as a borrower.",
  },
  {
    term: "Principal",
    definition:
      "The original amount of money lent in a loan, before any interest is added.",
  },
  {
    term: "Total Owed",
    definition:
      "The full amount a borrower must repay, including the principal plus all accrued interest.",
  },
  {
    term: "Interest Rate",
    definition:
      "The percentage charged on the principal for each interest period (daily, weekly, or monthly).",
  },
  {
    term: "Interest Period",
    definition:
      "How often interest is calculated and added to the loan — daily, weekly, or monthly.",
  },
  {
    term: "Repayment",
    definition:
      "A payment made by the borrower toward reducing the total owed on a loan.",
  },
  {
    term: "Borrower",
    definition:
      "The person who receives the loan and is responsible for paying it back.",
  },
  {
    term: "Lender",
    definition:
      "The person who provides the money in a loan and expects to be repaid.",
  },
  {
    term: "Cash Flow",
    definition:
      "A summary of money coming in (repayments received) vs. money going out (expenses) over time.",
  },
  {
    term: "Active (Status)",
    definition:
      "The loan is currently outstanding — the borrower still owes money and interest may still be accruing.",
  },
  {
    term: "Paid (Status)",
    definition:
      "The loan has been fully repaid. No further payments or interest are due.",
  },
  {
    term: "AI Sessions",
    definition:
      "The number of AI-powered financial consultations you've used out of your allotted limit. Sessions refresh periodically.",
  },
  {
    term: "Paid Through",
    definition:
      "The payment method or channel used for a repayment, such as GCash, Maya, or Cash.",
  },
];
const TerminologyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-10 px-4 rounded-xl border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Help</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Terminology Guide
          </DialogTitle>
          <DialogDescription>
            Learn what each term means across your Lendable dashboard.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 pb-2">
            {terms.map((item) => (
              <div
                key={item.term}
                className="border-b border-border pb-3 last:border-0"
              >
                <h4 className="text-sm font-semibold text-foreground">
                  {item.term}
                </h4>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default TerminologyDialog;
