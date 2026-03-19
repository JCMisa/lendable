"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  Handshake,
  BarChart3,
  Wallet,
  BotMessageSquare,
  ChevronRight,
  Loader2, // Added for loading state
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Added for redirection
import { completeOnboardingAction } from "@/lib/actions/onboarding";
import { useClerk } from "@clerk/nextjs";
import { showConfetti } from "@/lib/utils";

interface Slide {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  illustration: string;
  accentColor: string;
}

const slides: Slide[] = [
  {
    id: 0,
    icon: <Handshake className="h-6 w-6" />,
    title: "Peer-to-Peer Lending",
    subtitle: "Lend & Borrow with Trust",
    description:
      "Create secure loan contracts with friends, family, or anyone. Set custom interest rates, track balances in real-time, and never lose track of who owes what.",
    illustration:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&q=80",
    accentColor: "from-primary/20 to-primary/5",
  },
  {
    id: 1,
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Debt Tracking",
    subtitle: "Stay on Top of Every Peso",
    description:
      "Monitor all your active loans, repayment history, and outstanding balances from one clean dashboard. Get notified when payments are due.",
    illustration:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80",
    accentColor: "from-secondary/20 to-secondary/5",
  },
  {
    id: 2,
    icon: <Wallet className="h-6 w-6" />,
    title: "Expense Management",
    subtitle: "Budget Like a Pro",
    description:
      "Categorize spending, set budgets, and see exactly where your money goes. Beautiful charts make it easy to understand your financial habits.",
    illustration:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop&q=80",
    accentColor: "from-chart-3/20 to-chart-3/5",
  },
  {
    id: 3,
    icon: <BotMessageSquare className="h-6 w-6" />,
    title: "AI Financial Assistant",
    subtitle: "Your Personal Finance Advisor",
    description:
      "Talk to our AI-powered assistant for personalized tips, debt payoff strategies, and budgeting advice — all tailored to your financial data.",
    illustration:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&q=80",
    accentColor: "from-chart-5/20 to-chart-5/5",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
  }),
};

const Onboarding = () => {
  const clerk = useClerk();

  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false); // Handle button loading state

  // The logic to complete onboarding and move forward
  const handleFinishOnboarding = async () => {
    setLoading(true);
    try {
      const result = await completeOnboardingAction();
      if (result.success) {
        // 1. Show Confetti
        showConfetti();

        // 2. FORCE Clerk to update the local session token immediately
        await clerk?.user?.reload();

        // 3. Now redirect and refresh
        router.push("/");
        router.refresh();
      } else {
        console.error(result.error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to complete onboarding", err);
      setLoading(false);
    }
  };

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide],
  );

  const goNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [goNext, goPrev],
  );

  const slide = slides[currentSlide];
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === slides.length - 1;

  return (
    <div
      className="min-h-screen bg-background flex flex-col focus:outline-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Onboarding"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="logo" width={32} height={32} />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Lendable
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={handleFinishOnboarding} // Trigger logic on Skip
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Skip
              <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Text side */}
              <div className="order-2 md:order-1 text-center md:text-left space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {slide.icon}
                  {slide.subtitle}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 leading-relaxed"
                >
                  {slide.description}
                </motion.p>
              </div>

              {/* Image side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="order-1 md:order-2 flex justify-center"
              >
                <div
                  className={`relative w-full max-w-sm aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-br ${slide.accentColor} p-1.5`}
                >
                  <Image
                    src={slide.illustration}
                    alt={slide.title}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded-xl"
                    loading="eager"
                  />
                  {/* Decorative glow */}
                  <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl -z-10" />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer controls */}
      <footer className="px-6 pb-8 md:px-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Prev button */}
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={isFirst || loading}
            aria-label="Previous slide"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {/* Dots */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Slides"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentSlide}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goToSlide(i)}
                disabled={loading}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          {/* Next / Get Started button */}
          {isLast ? (
            <Button
              onClick={handleFinishOnboarding}
              disabled={loading}
              className="gap-2 min-w-[140px]"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={goNext}
              disabled={loading}
              aria-label="Next slide"
              className="gap-2"
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
