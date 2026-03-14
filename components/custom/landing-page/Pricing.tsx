"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Highlighter } from "./magic-ui/highlighter";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For individuals getting started with personal lending.",
    features: [
      "Up to 3 active loans",
      "Basic expense tracking",
      "3 AI consultations/month",
      "Repayment history",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    description: "For active lenders who need full control and insights.",
    features: [
      "Unlimited active loans",
      "Advanced analytics",
      "Unlimited AI consultations",
      "Automated interest accrual",
      "Priority support",
      "Export reports",
    ],
    popular: true,
    cta: "Start Free Trial",
  },
  {
    name: "Business",
    price: "$29",
    period: "/mo",
    description: "For teams and organizations managing multiple portfolios.",
    features: [
      "Everything in Pro",
      "Multi-user access",
      "Custom interest periods",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold tracking-[-0.04em] md:text-5xl">
          Simple, transparent{" "}
          <span className="text-primary">
            {" "}
            <Highlighter action="underline" color="#ff8b20">
              pricing
            </Highlighter>
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Start free and scale as you grow. No hidden fees, no surprises.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {TIERS.map((tier, idx) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`relative flex flex-col rounded-xl border p-6 ${
              tier.popular
                ? "border-primary bg-card shadow-xl shadow-primary/10"
                : "bg-card"
            }`}
          >
            {tier.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className="text-muted-foreground">{tier.period}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {tier.description}
              </p>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={tier.popular ? "default" : "outline"}
              className="w-full"
            >
              {tier.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
