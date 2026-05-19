// import { Navbar } from "@/components/landing/navbar";
// import { HeroSection } from "@/components/landing/hero-section";
// import { AboutSection } from "@/components/landing/about-section";
// import { PlansSection } from "@/components/landing/plans-section";
// import { CalculatorSection } from "@/components/landing/calculator-section";
// import { TestimonialsSection } from "@/components/landing/testimonials-section";
// import { FAQSection } from "@/components/landing/faq-section";
// import { Footer } from "@/components/landing/footer";
// import { ChatWidget } from "@/components/landing/chat-widget";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen">
//       <Navbar />
//       <HeroSection />
//       <AboutSection />
//       <PlansSection />
//       <CalculatorSection />
//       <TestimonialsSection />
//       <FAQSection />
//       <Footer />
//       <ChatWidget />
//     </main>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowUpRight, 
  Shield, 
  Cpu, 
  RefreshCw, 
  Layers, 
  ChevronDown, 
  Activity, 
  Terminal, 
  CheckCircle
} from "lucide-react";

export default function CoreDashboard() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [liveTransactions, setLiveTransactions] = useState([
    { id: "TX-9021", amount: "$14,500", type: "Alpha Allocation", time: "Just Now", status: "Settled" },
    { id: "TX-8944", amount: "$52,000", type: "Prime Vector", time: "2m ago", status: "Validated" },
    { id: "TX-8812", amount: "$3,100", type: "Beta Horizon", time: "5m ago", status: "Settled" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ["Alpha Allocation", "Beta Horizon", "Prime Vector"];
      const newTx = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: `$${(Math.floor(5 + Math.random() * 95) * 500).toLocaleString()}`,
        type: types[Math.floor(Math.random() * types.length)],
        time: "Just Now",
        status: "Settled"
      };
      setLiveTransactions(prev => [newTx, prev[0], prev[1]]);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#FAFBFD] text-[#334155]">
      {/* SECTION 1: CINEMATIC SHOWCASE VIDEO TERMINAL (HOME) */}
      <section id="home" className="relative h-screen w-full flex flex-col justify-between items-center py-24 px-4 overflow-hidden border-b border-[#E2E8F0] bg-[#0F172A]">
        
        {/* BACKGROUND VIDEO MEDIA CANVAS */}
        <div className="absolute inset-0 z-0">
          {/* Shimmers of vibrant cobalt blue cutting through the dark canvas */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1E3A8A]/30 via-transparent to-[#2563EB]/20 z-10" />
          
          {/* Crucial Fade Layer: Fades the dark top section into your clean white section seamlessly down the page */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFBFD]/10 to-[#FAFBFD] z-10" />
          
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            /* The video now acts as a high-contrast moving light mask against the dark blue canvas */
            className="w-full h-full object-cover opacity-35 mix-blend-screen scale-105 saturate-150 contrast-125 select-none pointer-events-none"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* HERO HEADER TEXT BLOCK */}
        <div className="relative z-10 text-center mt-28 space-y-6 max-w-4xl px-4 mx-auto">
          {/* Frosted Glass Telemetry Status Pill */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300">System Pipeline v4.0 Active</span>
          </div>

          {/* Premium Multi-Color High-Contrast Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[0.95] font-sans drop-shadow-sm">
            Autonomous Wealth <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#2563EB]">
              Architecture
            </span>
          </h1>

          {/* High-Readability Description */}
          <p className="text-xs md:text-sm font-mono text-blue-100/70 max-w-2xl mx-auto tracking-wide leading-relaxed">
            Automated capital allocation channels engineered with absolute algorithmic execution and industrial-grade security constraints.
          </p>
        </div>

        {/* CALL TO ACTION BUTTON BAR */}
        <div className="relative z-10 w-full max-w-md flex flex-col sm:flex-row gap-3 px-4 mb-4">
          <a 
            href="#plans" 
            className="w-full text-center px-6 py-3.5 rounded-full bg-[#2563EB] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#1D4ED8] hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-200"
          >
            Initialize Deployment
          </a>
          <a 
            href="/calculator" 
            className="w-full text-center px-6 py-3.5 rounded-full bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 hover:bg-white/10 active:scale-[0.98] transition-all backdrop-blur-sm"
          >
            Simulate Yield Curve
          </a>
        </div>

      </section>


      {/* SECTION 2: LIVE TELEMETRY MATRIX BLOCK */}
      <section className="py-12 bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="space-y-1 md:border-r border-[#E2E8F0] pb-4 md:pb-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block">Live Streams</span>
            <h4 className="text-xs font-bold uppercase text-[#1E293B] flex items-center gap-1.5 font-mono">
              <Activity className="w-3.5 h-3.5 text-[#2563EB] animate-pulse" /> Global Node Activity
            </h4>
          </div>
          {liveTransactions.map((tx, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white border border-[#E2E8F0] rounded-xl p-4 font-mono text-[11px] transition-all duration-300 hover:border-[#CBD5E1]">
              <div className="space-y-0.5">
                <span className="text-[#64748B] block text-[10px]">{tx.id} — {tx.type}</span>
                <span className="text-[#1E293B] font-bold">{tx.amount} <span className="text-[#94A3B8] font-light">USD</span></span>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[#64748B] block text-[10px]">{tx.time}</span>
                <span className="text-emerald-600 text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SYSTEM ARCHITECTURE SPECIFICATIONS WITH SPLIT CONTRAST MEDIA CONTAINER */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <span className="text-[10px] font-mono uppercase text-[#2563EB] tracking-widest block">// Cryptographic Integrity</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1E293B] font-sans">Engineered for Capital Security</h2>
            <p className="text-xs text-[#64748B] leading-relaxed font-mono">
              Removing centralized points of failure via multi-signature smart vaults and fully hardware-isolated operational models.
            </p>
            
            {/* VISUAL BREAKOUT DESK PANEL */}
            <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-[#E2E8F0] group shadow-sm bg-black">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" 
                alt="Complex quantitative real-time analytics monitoring interfaces" 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white bg-blue-600/80 px-2 py-0.5 rounded">
                  System Diagnostics Desk
                </span>
                <span className="text-[10px] text-blue-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" /> Online
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <Shield className="w-4 h-4 text-[#2563EB]" />, title: "Atomic Air-Gapped Safes", desc: "Reserves remain disconnected from external transaction loops until security matrices clear signatures across isolated regions." },
              { icon: <Cpu className="w-4 h-4 text-[#2563EB]" />, title: "Algorithmic Rebalancing", desc: "Liquidity routing processes automatically shift capital assets across high-liquidity indexes on a rapid frame." },
              { icon: <RefreshCw className="w-4 h-4 text-[#2563EB]" />, title: "Continuous Compounding", desc: "Yield values settle directly back into active deployment balances automatically, compound multiplying deployment velocity." },
              { icon: <Layers className="w-4 h-4 text-[#2563EB]" />, title: "Zero Pipeline Friction", desc: "No manual routing configurations. Smart validation scripts handle execution streams directly upon memory block confirmations." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-[#E2E8F0] rounded-2xl p-8 space-y-4 hover:border-[#CBD5E1] transition-all duration-300 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center border border-[#E2E8F0]">{item.icon}</div>
                <h3 className="text-xs font-bold uppercase text-[#1E293B] font-sans tracking-widest">{item.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: RISK MITIGATION WITH FULL-WIDTH IMAGE FRAME SPLIT */}
      <section className="py-32 bg-[#F8FAFC] border-t border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#2563EB] block">// Risk Parameters</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#1E293B] font-sans">Dual-Layer Vault Protection</h2>
            <p className="text-xs text-[#64748B] font-sans leading-relaxed">
              Every asset pipeline initialized within the platform operates under multi-signature protocol mandates. This guarantees that capital pools are protected by institutional-grade thresholds before clearing global settlement rails.
            </p>
            <ul className="space-y-3 font-mono text-[11px] text-[#334155]">
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#2563EB]" /> End-to-end hardware security module compliance</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#2563EB]" /> Decentralized oracles monitoring index spreads</li>
            </ul>
          </div>

          {/* COMBINED TELEMETRY IMAGE & LOG BLOCK */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-64 sm:h-auto rounded-2xl overflow-hidden border border-[#E2E8F0] relative bg-black shadow-sm group">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=600" 
                alt="Cryptographic block calculations visualization" 
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase text-white tracking-widest bg-[#0F172A]/80 px-2 py-1 rounded">
                Hardware Cryptography Module
              </span>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between font-mono shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#64748B]" />
                  <span className="text-[11px] uppercase tracking-wider text-[#334155]">Security Clearance</span>
                </div>
                <span className="text-[9px] bg-[#F1F5F9] px-2 py-0.5 rounded text-[#64748B] uppercase font-bold">ReadOnly</span>
              </div>
              <div className="space-y-3 text-[11px] pt-4">
                <p className="text-[#64748B]">&gt; initial_audit_state ... <span className="text-emerald-600 font-bold">PASSED</span></p>
                <p className="text-[#64748B]">&gt; multi_sig_handshake_status ... <span className="text-emerald-600 font-bold">SECURE</span></p>
                <div className="bg-[#F8FAFC] p-3 rounded text-[10px] text-[#475569] break-all border border-[#E2E8F0]">
                  SHA256::9f86d081884c7d659a2f...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: YIELD GENERATION CONTRACTS CARDS BUILT INTO MEDIA WRAPPERS */}
      <section id="plans" className="py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#2563EB] block">// High Throughput Parameters</span>
            <h2 className="text-4xl font-black uppercase tracking-tight text-[#1E293B] font-sans">Yield Generation Contracts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Alpha Core Tier", 
                rate: "5.5%", 
                term: "15 Days", 
                entry: "$500", 
                focus: "High Stability Tickers",
                img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500" 
              },
              { 
                name: "Beta Horizon Tier", 
                rate: "7.2%", 
                term: "30 Days", 
                entry: "$5,000", 
                focus: "Algorithmic Arbitrage",
                img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=500" 
              },
              { 
                name: "Prime Vector Tier", 
                rate: "9.5%", 
                term: "60 Days", 
                entry: "$25,000", 
                focus: "Institutional Node Leases",
                img: "https://images.unsplash.com/photo-1644024314754-417f17f39efd?auto=format&fit=crop&q=80&w=500" 
              }
            ].map((plan, i) => (
              <div key={i} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden flex flex-col justify-between items-start relative group hover:border-[#2563EB] transition-all duration-300 shadow-sm hover:shadow-md">
                
                {/* CONTRACT CARD METRIC FRAME */}
                <div className="h-32 w-full bg-[#0F172A] relative overflow-hidden">
                  <img 
                    src={plan.img} 
                    alt={plan.name} 
                    className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/90 drop-shadow-sm font-sans">{plan.name}</h3>
                    <span className="text-[9px] font-mono bg-blue-600 px-2 py-0.5 rounded text-white uppercase tracking-widest font-bold">Active</span>
                  </div>
                </div>

                <div className="p-8 w-full space-y-6 relative z-20 -mt-10">
                  <div className="bg-white/90 border border-[#E2E8F0] p-4 rounded-xl shadow-sm inline-block backdrop-blur-sm">
                    <span className="text-4xl font-black tracking-tight text-[#1E293B] font-mono">{plan.rate}</span>
                    <span className="text-[9px] font-mono text-[#64748B] block uppercase tracking-widest mt-0.5">Daily Payout</span>
                  </div>

                  <div className="w-full border-t border-[#E2E8F0] pt-4 space-y-3 font-mono text-[11px]">
                    <div className="flex justify-between"><span className="text-[#64748B] uppercase">Lock Term</span><span className="text-[#334155] font-bold">{plan.term}</span></div>
                    <div className="flex justify-between"><span className="text-[#64748B] uppercase">Entry Threshold</span><span className="text-[#334155] font-bold">{plan.entry}</span></div>
                    <div className="flex justify-between items-start gap-4"><span className="text-[#64748B] uppercase">Focus Pool</span><span className="text-[#475569] font-bold text-right max-w-[150px]">{plan.focus}</span></div>
                  </div>

                  <button className="w-full py-3.5 rounded-full bg-[#FAFBFD] border border-[#E2E8F0] text-[10px] font-mono uppercase tracking-widest text-[#1E293B] font-bold group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all duration-300 flex items-center justify-center gap-2">
                    Deploy Into Contract <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: OPERATIONAL MECHANICS (FAQ) */}
      <section id="faq" className="py-32 bg-[#F8FAFC] border-t border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#2563EB] block">// Inquiries Repository</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#1E293B] font-sans">Operational Mechanics</h2>
          </div>

          <div className="space-y-3">
            {[
              { q: "How are yield metrics guaranteed against market volatility?", a: "Allocations operate within automated execution constraints backed by structural liquidity triggers, executing transactions only when safe-spread thresholds validate across decentralized oracles." },
              { q: "What is the capital withdrawal sequence post lock-term completion?", a: "Upon contract cycle completion, both the initial core capital allocation and generated yields migrate atomically to your unallocated wallet balance pool, ready for extraction within 60 seconds." },
              { q: "Is there an institution-level audit framework available?", a: "Yes. All system parameters, structural changes, and contract histories log directly onto decentralized ledgers, with quarterly technical status logs made fully viewable to participants." }
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden transition-all duration-200 shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between cursor-pointer p-6 focus:outline-none text-left"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider font-sans text-[#1E293B]">{faq.q}</h3>
                  <span className={`ml-1.5 flex-shrink-0 rounded-lg bg-[#F1F5F9] p-2 text-[#64748B] border border-[#E2E8F0] transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === i ? "max-h-40 border-t border-[#E2E8F0]" : "max-h-0"}`}>
                  <p className="p-6 text-xs leading-relaxed text-[#64748B] font-sans bg-[#FAFBFD]">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: ACCESS INTAKE MODULE (CONTACT) */}
      <section id="contact" className="py-32">
        <div className="max-w-md mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#2563EB] block">// Secure Intake Gateway</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#1E293B] font-sans">Initialize Deployment Request</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-[9px] font-mono uppercase tracking-widest text-[#64748B] block">Identified Entity Name</label>
              <input type="text" className="w-full bg-transparent border-b border-[#CBD5E1] text-xs font-mono text-[#1E293B] py-2.5 focus:outline-none focus:border-[#2563EB] transition-colors placeholder:text-[#94A3B8]" placeholder="e.g., INVESTOR OR FIRM NAME" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-mono uppercase tracking-widest text-[#64748B] block">Secure Comms Routing Address</label>
              <input type="email" className="w-full bg-transparent border-b border-[#CBD5E1] text-xs font-mono text-[#1E293B] py-2.5 focus:outline-none focus:border-[#2563EB] transition-colors placeholder:text-[#94A3B8]" placeholder="name@secure-domain.com" />
            </div>
            <button type="submit" className="w-full py-4 mt-4 rounded-full bg-[#2563EB] text-white font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-[#1D4ED8] transition-all active:scale-[0.98] shadow-md shadow-blue-500/10">
              Submit Access Profile
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}