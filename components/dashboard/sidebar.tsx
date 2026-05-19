"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard, 
  Wallet, 
  TrendingUp,     
  ArrowDownLeft,  
  ArrowUpRight,   
  ArrowUpCircle,
  ArrowDownCircle,
  History,
  Users,
  Bell,
  MessageSquare,
  Settings,
  User,
  LogOut,
  Menu,
  ChevronRight,
  Percent,
  LineChart,
  CandlestickChart,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "../reuse/Logo";

export const sidebarLinks = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Deposit",
    href: "/dashboard/deposit",
    icon: ArrowDownLeft,
  },
  {
    title: "Withdraw",
    href: "/dashboard/withdraw",
    icon: ArrowUpRight,
  },
  {
    title: "Market Stocks",
    href: "/dashboard/stock",
    icon: CandlestickChart, // Changed from History: visually signifies active market charts
  },
  {
    title: "Investment Plan",
    href: "/dashboard/investments",
    icon: LineChart,        // Changed from TrendingUp: cleaner look for custom navigation blocks
  },
  {
    title: "Investment ROI",
    href: "/dashboard/roi",
    icon: Percent,          // Fixed Casing & Changed from History: visually highlights interest rates / yield accruals
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: History,          // Left as History: represents financial ledger records
  },
];

const bottomLinks = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  // {
  //   title: "Settings",
  //   href: "/dashboard/settings",
  //   icon: Settings,
  // },
];
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    /* Tesla Dark Console Canvas */
    // <div className="flex flex-col h-full bg-[#111111] text-[#f2f2f2] antialiased">
    <div className="flex flex-col h-full bg-[#444444] text-[#f2f2f2] antialiased">
      
      {/* Upper Brand Module Area */}
      <div className="h-20 px-6 flex items-center border-b border-zinc-900/60">
        <Logo /> 
      </div>

      {/* Primary Infrastructure Stream Navigation */}
      <ScrollArea className="flex-1 py-4">
        <div className="px-3 space-y-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={onNavigate} className="block">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3.5 h-11 px-4 cursor-pointer text-zinc-400 font-medium text-xs tracking-wide rounded-xl transition-all duration-200 hover:text-white hover:bg-zinc-900",
                    isActive && "bg-zinc-900 text-white font-semibold shadow-sm border border-zinc-800/50"
                  )}
                >
                  <link.icon className={cn("w-4 h-4 text-zinc-500 transition-colors duration-200", isActive && "text-white")} />
                  <span className="tracking-tight">{link.title}</span>
                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-white" />
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* System Configurations Terminal Node Blocks */}
      <div className="p-3 border-t border-zinc-900/60 space-y-1 bg-[#0d0d0d]/40">
        {bottomLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} onClick={onNavigate} className="block">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3.5 h-10 px-4 text-zinc-400 text-xs font-medium tracking-wide rounded-xl transition-all duration-200 hover:text-white hover:bg-zinc-900",
                  isActive && "bg-zinc-900 text-white font-semibold"
                )}
              >
                <link.icon className={cn("w-4 h-4 text-zinc-500", isActive && "text-white")} />
                <span className="tracking-tight">{link.title}</span>
              </Button>
            </Link>
          );
        })}
        
        <Link href="/auth/login" onClick={onNavigate} className="block">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3.5 h-10 px-4 text-zinc-400 text-xs font-medium tracking-wide rounded-xl transition-all duration-200 hover:text-red-400 hover:bg-red-500/5 group"
          >
            <LogOut className="w-4 h-4 text-zinc-500 group-hover:text-red-400 transition-colors" />
            <span className="tracking-tight">Logout Terminal</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}



export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Persistent Infrastructure Column */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 border-r border-zinc-900 bg-[#111111] z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Dynamic Sheet Menu Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-40 bg-[#111111] border border-zinc-800 text-white hover:bg-zinc-900 rounded-xl w-9 h-9 shadow-md"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 border-r border-zinc-900 bg-[#111111]">
          <SidebarContent onNavigate={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
