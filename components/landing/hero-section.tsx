"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Users,
} from "lucide-react";

const stats = [
  { value: "$50M+", label: "Assets Managed" },
  { value: "15K+", label: "Active Investors" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

const features = [
  {
    icon: TrendingUp,
    title: "High Returns",
    description: "Up to 25% monthly ROI",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Bank-grade security",
  },
  {
    icon: Zap,
    title: "Fast Payouts",
    description: "Instant withdrawals",
  },
  {
    icon: Users,
    title: "Referral Program",
    description: "Earn with friends",
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse" />
            Trusted by 15,000+ investors worldwide
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
            Smart Investments for{" "}
            <span className="text-primary">Wealth Growth</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Join thousands of investors growing their wealth with our secure,
            transparent, and high-yield investment platform. Start with as
            little as $100.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/auth/register">
              <Button size="lg" className="text-base px-8 h-12 gap-2">
                Start Investing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#calculator">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 h-12"
              >
                Calculate Returns
              </Button>
            </Link>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl border border-border shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">
                    {feature.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-card rounded-2xl border border-border shadow-sm"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
