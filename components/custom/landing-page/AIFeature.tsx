"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Mic, MessageSquare, ShieldCheck } from "lucide-react";
import HeroVideoDialog from "./magic-ui/hero-video-dialog";

interface AICapability {
  icon: React.ElementType;
  text: string;
}

const CAPABILITIES: AICapability[] = [
  { icon: Mic, text: "Voice-activated financial consulting" },
  { icon: MessageSquare, text: "Automated repayment summaries" },
  { icon: ShieldCheck, text: "Risk assessment for new borrowers" },
];

export const AIFeature = () => {
  return (
    <section id="ai" className="bg-neutral-50 dark:bg-neutral-950 py-24 ">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-[-0.04em] text-background dark:text-foreground">
              Your personal CFO, <br />
              <span className="text-secondary">powered by AI.</span>
            </h2>
            <p className="mb-8 text-lg text-background/60 dark:text-muted-foreground">
              Lendable doesn&apos;t just track numbers. Our AI Assistant
              analyzes your lending habits, predicts repayment risks, and helps
              you optimize your interest periods for maximum growth.
            </p>
            <ul className="space-y-4">
              {CAPABILITIES.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 text-background/80 dark:text-foreground/80"
                >
                  <item.icon className="h-5 w-5 text-secondary" />
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* video container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <HeroVideoDialog
              animationStyle="from-center"
              videoSrc="/futuristic-vid.mp4"
              thumbnailSrc="/hero-thumbnail.jpg"
              thumbnailAlt="Dummy Video Thumbnail"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
