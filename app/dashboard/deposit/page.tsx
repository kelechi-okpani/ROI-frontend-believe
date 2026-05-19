"use client";

import { useState, useRef, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress"; 
import { Badge } from "@/components/ui/badge";
import {
  Bitcoin,
  Upload,
  Copy,
  Loader2,
  CheckCircle,
  Coins,
  ChevronRight,
  ShieldCheck,
  Zap,
  Wallet,  
  CircleDot, 
  Hexagon, 
  Gauge
} from "lucide-react";
import { toast } from "sonner";
import useUploader from "@/components/useUploader";
import { useRouter } from "next/navigation";
import { useRequestDepositMutation } from "@/store/api/transactionApiSlice";
import { useGetAdminWalletAddressesQuery } from "@/store/api/admin/walletAddressApiSlice";
import { Skeleton } from "@/components/ui/skeleton";



const paymentMethods = [
  { id: "bitcoin", name: "Bitcoin", icon: Bitcoin, description: "BTC Core Payments", processingTime: "10-30 mins" },
  { id: "usdt", name: "USDT (TRC20)", icon: Coins, description: "Tether Stablecoin", processingTime: "5-15 mins" },
];


const getWalletIcon = (network: string = "", name: string = "") => {
  const normalizedNetwork = network.toUpperCase().trim();
  const normalizedName = name.toUpperCase().trim();

  // Handle Bitcoin variations
  if (normalizedNetwork.includes("BITCOIN") || normalizedNetwork === "BTC" || normalizedName.includes("BTC")) {
    return CircleDot; // Clean minimal accent placeholder for Bitcoin
  }
  
  // Handle Tether / USD Coin Stablecoin tokens
  if (normalizedNetwork.includes("TRC") || normalizedNetwork.includes("ERC") || normalizedName.includes("USDT") || normalizedName.includes("USDC")) {
    return Hexagon; // Sharp architectural layout icon for structural ledger tokens
  }

  // Handle Solana / BNB alternative layer 1 infrastructures
  if (normalizedNetwork.includes("SOL") || normalizedNetwork.includes("BEP") || normalizedNetwork.includes("BSC")) {
    return Gauge; // Technical utility system asset tracker icon
  }

  // Absolute fallback configuration safety asset
  return Coins;
};



const carouselSlides = [
  {
    title: "Cyber-Taxi Fleet Alpha",
    subtitle: "Targeting up to 22.0% ROI",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Megapack Utility Core V2",
    subtitle: "High-Availability Power Grid",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Dojo Supercomputing Node",
    subtitle: "Next-Gen AI Telemetry Engine",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop"
  }
];

export default function DepositPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedMethodName, setSelectedMethodName] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { 
    data: rawWallets = [], 
    isLoading: walletsLoading, 
    isError: walletsError 
  } = useGetAdminWalletAddressesQuery();
  

  // Auto-advance Carousel Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // RTK Query Mutation
  const [requestDeposit, { isLoading: isSubmitting }] = useRequestDepositMutation();

  // Cloudinary Uploader Hook
  const { upload, uploadPercentage, loading: isUploading } = useUploader({
    onCompleted: (res) => {
      setProofUrl(res.secure_url);
      toast.success("Proof uploaded successfully!");
    },
    onError: (err) => toast.error(err),
  });

  const walletAddresses: Record<string, string> = {
    bitcoin: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    usdt: "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9",
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await upload(file);
  };

  const handleAmountChange = (val: string) => {
    setAmount(val);
    if (Number(val) >= 100 && selectedMethod) {
      setStep(3);
    } else if (selectedMethod) {
      setStep(2);
    }
  };

  const handleConfirmTransaction = async () => {
    if (!proofUrl || !amount || !selectedMethodName) {
      return toast.error("Please provide all required details");
    }

    try {
      await requestDeposit({
        amount: Number(amount),
        method: selectedMethodName,
        address: selectedAddress,
        paymentProof: proofUrl,
      }).unwrap();

      toast.success("Deposit request submitted for review!");
      router.push("/dashboard/transactions");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit deposit request");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const selectedMethodData = paymentMethods.find((m) => m.id === selectedMethod);

  // Loading and Error boundary safeguards for smooth UX
  if (walletsLoading) {
    return (
      <div className="p-6 space-y-4 max-w-xl mx-auto">
        <Skeleton className="h-8 w-1/3 rounded-lg" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    );
  }

  // if (walletsError) {
  //   return (
  //     <div className="p-6 text-center max-w-xl mx-auto border border-dashed border-destructive/30 bg-destructive/5 rounded-2xl">
  //       <p className="text-xs text-destructive font-mono font-bold">Failed to load platform deposit vectors.</p>
  //       <p className="text-[11px] text-muted-foreground mt-1">Please try reinitializing the network engine layout interface.</p>
  //     </div>
  //   );
  // }
  
  return (
    <>
      <DashboardHeader title="Deposit Funds" description="Add secure liquid assets directly into your active node balance" />

      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Core Form Steps */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Selection */}
            <Card className={`transition-all duration-300 rounded-2xl border border-border/80 ${step !== 1 && "opacity-60 bg-muted/20"}`}>
               <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-colors ${step >= 1 ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}>1</div>
                  <div>
                    <CardTitle className="text-base tracking-tight">Payment Network</CardTitle>
                    <CardDescription className="text-xs">Choose preferred dynamic crypto rail</CardDescription>
                  </div>
                </div>
                {step > 1 && <Button variant="outline" size="sm" className="h-8 text-xs rounded-xl" onClick={() => setStep(1)}>Modify</Button>}
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* {paymentMethods.map((method) => { */}
                  {rawWallets.map((method) => {
                    // const IconComponent = method.icon;
                    const IconComponent = getWalletIcon(method.network, method.name);
                    return (
                      <button
                        key={method._id}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => { 
                          setSelectedMethod(method._id);
                          setSelectedMethodName(method.name);
                          setSelectedAddress(method.address);
                          setStep(2); 
                        }}
                        className={`text-left p-4 rounded-xl border transition-all duration-200 relative group flex flex-col justify-between ${selectedMethod === method._id ? "border-indigo-600 bg-indigo-500/[0.03] ring-1 ring-indigo-600 shadow-sm" : "border-border/80 bg-card hover:border-indigo-500/50"}`}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                              selectedMethod === method._id 
                                ? "bg-indigo-600 text-white border-transparent" 
                                : "bg-muted text-muted-foreground border-border/40"
                            }`}>
                              {/* ⚡️ 3. RENDER THE ASSIGNED STRUCTURAL LOGO VECTOR */}
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-sm tracking-tight text-foreground">{method.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{method.network}</p>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 ${selectedMethod === method._id && "text-indigo-600"}`} />
                        </div>
                        <div className="w-full border-t border-border/40 mt-4 pt-2.5 flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                          <span>Settle Time:</span>
                          {/* <span className="font-mono bg-muted px-2 py-0.5 rounded-md border border-border/40 text-foreground">{method.processingTime}</span> */}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Amount */}
            {step >= 2 && selectedMethod && (
              <Card className={`transition-all duration-300 rounded-2xl border border-border/80 ${step === 2 ? "ring-1 ring-indigo-600 shadow-sm" : "opacity-60 bg-muted/20"}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full text-xs font-mono font-bold bg-indigo-600 text-white flex items-center justify-center">2</div>
                    <div>
                      <CardTitle className="text-base tracking-tight">Deposit Amount</CardTitle>
                      <CardDescription className="text-xs">Specify liquid liquidity sizing limits</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Amount (USD)</Label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3.5 text-muted-foreground text-sm font-semibold">$</span>
                      <Input
                        id="amount"
                        type="number"
                        className="pl-8 h-12 text-base font-bold font-mono tracking-tight rounded-xl"
                        placeholder="100.00"
                        value={amount}
                        disabled={isSubmitting}
                        onChange={(e) => handleAmountChange(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground px-0.5">
                      <span>Threshold Min: $100</span>
                      <span>Max Multi-Cap: $50,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment & Upload */}
            {step === 3 && Number(amount) >= 100 && (
              <Card className="border-indigo-500/20 bg-indigo-500/[0.01] rounded-2xl shadow-inner">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full text-xs font-mono font-bold bg-indigo-600 text-white flex items-center justify-center">3</div>
                    <div>
                      <CardTitle className="text-base tracking-tight">Payment Settlement Network</CardTitle>
                      <CardDescription className="text-xs">Execute direct on-chain routing parameters</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="p-4 rounded-xl bg-card border border-border/80 shadow-sm space-y-3">
                    <p className="text-xs font-medium text-muted-foreground">Transfer precisely <b className="text-foreground text-sm font-mono">${Number(amount).toLocaleString()} USD</b> via blockchain infrastructure to:</p>
                    <div className="flex items-center justify-between p-3 bg-muted/60 border border-border/60 rounded-xl gap-3">
                      <code className="text-xs break-all font-mono select-all text-foreground font-semibold">{selectedAddress}</code>
                      <Button variant="outline" size="sm" className="h-9 gap-1.5 px-3 rounded-lg shrink-0" onClick={() => copyToClipboard(selectedAddress as string)}>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Proof of Asset Transfer</Label>
                    <div 
                      onClick={() => !isUploading && !isSubmitting && fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 relative bg-card ${proofUrl ? "border-emerald-500 bg-emerald-500/[0.02]" : "border-border hover:border-indigo-500/50 cursor-pointer"} ${isUploading || isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isUploading ? (
                        <div className="space-y-3 max-w-xs mx-auto">
                          <Loader2 className="w-7 h-7 animate-spin mx-auto text-indigo-600" />
                          <p className="text-xs font-semibold font-mono">Syncing Ledger: {uploadPercentage}%</p>
                          <Progress value={uploadPercentage} className="h-1.5 bg-muted" />
                        </div>
                      ) : proofUrl ? (
                        <div className="space-y-2">
                          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                          <p className="text-sm font-bold text-emerald-600">Dynamic Receipt Captured</p>
                          <Button variant="link" size="sm" className="text-xs text-muted-foreground h-auto p-0 underline decoration-dotted">Change Document Block</Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-10 h-10 rounded-xl bg-muted border border-border/40 flex items-center justify-center mx-auto mb-1">
                            <Upload className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="text-sm font-bold text-foreground">Upload cryptographic transfer receipt</p>
                          <p className="text-xs text-muted-foreground">Acceptable secure file formats: JPEG, PNG documents only</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold tracking-wider text-xs uppercase shadow-md shadow-indigo-600/10 mt-2" 
                    size="lg" 
                    onClick={handleConfirmTransaction}
                    disabled={!proofUrl || isUploading || isSubmitting}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying Nodes...</>
                    ) : (
                      "Confirm & Submit Settlement"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar: Summary + Dynamic Promotional Node Carousel */}
          <div className="lg:col-span-4 space-y-6 w-full">
            
            {/* Summary */}
            <Card className="rounded-2xl border border-border/80 shadow-sm">
              <CardHeader className="pb-3 border-b border-border/40"><CardTitle className="text-sm tracking-tight font-bold uppercase text-muted-foreground">Financial Summary</CardTitle></CardHeader>
              <CardContent className="pt-4 space-y-3">
                <SummaryItem label="Allocation Matrix Target" value={`$${Number(amount || 0).toLocaleString()}`} />
                <SummaryItem label="Settlement Core Asset" value={selectedMethodName || "Unassigned"} />
                <SummaryItem label="Gateway Gas Surcharges" value="0.00 USD" valueClass="text-emerald-500 font-bold font-mono text-xs" />
                <div className="pt-3 border-t border-dashed flex justify-between items-center">
                  <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Settlement Balance Total</span>
                  <span className="text-xl font-black font-mono tracking-tight text-foreground">${Number(amount || 0).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Node Promotional Carousel */}
            <Card className="rounded-2xl overflow-hidden border border-border/80 bg-zinc-950 text-white relative shadow-lg">
              <div className="relative h-48 w-full group">
                <img 
                  src={carouselSlides[carouselIndex].image} 
                  alt={carouselSlides[carouselIndex].title}
                  className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-indigo-600 border-none font-mono text-[9px] px-2 py-0.5 rounded-md text-white">
                    <Zap className="w-2.5 h-2.5 mr-1 fill-white inline" /> INFRASTRUCTURE POOLS
                  </Badge>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-sm font-black tracking-tight text-white transition-all duration-300">{carouselSlides[carouselIndex].title}</h4>
                  <p className="text-[11px] text-emerald-400 font-semibold font-mono mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {carouselSlides[carouselIndex].subtitle}
                  </p>
                </div>
              </div>
              <CardContent className="p-3.5 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center">
                <span className="text-[10px] text-zinc-400 font-medium">Ready to deploy after settlement?</span>
                <div className="flex gap-1.5">
                  {carouselSlides.map((_, idx) => (
                    <button 
                      key={idx}
                      type="button"
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${carouselIndex === idx ? "w-4 bg-indigo-500" : "w-1.5 bg-zinc-700"}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
}

function SummaryItem({ label, value, valueClass = "text-foreground font-semibold" }: { label: string, value: string, valueClass?: string }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}
