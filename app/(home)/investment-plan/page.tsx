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
  Terminal, 
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
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000",
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
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
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
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000",
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
    <div className="min-h-screen bg-[#FAFBFD] font-sans selection:bg-[#2563EB] selection:text-white">
      
      {/* INLINE STYLES FOR MARQUEE (No Tailwind Config Required) */}
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
      <section className="relative w-full bg-[#0F172A] pt-32 pb-20 px-6 overflow-hidden flex items-center min-h-[90vh]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/20 border border-[#2563EB]/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60A5FA] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]"></span>
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#60A5FA]">V 2.4.0 Engine Live</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-[1.1]">
              Algorithmic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#2563EB]">
                Wealth Routing
              </span>
            </h1>
            
            <p className="text-[#94A3B8] text-lg max-w-lg leading-relaxed font-light">
              Institutional-grade capital allocation protocols. We leverage high-frequency execution and neural network predictions to generate asymmetric yields across decentralized and traditional markets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="inline-flex items-center justify-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold uppercase tracking-widest rounded-xl py-6 px-8 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:ring-offset-2">
                Initialize Portfolio <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="inline-flex items-center justify-center border border-[#334155] text-white hover:bg-[#1E293B] hover:text-white text-[11px] font-bold uppercase tracking-widest rounded-xl py-6 px-8 backdrop-blur-sm bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#334155]/50 focus:ring-offset-2">
                View Whitepaper
              </button>
            </div>
          </div>

          {/* Abstract Hero Visual */}
          <div className="relative hidden lg:block h-[500px] w-full rounded-3xl border border-[#334155] bg-[#1E293B]/50 backdrop-blur-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/20 to-transparent mix-blend-screen"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200" 
              alt="Data Visualization" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            {/* Overlay UI element */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#0F172A]/80 border border-[#334155] p-4 rounded-xl backdrop-blur-md flex justify-between items-center">
              <div>
                <p className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">Current Network TVL</p>
                <p className="text-2xl font-mono text-white mt-1">$428,591,002.45</p>
              </div>
              <TrendingUp className="text-[#38BDF8] w-8 h-8" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="w-full bg-[#2563EB] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <div key={idx} className={`text-center ${idx === 0 ? "" : "pl-8"}`}>
              <p className="text-3xl md:text-4xl font-black font-mono text-white">{stat.value}</p>
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/70 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ARCHITECTURE SECTION ================= */}
      <section className="w-full bg-white py-32 px-6 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tight text-[#1E293B]">
                Institutional Infrastructure, <br/>
                <span className="text-[#2563EB]">Retail Accessibility.</span>
              </h2>
              <p className="text-[#64748B] text-lg leading-relaxed">
                We abstracted the complexity of algorithmic finance. Our protocol handles the high-frequency execution, risk management, and node infrastructure, while you interact with a streamlined capital deployment interface.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#FAFBFD] border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-lg hover:shadow-[#2563EB]/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-[#2563EB]" />
                </div>
                <h4 className="text-lg font-bold text-[#1E293B] mb-3">{feature.title}</h4>
                <p className="text-sm text-[#64748B] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INVESTMENT PLANS SECTION ================= */}
      <section id="plans" className="w-full bg-[#FAFBFD] py-32 px-6 overflow-hidden">
        
        {/* Raw HTML Marquee Replacement */}
        <div className="w-full overflow-hidden mb-16 py-4 bg-[#1E293B] transform -rotate-1 scale-105 border-y border-[#334155]">
          <div className="animate-custom-marquee flex items-center gap-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-[#38BDF8] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> BTC-USD +2.4%
                </span>
                <span className="text-white/50 text-xs">///</span>
                <span className="text-[#38BDF8] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> ETH-USD +4.1%
                </span>
                <span className="text-white/50 text-xs">///</span>
                <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3" /> SOL-USD -1.2%
                </span>
                <span className="text-white/50 text-xs">///</span>
                <span className="text-[#38BDF8] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> QNT-USD +8.7%
                </span>
                <span className="text-white/50 text-xs">///</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 px-3 py-1 rounded-full">
              <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#2563EB]">System Capital Allocations</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1E293B] font-sans">
              Engineered Investment <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#2563EB]">Pipelines</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const PlanIcon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`group bg-white border rounded-3xl overflow-hidden shadow-sm transition-all duration-300 flex flex-col ${
                    plan.popular ? "border-[#2563EB] shadow-md shadow-blue-500/10 lg:-translate-y-4" : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img src={plan.image} alt={plan.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-[#0F172A]/40" />
                    {plan.popular && (
                      <div className="absolute top-4 right-4 bg-[#2563EB] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        Recommended Peak
                      </div>
                    )}
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <PlanIcon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold font-sans text-white">{plan.name}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="grid grid-cols-2 gap-4 border-b border-[#E2E8F0] pb-6 mb-6">
                      <div>
                        <p className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">Yield</p>
                        <p className="text-2xl font-black text-[#1E293B]">{plan.yieldRate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">Min Threshold</p>
                        <p className="text-lg font-bold font-mono text-[#1E293B]">{plan.minDeposit}</p>
                      </div>
                    </div>

                    <ul className="space-y-4 flex-1 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                          <span className="text-xs text-[#64748B] font-sans">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Standardized Raw Button */}
                    <button
                      className={`inline-flex items-center justify-center w-full text-[10px] font-bold uppercase tracking-widest rounded-xl py-6 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        plan.popular 
                          ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white focus:ring-[#2563EB]/50" 
                          : "border border-[#E2E8F0] bg-transparent hover:bg-[#F8FAFC] text-[#1E293B] focus:ring-[#CBD5E1]/50"
                      }`}
                    >
                      Deploy Capital Matrix <ArrowRight className="w-3 h-3 ml-2" />
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