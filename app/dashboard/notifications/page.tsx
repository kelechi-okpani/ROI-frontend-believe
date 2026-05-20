"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, DollarSign, TrendingUp, Users, Shield, CheckCheck, Trash2, Loader2 } from "lucide-react";
import { useGetNotificationsQuery } from "@/store/api/userApiSlice";

// ... (keep getNotificationIcon function as is)

export default function NotificationsPage() {
  // Integrate Redux hook
  const { data: notifications = [], isLoading, isError } = useGetNotificationsQuery('notifications');

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return <div className="p-6 text-center text-destructive">Failed to load notifications.</div>;
  }

  return (
    <>
      <DashboardHeader
        title="Notifications"
        description="Stay updated with your account activity"
      />

      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Badge variant="secondary">{unreadCount} unread</Badge>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <CheckCheck className="w-4 h-4" /> Mark All as Read
            </Button>
            <Button variant="outline" className="gap-2 text-destructive hover:bg-destructive/10">
              <Trash2 className="w-4 h-4" /> Clear All
            </Button>
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
                <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-2">
                  {notifications.map((n: any) => (
                    <NotificationItem key={n._id} notification={n} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="unread">
                <div className="space-y-2">
                  {notifications
                    .filter((n: any) => !n.read)
                    .map((n: any) => <NotificationItem key={n._id} notification={n} />)}
                </div>
              </TabsContent>

              {/* Repeat logic for other TabsContent using filter as needed */}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Helper component to keep the code clean
function NotificationItem({ notification }: { notification: any }) {
  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
      notification.read ? "bg-background border-border" : "bg-primary/5 border-primary/20"
    }`}>
      {/* <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        {getNotificationIcon(notification.type)}
      </div> */}
      <div className="flex-1">
        <p className="font-medium">{notification.title}</p>
        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {new Date(notification.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}