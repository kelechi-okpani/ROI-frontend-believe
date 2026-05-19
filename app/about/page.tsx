"use client";

import React from "react";
import { 
  Users, 
  Target, 
  Workflow, 
  Award, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Compass,
  ArrowUpRight 
} from "lucide-react";

export default function AboutPage() {
  
  const stats = [
    { value: "$4.2B+", label: "Automated Capital Routed" },
    { value: "142+", label: "Hardware Node Clusters" },
    { value: "99.99%", label: "Pipeline Validation Rate" },
    { value: "24/7", label: "Autonomous Surveillance" },
  ];

  const milestones = [
    { 
      year: "Phase 01", 
      title: "Protocol Conception", 
      desc: "Algorithmic layout mapping for localized automated liquidity pools.",
      image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT6K97HlC2euLn5s1dFEL0K3qjiDHc7Cfd344SEhZDYcN2mqGbyat8kLEROjW9i-n6ynrGMGOqBHxrBA6Q" // High-speed server cluster metrics
    },
    { 
      year: "Phase 02", 
      title: "Hardware Isolation", 
      desc: "Migration of core asset loops to completely air-gapped cryptographic vaults.",
      image: "https://crypto4a.com/blog-images/what-is-an-hsm/what-is-an-hsm.jpg" // Hardware vault security module
    }
  ];

  return (
    <div className="w-full bg-[#FAFBFD] text-[#334155]">
      
      {/* HEADER: LUXURY DEEP NAVY CANVAS WITH FADE MASK */}
      <section className="relative h-[60vh] w-full flex flex-col justify-center items-center px-6 overflow-hidden bg-[#0F172A]">
        {/* Shimmers of vibrant cobalt blue cutting through the dark canvas */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1E3A8A]/50 via-transparent to-[#2563EB]/30 z-0" />
        
        {/* Crucial Fade Layer: Melts smoothly into your clean white layout below */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFBFD]/30 to-[#FAFBFD] z-10" />
        
        <div className="relative z-20 text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 px-3 py-1 rounded-full">
            <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300">Operational DNA</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase font-sans">
            The Architecture <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#2563EB]">
              Behind The Yield
            </span>
          </h1>
          <p className="text-xs md:text-sm font-mono text-blue-100/70 max-w-xl mx-auto tracking-wide leading-relaxed">
            Engineered by structural quantitative analysts to strip human bias completely out of capital acceleration pipelines.
          </p>
        </div>
      </section>

      {/* METRICS DISPATCH GRID */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:border-[#CBD5E1]"
            >
              <div className="text-2xl md:text-4xl font-black font-mono tracking-tight text-[#1E293B]">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILED MANIFESTO BLOCK + MONITORING HERO IMAGE */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono uppercase text-[#2563EB] tracking-widest block">
              // Core Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1E293B] font-sans">
              Systematic Execution Over Market Speculation
            </h2>
            <p className="text-xs font-mono text-[#64748B] leading-relaxed">
              We do not predict market trends. We construct programmatic processing lanes that capture mathematical spread realities across multi-layered decentralized liquidity pools.
            </p>
            
            {/* INLINE ARCHITECTURAL IMAGE CARD */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-inner group">
              <img 
                src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQ02z0FJxnG5UanaCwQnjx64OQvtoQvHKiAPCYNKS45c07gswQ2MatxtnloMCSJJLmwkNy_3FIjrWUKV4Y" 
                alt="Quant Operations Command Monitoring Station"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white bg-[#0F172A]/60 px-2 py-1 rounded">
                Live Node Telemetry Desk
              </span>
            </div>

            <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl space-y-3">
              <h4 className="text-xs font-bold uppercase text-[#1E293B] font-sans tracking-wide flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" /> Safe-State Compliance
              </h4>
              <p className="text-[11px] text-[#64748B] font-sans leading-relaxed">
                Every line of contract code running our pipelines undergoes continuous automated mathematical proofs to eliminate edge-case vulnerabilities.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Workflow className="w-4 h-4 text-[#2563EB]" />,
                title: "Algorithmic Precision",
                desc: "Our systems run on absolute formulas. When pre-set structural parameters clear, actions trigger instantly within milliseconds."
              },
              {
                icon: <Users className="w-4 h-4 text-[#2563EB]" />,
                title: "Quant-First Cultivation",
                desc: "Assembled by specialists with deep expertise across distributed storage layouts, legacy banking layers, and cryptographic primitives."
              },
              {
                icon: <Target className="w-4 h-4 text-[#2563EB]" />,
                title: "Risk Constraints",
                desc: "Hard-coded boundaries prevent concentrated system exposure. Capital assets are split smoothly across isolated nodes dynamically."
              },
              {
                icon: <Award className="w-4 h-4 text-[#2563EB]" />,
                title: "Continuous Ingress",
                desc: "Yield balances settle in real-time, feeding directly back into execution pools to consistently compounding velocity loops."
              }
            ].map((box, i) => (
              <div 
                key={i} 
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-4 hover:border-[#CBD5E1] transition-all duration-300 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center border border-[#E2E8F0]">
                  {box.icon}
                </div>
                <h3 className="text-xs font-bold uppercase text-[#1E293B] tracking-wider font-sans">
                  {box.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                  {box.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PICTURE-BASED BLUEPRINT ROADMAP */}
      <section className="py-32 bg-[#F8FAFC] border-t border-b border-[#E2E8F0] px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#2563EB] block">
              // System Evolution Blueprint
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#1E293B] font-sans">
              Development Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {milestones.map((ms, idx) => (
              <div key={idx} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm group hover:border-[#CBD5E1] transition-all duration-300">
                <div className="h-48 w-full bg-[#0F172A] overflow-hidden relative">
                  <img 
                    src={ms.image} 
                    alt={ms.title} 
                    className="w-full h-full object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 font-mono text-[10px] font-bold text-[#2563EB] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                    {ms.year}
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-sm font-bold uppercase text-[#1E293B] font-sans tracking-wide">
                    {ms.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                    {ms.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL INTAKE REDIRECT PROMPT */}
      <section className="py-32 max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#64748B] uppercase tracking-wider">
          <Activity className="w-3 h-3 text-emerald-500 animate-pulse" /> Nodes operating at peak threshold
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase text-[#1E293B] font-sans tracking-tight">
          Ready to Allocate Capital Vectors?
        </h2>
        <p className="text-xs font-mono text-[#64748B] max-w-lg mx-auto leading-relaxed">
          Initialize your connection to the algorithmic matrix and watch yield settlements happen transparently.
        </p>
        <div className="pt-4">
          <a 
            href="/#plans" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white text-[10px] font-bold tracking-widest uppercase hover:bg-[#1D4ED8] transition-all shadow-md shadow-blue-500/10"
          >
            Deploy Into Contracts <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
}