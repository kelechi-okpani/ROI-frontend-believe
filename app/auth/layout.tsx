"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/reuse/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-100 font-sans selection:bg-black selection:text-amber-500">
      
      {/* Left panel — Industrial Cyber Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-800 flex-col justify-between p-16 relative overflow-hidden border-r border-zinc-700">
        
        {/* Stark Tech Grid Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #71717a 1px, transparent 1px), linear-gradient(to bottom, #71717a 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Ambient Linear Vector Accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-zinc-600/30 via-transparent to-transparent blur-[120px] pointer-events-none" />

        {/* Top Branding Section */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group transition-transform active:scale-95">
            <Logo />
          </Link>
        </div>

        {/* Core Narrative & High-Performance Matrix Display */}
        <div className="relative z-10 space-y-12 my-auto max-w-lg">
          <div className="space-y-4">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-zinc-700 border border-zinc-600 rounded-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-medium tracking-widest text-zinc-300 uppercase">
                Node Connection Secure
              </span>
            </div>
            
            <h1 className="text-4xl font-semibold uppercase tracking-tight text-zinc-100 leading-[1.1] text-balance">
              Autonomous <br />
              Capital Routing
            </h1>
            <p className="text-zinc-300 text-sm leading-relaxed font-light">
              Deploy structural capital into tokenized high-velocity arbitrage channels, automated grid infrastructure, and decentralized computing pipelines.
            </p>
          </div>

          {/* Stark Metric Matrix */}
          <div className="grid grid-cols-2 gap-px bg-zinc-600 border border-zinc-600">
            {[
              { value: "$428.5M", label: "Fleet Total Value Locked" },
              { value: "1.2ms", label: "Execution Latency" },
              { value: "24,592", label: "Active Network Nodes" },
              { value: "99.99%", label: "Pipeline Uptime" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-zinc-700 p-5 flex flex-col justify-between min-h-[90px]"
              >
                <div className="text-xl font-light text-zinc-100 tracking-tight">{stat.value}</div>
                <div className="text-[10px] font-medium tracking-wider uppercase text-zinc-400 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Integrity Compliance Notice */}
        <div className="relative z-10 flex items-center justify-between border-t border-zinc-700 pt-6">
          <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-mono">
            &copy; {new Date().getFullYear()} Tesla infrastructure.
          </p>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="text-[9px] uppercase tracking-widest font-mono">SEC Compliant Architecture</span>
          </div>
        </div>
      </div>

      {/* Right panel — Balanced Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col bg-slate-50">
        
        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2.5 group transition-transform active:scale-95">
            <Logo />
          </Link>
        </div>
        

        {/* Center Auth Form Render Area */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-16">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>
      </div>

    </div>
  );
}