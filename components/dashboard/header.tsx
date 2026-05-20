"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell, Moon, Sun, User, LogOut, Loader2, 
  Menu, Shield, ArrowUpRight, Zap
} from "lucide-react";
import { useGetProfileQuery } from "@/store/api/userApiSlice";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { NotificationHub } from "./NotificationHub";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  onMenuToggle?: () => void;
}

export function DashboardHeader({ title, onMenuToggle }: DashboardHeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const { data: user, isLoading } = useGetProfileQuery("profile");
const [isLoggingOut, setIsLoggingOut] = useState(false);


  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "JD";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };


  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error("Sign-out error:", error);
      setIsLoggingOut(false);
    }
  };


  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border/60 transition-colors duration-200">
      <div className="flex items-center justify-between h-14 md:h-16 px-3 sm:px-4 md:px-6">
        
        {/* Left Control Context */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onMenuToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="lg:hidden w-8 h-8 rounded-lg border border-border/40 text-muted-foreground hover:text-foreground shrink-0"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}
         
        </div>

        {/* Right Telemetry Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
           <div className="flex flex-col md:ml-2 gap-0.5 min-w-0">
            <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-foreground capitalize truncate max-w-[140px] xs:max-w-[240px] sm:max-w-none">
              {title}
            </h1>
          </div>
          
          {/* High-Contrast Theme Engine Switch */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-8 h-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Connected Notifications Hub Module */}
         <NotificationHub />
          {/* User Profile Identity Engine */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className=" cursor-pointer h-8 gap-1.5 pl-1.5 pr-1.5 sm:pr-2 rounded-xl hover:bg-muted/60 text-foreground border border-border/40 bg-card/40 transition-all shrink-0" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    <Avatar className="w-6 h-6 border border-border/80 rounded-lg shrink-0">
                      <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-black tracking-tight rounded-lg">
                        {getInitials(user?.firstName, user?.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-xs font-bold tracking-tight">
                      {user ? `${user.firstName}` : "Manager"}
                    </span>
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="cursor-pointer w-56 mt-1 rounded-xl p-1 border-border/60 bg-card/95 backdrop-blur-md shadow-lg max-w-[calc(100vw-16px)]">
              <DropdownMenuLabel className="p-2.5 font-normal">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-xs font-bold text-foreground truncate">
                    {user ? `${user.firstName} ${user.lastName}` : "Portfolio Manager"}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground truncate">
                    {user?.email || "admin@network.node"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/40" />
              
              <DropdownMenuItem asChild className="rounded-lg text-xs py-2 cursor-pointer">
                <Link href="/dashboard/profile" className="flex items-center w-full">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-border/40" />
              <DropdownMenuItem 
              onClick={handleLogout}
                disabled={isLoggingOut}
              className="text-destructive focus:text-destructive focus:bg-destructive/10 rounded-lg text-xs py-2 cursor-pointer font-medium">
                {/* <LogOut className="w-4 h-4 mr-2" /> */}
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 mr-2" />
                )}
                Disconnect Terminal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}