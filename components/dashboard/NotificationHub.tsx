"use client";

import React from "react";
import { Bell, Zap, Shield, ArrowUpRight, AlertCircle, CheckCircle, Info } from "lucide-react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useGetNotificationsQuery } from "@/store/api/userApiSlice";


const IconMap = {
  INVESTMENT: Zap,
  APPROVAL: CheckCircle,
  REJECTION: AlertCircle,
  DEPOSIT: Info,
  WITHDRAWAL: Info,
};

export const NotificationHub = () => {
  const { data: notifications = [], isLoading } = useGetNotificationsQuery('notifications');
  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 relative rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute top-1 right-1 w-3.5 h-3.5 p-0 flex items-center justify-center text-[9px] font-bold font-mono bg-red-500 text-white border-2 border-background">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72 mt-1 rounded-xl p-1 border-border/60 bg-card/95 backdrop-blur-md shadow-lg">
        <DropdownMenuLabel className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          Network Updates
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/40" />

        {isLoading ? (
          <div className="p-4 text-xs text-center text-muted-foreground font-mono">Syncing...</div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-xs text-center text-muted-foreground">No recent activity.</div>
        ) : (
          notifications.slice(0, 4).map((n: any) => {
            const Icon = IconMap[n.type as keyof typeof IconMap] || Info;
            return (
              <DropdownMenuItem key={n._id} className="flex flex-col items-start gap-1 p-2.5 rounded-lg cursor-pointer">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Icon className={`w-3.5 h-3.5 ${n.type === 'REJECTION' ? 'text-red-500' : 'text-blue-500'}`} />
                  {n.title}
                </div>
                <p className="text-[11px] text-muted-foreground leading-normal pl-5">{n.message}</p>
              </DropdownMenuItem>
            );
          })
        )}
        
        <DropdownMenuSeparator className="bg-border/40" />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/notifications" className="w-full flex items-center justify-center gap-1 text-[11px] font-semibold text-primary py-1.5 hover:underline">
            All Activity Logs <ArrowUpRight className="w-3 h-3" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};