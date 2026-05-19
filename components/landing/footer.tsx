"use client";

import Link from "next/link";
import { TrendingUp, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "../reuse/Logo";

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "How It Works", href: "#plans" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "Help Center", href: "/contact" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "#faq" },
    { label: "Community", href: "/community" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Compliance", href: "/compliance" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full bg-background text-foreground border-t border-border/60 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-16 lg:py-20">
        
        {/* STRUCTURAL CONTENT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-12">
          
          {/* BRAND MATRIC BLOCK */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit transition-transform active:scale-95">
              <Logo/>
            </Link>
            
            <p className="text-sm font-sans text-muted-foreground max-w-sm leading-relaxed">
              Automated capital allocation channels engineered with absolute algorithmic execution and industrial-grade security constraints. Join thousands of systematic investors building their future.
            </p>
            
            {/* CORE CONTACT MATRIX */}
            <div className="space-y-3 pt-2">
              <a href="mailto:support@vestflow.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground text-xs font-mono tracking-wide transition-colors group w-fit">
                <Mail className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                <span>support@vestflow.com</span>
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-3 text-muted-foreground hover:text-foreground text-xs font-mono tracking-wide transition-colors group w-fit">
                <Phone className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                <span>+1 (555) 123-4567</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground text-xs font-mono tracking-wide">
                <MapPin className="w-4 h-4 text-primary/70" />
                <span>New York, NY 10001, USA</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC LINK MATRIX: COMPANY */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/90">// Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group w-fit"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-0.5 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DYNAMIC LINK MATRIX: SUPPORT */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/90">// Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group w-fit"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-0.5 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DYNAMIC LINK MATRIX: LEGAL */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/90">// Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group w-fit"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-0.5 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER FIELD COMPONENT */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/90">// Pipeline Signals</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Subscribe to algorithmic pipeline performance notifications.
            </p>
            <form className="flex flex-col gap-2 mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Secure Email Address" 
                className="w-full bg-muted/40 border border-border/60 hover:border-border rounded-xl px-3.5 py-2 text-xs font-mono tracking-wide placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                required
              />
              <Button type="submit" size="sm" className="w-full rounded-xl text-xs font-sans font-bold uppercase tracking-widest py-4">
                Connect Signal
              </Button>
            </form>
          </div>

        </div>

        {/* COMPLIANCE & COPYRIGHT TERMINAL SEGMENT */}
        <div className="border-t border-border/60 mt-16 pt-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <p className="text-xs font-mono text-muted-foreground/80 order-2 lg:order-1">
              &copy; {new Date().getFullYear()} VestFlow. System Pipeline Architecture. All rights reserved.
            </p>
            
            <p className="text-[11px] font-sans text-muted-foreground/50 max-w-2xl leading-normal order-1 lg:order-2">
              <strong className="text-muted-foreground/70 font-medium">Risk Disclaimer:</strong> Capital allocation strategies involve significant operational and mechanical risk profiles. Past yield analytics are absolutely non-indicative of future algorithmic pipeline outputs. Secure all credentials.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}