"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, Users, TrendingUp, DollarSign, 
  Settings, LogOut, Menu, X, Bell, Search, ChevronRight, Loader2, 
  Layers,
  MessageSquare,
  Wallet
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/reuse/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProfileQuery } from "@/store/api/userApiSlice";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();

  // Fetch the real admin user data directly via Redux API Slice hook context
  const { data: user, isLoading: isProfileLoading } = useGetProfileQuery("profile");

  
  // Auto-close overlay drawer on mobile route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error("Sign-out error:", error);
      setIsLoggingOut(false);
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "AD";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

const adminMenuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Investors Plan", href: "/admin/plans", icon: Layers }, // 👈 Fixed duplication (Changed Users to Layers)
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Transactions", href: "/admin/transactions", icon: DollarSign },
  { label: "Investments", href: "/admin/investments", icon: TrendingUp },
  { label: "Wallet Addresses", href: "/admin/wallet-addresses", icon: Wallet },
  { label: "Support Chats", href: "/admin/chats", icon: MessageSquare },
];

  return (
    <div className="relative flex h-screen w-full bg-background overflow-hidden antialiased">
      
      {/* 1. Mobile Drawer Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden
          ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* 2. Persistent Desktop / Sliding Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand/Logo Frame */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border/60 shrink-0">
          <Logo href="/admin" />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(false)} 
            className="lg:hidden w-8 h-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Dynamic Nav Node List */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="block mt-2 cursor-pointer">
                <Button
                  variant="ghost"
                  className={`cursor-pointer w-full justify-start gap-3.5 h-11 px-4 text-xs font-semibold tracking-wide rounded-xl transition-all duration-200
                    ${isActive 
                      ? "bg-primary text-primary-foreground font-bold shadow-sm shadow-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-primary-foreground" : "text-muted-foreground/80"}`} />
                  <span className="tracking-tight">{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-primary-foreground" />}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* System Terminal Action Footer */}
        <div className="p-4 border-t border-border/60 bg-muted/20">
          <Button 
            variant="ghost"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="cursor-pointer w-full justify-start gap-3.5 h-11 px-4 text-xs font-semibold tracking-wide text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-200"
          >
            {isLoggingOut ? (
              <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4 shrink-0" />
            )}
            <span className="tracking-tight">
              {isLoggingOut ? "Disconnecting..." : "Logout"}
            </span>
          </Button>
        </div>
      </aside>

      {/* 3. Main Display Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Universal Application Header */}
        <header className="h-16 bg-card border-b border-border/60 px-4 lg:px-8 flex items-center justify-between shrink-0 z-30 sticky top-0 w-full">
          
          {/* Left Context Engine controls */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all shrink-0"
              aria-label="Open Administrative System Menu"
            >
              <Menu className="w-4 h-4" />
            </Button>
            
            {/* System Wide Command / Search Input */}
            <div className="relative hidden md:block w-64 lg:w-96 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search metrics, users, node logs..."
                className="pl-10 h-10 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl placeholder:text-muted-foreground/60 text-xs font-medium"
              />
            </div>
          </div>

          {/* Right Identity Stream Controls */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            
            {/* Alerts Center Widget */}
            <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl relative text-muted-foreground hover:text-foreground hover:bg-muted/60">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border border-card animate-pulse" />
            </Button>
            
            {/* Profile Avatar Engine Badge */}
            <div className="flex items-center gap-3 border-l pl-3 sm:pl-4 border-border/80 h-8">
              {isProfileLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              ) : (
                <>
                  <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold leading-none text-foreground truncate max-w-[120px]">
                      {user ? `${user.firstName} ${user.lastName}` : "System Admin"}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest font-mono text-muted-foreground mt-1">
                      {user?.role || "Super Admin"}
                    </p>
                  </div>
                  
                  <Avatar className="w-9 h-9 border border-border/80 rounded-xl shadow-sm">
                    <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-black rounded-xl">
                      {getInitials(user?.firstName, user?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </>
              )}
            </div>

          </div>
        </header>

        {/* 4. Scrollable Dynamic Content Node */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 bg-muted/20 relative">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}