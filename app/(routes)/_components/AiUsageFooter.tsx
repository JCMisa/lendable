"use client";

import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { Skeleton } from "@/components/ui/skeleton";

export const AiUsageFooter = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const user = useUserStore((s) => s.userDetails);
  const isLoading = useUserStore((s) => s.isLoading);
  const router = useRouter();

  // FIX: Move redirect to useEffect to avoid rendering errors
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
    }
  }, [isLoading, user, router]);

  // 1. Fallback UI: Loading State
  if (isLoading) {
    return (
      <SidebarFooter
        className={isCollapsed ? "flex justify-center pb-6" : "px-4 pb-6"}
      >
        {isCollapsed ? (
          <Skeleton className="size-8 rounded-full" />
        ) : (
          <div className="rounded-xl bg-muted/50 p-4 border border-border/50 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-md" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-1.5 w-full" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        )}
      </SidebarFooter>
    );
  }

  // 2. Prevent rendering if user is missing (handled by useEffect redirect)
  if (!user) return null;

  const count = user?.aiSessionCount ?? 0;
  const limit = user?.aiSessionLimit ?? 3;
  const remaining = Math.max(0, limit - count);
  const progressValue = (count / limit) * 100;

  if (isCollapsed) {
    return (
      <SidebarFooter className="flex items-center justify-center pb-6">
        <Link href="/billing">
          <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:scale-110 transition-transform">
            <Sparkles className="size-4" />
          </div>
        </Link>
      </SidebarFooter>
    );
  }

  return (
    <SidebarFooter className="px-4 pb-6">
      <div className="rounded-xl bg-muted/50 p-4 border border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-primary/10 text-primary">
            <Sparkles className="size-4" />
          </div>
          <p className="text-sm font-bold tracking-tight">AI Credits</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-muted-foreground">
              {remaining} sessions left
            </span>
            <span>{limit} total</span>
          </div>
          <Progress value={progressValue} className="h-1.5" />
        </div>

        <Button
          asChild
          size="sm"
          className="w-full mt-4 bg-primary text-white font-bold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all"
        >
          <Link href="/billing">Upgrade Plan</Link>
        </Button>
      </div>
    </SidebarFooter>
  );
};
