"use client";
import { toast } from "sonner";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  DollarSign,
  Calendar,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { 
  useGetPlansQuery, 
  useGetInvestmentsQuery, 
  useCreateInvestmentMutation 
} from "@/store/api/investmentApiSlice"; 
import { format } from "date-fns";

export default function InvestmentsPage() {
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [investAmount, setInvestAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  // 1. Fetch Dynamic Data from backend endpoints
  const { data: serverPlans = [], isLoading: isPlansLoading } = useGetPlansQuery(undefined);
  const { data: serverInvestments = [], isLoading: isInvestmentsLoading } = useGetInvestmentsQuery(undefined);

  // 2. Setup Create Investment Mutation
  const [createInvestment, { isLoading: isCreating }] = useCreateInvestmentMutation();

  // 3. Filter and Calculate Totals across Real Investment States
  const activeInvestments = serverInvestments.filter((inv: any) => inv.status === "ACTIVE" || inv.status === "PENDING");
  const completedInvestments = serverInvestments.filter((inv: any) => inv.status === "COMPLETED");

  const totalInvested = activeInvestments.reduce((acc: number, inv: any) => acc + inv.amount, 0);
  const totalProfit = serverInvestments.reduce((acc: number, inv: any) => acc + (inv.accruedProfit || 0), 0);

  const handleConfirmInvestment = async () => {
    if (!selectedPlan || !investAmount || isCreating) return;

    const amountNum = Number(investAmount);

    if (amountNum < selectedPlan.minAmount || amountNum > selectedPlan.maxAmount) {
      toast.error(`Amount must be between $${selectedPlan.minAmount.toLocaleString()} and $${selectedPlan.maxAmount.toLocaleString()}`);
      return;
    }

    try {
      await createInvestment({
        planId: selectedPlan._id,
        amount: amountNum,
      }).unwrap();

      toast.success("Investment request submitted for approval");
      
      // Reset State
      setIsDialogOpen(false);
      setInvestAmount("");
      setSelectedPlan(null);
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to process investment asset allocation.");
    }
  };

  // Maps custom dynamic overlay gradients matching old and new Tesla categories
  const getGradientColor = (category: string) => {
    switch (category) {
      case "STARTER": return "from-blue-600/20 to-cyan-600/20";
      case "PRO": return "from-violet-600/20 to-purple-600/20";
      case "PREMIUM": return "from-amber-600/20 to-orange-600/20";
      case "VIP": return "from-emerald-600/20 to-teal-600/20";
      case "MEGAPACK_SOLAR": return "from-amber-500/30 to-yellow-600/20"; // ADDED
      case "ROBOTAXI_FLEET": return "from-red-600/20 to-zinc-900/40";    // ADDED
      default: return "from-muted/40 to-muted/80";
    }
  };

  const getDaysRemaining = (endDateStr: string) => {
    const remaining = Math.ceil((new Date(endDateStr).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return remaining > 0 ? remaining : 0;
  };

  const getProgressPercentage = (startDateStr: string, endDateStr: string) => {
    const start = new Date(startDateStr).getTime();
    const end = new Date(endDateStr).getTime();
    const now = new Date().getTime();
    if (now >= end) return 100;
    if (now <= start) return 0;
    return Math.round(((now - start) / (end - start)) * 100);
  };

  return (
    <>
      <DashboardHeader
        title="Investments"
        description="Manage your active investments and explore new opportunities"
      />

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">Total Invested</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                ${totalInvested.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <span className="text-muted-foreground">Total Earnings</span>
              </div>
              <p className="text-2xl font-bold text-accent">
                +${totalProfit.toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-chart-3" />
                </div>
                <span className="text-muted-foreground">Active Plans</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {activeInvestments.filter((i: any) => i.status === "ACTIVE").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Investment Plans */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Investment Plans</CardTitle>
          </CardHeader>
          <CardContent>
            {isPlansLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : serverPlans.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {serverPlans.map((plan: any) => (
                  <div
                    key={plan._id}
                    className={`relative p-6 rounded-xl border border-border hover:border-primary/50 transition-all cursor-pointer overflow-hidden group ${
                      plan.category === "ROBOTAXI_FLEET" ? "border-primary/60 shadow-sm" : ""
                    }`}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsDialogOpen(true);
                    }}
                  >
                    {plan.category === "ROBOTAXI_FLEET" && (
                      <Badge className="absolute top-2 right-2 bg-primary z-10">
                        <Sparkles className="w-3 h-3 mr-1" />
                        High Yield
                      </Badge>
                    )}
                    
                    {/* VISUAL IMAGE UPDATE: Renders actual asset graphic or a fallback background */}
                    <div className="relative w-full h-28 rounded-lg overflow-hidden mb-4 bg-muted">
                      {plan.imageUrl ? (
                        <>
                          <img 
                            src={plan.imageUrl} 
                            alt={plan.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              // Safe fallback handling if an unsplash link dies down the line
                              (e.target as HTMLImageElement).src = "/images/placeholder-asset.jpg";
                            }}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${getGradientColor(plan.category)} mix-blend-multiply`} />
                        </>
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${getGradientColor(plan.category)}`} />
                      )}
                      
                      <div className="absolute bottom-2 left-3 bg-background/90 backdrop-blur-sm py-0.5 px-2 rounded text-xs font-semibold text-foreground">
                        {plan.category.replace("_", " ")}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-1">
                        {plan.name}
                      </h3>
                      <span className="text-sm font-bold text-emerald-500 whitespace-nowrap ml-2">
                        {plan.roiPercentage}% ROI
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem] mb-3">
                      {plan.description || "Fractional enterprise asset pool."}
                    </p>

                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-4 bg-muted/40 p-2 rounded-lg">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-muted-foreground/70">Duration</span>
                        <span className="font-medium text-foreground">{plan.durationDays} days</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] uppercase tracking-wider text-muted-foreground/70">Min Entry</span>
                        <span className="font-medium text-foreground">${plan.minAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button
                      variant={plan.category === "ROBOTAXI_FLEET" ? "default" : "outline"}
                      className="w-full gap-2 text-xs h-9"
                    >
                      Invest Now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">No investment tiers active right now.</div>
            )}
          </CardContent>
        </Card>

        {/* Active & Completed Investments */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>My Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">
                  Active ({activeInvestments.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedInvestments.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                {isInvestmentsLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : activeInvestments.length > 0 ? (
                    <div className="space-y-4">
                      {activeInvestments.map((investment: any) => {
                        const daysLeft = investment.daysLeft ?? 0;
                        const progress = investment.progress ?? 0;
                        return (
                          <div
                            key={investment._id}
                            className="p-6 rounded-xl bg-muted/50 border border-border"
                          >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                  <TrendingUp className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary">
                                      {investment.planId?.name || investment.planName || "Investment Asset"}
                                    </Badge>
                                    <Badge 
                                      variant={investment.status === "PENDING" ? "outline" : "default"} 
                                      className={investment.status === "PENDING" ? "text-amber-500 border-amber-500 animate-pulse" : "bg-emerald-500 text-white"}
                                    >
                                      {investment.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Awaiting activation stream
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-foreground">
                                  ${investment.amount?.toLocaleString()}
                                </p>
                                <p className="text-sm text-emerald-500 font-medium">
                                  +${(investment.dailyProfit || 0).toFixed(2)} / daily return
                                </p>
                              </div>
                            </div>

                            {/* Data metrics from your data payload */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4 p-3 rounded-lg bg-background/50 border border-border/40 text-xs font-mono">
                              <div>
                                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Current Profit</span>
                                <span className="font-bold text-foreground">${(investment.profit || 0).toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Total Earned</span>
                                <span className="font-bold text-foreground">${(investment.totalEarned || 0).toLocaleString()}</span>
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Expected Return</span>
                                <span className="font-bold text-emerald-500">${(investment.totalExpectedReturn || 0).toLocaleString()}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <Progress value={progress} className="h-2 mb-3 bg-muted" />
                              <div className="flex items-center justify-between text-xs font-mono">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{investment.status === "PENDING" ? "Activation Queue" : `${daysLeft} days remaining`}</span>
                                </div>
                                <span className="text-muted-foreground">
                                  {progress}% complete
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-xs text-muted-foreground">No active investments found. Start your first plan!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed">
                {isInvestmentsLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : completedInvestments.length > 0 ? (
                  <div className="space-y-4">
                    {completedInvestments.map((investment: any) => (
                      <div
                        key={investment._id}
                        className="p-6 rounded-xl bg-muted/50 border border-border"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center gap-4">
                            {investment.planId?.imageUrl ? (
                              <img 
                                src={investment.planId.imageUrl} 
                                alt="" 
                                className="w-12 h-12 rounded-xl object-cover border border-border grayscale"
                                // Grayscale used to visually separate a completed plan from active ones
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-accent" />
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">
                                  {investment.planId?.name}
                                </Badge>
                                <Badge className="bg-accent text-accent-foreground">
                                  Completed
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {format(new Date(investment.startDate), "yyyy-MM-dd")} → {format(new Date(investment.endDate), "yyyy-MM-dd")}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-foreground">
                              ${investment.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-accent">
                              +${(investment.totalExpectedReturn || 0).toFixed(2)} total payload paid
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-xs text-muted-foreground">No completed investment logs found.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Investment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Invest in {selectedPlan?.name} Plan
            </DialogTitle>
            <DialogDescription>
              Enter the amount you want to invest. ROI: {selectedPlan?.roiPercentage}% for{" "}
              {selectedPlan?.durationDays} days.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Min: $${selectedPlan?.minAmount?.toLocaleString()}`}
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                disabled={isCreating}
              />
              <p className="text-xs text-muted-foreground">
                Range: ${selectedPlan?.minAmount?.toLocaleString()} - ${selectedPlan?.maxAmount?.toLocaleString()}
              </p>
            </div>
            {investAmount && Number(investAmount) >= (selectedPlan?.minAmount || 0) && (
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Estimated Total Payback (Principal + Interest)
                </p>
                <p className="text-2xl font-bold text-accent">
                  $
                  {(
                    Number(investAmount) + 
                    (Number(investAmount) * (selectedPlan?.roiPercentage / 100))
                  ).toFixed(2)}
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsDialogOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 gap-2" 
              onClick={handleConfirmInvestment}
              disabled={!investAmount || isCreating}
            >
              {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
              Confirm Investment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}