"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  DollarSign,
  TrendingUp,
  Users,
  Shield,
  CheckCircle2,
  Trash2,
  CheckCheck,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "deposit",
    title: "Deposit Approved",
    message: "Your deposit of $1,000 has been approved and credited to your Main Wallet.",
    date: "Today, 2:30 PM",
    read: false,
  },
  {
    id: 2,
    type: "investment",
    title: "Investment Matured",
    message: "Your Growth plan investment of $2,000 has matured. Total profit: $195.00",
    date: "Today, 12:00 PM",
    read: false,
  },
  {
    id: 3,
    type: "referral",
    title: "New Referral Bonus",
    message: "You earned $50 referral bonus from Sarah M.'s first deposit.",
    date: "Yesterday, 4:15 PM",
    read: false,
  },
  {
    id: 4,
    type: "security",
    title: "New Login Detected",
    message: "A new login was detected from Chrome on Windows. If this wasn't you, please secure your account.",
    date: "Yesterday, 10:00 AM",
    read: true,
  },
  {
    id: 5,
    type: "withdrawal",
    title: "Withdrawal Processing",
    message: "Your withdrawal request of $500 is being processed. Expected completion: 24-48 hours.",
    date: "Jan 12, 2024",
    read: true,
  },
  {
    id: 6,
    type: "investment",
    title: "Daily Profit Credited",
    message: "You earned $15.50 profit from your active investments today.",
    date: "Jan 11, 2024",
    read: true,
  },
  {
    id: 7,
    type: "system",
    title: "Account Verified",
    message: "Congratulations! Your identity verification (KYC) is now complete.",
    date: "Jan 10, 2024",
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "deposit":
    case "withdrawal":
      return <DollarSign className="w-5 h-5 text-accent" />;
    case "investment":
      return <TrendingUp className="w-5 h-5 text-chart-3" />;
    case "referral":
      return <Users className="w-5 h-5 text-primary" />;
    case "security":
      return <Shield className="w-5 h-5 text-destructive" />;
    default:
      return <Bell className="w-5 h-5 text-muted-foreground" />;
  }
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <DashboardHeader
        title="Notifications"
        description="Stay updated with your account activity"
      />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{unreadCount} unread</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <CheckCheck className="w-4 h-4" />
              Mark All as Read
            </Button>
            <Button variant="outline" className="gap-2 text-destructive hover:bg-destructive/10">
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">
                  All ({notifications.length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({unreadCount})
                </TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${
                        notification.read
                          ? "bg-background border-border hover:bg-muted/50"
                          : "bg-primary/5 border-primary/20 hover:bg-primary/10"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          notification.read ? "bg-muted" : "bg-primary/10"
                        }`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p
                              className={`font-medium ${
                                notification.read
                                  ? "text-foreground"
                                  : "text-foreground"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="unread">
                <div className="space-y-2">
                  {notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-foreground">
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.date}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="deposits">
                <div className="space-y-2">
                  {notifications
                    .filter((n) => n.type === "deposit" || n.type === "withdrawal")
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${
                          notification.read
                            ? "bg-background border-border hover:bg-muted/50"
                            : "bg-primary/5 border-primary/20 hover:bg-primary/10"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.date}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="investments">
                <div className="space-y-2">
                  {notifications
                    .filter((n) => n.type === "investment")
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${
                          notification.read
                            ? "bg-background border-border hover:bg-muted/50"
                            : "bg-primary/5 border-primary/20 hover:bg-primary/10"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.date}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
