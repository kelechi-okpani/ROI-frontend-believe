"use client";

import Link from "next/link";
import { TrendingUp, Mail, MapPin, Phone } from "lucide-react";

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
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <span className="font-semibold text-xl">VestFlow</span>
            </Link>
            <p className="text-sidebar-foreground/70 mb-6 max-w-sm leading-relaxed">
              Your trusted partner in wealth creation. Join thousands of
              investors building their financial future with VestFlow.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sidebar-foreground/70">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@vestflow.com</span>
              </div>
              <div className="flex items-center gap-3 text-sidebar-foreground/70">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sidebar-foreground/70">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">New York, NY 10001, USA</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sidebar-foreground/70 text-sm">
              &copy; {new Date().getFullYear()} VestFlow. All rights reserved.
            </p>
            <p className="text-sidebar-foreground/50 text-xs">
              Investing involves risk. Past performance is not indicative of
              future results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
