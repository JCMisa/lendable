import { AIFeature } from "@/components/custom/landing-page/AIFeature";
import { DashboardPreview } from "@/components/custom/landing-page/DashboardPreview";
import { Features } from "@/components/custom/landing-page/Features";
import { Footer } from "@/components/custom/landing-page/Footer";
import { Hero } from "@/components/custom/landing-page/Hero";
import { Navbar } from "@/components/custom/landing-page/Navbar";
import { Pricing } from "@/components/custom/landing-page/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      <Hero />
      <DashboardPreview />
      <Features />
      <AIFeature />
      <Pricing />
      <Footer />
    </main>
  );
}
