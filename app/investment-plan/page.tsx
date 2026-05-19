"use client";

import { CheckCircle2, Cpu, ShieldCheck, Zap, ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000", // Representative high-tech infrastructure
    btnVariant: "outline" as const
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
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000", // Neural/Data visualization
    btnVariant: "default" as const,
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
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000", // Industrial/Precision engineering
    btnVariant: "outline" as const
  }
];

export default function InvestmentPlans() {
  return (
    <section id="plans" className="w-full bg-[#FAFBFD] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
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

        {/* CARDS GRID */}
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
                {/* IMAGE */}
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

                {/* CONTENT */}
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

                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className={`w-full text-[10px] font-bold uppercase tracking-widest rounded-xl py-6 ${
                      plan.popular ? "bg-[#2563EB] hover:bg-[#1D4ED8]" : "border-[#E2E8F0] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    Deploy Capital Matrix <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}