"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  DollarSign,
  Copy,
  Share2,
  Gift,
  TrendingUp,
  CheckCircle2,
  Clock,
  Twitter,
  Facebook,
  Mail,
} from "lucide-react";

const referralStats = {
  totalReferrals: 12,
  activeReferrals: 8,
  totalEarnings: 325.0,
  pendingEarnings: 75.0,
  referralRate: "5%",
};

const referralHistory = [
  {
    id: "REF001",
    name: "Sarah M.",
    email: "s***@email.com",
    joinDate: "2024-01-12",
    investment: 2000,
    commission: 100,
    status: "active",
  },
  {
    id: "REF002",
    name: "Mike J.",
    email: "m***@email.com",
    joinDate: "2024-01-10",
    investment: 1500,
    commission: 75,
    status: "active",
  },
  {
    id: "REF003",
    name: "Anna K.",
    email: "a***@email.com",
    joinDate: "2024-01-08",
    investment: 500,
    commission: 25,
    status: "active",
  },
  {
    id: "REF004",
    name: "Tom R.",
    email: "t***@email.com",
    joinDate: "2024-01-05",
    investment: 0,
    commission: 0,
    status: "pending",
  },
  {
    id: "REF005",
    name: "Lisa W.",
    email: "l***@email.com",
    joinDate: "2024-01-03",
    investment: 3000,
    commission: 150,
    status: "active",
  },
];

const commissionTiers = [
  { plan: "Starter", rate: "3%", bonus: "$3 - $30 per referral" },
  { plan: "Growth", rate: "5%", bonus: "$50 - $500 per referral" },
  { plan: "Premium", rate: "7%", bonus: "$700 - $3,500 per referral" },
  { plan: "Enterprise", rate: "10%", bonus: "$5,000+ per referral" },
];

export default function ReferralsPage() {
  const referralLink = "https://vestflow.com/ref/JOHN123";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <>
      <DashboardHeader
        title="Referrals"
        description="Invite friends and earn commissions"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Total Referrals
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {referralStats.totalReferrals}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Active Referrals
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {referralStats.activeReferrals}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-chart-3" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Total Earnings
                </span>
              </div>
              <p className="text-3xl font-bold text-accent">
                ${referralStats.totalEarnings.toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                ${referralStats.pendingEarnings.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Share Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Referral Link */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Your Referral Link
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input value={referralLink} readOnly className="font-mono text-sm" />
                  <Button variant="outline" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Referral History */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Your Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralHistory.map((referral) => (
                    <div
                      key={referral.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {referral.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">
                            {referral.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Joined {referral.joinDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {referral.status === "active" ? (
                          <>
                            <p className="font-medium text-accent">
                              +${referral.commission.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Invested ${referral.investment.toLocaleString()}
                            </p>
                          </>
                        ) : (
                          <Badge variant="outline" className="text-warning">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Commission Tiers */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-primary-foreground/80 text-sm">
                      Your Commission Rate
                    </p>
                    <p className="text-2xl font-bold">
                      {referralStats.referralRate}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Earn up to 10% commission on every referral investment based
                  on your plan tier.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Commission Tiers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commissionTiers.map((tier, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        tier.plan === "Growth"
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">
                          {tier.plan}
                        </span>
                        <Badge
                          variant={
                            tier.plan === "Growth" ? "default" : "secondary"
                          }
                        >
                          {tier.rate}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tier.bonus}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-primary">
                        1
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Share your unique referral link with friends
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-primary">
                        2
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      They sign up and make their first investment
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-primary">
                        3
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You earn commission on their deposits
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
