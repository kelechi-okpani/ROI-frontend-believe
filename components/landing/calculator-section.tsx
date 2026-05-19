"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";

const plans = [
  { name: "Starter", roi: 8, duration: 30 },
  { name: "Growth", roi: 15, duration: 60 },
  { name: "Premium", roi: 20, duration: 90 },
  { name: "Enterprise", roi: 25, duration: 180 },
];

export function CalculatorSection() {
  const [amount, setAmount] = useState(1000);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);

  const dailyProfit = (amount * selectedPlan.roi) / 100 / 30;
  const totalProfit = dailyProfit * selectedPlan.duration;
  const totalReturn = amount + totalProfit;

  return (
    <section id="calculator" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
            ROI Calculator
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Calculate Your Potential Returns
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Use our calculator to estimate your investment returns based on your
            chosen plan and investment amount.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Input Section */}
                <div className="space-y-8">
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      Investment Amount
                    </Label>
                    <div className="text-4xl font-bold text-primary mb-4">
                      ${amount.toLocaleString()}
                    </div>
                    <Slider
                      value={[amount]}
                      onValueChange={([value]) => setAmount(value)}
                      min={100}
                      max={100000}
                      step={100}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$100</span>
                      <span>$100,000</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      Select Investment Plan
                    </Label>
                    <Select
                      value={selectedPlan.name}
                      onValueChange={(value) =>
                        setSelectedPlan(plans.find((p) => p.name === value)!)
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {plans.map((plan) => (
                          <SelectItem key={plan.name} value={plan.name}>
                            {plan.name} - {plan.roi}% ROI ({plan.duration} days)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-muted/50 rounded-2xl p-6 space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Your Returns
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Daily Profit
                        </span>
                      </div>
                      <span className="font-semibold text-foreground">
                        ${dailyProfit.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Duration</span>
                      </div>
                      <span className="font-semibold text-foreground">
                        {selectedPlan.duration} days
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Total Profit
                        </span>
                      </div>
                      <span className="font-semibold text-accent">
                        +${totalProfit.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-foreground">
                        Total Return
                      </span>
                      <span className="text-3xl font-bold text-primary">
                        ${totalReturn.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
