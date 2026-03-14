"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import ScatterText from "./magic-ui/ScatterText";
import { BackgroundBeams } from "./magic-ui/background-beams";

export const Hero = () => {
  const { user } = useUser();

  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <BackgroundBeams />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Secure P2P Lending Now Live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-5xl font-bold tracking-[-0.04em] md:text-7xl"
          >
            Lend with <span className="text-primary">confidence</span>.{" "}
            <br className="hidden sm:block" />
            Track with <ScatterText text="precission" />.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            The modern standard for peer-to-peer finance. Manage loans, automate
            interest accruals, and consult your personal AI financial advisor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-semibold"
            >
              <Link href={user ? "/dashboard" : "sign-in"}>
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-semibold"
            >
              <Sparkles className="mr-2 h-4 w-4 text-secondary" />
              Try AI Advisor
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] dark:bg-primary/10" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-secondary/15 blur-[100px] dark:bg-secondary/5" />
      </div>
    </section>
  );
};
