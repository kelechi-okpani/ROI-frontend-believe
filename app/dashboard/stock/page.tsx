"use client";

import { useState, useEffect, useRef } from "react";
import { useGetMarketsQuery, useCreateMarketInvestmentMutation } from "@/store/api/marketApiSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  RefreshCw, 
  Loader2, 
  ArrowUpRight,
  SlidersHorizontal,
  Wallet,
  AlertCircle
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";

interface MarketAsset {
  _id: string;
  symbol: string;
  assetType: "CRYPTO" | "STOCK";
  price: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  direction: "UP" | "DOWN" | "NEUTRAL";
  timestamp: number;
  lastUpdatedAt: string;
}

/**
 * 📊 TRANSITIONAL ANIMATION PRICE COMPONENT
 * Tracks live parameter variations over runtime intervals.
 * Triggers distinct context flashes directly on mutations.
 */
function PriceTickerCell({ price, isUp }: { price: number; isUp: boolean }) {
  const [flashClass, setFlashClass] = useState("");
  const prevPriceRef = useRef<number>(price);

  useEffect(() => {
    // Check if the price has fundamentally shifted from its previous tick
    if (price !== prevPriceRef.current) {
      const visualDirectionClass = price > prevPriceRef.current 
        ? "bg-emerald-500/30 text-emerald-400 scale-[1.02]" 
        : "bg-rose-500/30 text-rose-400 scale-[0.98]";

      // Apply physical flash state immediately
      setFlashClass(visualDirectionClass);
      prevPriceRef.current = price;

      // Gracefully ease the color back to its standard theme level
      const timer = setTimeout(() => {
        setFlashClass("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [price]);

  return (
    <div className={`p-1.5 -m-1.5 rounded-lg transition-all duration-500 transform ease-out ${flashClass}`}>
      <span className={`text-2xl font-black tracking-tight font-mono transition-colors duration-300 ${
        isUp ? "text-emerald-500" : "text-rose-500"
      }`}>
        ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
      </span>
    </div>
  );
}

export default function MarketDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"ALL" | "CRYPTO" | "STOCK">("ALL");
  
  // Modals & Action States
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [allocationAmount, setAllocationAmount] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { 
    data: markets = [], 
    isLoading, 
    isFetching, 
    refetch 
  } = useGetMarketsQuery(undefined, {
    pollingInterval: 60000, 
    refetchOnFocus: true, 
    refetchOnReconnect: true,  
  });

  const [createMarketInvestment, { isLoading: isSubmitting }] = useCreateMarketInvestmentMutation();

  const getCleanTicker = (symbol: string) => {
    return symbol.includes(":") ? symbol.split(":")[1] : symbol;
  };

  const filteredMarkets = markets.filter((asset: MarketAsset) => {
    const cleanSymbol = asset.symbol.toLowerCase();
    const cleanQuery = searchQuery.toLowerCase().trim();
    
    const matchesSearch = cleanSymbol.includes(cleanQuery) || 
                          getCleanTicker(asset.symbol).toLowerCase().includes(cleanQuery);
                          
    const matchesCategory = activeCategory === "ALL" || asset.assetType === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInitiateContract = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMessage(null);

    if (!selectedAsset) return;

    const numericAmount = parseFloat(allocationAmount);
    if (!numericAmount || isNaN(numericAmount)) {
      setValidationError("Please enter a valid allocation amount.");
      return;
    }

    if (numericAmount < 500) {
      setValidationError("Investment allocation rejected. The minimum contract tier is $500.");
      return;
    }

    try {
      await createMarketInvestment({
        asset: {
          symbol: selectedAsset.symbol,
          assetType: selectedAsset.assetType,
          price: selectedAsset.price,
        },
        amount: numericAmount,
      }).unwrap();

      setSuccessMessage(`Market contract for ${getCleanTicker(selectedAsset.symbol)} deployed to processing pipeline.`);
      setAllocationAmount("");
      
      setTimeout(() => {
        setSelectedAsset(null);
        setSuccessMessage(null);
      }, 2500);

    } catch (err: any) {
      console.log("DEPLOYMENT_EXCEPTION:", err);
      setValidationError(err?.data?.error || "Execution error occurred. Please verify balances.");
    }
  };

  return (
    <>
      <DashboardHeader title="Live Stocks" description="Real-time assets synchronized across active market indices." />

      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-background text-foreground selection:bg-primary/10">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border/40">
          <div>
            <h1 className="text-2xl font-black tracking-tight md:text-2xl">Live Stock Terminals</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Real-time assets synchronized across active market indices.</p>
          </div>
          
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 font-mono text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isFetching ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isFetching ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
              </span>
              {isFetching ? "STREAM TICKING..." : "SOCKET STABLE"}
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-lg border-border/60 hover:bg-muted"
              onClick={refetch}
              disabled={isLoading}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Filter and Search Layout Options */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
            <Input
              placeholder="Search assets (e.g. BNB, AAPL, BTC)..."
              className="pl-9 bg-card/40 border-border/60 focus-visible:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground shrink-0 hidden sm:block" />
            {(["ALL", "CRYPTO", "STOCK"] as const).map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                className="text-xs h-8 font-mono rounded-lg border-border/60 uppercase tracking-wider shrink-0"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}s ({markets.filter((m: MarketAsset) => cat === "ALL" || m.assetType === cat).length})
              </Button>
            ))}
          </div>
        </div>

        {/* Primary Dashboard Grid */}
        {isLoading ? (
          <Card className="border-border/40 bg-card/20 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Connecting to data engines...</p>
            </CardContent>
          </Card>
        ) : filteredMarkets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMarkets.map((asset: MarketAsset) => {
              const isUp = asset.direction === "UP" || asset.changePercent > 0;
              const isDown = asset.direction === "DOWN" || asset.changePercent < 0;
              
              return (
                <Card 
                  key={asset._id} 
                  onClick={() => {
                    setSelectedAsset(asset);
                    setValidationError(null);
                    setSuccessMessage(null);
                  }}
                  className="cursor-pointer group relative bg-card/30 hover:bg-card/60 border-border/50 hover:border-border transition-all duration-300 backdrop-blur-sm overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-[2px] transition-colors duration-300 ${
                    isUp ? "bg-emerald-500/40" : isDown ? "bg-rose-500/40" : "bg-muted"
                  }`} />

                  <CardContent className="p-5 space-y-4">
                    {/* Top Row: Meta & Badges */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-foreground/5 border border-border/40 flex items-center justify-center font-bold text-sm shadow-sm">
                          {asset.assetType === "CRYPTO" ? "🪙" : "📈"}
                        </div>
                        <div>
                          <h4 className="font-bold text-base tracking-tight leading-none group-hover:text-primary transition-colors">
                            {getCleanTicker(asset.symbol)}
                          </h4>
                          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block mt-1 opacity-70">
                            {asset.symbol.includes(":") ? asset.symbol.split(":")[0] : asset.assetType}
                          </span>
                        </div>
                      </div>
                      
                      <Badge 
                        variant="outline"
                        className={`font-mono text-[11px] px-2.5 py-0.5 rounded-lg font-semibold tracking-tight border shadow-sm ${
                          asset.changePercent >= 0 
                            ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' 
                            : 'text-rose-500 border-rose-500/20 bg-rose-500/10'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          {asset.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                        </span>
                      </Badge>
                    </div>

                    {/* Middle Row: The Primary Live Price Vector (with visual shifting feedback) */}
                    <div className="pt-2">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest block font-mono font-medium opacity-60 mb-1">
                        Live Value
                      </span>
                      <div className="flex items-baseline gap-2">
                        <PriceTickerCell price={asset.price} isUp={isUp} />
                      </div>
                    </div>

                    {/* Bottom Row: Context Shifts & CTA Trigger */}
                    <div className="flex justify-between items-center pt-3 border-t border-border/30 font-mono">
                      <div>
                        <span className="text-[9px] text-muted-foreground uppercase tracking-wider block opacity-70">Net Velocity</span>
                        <span className={`text-xs font-bold ${asset.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                          {asset.change >= 0 ? '+$' : '-$'}{Math.abs(asset.change).toFixed(4)}
                        </span>
                      </div>
                      
                      <div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            // Prevents triggering card click redundantly
                            e.stopPropagation(); 
                            setSelectedAsset(asset);
                            setValidationError(null);
                            setSuccessMessage(null);
                          }}
                          className="h-8 px-2.5 rounded-lg font-medium text-xs font-mono bg-muted/20 text-muted-foreground opacity-80 sm:opacity-0 group-hover:opacity-100 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
                        >
                          Buy Stock
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-70 group-hover:opacity-100" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border/60 rounded-xl bg-card/10">
            <p className="text-sm text-muted-foreground font-mono">No active tickers match filters.</p>
          </div>
        )}
      </div>

      {/* INVESTMENT TERMINAL MODAL DIALOG */}
      <Dialog open={selectedAsset !== null} onOpenChange={(open) => !open && setSelectedAsset(null)}>
        <DialogContent className="sm:max-w-[420px] bg-card/90 backdrop-blur-md border border-border/60">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-black font-mono tracking-tight">
              <span>🚀</span>  CONTRACT: {selectedAsset && getCleanTicker(selectedAsset.symbol)}
            </DialogTitle>
            <DialogDescription className="text-xs font-mono text-muted-foreground pt-1">
              Initialize a fixed 15-day performance yield contract tracking live index market values.
            </DialogDescription>
          </DialogHeader>

          {selectedAsset && (
            <form onSubmit={handleInitiateContract} className="space-y-4 pt-2">
              <div className="rounded-xl p-4 bg-muted/30 border border-border/30 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Asset Ticker:</span>
                  <span className="font-bold">{selectedAsset.symbol}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Current Rate:</span>
                  <span className="font-bold text-primary">${selectedAsset.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-mono border-t border-border/40 pt-2 mt-1">
                  <span className="text-muted-foreground">Daily Yield Rate:</span>
                  <span className="font-bold text-emerald-500">5.5% fixed profit</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-muted-foreground block">
                  Allocation Capital ($ USD)
                </label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                  <Input
                    type="number"
                    min="500"
                    placeholder="Minimum amount $500"
                    value={allocationAmount}
                    onChange={(e) => setAllocationAmount(e.target.value)}
                    className="pl-9 font-mono bg-background/50 border-border/60 focus-visible:ring-primary/20"
                    disabled={isSubmitting || !!successMessage}
                  />
                </div>
                <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">
                  * Note: Allocations are atomically debited immediately and held in processing waiting for clearance.
                </p>
              </div>

              {validationError && (
                <div className="flex items-start gap-2 p-3 text-xs font-mono rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-500 animate-pulse">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 text-xs font-mono rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                  🎉 {successMessage}
                </div>
              )}

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedAsset(null)}
                  disabled={isSubmitting || !!successMessage}
                  className="font-mono text-xs rounded-lg border-border/60"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !!successMessage}
                  className="font-mono text-xs font-bold rounded-lg px-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                      Authorizing...
                    </>
                  ) : (
                    "Authorize Order"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}