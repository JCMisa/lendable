"use client";

import { motion } from "framer-motion";
import { Wallet, PieChart, Shield, Zap, Users, Clock } from "lucide-react";
import { Highlighter } from "./magic-ui/highlighter";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Wallet,
    title: "P2P Lending Engine",
    description:
      "Create and manage loans with flexible interest rates, periods, and automated accrual tracking.",
  },
  {
    icon: PieChart,
    title: "Expense Tracking",
    description:
      "Categorize and monitor every expense. Stay on top of your budget with visual breakdowns.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "End-to-end encryption and secure authentication powered by Clerk for every interaction.",
  },
  {
    icon: Zap,
    title: "Automated Interest",
    description:
      "Set daily, weekly, or monthly interest accrual — the system handles the rest automatically.",
  },
  {
    icon: Users,
    title: "Borrower Management",
    description:
      "Track multiple borrowers, their repayment history, and outstanding balances in one view.",
  },
  {
    icon: Clock,
    title: "Repayment History",
    description:
      "Complete audit trail of every payment with method, notes, and timestamps.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export const Features = () => {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold tracking-[-0.04em] md:text-5xl">
          Everything you need to{" "}
          <span className="text-primary">
            {" "}
            <Highlighter action="underline" color="#ff8b20">
              manage lending
            </Highlighter>
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          From loan creation to AI-powered insights, Lendable has your entire
          lending workflow covered.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="group rounded-xl border bg-card p-6 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
