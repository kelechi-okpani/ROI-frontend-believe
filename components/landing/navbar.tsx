"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  TrendingUp,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import { Logo } from "../reuse/Logo";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/investment-plan", label: "Investment Plans" },
  { href: "/calculator", label: "Calculator" },
    { href: "/contact", label: "Contact" },
  // { href: "#faq", label: "FAQ" },
  // { href: "/blog", label: "Blog" },

];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tracks scroll layout position to transform header blending dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-background/70 backdrop-blur-xl border-border shadow-sm h-14" 
          : "bg-background/20 backdrop-blur-md border-border/40 h-16"
      }`}
    >
      <nav className="w-full max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        
        {/* BRAND IDENTITY LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group transition-transform active:scale-95">
          <Logo/>
        </Link>

        {/* DESKTOP NAV ARCHITECTURE */}
        <div className="hidden lg:flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/40 backdrop-blur-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-background/60 px-4 py-1.5 rounded-full transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* DESKTOP AUTH CONTROLS & CONTROLS MATRIX */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-9 h-9 border border-border/40 bg-background/40 hover:bg-muted"
            aria-label="Toggle structural theme layout"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-foreground" />}
          </Button>
          
          <Link href="/auth/login">
            <Button variant="ghost" className="text-xs rounded-full font-mono uppercase tracking-widest px-4 py-2 hover:shadow-primary/20">
              Login
            </Button>
          </Link>
          
          <Link href="/auth/register">
            <Button className="text-xs font-sans font-bold uppercase tracking-widest rounded-full px-5 py-2.5 shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-98">
              Get Started
            </Button>
          </Link>
        </div>

        {/* RESPONSIVE MOBILE NAVIGATION SLIDE CONTAINER */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-9 h-9 border border-border/40 bg-background/20"
            aria-label="Toggle structural theme layout"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-foreground" />}
          </Button>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 h-9 border border-border/40 bg-background/20" aria-label="Open global nav overlay">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-background/95 backdrop-blur-xl border-l border-border flex flex-col justify-between p-6">
              
              {/* Visually Hidden Title block guarantees screen-reader compliance & removes Radix warnings */}
              <div className="space-y-1 mt-4">
                <SheetTitle className="text-left font-sans font-black text-xs uppercase tracking-widest text-muted-foreground/60">// Menu Navigation</SheetTitle>
              </div>

              {/* OVERLAY LINK LINKS */}
              <div className="flex flex-col gap-2 mt-8 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-mono uppercase tracking-widest text-foreground hover:text-primary hover:bg-muted/60 p-3 rounded-xl border border-transparent hover:border-border/60 transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* OVERLAY FOOTER ACTIONS */}
              <div className="flex flex-col gap-3 pt-6 border-t border-border/60">
                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="w-full">
                  <Button variant="outline" className="w-full text-xs font-mono uppercase tracking-widest rounded-xl py-5">
                    Login Secure Profile
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsOpen(false)} className="w-full">
                  <Button className="w-full text-xs font-sans font-bold uppercase tracking-widest rounded-xl py-5 shadow-md shadow-primary/10">
                    Get Started
                  </Button>
                </Link>
              </div>

            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  );
}