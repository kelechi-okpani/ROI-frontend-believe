"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calculator, ShieldCheck, Lock, Activity, ArrowUpRight, Binary } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { StockMarquee } from "@/components/reuse/StockMarquee";

const plans = [
  { name: "Alpha Pipeline", roi: 12.4, duration: 30, color: "text-blue-400" },
  { name: "Quantum Engine", roi: 24.8, duration: 60, color: "text-purple-400" },
  { name: "Kinetic Infrastructure", roi: 18.2, duration: 90, color: "text-emerald-400" },
];
const infrastructure = [
  { title: "Edge Computing", src: "https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Global telemetry nodes" },
  { title: "Liquid Routing", src: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Low-latency execution" },
  { title: "Security Core", src: "https://images.pexels.com/photos/6050435/pexels-photo-6050435.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Hardened protocols" },
  { title: "Vault Storage", src: "https://images.pexels.com/photos/5935790/pexels-photo-5935790.jpeg?auto=compress&cs=tinysrgb&w=800", desc: "Redundant protection" }
];

export default function CalculatorSection() {
  const [amount, setAmount] = useState(25000);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const totalProfit = (amount * selectedPlan.roi) / 100;
  const totalReturn = amount + totalProfit;

  return (
    <div className="w-full bg-[#FAFBFD] text-[#334155] font-sans">
   
      {/* 1. CALCULATOR COMMAND CENTER */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 px-3 py-1 rounded-full">
              <Binary className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#2563EB]">Yield Forecasting Engine</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1E293B]">Capital Projection</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-sm">
              <label className="text-[10px] font-mono uppercase text-[#64748B] block mb-4">// Principal Stake (USD)</label>
              <div className="text-5xl font-black text-[#1E293B] mb-8 tracking-tight">${amount.toLocaleString()}</div>
              <Slider value={[amount]} onValueChange={([v]) => setAmount(v)} min={5000} max={250000} step={1000} className="mb-10" />
              
              <label className="text-[10px] font-mono uppercase text-[#64748B] block mb-4">// Select Execution Pipeline</label>
              <div className="grid gap-3">
                {plans.map((plan) => (
                  <button key={plan.name} onClick={() => setSelectedPlan(plan)} className={`p-4 rounded-xl border transition-all ${selectedPlan.name === plan.name ? 'border-[#2563EB] bg-[#F1F5F9]' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-[#1E293B]">{plan.name}</span>
                      <span className={`text-xs font-mono font-bold ${plan.color}`}>{plan.roi}% APY</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0F172A] p-8 rounded-3xl text-white shadow-xl space-y-8">
              <div>
                <p className="text-[10px] font-mono text-blue-300 uppercase tracking-widest">Total Projected Return</p>
                <div className="text-6xl font-black mt-2 tracking-tighter">${totalReturn.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[ { label: "Net Profit", val: `$${totalProfit.toFixed(2)}` }, { label: "Duration", val: `${selectedPlan.duration} Days` }, { label: "Risk Index", val: "Managed" }, { label: "Status", val: "Active" } ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <p className="text-[9px] uppercase text-slate-400 font-mono">{stat.label}</p>
                    <p className="font-bold text-sm mt-1">{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

 <StockMarquee  speed={25} />
      {/* 2. INFRASTRUCTURE GALLERY */}
      <section className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xs font-mono text-blue-400 mb-12 uppercase tracking-[0.2em] text-center">// Operational Environment</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructure.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer group border border-white/10"
              >
                <Image src={item.src} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-[10px] text-blue-300 font-mono uppercase">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-32 px-6 text-center">
        <Lock className="w-10 h-10 text-[#2563EB] mx-auto mb-6" />
        <h3 className="text-3xl font-black uppercase text-[#1E293B] mb-4">Secure Your Allocation</h3>
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#2563EB] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1D4ED8] transition-all">
          Authorize Contract Execution <ArrowUpRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}