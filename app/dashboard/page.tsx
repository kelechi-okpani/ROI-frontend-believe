"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
  Users,
  ArrowRight,
  Clock,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";
import Link from "next/link";
import { useGetProfileQuery, useGetUserStatsQuery } from "@/store/api/userApiSlice";

const HERO_SLIDES = [
  {
    title: "Megapack Power Utility Grid",
    description: "Industrial energy storage scaling. Real-time distribution network targeting +22% yield for Q3.",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=1200&auto=format&fit=crop",
    tag: "ENERGY_CORE",
  },
  {
    title: "Cybercab Autonomous Mobility Fleet",
    description: "Fractional decentralized ownership of urban tokenized transport networks is live.",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
    tag: "ROBOTAXI_POOL",
  },
];

export default function DashboardPage() {
  
  const { data: stats, isLoading, isError } = useGetUserStatsQuery("stats");
  const { data: profile } = useGetProfileQuery("profile");
  const [currentSlide, setCurrentSlide] = useState(0);

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <DashboardError />;

  const walletCards = [
    { name: "Main Wallet", balance: stats?.overview?.mainBalance || 0, icon: Wallet, color: "bg-blue-600/10 text-blue-500 border-blue-500/20" },
    { name: "Profit Wallet", balance: stats?.overview?.profitBalance || 0, icon: TrendingUp, color: "bg-emerald-600/10 text-emerald-500 border-emerald-500/20" },
    { name: "Referral Wallet", balance: stats?.overview?.referralBalance || 0, icon: Users, color: "bg-amber-600/10 text-amber-500 border-amber-500/20" },
  ];

  const recentActivities = stats?.recentActivity || [];

  return (
    <>
      <DashboardHeader
        title="Executive Overview"
        description={`Welcome back, ${profile?.firstName || 'Portfolio Manager'}. Monitoring ${stats?.investments?.activeCount || 0} active asset infrastructure nodes.`}
      />

      <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto text-zinc-900 dark:text-zinc-50">
        
        {/* Interactive Glassmorphism Hero Slider */}
        <div className="relative h-[280px] w-full rounded-2xl overflow-hidden group shadow-lg border border-border/40 bg-muted/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <img 
                src={HERO_SLIDES[currentSlide].image} 
                className="w-full h-full object-cover brightness-[0.35] transition-transform duration-700 group-hover:scale-102" 
                alt="Asset Channel Portfolio"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2 max-w-xl z-10">
                <Badge className="bg-red-600/10 text-red-500 border border-red-500/20 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                  {HERO_SLIDES[currentSlide].tag}
                </Badge>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  {HERO_SLIDES[currentSlide].title}
                </h2>
                <p className="text-xs md:text-sm text-zinc-300 font-medium leading-relaxed">
                  {HERO_SLIDES[currentSlide].description}
                </p>
                <Button asChild size="sm" className="rounded-xl h-8 text-xs font-semibold px-4 bg-white text-zinc-950 hover:bg-zinc-200 mt-2 cursor-pointer">
                  <Link href="/dashboard/investments" className="flex items-center">
                    Allocate Capital <ArrowRight className="ml-1 w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Precision Controls */}
          <div className="absolute right-4 bottom-4 flex gap-1.5 z-20">
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-lg w-7 h-7 bg-black/40 backdrop-blur-md border-white/10 text-white hover:bg-black/60 cursor-pointer"
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-lg w-7 h-7 bg-black/40 backdrop-blur-md border-white/10 text-white hover:bg-black/60 cursor-pointer"
              onClick={() => setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Dynamic Metric Tiers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="lg:col-span-2 bg-card border border-border/60 shadow-sm overflow-hidden relative group rounded-2xl">
            <div className="absolute top-[-30%] right-[-10%] w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div className="space-y-0.5">
                <span className="text-muted-foreground/90 font-mono tracking-wider uppercase text-[10px] block font-medium">
                  Consolidated Asset Value
                </span>
                <p className="text-2xl font-bold font-mono tracking-tight text-foreground">
                  ${stats?.overview?.totalBalance?.toLocaleString("en-US", { minimumFractionDigits: 2 }) || "0.00"}
                </p>
              </div>
              
              <div className="flex gap-2 mt-5">
                <Button asChild size="sm" className="rounded-xl h-7 text-xs font-semibold px-3.5 shadow-sm cursor-pointer">
                  <Link href="/dashboard/deposit">Deposit</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-xl h-7 text-xs text-foreground font-semibold px-3.5 border-border bg-background cursor-pointer">
                  <Link href="/dashboard/withdraw">Withdraw</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {walletCards.slice(1).map((wallet) => (
            <Card key={wallet.name} className="bg-card/40 backdrop-blur-md border-border/60 shadow-sm rounded-2xl">
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl border ${wallet.color} flex items-center justify-center`}>
                    <wallet.icon className="w-4 h-4" />
                  </div>
                  <Badge variant="outline" className="text-[9px] font-mono tracking-tight text-muted-foreground bg-muted/40 border-border/40">
                    REALTIME
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs font-semibold block">{wallet.name}</span>
                  <p className="text-xl font-bold font-mono tracking-tight text-foreground mt-0.5">
                    ${wallet.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Matrix Breakdown Grid Split */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Active Allocations Feed View */}
          <Card className="lg:col-span-4 bg-card/40 backdrop-blur-md border-border/60 shadow-sm rounded-2xl flex flex-col justify-between">
            <div>
              <CardHeader className="flex flex-row items-center justify-between pb-4 pt-5 px-5">
                <CardTitle className="text-sm font-bold tracking-tight">Active Hardware Contracts</CardTitle>
                <Button asChild variant="ghost" size="sm" className="text-xs h-7 px-2 font-medium text-muted-foreground hover:text-foreground">
                  <Link href="/dashboard/investments" className="flex items-center">Marketplace <ChevronRight className="ml-0.5 w-3 h-3" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="px-5 space-y-3">
                {(!stats?.investments?.items || stats.investments.items.length === 0) ? (
                  <div className="text-center py-12 border border-dashed rounded-xl border-border/50 bg-muted/10">
                    <Clock className="w-5 h-5 mx-auto text-muted-foreground/60 mb-2 stroke-[1.5]" />
                    <p className="text-xs font-bold text-foreground">No Active Nodes Available</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Deploy available balance into computing instances.</p>
                  </div>
                ) : (
                  stats.investments.items.slice(0, 3).map((investment: any, index: number) => {
                    const isMegapack = investment.planName?.toLowerCase().includes("megapack");
                    return (
                      <div key={index} className="p-3 rounded-xl bg-muted/40 border border-border/40 hover:bg-muted/70 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0 overflow-hidden border border-border/20">
                            <img 
                              src={isMegapack ? HERO_SLIDES[0].image : HERO_SLIDES[1].image} 
                              className="w-full h-full object-cover opacity-90" 
                              alt="Instance Preview"
                            />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold truncate text-foreground">{investment.planName || "Asset Node"}</h4>
                              <span className="text-[11px] font-mono font-bold text-emerald-500">+{investment.profit}%</span>
                            </div>
                            <Progress value={investment.progress || 0} className="h-1 bg-muted/80" />
                            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                              <span>{investment.daysLeft} days left</span>
                              <span className="font-bold text-foreground">${investment.amount?.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </div>
            
            <div className="p-5 pt-0">
              <Button asChild size="sm" className="w-full h-8 text-xs rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 font-semibold cursor-pointer">
                <Link href="/dashboard/investments" className="w-full h-full flex items-center justify-center">
                  Diversify Allocations
                </Link>
              </Button>
            </div>
          </Card>

          {/* Ledger Pipeline History Section */}
          <Card className="lg:col-span-8 bg-card/40 backdrop-blur-md border-border/60 shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-bold tracking-tight">Ledger Operations Stream</CardTitle>
                <p className="text-xs text-muted-foreground">Real-time terminal transaction balance modifications feed</p>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-xs h-7 px-2 font-medium text-muted-foreground hover:text-foreground cursor-pointer">
                <Link href="/dashboard/transactions" className="flex items-center gap-0.5">
                  Full Stream <ChevronRight className="w-3 h-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="rounded-xl border border-border/40 overflow-hidden bg-background/20 divide-y divide-border/40">
                {recentActivities.length === 0 ? (
                  <div className="text-center py-8 text-xs font-mono text-muted-foreground bg-muted/10">
                    No execution balances indexed.
                  </div>
                ) : (
                  recentActivities.map((tx: any) => {
                    const isOutflow = tx.type === "WITHDRAWAL";
                    return (
                      <div key={tx.id} className="flex items-center justify-between p-3.5 hover:bg-muted/40 transition-colors bg-background/40">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                            isOutflow ? "bg-red-500/5 border-red-500/10 text-red-500" : "bg-emerald-500/5 border-emerald-500/10 text-emerald-500"
                          }`}>
                            {isOutflow ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                          </div>
                          <div className="min-w-0 space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-foreground capitalize tracking-tight">{tx.type.toLowerCase()}</p>
                              <span className="text-[9px] font-mono text-muted-foreground bg-muted border px-1.5 py-0.2 rounded-md">{tx.reference}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground font-mono">
                              {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right space-y-1 shrink-0 pl-4">
                          <p className={`text-xs font-bold font-mono tracking-tight ${isOutflow ? "text-red-500" : "text-emerald-500"}`}>
                            {isOutflow ? "-" : "+"}${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </p>
                          <Badge 
                            variant="outline"
                            className={`text-[9px] font-mono tracking-tighter px-1.5 h-4 border-none rounded-md flex items-center justify-end gap-1 ${
                              tx.status === "COMPLETED" ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"
                            }`}
                          >
                            {tx.status === "COMPLETED" ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <Skeleton className="h-[280px] w-full rounded-2xl" />
      <div className="grid md:grid-cols-4 gap-4">
        <Skeleton className="h-[120px] lg:col-span-2 rounded-2xl" />
        <Skeleton className="h-[120px] rounded-2xl" />
        <Skeleton className="h-[120px] rounded-2xl" />
      </div>
      <div className="grid lg:grid-cols-12 gap-6">
        <Skeleton className="h-[320px] lg:col-span-8 rounded-2xl" />
        <Skeleton className="h-[320px] lg:col-span-4 rounded-2xl" />
      </div>
    </div>
  );
}

function DashboardError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-bold tracking-tight">System Sync Error</h2>
        <p className="text-xs text-muted-foreground max-w-sm">Failed to authenticate network streams. Please reinitialize connection terminal.</p>
      </div>
      <Button size="sm" className="rounded-lg h-8 text-xs font-medium px-6" onClick={() => window.location.reload()}>Retry Stream</Button>
    </div>
  );
}