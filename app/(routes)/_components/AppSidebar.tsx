"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Handshake,
  Wallet,
  BotMessageSquare,
  Users,
  Settings,
  History,
  TrendingUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AiUsageFooter } from "./AiUsageFooter";

const menuItems = {
  admin: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "All Loans",
      url: "/admin/loans",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      title: "System Users",
      url: "/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],
  user: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "My Loans",
      url: "/loans",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      title: "Repayments",
      url: "/repayments",
      icon: <History className="w-5 h-5" />,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      title: "AI Assistant",
      url: "/ai-consultation",
      icon: <BotMessageSquare className="w-5 h-5" />,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: "admin" | "user";
}

export function AppSidebar({ userRole = "user", ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const items = menuItems[userRole] || [];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div
          className={`mb-3 ${isCollapsed ? "flex justify-center mt-3" : ""}`}
        >
          {!isCollapsed ? (
            <Link href={"/"} className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                loading="lazy"
                alt="logo"
                width={40}
                height={40}
              />
              <p className="font-extrabold tracking-wider text-2xl">Lendable</p>
            </Link>
          ) : (
            <Link href="/">
              <Image
                src="/logo.svg"
                loading="lazy"
                alt="logo"
                width={20}
                height={20}
              />
            </Link>
          )}
        </div>
      </SidebarHeader>

      <Separator orientation="horizontal" />

      <SidebarContent className="custom-scrollbar mt-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center py-8 relative transition-all duration-300",
                        pathname.startsWith(item.url)
                          ? "bg-primary! text-white! shadow-[0_0_20px_rgba(0,0,0,0.1)] shadow-primary/50"
                          : "text-muted-foreground! hover:bg-muted!",
                      )}
                    >
                      <div className="size-10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="text-lg! tracking-wider font-extrabold!">
                        {!isCollapsed && item.title}
                      </div>
                      {pathname.startsWith(item.url) && !isCollapsed && (
                        <div className="absolute right-4 size-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <AiUsageFooter isCollapsed={isCollapsed} />

      <SidebarRail />
    </Sidebar>
  );
}
