"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bitcoin,
  Coins,
  Wallet,
  TrendingUp,
  Users,
  AlertCircle,
  ArrowDownCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useGetTransactionsQuery, useGetWalletQuery, useRequestWithdrawalMutation } from "@/store/api/transactionApiSlice";
import TeslaFleetMonitor from "@/components/reuse/TeslaFleetMonitor";

const withdrawMethods = [
  { id: "bitcoin", name: "Bitcoin", icon: Bitcoin, description: "BTC withdrawal", minAmount: 50, fee: "Network fee" },
  { id: "usdt", name: "USDT (TRC20)", icon: Coins, description: "Tether stablecoin", minAmount: 50, fee: "1 USDT" },
];

export default function WithdrawPage() {
  // 1. API Hooks
  const { data: walletData, isLoading: isWalletLoading } = useGetWalletQuery(undefined);
  const { data: transactions } = useGetTransactionsQuery(undefined);
  const [requestWithdrawal, { isLoading: isSubmitting }] = useRequestWithdrawalMutation();

  // 2. Local State
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);

  // Form Details State
  const [details, setDetails] = useState({
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountHolder: "",
    address: "",
  });

  // 3. Derived Data
  const wallets = [
    { id: "main", name: "Main Wallet", balance: walletData?.balance || 0, icon: Wallet },
    { id: "profit", name: "Profit Wallet", balance: walletData?.profitBalance || 0, icon: TrendingUp },
    { id: "referral", name: "Referral Wallet", balance: walletData?.referralBalance || 0, icon: Users },
  ];

  const selectedWalletData = wallets.find((w) => w.id === selectedWallet);
  const currentMethod = withdrawMethods.find((m) => m.id === selectedMethod);
  
  // Filter for matching variants from transaction API data logs
  const withdrawalHistory = transactions?.filter((t: any) => t.type?.toUpperCase() === "WITHDRAWAL").slice(0, 3) || [];

  // 4. Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  const handleWithdrawalRequest = async () => {
    if (!selectedWallet || !selectedMethod || !amount) {
      return toast.error("Please fill in all required fields");
    }

    const numericalAmount = Number(amount);

    if (numericalAmount < (currentMethod?.minAmount || 0)) {
      return toast.error(`Minimum withdrawal for this method is $${currentMethod?.minAmount}`);
    }

    console.log("Selected Wallet:", selectedWallet);


    if (numericalAmount > (selectedWalletData?.balance || 0)) {
      return toast.error(`Insufficient balance in ${selectedWallet} wallet`);
    }

    if (!details.address.trim()) {
      return toast.error("Please enter a valid destination address");
    }

    try {
      const payload = {
        amount: numericalAmount,
        walletType: selectedWallet, // Matches back-end mapping check (main, profit, referral)
        method: selectedMethod.toUpperCase(),
        bankDetails: {
          address: details.address.trim()
        }
      };

      await requestWithdrawal(payload).unwrap();
      
      toast.success("Withdrawal request submitted successfully");
      
      // Reset form setup state completely
      setAmount("");
      setDetails({ bankName: "", accountNumber: "", routingNumber: "", accountHolder: "", address: "" });
      setStep(1);
      setSelectedWallet("");
      setSelectedMethod(null);
    } catch (err: any) {
      console.log("Withdrawal request failed:", err);
      toast.error(err?.data?.error || "Failed to process withdrawal");
    }
  };

  return (
    <>
      <DashboardHeader title="Withdraw" description="Move funds from your wallets to your personal accounts" />

      <div className="p-6 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Select Wallet */}
            <Card className={step !== 1 ? "opacity-60 transition-opacity" : ""}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>1</div>
                  <CardTitle>Select Wallet</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {wallets.map((wallet) => (
                    <button
                      type="button"
                      key={wallet.id}
                      disabled={isWalletLoading || isSubmitting}
                      onClick={() => { setSelectedWallet(wallet.id); setStep(2); }}
                      className={`p-4 rounded-xl border text-left transition-all ${selectedWallet === wallet.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <wallet.icon className="w-4 h-4 text-foreground" />
                        </div>
                        <span className="text-sm font-medium">{wallet.name}</span>
                      </div>
                      <p className="text-lg font-bold">${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Withdrawal Method */}
            {step >= 2 && (
              <Card className={step !== 2 ? "opacity-60 transition-opacity" : ""}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">2</div>
                    <CardTitle>Withdrawal Method</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {withdrawMethods.map((method) => (
                      <button
                        type="button"
                        key={method.id}
                        disabled={isSubmitting}
                        onClick={() => { setSelectedMethod(method.id); setStep(3); }}
                        className={`p-4 rounded-xl border text-left transition-all ${selectedMethod === method.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <method.icon className="w-5 h-5 text-primary" />
                          <span className="font-medium text-sm">{method.name}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mb-2">{method.description}</p>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2">
                          <span>Min: ${method.minAmount}</span>
                          <span>Fee: {method.fee}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Details */}
            {step >= 3 && selectedMethod && (
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">3</div>
                    <CardTitle>Transfer Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount to Withdraw (USD)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">$</span>
                      <Input
                        id="amount"
                        type="number"
                        className="pl-7 mt-1"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">Available: ${selectedWalletData?.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      <button 
                        type="button"
                        className="text-primary hover:underline font-medium"
                        onClick={() => setAmount(selectedWalletData?.balance.toString() || "0")}
                      >
                        Max Amount
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 pt-4 border-t">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Destination {currentMethod?.name} Address</Label>
                        <Input 
                          id="address" 
                          value={details.address} 
                          onChange={handleInputChange} 
                          placeholder={`Enter your ${currentMethod?.name} wallet address`}
                        />
                      </div>
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg flex gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 dark:text-amber-400">
                          Ensure the address is correct for the <b>{selectedMethod === 'usdt' ? 'TRC20' : 'BTC'}</b> network. Out-of-network transfers cannot be reversed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={handleWithdrawalRequest}
                    disabled={isSubmitting || !amount || Number(amount) <= 0}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
                    ) : (
                      <><ArrowDownCircle className="w-4 h-4 mr-2" /> Confirm Withdrawal</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Source</span>
                  <span className="font-medium capitalize">{selectedWallet ? `${selectedWallet} Wallet` : "---"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Method</span>
                  <span className="font-medium">{currentMethod?.name || "---"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="text-green-600 font-medium">{currentMethod?.fee || "$0.00"}</span>
                </div>
                <div className="pt-3 border-t flex justify-between items-baseline">
                  <span className="font-semibold text-sm">Settlement</span>
                  <span className="text-xl font-bold">${Number(amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {withdrawalHistory.length > 0 ? withdrawalHistory.map((w: any) => (
                  <div key={w._id || Math.random().toString()} className="flex justify-between items-center border-b border-muted pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="text-xs font-medium">${w.amount ? w.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{w.method?.replace("_", " ") || "WITHDRAWAL"}</p>
                    </div>
                    <Badge variant={w.status?.toUpperCase() === "COMPLETED" ? "secondary" : "outline"} className="text-[9px] uppercase tracking-tight">
                      {w.status?.toLowerCase()}
                    </Badge>
                  </div>
                )) : (
                  <p className="text-center text-xs text-muted-foreground py-4">No recent withdrawals</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* <TeslaFleetMonitor /> */}
    </>
  );
}