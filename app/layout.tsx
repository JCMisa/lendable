import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/ThemeProvider";
import { Toaster } from "sileo";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { UserStoreWatcher } from "@/providers/UserStoreWatcher";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist", // This creates a CSS variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lendable",
  description:
    "Lendable is a secure peer-to-peer lending and finance platform that lets you loan money to users, track debts, manage expenses, and consult an AI financial assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${urbanist.variable} font-sans antialiased `}>
        <ClerkProvider
          appearance={{
            theme: shadcn,
            variables: { colorPrimary: "#eb003f" },
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <UserStoreWatcher />
              {children}
            </TooltipProvider>
            <Toaster position="top-center" />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
