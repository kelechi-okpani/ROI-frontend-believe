"use client";

import React from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Wallet,
  TrendingUp,
  Users,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDown,
  ArrowUp,
  CircleDollarSign
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useGetTransactionsQuery, useGetWalletQuery } from "@/store/api/transactionApiSlice";

export default function WalletPage() {
  const { data: walletData, isLoading: walletLoading, isError: walletError, refetch } = useGetWalletQuery(undefined);
  const { data: transactionData, isLoading: txLoading } = useGetTransactionsQuery(undefined);

  console.log("Wallet Data:", walletData);

  if (walletLoading || txLoading) return <WalletSkeleton />;
  if (walletError) return <WalletErrorState />;

  const wallets = [
    {
      name: "Main Wallet",
      balance: walletData?.balance || 0, 
      icon: Wallet,
      color: "hsl(var(--primary))",
      borderColor: "border-primary/20",
      iconColor: "text-primary",
      bgColor: "bg-primary/5",
      description: "Available for instant platform operations",
    },
    {
      name: "Profit Wallet",
      balance: walletData?.profitBalance || 0,
      icon: TrendingUp,
      color: "hsl(var(--emerald-500, 142.1 76.2% 36.3%))",
      borderColor: "border-emerald-500/20",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/5",
      description: "Yield earnings generated from nodes",
    },
    {
      name: "Referral Wallet",
      balance: walletData?.referralBalance || 0,
      icon: Users,
      color: "hsl(var(--amber-500, 37.9 92.1% 50.2%))",
      borderColor: "border-amber-500/20",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/5",
      description: "Affiliate network commission cycles",
    },
  ];

  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);
  const pieData = wallets.map(w => ({ name: w.name, value: w.balance, color: w.color }));

  const transactions = transactionData || [];
  const deposits = transactions.filter((t: any) => t.type === "DEPOSIT");
  const withdrawals = transactions.filter((t: any) => t.type === "WITHDRAWAL");
  const transfers = transactions.filter((t: any) => t.type === "TRANSFER");

  return (
    <>
      <DashboardHeader
        title="Asset Ledger"
        description="Consolidated capital monitoring and structural network operations balances."
      />

      <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto text-zinc-900 dark:text-zinc-50">
        
        {/* Dynamic Top Block Structure */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Main Account Balance Node Card */}
          <Card className="lg:col-span-8 bg-card border-border/60 shadow-sm relative overflow-hidden rounded-2xl group flex flex-col justify-between">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />
            
            <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full w-full space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="text-muted-foreground/90 font-mono tracking-wider uppercase text-[10px] block font-semibold">
                    Consolidated Net Balance
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-foreground">
                    ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </h2>
                </div>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl" onClick={() => refetch()}>
                  <RefreshCw size={14} />
                </Button>
              </div>

              {/* 📊 SEEDED METRIC DATA MATRIX BLOCK */}
              <div className="grid grid-cols-3 gap-2 border-y border-border/40 py-4 my-2">
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <ArrowUp className="w-3 h-3 text-emerald-500" /> Total Deposited
                  </span>
                  <p className="text-sm md:text-base font-bold font-mono text-foreground">
                    ${(walletData?.totalDeposited || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                
                <div className="space-y-1 border-x border-border/40 px-3">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <ArrowDown className="w-3 h-3 text-red-500" /> Total Withdrawn
                  </span>
                  <p className="text-sm md:text-base font-bold font-mono text-foreground">
                    ${(walletData?.totalWithdrawn || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="space-y-1 pl-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <CircleDollarSign className="w-3 h-3 text-primary" /> Active Invested
                  </span>
                  <p className="text-sm md:text-base font-bold font-mono text-foreground">
                    ${(walletData?.totalInvested || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                <Button 
                  asChild 
                  size="sm" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-8 text-xs font-semibold px-4 shadow-sm transition-colors border-none"
                >
                  <Link href="/dashboard/deposit" className="flex items-center gap-1.5">
                    <ArrowUpCircle className="w-3.5 h-3.5" /> Capital Deposit
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  size="sm" 
                  variant="outline" 
                  className="border-input bg-background text-foreground rounded-xl h-8 text-xs font-semibold px-4 transition-colors shadow-sm"
                >
                  <Link href="/dashboard/withdraw" className="flex items-center gap-1.5">
                    <ArrowDownCircle className="w-3.5 h-3.5" /> Liquidate Withdraw
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Allocation Breakdown Chart Card */}
          <Card className="lg:col-span-4 bg-card/40 backdrop-blur-md border-border/60 shadow-sm rounded-2xl flex flex-col justify-between">
            <CardHeader className="pb-2 pt-4 px-5 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground">Weight Distribution</CardTitle>
              <Badge variant="outline" className="text-[9px] font-mono tracking-tight text-muted-foreground bg-muted/40 border-border/40">REALTIME</Badge>
            </CardHeader>
            <CardContent className="px-5 pb-4 flex items-center justify-center h-full min-h-[140px]">
              <div className="w-full h-32 relative flex items-center justify-center">
                {totalBalance === 0 ? (
                  <div className="text-[10px] font-mono text-muted-foreground border border-dashed rounded-xl p-4 w-full h-full flex items-center justify-center">
                    No Assets Allocated
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={38}
                        outerRadius={52}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, ""]}
                        contentStyle={{ backgroundColor: "black", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", fontSize: "11px", color: "white", fontFamily: "monospace" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Segmented Wallet Tiers Matrix */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map((wallet) => (
            <Card key={wallet.name} className="bg-card/40 backdrop-blur-md border-border/60 shadow-sm rounded-2xl transition-all hover:border-border">
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl border ${wallet.borderColor} ${wallet.bgColor} flex items-center justify-center shrink-0`}>
                      <wallet.icon className={`w-4 h-4 ${wallet.iconColor}`} />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-foreground tracking-tight">{wallet.name}</h4>
                      <p className="text-[10px] text-muted-foreground leading-normal max-w-[180px] sm:max-w-none truncate">{wallet.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-2xl font-bold font-mono tracking-tight text-foreground">
                    ${wallet.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                  
                  <div className="flex gap-1.5">
                    {wallet.name === "Main Wallet" ? (
                      <>
                        <Button asChild variant="secondary" size="sm" className="flex-1 h-7 rounded-lg text-[11px] font-semibold bg-muted hover:bg-muted/80 border border-border/20 text-foreground cursor-pointer">
                          <Link href="/dashboard/deposit">Deposit</Link>
                        </Button>
                        <Button asChild variant="secondary" size="sm" className="flex-1 h-7 rounded-lg text-[11px] font-semibold bg-muted hover:bg-muted/80 border border-border/20 text-foreground cursor-pointer">
                          <Link href="/dashboard/withdraw">Withdraw</Link>
                        </Button>
                      </>
                    ) : (
                      <Button variant="ghost" size="sm" className="w-full h-7 rounded-lg text-[11px] font-semibold bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 cursor-pointer">
                        Transfer to Main Terminal
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transaction History Pipeline Grid */}
        <Card className="bg-card/40 backdrop-blur-md border-border/60 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
            <div className="space-y-0.5">
              <CardTitle className="text-sm font-bold tracking-tight">Ledger Stream</CardTitle>
              <p className="text-xs text-muted-foreground">Historical accounting data transactions pipeline</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs h-7 px-2 font-medium text-muted-foreground hover:text-foreground">
              <Link href="/dashboard/transactions" className="flex items-center gap-0.5">
                Full Stream <ChevronRight className="w-3 h-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-muted/50 p-0.5 h-8 gap-0.5 rounded-lg border border-border/30 mb-4 inline-flex">
                <TabsTrigger value="all" className="rounded-md text-[11px] font-medium px-3 py-1 data-[state=active]:bg-background data-[state=active]:shadow-sm">All</TabsTrigger>
                <TabsTrigger value="deposits" className="rounded-md text-[11px] font-medium px-3 py-1 data-[state=active]:bg-background data-[state=active]:shadow-sm">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals" className="rounded-md text-[11px] font-medium px-3 py-1 data-[state=active]:bg-background data-[state=active]:shadow-sm">Withdrawals</TabsTrigger>
                <TabsTrigger value="transfers" className="rounded-md text-[11px] font-medium px-3 py-1 data-[state=active]:bg-background data-[state=active]:shadow-sm">Transfers</TabsTrigger>
              </TabsList>
              
              <div className="rounded-xl border border-border/40 overflow-hidden bg-background/20">
                <TabsContent value="all" className="m-0">
                  <TransactionList items={transactions} />
                </TabsContent>
                <TabsContent value="deposits" className="m-0">
                  <TransactionList items={deposits} emptyMessage="No asset deposits recorded." />
                </TabsContent>
                <TabsContent value="withdrawals" className="m-0">
                  <TransactionList items={withdrawals} emptyMessage="No liquidity liquidations recorded." />
                </TabsContent>
                <TabsContent value="transfers" className="m-0">
                  <TransactionList items={transfers} emptyMessage="No inter-wallet settlements recorded." />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function TransactionList({ items, emptyMessage = "No transactions found" }: { items: any[], emptyMessage?: string }) {
  if (items.length === 0) {
    return <div className="text-center py-10 text-xs font-mono text-muted-foreground bg-muted/10">{emptyMessage}</div>;
  }

  return (
    <div className="divide-y divide-border/40">
      {items.map((tx) => {
        const isOutflow = tx.type === "WITHDRAWAL";
        return (
          <div key={tx._id || tx.id} className="flex items-center justify-between p-3.5 hover:bg-muted/40 transition-colors bg-background/40">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                isOutflow ? "bg-red-500/5 border-red-500/10 text-red-500" : "bg-emerald-500/5 border-emerald-500/10 text-emerald-500"
              }`}>
                {isOutflow ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
              </div>
              <div className="min-w-0 space-y-0.5">
                <p className="text-xs font-bold text-foreground capitalize tracking-tight">{tx.type}</p>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {tx.wallet || 'Main'} Asset • {new Date(tx.createdAt || tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
            
            <div className="text-right space-y-1 shrink-0 pl-4">
              <p className={`text-xs font-bold font-mono tracking-tight ${isOutflow ? "text-red-500" : "text-emerald-500"}`}>
                {isOutflow ? "-" : "+"}${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
      })}
    </div>
  );
}

function WalletSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="grid lg:grid-cols-12 gap-6">
        <Skeleton className="h-[200px] lg:col-span-8 rounded-2xl" />
        <Skeleton className="h-[200px] lg:col-span-4 rounded-2xl" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Skeleton className="h-36 rounded-2xl" />
        <Skeleton className="h-36 rounded-2xl" />
        <Skeleton className="h-36 rounded-2xl" />
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}

function WalletErrorState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-bold tracking-tight">System Settlement Sync Error</h2>
        <p className="text-xs text-muted-foreground max-w-sm">Failed to authenticate network ledger stream balances. Please reinitialize the dashboard.</p>
      </div>
      <Button size="sm" className="rounded-xl h-8 text-xs font-medium px-6" onClick={() => window.location.reload()}>Retry Ledger Stream</Button>
    </div>
  );
}