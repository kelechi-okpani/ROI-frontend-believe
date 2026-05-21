// "use client";

// import { CheckCircle2, Cpu, ShieldCheck, Zap, ArrowRight, Activity } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { StockMarquee } from "@/components/reuse/StockMarquee";

// const plans = [
//   {
//     id: "alpha",
//     name: "Alpha Pipeline",
//     tagline: "High-Frequency Algorithmic Trading",
//     yieldRate: "12.4% APY",
//     minDeposit: "$5,000",
//     riskProfile: "Low-Medium",
//     features: ["Spot & Futures Arbitrage Channels", "Dynamic Liquidity Provisioning", "Standard Capital Risk Guardrail", "Weekly Yield Settlement Windows"],
//     icon: ShieldCheck,
//     image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000", // Representative high-tech infrastructure
//     btnVariant: "outline" as const
//   },
//   {
//     id: "quantum",
//     name: "Quantum Engine",
//     tagline: "Deep Neural Network Capital Routing",
//     yieldRate: "24.8% APY",
//     minDeposit: "$25,000",
//     riskProfile: "Managed Systematic",
//     features: ["Cross-Chain Quantitative Execution", "Real-time MEV Slippage Protection", "99.9% Smart Contract Vault Security", "Instant Compound Yield Engine"],
//     icon: Cpu,
//     image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000", // Neural/Data visualization
//     btnVariant: "default" as const,
//     popular: true
//   },
//   {
//     id: "kinetic",
//     name: "Kinetic Infrastructure",
//     tagline: "Sustainable High-Yield Infrastructure Assets",
//     yieldRate: "18.2% APY",
//     minDeposit: "$10,000",
//     riskProfile: "Asset-Backed Minimal",
//     features: ["Tokenized Green Infrastructure Pools", "Automated Power-Grid Arbitrage", "Physical Hardware Ledger Backing", "Bi-Weekly Smart Contract Auditing"],
//     icon: Zap,
//     image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000", // Industrial/Precision engineering
//     btnVariant: "outline" as const
//   }
// ];

// export default function InvestmentPlans() {
//   return (
//     <section id="plans" className="w-full bg-[#FAFBFD] py-32 px-6">
//        <StockMarquee  speed={25} />
//       <div className="max-w-7xl mx-auto mt-8">
        
//         {/* HEADER */}
//         <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
//           <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 px-3 py-1 rounded-full">
//             <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
//             <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#2563EB]">System Capital Allocations</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1E293B] font-sans">
//             Engineered Investment <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#2563EB]">Pipelines</span>
//           </h2>
//         </div>

//         {/* CARDS GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {plans.map((plan) => {
//             const PlanIcon = plan.icon;
//             return (
//               <div
//                 key={plan.id}
//                 className={`group bg-white border rounded-3xl overflow-hidden shadow-sm transition-all duration-300 flex flex-col ${
//                   plan.popular ? "border-[#2563EB] shadow-md shadow-blue-500/10 lg:-translate-y-4" : "border-[#E2E8F0] hover:border-[#CBD5E1]"
//                 }`}
//               >
//                 {/* IMAGE */}
//                 <div className="relative h-48 w-full overflow-hidden">
//                   <img src={plan.image} alt={plan.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//                   <div className="absolute inset-0 bg-[#0F172A]/40" />
//                   {plan.popular && (
//                     <div className="absolute top-4 right-4 bg-[#2563EB] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
//                       Recommended Peak
//                     </div>
//                   )}
//                   <div className="absolute bottom-4 left-6 flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
//                       <PlanIcon className="w-5 h-5 text-white" />
//                     </div>
//                     <h3 className="text-xl font-bold font-sans text-white">{plan.name}</h3>
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-8 flex-1 flex flex-col">
//                   <div className="grid grid-cols-2 gap-4 border-b border-[#E2E8F0] pb-6 mb-6">
//                     <div>
//                       <p className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">Yield</p>
//                       <p className="text-2xl font-black text-[#1E293B]">{plan.yieldRate}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">Min Threshold</p>
//                       <p className="text-lg font-bold font-mono text-[#1E293B]">{plan.minDeposit}</p>
//                     </div>
//                   </div>

//                   <ul className="space-y-4 flex-1 mb-8">
//                     {plan.features.map((feature, i) => (
//                       <li key={i} className="flex items-start gap-3">
//                         <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
//                         <span className="text-xs text-[#64748B] font-sans">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <Button
//                     variant={plan.popular ? "default" : "outline"}
//                     className={`w-full text-[10px] font-bold uppercase tracking-widest rounded-xl py-6 ${
//                       plan.popular ? "bg-[#2563EB] hover:bg-[#1D4ED8]" : "border-[#E2E8F0] hover:bg-[#F8FAFC]"
//                     }`}
//                   >
//                     Deploy Capital Matrix <ArrowRight className="w-3 h-3 ml-2" />
//                   </Button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import { 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Activity, 
  TrendingUp, 
  Lock, 
  Globe, 
  Network
} from "lucide-react";

const plans = [
  {
    id: "alpha",
    name: "Alpha Pipeline",
    tagline: "High-Frequency Algorithmic Trading",
    yieldRate: "12.4% APY",
    minDeposit: "$5,000",
    riskProfile: "Low-Medium",
    features: ["Spot & Futures Arbitrage Channels", "Dynamic Liquidity Provisioning", "Standard Capital Risk Guardrail", "Weekly Yield Settlement Windows"],
    icon: ShieldCheck,
    image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Promo-Meet-Model-Y-Desktop.jpg", // Dark sleek abstract
    popular: false
  },
  {
    id: "quantum",
    name: "Quantum Engine",
    tagline: "Deep Neural Network Capital Routing",
    yieldRate: "24.8% APY",
    minDeposit: "$25,000",
    riskProfile: "Managed Systematic",
    features: ["Cross-Chain Quantitative Execution", "Real-time MEV Slippage Protection", "99.9% Smart Contract Vault Security", "Instant Compound Yield Engine"],
    icon: Cpu,
    image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Promo-Model-3-Desktop-US-CA-MX.jpg", // Minimal metallic
    popular: true
  },
  {
    id: "kinetic",
    name: "Kinetic Infrastructure",
    tagline: "Sustainable High-Yield Infrastructure Assets",
    yieldRate: "18.2% APY",
    minDeposit: "$10,000",
    riskProfile: "Asset-Backed Minimal",
    features: ["Tokenized Green Infrastructure Pools", "Automated Power-Grid Arbitrage", "Physical Hardware Ledger Backing", "Bi-Weekly Smart Contract Auditing"],
    icon: Zap,
    image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Model-3-Desktop-US_PR_MX.jpg", // Dark hardware
    popular: false
  }
];

const stats = [
  { label: "Execution Speed", value: "1.2ms" },
  { label: "Avg Annual Yield", value: "18.4%" },
  { label: "Active Nodes", value: "24,592" },
  { label: "System Uptime", value: "99.99%" },
];

const features = [
  {
    icon: Network,
    title: "Cross-Chain Arbitrage",
    desc: "Simultaneous liquidity execution across 14 EVM and non-EVM networks, eliminating slippage and capturing micro-spreads."
  },
  {
    icon: Lock,
    title: "Cold-Storage Parity",
    desc: "95% of idle capital is routed to air-gapped institutional custody protocols utilizing multi-party computation (MPC)."
  },
  {
    icon: Cpu,
    title: "Predictive Routing",
    desc: "Proprietary deep-learning models analyze sentiment, order book depth, and historical vectors in real-time."
  },
  {
    icon: Globe,
    title: "Global Compliance",
    desc: "Automated KYC/AML guardrails integrated directly at the smart contract level for full regulatory alignment."
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-zinc-800 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
      
      {/* INLINE STYLES FOR MARQUEE */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-custom-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: custom-marquee 25s linear infinite;
        }
      `}} />

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full pt-32 pb-20 px-6 overflow-hidden flex items-center min-h-[90vh]">
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            
            {/* Minimalist Status Badge */}
            <div className="inline-flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400">V 2.4.0 Engine Live</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-semibold uppercase tracking-tight text-black dark:text-white leading-[1.05]">
              Algorithmic <br />
              Wealth Routing
            </h1>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-lg leading-relaxed font-light">
              Institutional-grade capital allocation protocols. We leverage high-frequency execution and neural network predictions to generate asymmetric yields.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Tesla-style Primary Button (Solid Contrast) */}
              <button className="inline-flex items-center justify-center bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-semibold uppercase tracking-widest rounded-sm py-4 px-10 transition-colors focus:outline-none">
                Initialize Portfolio
              </button>
              {/* Tesla-style Secondary Button (Outline/Ghost) */}
              <button className="inline-flex items-center justify-center border-2 border-zinc-200 dark:border-zinc-800 text-black dark:text-white hover:border-zinc-900 dark:hover:border-white text-xs font-semibold uppercase tracking-widest rounded-sm py-4 px-10 transition-all focus:outline-none">
                View Whitepaper
              </button>
            </div>
          </div>

          {/* Minimalist Hero Visual */}
       {/* Minimalist Hero Visual */}
          <div className="relative hidden lg:block h-[500px] w-full rounded-sm border border-zinc-200 dark:border-zinc-900 overflow-hidden bg-zinc-50 dark:bg-zinc-950">
            {/* Inline video streaming raw automation/compute vectors directly from Tesla's asset server */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90 dark:opacity-60 grayscale pointer-events-none"
            >
             <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Abstract overlay to mimic sleek glass/reflections and balance contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent dark:from-black/80"></div>
            
            {/* Minimal overlay UI */}
            <div className="absolute bottom-6 left-6 right-6 p-4 flex justify-between items-end">
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Current Network TVL</p>
                <p className="text-3xl font-light tracking-tight text-black dark:text-white uppercase">
                  $428,591,002.45
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="w-full bg-zinc-50 dark:bg-zinc-900/50 py-16 px-6 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-zinc-300 dark:divide-zinc-800">
          {stats.map((stat, idx) => (
            <div key={idx} className={`text-center ${idx !== 0 ? "md:pl-8" : ""}`}>
              <p className="text-3xl md:text-4xl font-light tracking-tight text-black dark:text-white">{stat.value}</p>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ARCHITECTURE SECTION ================= */}
      <section className="w-full bg-white dark:bg-black py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight text-black dark:text-white mb-6">
              Institutional Infrastructure. <br/>
              <span className="text-zinc-400 dark:text-zinc-500">Retail Accessibility.</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-light">
              We abstracted the complexity of algorithmic finance. Our protocol handles the high-frequency execution, risk management, and node infrastructure seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, idx) => (
              <div key={idx} className="group border-t border-zinc-200 dark:border-zinc-800 pt-8 transition-colors hover:border-black dark:hover:border-white">
                <feature.icon className="w-6 h-6 text-black dark:text-white mb-6 opacity-70 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-3">{feature.title}</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INVESTMENT PLANS SECTION ================= */}
      <section id="plans" className="w-full bg-zinc-50 dark:bg-zinc-950 py-32 px-6 overflow-hidden">
        
        {/* Stark Ticker Tape Marquee */}
        <div className="w-full overflow-hidden mb-24 py-3 bg-black dark:bg-zinc-900 border-y border-zinc-800">
          <div className="animate-custom-marquee flex items-center gap-12">
            {Array.from({ length: 10 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-zinc-300 font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  BTC-USD <span className="text-white">+2.4%</span>
                </span>
                <span className="text-zinc-700 text-xs">|</span>
                <span className="text-zinc-300 font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  ETH-USD <span className="text-white">+4.1%</span>
                </span>
                <span className="text-zinc-700 text-xs">|</span>
                <span className="text-zinc-300 font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  SOL-USD <span className="text-red-500">-1.2%</span>
                </span>
                <span className="text-zinc-700 text-xs">|</span>
                <span className="text-zinc-300 font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  QNT-USD <span className="text-white">+8.7%</span>
                </span>
                <span className="text-zinc-700 text-xs">|</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight text-black dark:text-white">
              Engineered Pipelines
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-light">Select a capital deployment matrix based on your risk parameters.</p>
          </div>

          {/* Sharp Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              return (
                <div
                  key={plan.id}
                  className={`relative group bg-white dark:bg-black border rounded-sm overflow-hidden flex flex-col transition-all duration-500 ${
                    plan.popular 
                      ? "border-black dark:border-white" 
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  {/* High-contrast image header */}
                  <div className="relative h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <img src={plan.image} alt={plan.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
                    
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-semibold uppercase tracking-[0.2em] px-4 py-2">
                        Performance Tier
                      </div>
                    )}
                  </div>

                  {/* Stark Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold uppercase tracking-wider text-black dark:text-white mb-1">{plan.name}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-8">{plan.tagline}</p>

                    <div className="grid grid-cols-2 gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-6">
                      <div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em]">Est. Yield</p>
                        <p className="text-2xl font-light text-black dark:text-white mt-1">{plan.yieldRate}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em]">Min Entry</p>
                        <p className="text-2xl font-light text-black dark:text-white mt-1">{plan.minDeposit}</p>
                      </div>
                    </div>

                    <ul className="space-y-4 flex-1 mb-10">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white shrink-0 mt-1.5" />
                          <span className="text-sm text-zinc-600 dark:text-zinc-300 font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tesla-style Call to Action */}
                    <button
                      className={`w-full text-xs font-semibold uppercase tracking-widest py-4 transition-colors focus:outline-none ${
                        plan.popular 
                          ? "bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200" 
                          : "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800"
                      }`}
                    >
                      Deploy Capital
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}