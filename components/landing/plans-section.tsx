"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    roi: "8%",
    duration: "30 days",
    minDeposit: "$100",
    maxDeposit: "$999",
    features: [
      "Daily profit accrual",
      "Instant withdrawals",
      "Basic support",
      "Referral bonus 3%",
    ],
    popular: false,
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    name: "Growth",
    roi: "15%",
    duration: "60 days",
    minDeposit: "$1,000",
    maxDeposit: "$9,999",
    features: [
      "Daily profit accrual",
      "Priority withdrawals",
      "Priority support",
      "Referral bonus 5%",
      "Portfolio analytics",
    ],
    popular: true,
    color: "from-primary/10 to-accent/10",
  },
  {
    name: "Premium",
    roi: "20%",
    duration: "90 days",
    minDeposit: "$10,000",
    maxDeposit: "$49,999",
    features: [
      "Daily profit accrual",
      "VIP withdrawals",
      "Dedicated manager",
      "Referral bonus 7%",
      "Advanced analytics",
      "Early access to features",
    ],
    popular: false,
    color: "from-amber-500/10 to-orange-500/10",
  },
  {
    name: "Enterprise",
    roi: "25%",
    duration: "180 days",
    minDeposit: "$50,000",
    maxDeposit: "Unlimited",
    features: [
      "Daily profit accrual",
      "Instant VIP withdrawals",
      "Personal account manager",
      "Referral bonus 10%",
      "Custom reporting",
      "Priority everything",
      "Exclusive investment opportunities",
    ],
    popular: false,
    color: "from-emerald-500/10 to-teal-500/10",
  },
];

export function PlansSection() {
  return (
    <section id="plans" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
            Investment Plans
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Choose Your Investment Plan
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Select from our carefully crafted investment plans designed to match
            your financial goals and risk appetite.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg ${
                plan.popular ? "border-primary shadow-lg scale-[1.02]" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div
                  className={`w-full h-24 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                >
                  <div className="text-center">
                    <p className="text-4xl font-bold text-foreground">
                      {plan.roi}
                    </p>
                    <p className="text-xs text-muted-foreground">Monthly ROI</p>
                  </div>
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Duration: {plan.duration}
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-4 pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    Investment Range
                  </p>
                  <p className="font-semibold text-foreground">
                    {plan.minDeposit} - {plan.maxDeposit}
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <Link href="/auth/register">
                  <Button
                    className="w-full gap-2"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Invest Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
