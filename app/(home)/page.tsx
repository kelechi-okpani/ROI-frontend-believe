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
  CheckCircle,
  Zap,
  Globe,
  BatteryCharging,
  Eye
} from "lucide-react";
import { StockMarquee } from "@/components/reuse/StockMarquee";

export default function CoreDashboard() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [impactCounter, setImpactCounter] = useState<number>(45289120);

  // Live power metrics updating naturally
  const [liveTransactions, setLiveTransactions] = useState([
    { id: "SYS-M3", amount: "480 kW", type: "Car Charging Power", time: "Just Now", status: "Normal" },
    { id: "SYS-MY", amount: "1.2 MW", type: "Home Battery Pack", time: "2m ago", status: "Good" },
    { id: "SYS-SPl", amount: "1,020 hp", type: "Engine Temperature Control", time: "5m ago", status: "Normal" },
  ]);

  // Simulating real-time global clean energy produced in kWh
  useEffect(() => {
    const numInterval = setInterval(() => {
      setImpactCounter(prev => prev + Math.floor(Math.random() * 8) + 2);
    }, 1000);

    const interval = setInterval(() => {
      const types = ["Car Charging Power", "Home Battery Pack", "Engine Temperature Control"];
      const ids = ["SYS-M3", "SYS-MY", "SYS-SPl", "SYS-X"];
      const units = ["kW", "MW", "hp"];
      
      const selectedUnit = units[Math.floor(Math.random() * units.length)];
      let value = "";
      if (selectedUnit === "MW") value = `${(Math.random() * 2.5).toFixed(1)} MW`;
      if (selectedUnit === "kW") value = `${Math.floor(200 + Math.random() * 400)} kW`;
      if (selectedUnit === "hp") value = "1,020 hp";

      const newTx = {
        id: ids[Math.floor(Math.random() * ids.length)],
        amount: value,
        type: types[Math.floor(Math.random() * types.length)],
        time: "Just Now",
        status: "Normal"
      };
      setLiveTransactions(prev => [newTx, prev[0], prev[1]]);
    }, 9000);

    return () => {
      clearInterval(numInterval);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full bg-[#FFFFFF] text-[#111111] font-sans antialiased selection:bg-black selection:text-white">
      
      {/* SECTION 1: HERO/HOME WITH CINEMATIC VIDEO (UNTOUCHED LOGIC) */}
      <section id="home" className="relative h-screen w-full flex flex-col justify-between items-center py-24 px-4 overflow-hidden bg-[#000000]">
        <StockMarquee speed={20} />
        
        {/* BACKGROUND VIDEO */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/20 to-[#FFFFFF] z-10" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-60 scale-100 select-none pointer-events-none contrast-110 brightness-95"
          >
            <source src="/careers.webm" type="video/mp4" />
            {/* <source src="/video.mp4" type="video/mp4" /> */}
          </video>
        </div>
        
        {/* MAIN TEXT */}
        <div className="relative z-10 text-center mt-28 space-y-4 max-w-4xl px-4 mx-auto">
          <div className="inline-flex items-center gap-2 bg-black/60 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E82127]" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white font-medium">Smart Energy Grid // Online</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-tight">
            Clean Energy <br />
            <span className="font-light text-neutral-300">For Everyone</span>
          </h1>

          <p className="text-xs md:text-sm font-light text-neutral-400 max-w-xl mx-auto tracking-wide leading-relaxed">
            Smart power setups built to handle your daily electricity needs with maximum safety and real-time balance.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="relative z-10 w-full max-w-md flex flex-col sm:flex-row gap-4 px-4 mb-4">
          <a 
            href="#plans" 
            className="w-full text-center px-6 py-3.5 rounded bg-white text-black text-[11px] font-medium uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200 active:scale-[0.99]"
          >
            Order Battery Pack
          </a>
          <a 
            href="#visualizer" 
            className="w-full text-center px-6 py-3.5 rounded bg-black/40 text-white text-[11px] font-medium uppercase tracking-wider border border-white/30 hover:bg-white hover:text-black transition-all backdrop-blur-sm active:scale-[0.99]"
          >
            Explore Systems
          </a>
        </div>
      </section>

      {/* NEW SECTION 2: GIANT MASSIVE PERFORMANCE METRICS (TESLA STYLE) */}
      <section className="py-24 bg-white px-6 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[11px] font-mono tracking-widest text-[#E82127] uppercase mb-4">// Production Standards</p>
          <h2 className="text-center text-3xl md:text-4xl font-medium tracking-tight mb-16">Numbers That Define the Future</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <p className="text-6xl md:text-7xl font-light tracking-tight text-black">1,020<span className="text-2xl font-normal text-neutral-400">hp</span></p>
              <p className="text-xs uppercase tracking-widest font-medium text-neutral-500">Peak Motor Power</p>
            </div>
            <div className="space-y-2 border-y md:border-y-0 md:border-x border-neutral-100 py-8 md:py-0">
              <p className="text-6xl md:text-7xl font-light tracking-tight text-black">99.9<span className="text-2xl font-normal text-neutral-400">%</span></p>
              <p className="text-xs uppercase tracking-widest font-medium text-neutral-500">Grid Safe Uptime</p>
            </div>
            <div className="space-y-2">
              <p className="text-6xl md:text-7xl font-light tracking-tight text-black">&lt; 5<span className="text-2xl font-normal text-neutral-400">ms</span></p>
              <p className="text-xs uppercase tracking-widest font-medium text-neutral-500">Outage Response Speed</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LIVE STATUS */}
      <section className="py-12 bg-[#F4F4F4] border-b border-[#E2E2E2] px-6 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="space-y-1 md:border-r border-[#CBD5E1] pb-4 md:pb-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C5C5C] block">Live Status</span>
            <h4 className="text-xs font-semibold uppercase text-[#111111] flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#E82127]" /> Global Power Network
            </h4>
          </div>
          {liveTransactions.map((tx, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white border border-[#E2E2E2] rounded px-5 py-4 text-[11px] transition-all duration-200 hover:shadow-sm">
              <div className="space-y-1">
                <span className="text-[#5C5C5C] block text-[10px] font-mono">{tx.id} — {tx.type}</span>
                <span className="text-[#111111] font-semibold tracking-tight text-xs">{tx.amount}</span>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[#5C5C5C] block text-[10px] font-mono">{tx.time}</span>
                <span className="text-[#111111] text-[9px] font-mono uppercase tracking-wider font-semibold bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW SECTION 4: INTERACTIVE SETUP VISUALIZER (TABS TOGGLE) */}
      <section id="visualizer" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <p className="text-[11px] font-mono tracking-widest text-[#E82127] uppercase">// Ecosystem Overview</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Interactive Product Systems</h2>
          <p className="text-sm text-neutral-500 max-w-md mx-auto">Select a setup category below to view how clean energy transfers safely from production to storage.</p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center border-b border-neutral-200 max-w-md mx-auto mb-12">
          <button 
            onClick={() => setActiveTab("home")} 
            className={`px-6 py-3 text-xs font-medium uppercase tracking-wider transition-all ${activeTab === "home" ? "border-b-2 border-black text-black" : "text-neutral-400"}`}
          >
            Home Storage
          </button>
          <button 
            onClick={() => setActiveTab("vehicle")} 
            className={`px-6 py-3 text-xs font-medium uppercase tracking-wider transition-all ${activeTab === "vehicle" ? "border-b-2 border-black text-black" : "text-neutral-400"}`}
          >
            Vehicle Charging
          </button>
          <button 
            onClick={() => setActiveTab("industrial")} 
            className={`px-6 py-3 text-xs font-medium uppercase tracking-wider transition-all ${activeTab === "industrial" ? "border-b-2 border-black text-black" : "text-neutral-400"}`}
          >
            Industrial Grid
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#F4F4F4] rounded-xl p-8 lg:p-12">
          <div className="lg:col-span-7 h-80 rounded overflow-hidden relative shadow-inner bg-neutral-900">
            {activeTab === "home" && (
              <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800" alt="Solar panels on residential home roof" className="w-full h-full object-cover transition-all duration-500" />
            )}
            {activeTab === "vehicle" && (
              <img src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800" alt="Electric vehicle chassis component assembly" className="w-full h-full object-cover transition-all duration-500" />
            )}
            {activeTab === "industrial" && (
              <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800" alt="Large power substation infrastructure cables" className="w-full h-full object-cover transition-all duration-500" />
            )}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-[#E82127]">
              <Zap className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-widest font-semibold">Active Diagram Modules</span>
            </div>
            {activeTab === "home" && (
              <>
                <h3 className="text-xl font-semibold">Residential Roof Solar & Wall Battery</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">Generates clean electricity from pure daylight during peak sun hours. Excess power drops instantly into safe storage containers for nighttime consumption.</p>
              </>
            )}
            {activeTab === "vehicle" && (
              <>
                <h3 className="text-xl font-semibold">High-Voltage Battery Car Frameworking</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">Maintains cold cooling streams over standard lithium cell pockets. Manages rapid high-power acceleration thresholds smoothly without creating electrical friction.</p>
              </>
            )}
            {activeTab === "industrial" && (
              <>
                <h3 className="text-xl font-semibold">Large Scale Megapack Utility System</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">Locks entire cities directly onto backup energy networks. Protects entire regional blocks from collapsing during critical seasonal overload spikes.</p>
              </>
            )}
            <div className="pt-4 border-t border-neutral-200 grid grid-cols-2 gap-4 font-mono text-[11px]">
              <div>
                <span className="text-neutral-400 block uppercase">Efficiency Rating</span>
                <span className="text-black font-semibold">98.4% Nominal</span>
              </div>
              <div>
                <span className="text-neutral-400 block uppercase">Hardware Housing</span>
                <span className="text-black font-semibold">Weatherproof IP67</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURES */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto border-t border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <span className="text-[10px] font-mono uppercase text-[#E82127] tracking-widest block">// Built Safe</span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#111111]">Designed to Protect Your Home</h2>
            <p className="text-xs text-[#5C5C5C] leading-relaxed font-light">
              We remove the risks of power outages by using multiple safety layers, protected battery designs, and simple automatic health checks.
            </p>
            
            {/* IMAGE CONTAINER */}
            <div className="relative h-56 w-full rounded overflow-hidden border border-[#E2E2E2] bg-neutral-900 shadow-sm">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTehh24SnnPlY7g5fV41rQcCsqGB9Yc8G-Ux10A0nvHaqXNUpwG6MGIXkgGGYALaldRH3Y9_7VOCIluXZVw8jCPamOyRmeq7n7MQZTVpZhk&s=10" 
                alt="Factory production line" 
                className="w-full h-full object-cover grayscale brightness-90 contrast-115 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white bg-black/70 px-2 py-0.5 rounded border border-white/10">
                  Our Assembly Line
                </span>
                <span className="text-[10px] text-white font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#E82127] rounded-full animate-pulse" /> Live Status
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <Shield className="w-4 h-4 text-black" />, title: "Secure Storage Boxes", desc: "Your energy stays safe inside separate battery cells until our security systems give the green light to use it." },
              { icon: <Cpu className="w-4 h-4 text-black" />, title: "Smart Internal Chips", desc: "Our custom built-in chips check for power changes instantly and fix them in less than 5 milliseconds." },
              { icon: <RefreshCw className="w-4 h-4 text-black" />, title: "Balanced Battery Sharing", desc: "The system automatically balances the power across all battery cells so they stay healthy and last much longer." },
              { icon: <Layers className="w-4 h-4 text-black" />, title: "No Middleman Delays", desc: "Everything connects directly to the hardware. Your energy commands happen instantly without waiting for slow servers." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-[#E2E2E2] rounded p-8 space-y-4 hover:border-black transition-all duration-300">
                <div className="w-9 h-9 bg-[#F4F4F4] flex items-center justify-center border border-[#E2E2E2] rounded">{item.icon}</div>
                <h3 className="text-xs font-semibold uppercase text-[#111111] tracking-wider">{item.title}</h3>
                <p className="text-xs text-[#5C5C5C] leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 6: REAL-TIME GLOBAL IMPACT COUNTER CONTAINER */}
      <section className="py-28 bg-black text-white px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest text-neutral-300">
            <Globe className="w-3.5 h-3.5 text-emerald-400" /> Live Power Delivered Globally
          </div>
          <h2 className="text-5xl md:text-7xl font-mono tracking-tight font-light text-neutral-100">
            {impactCounter.toLocaleString()}<span className="text-xl font-sans text-neutral-500 font-normal ml-2">kWh</span>
          </h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
            Total volume of clean electricity distributed across active consumer networks worldwide this cycle.
          </p>
        </div>
      </section>

      {/* SECTION 7: SAFETY */}
      <section className="py-32 bg-[#F4F4F4] border-t border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#E82127] block">// Safe Design</span>
            <h2 className="text-3xl font-medium tracking-tight text-[#111111]">Two-Layer Safety Walls</h2>
            <p className="text-xs text-[#5C5C5C] font-light leading-relaxed">
              Every home power setup runs under strict safety rules. This guarantees that battery cells stay cool and safe before sending any power into your home appliances.
            </p>
            <ul className="space-y-3 font-mono text-[11px] text-[#111111]">
              <li className="flex items-center gap-2.5"><CheckCircle className="w-3.5 h-3.5 text-black" /> Keeps heat safely locked away and contained</li>
              <li className="flex items-center gap-2.5"><CheckCircle className="w-3.5 h-3.5 text-black" /> Active liquid cooling system to stop overheating</li>
            </ul>
          </div>

          {/* CHIP IMAGERY & STATUS OVERVIEW */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-64 sm:h-auto rounded overflow-hidden border border-[#E2E2E2] relative bg-black shadow-sm group">
              <img 
                src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=600" 
                alt="Microchip circuit board" 
                className="w-full h-full object-cover opacity-50 grayscale contrast-125 group-hover:scale-101 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase text-white tracking-widest bg-black/80 px-2 py-1 rounded border border-white/10">
                Main Power Component
              </span>
            </div>

            <div className="bg-white border border-[#E2E2E2] rounded p-6 flex flex-col justify-between font-mono shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#5C5C5C]" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#111111]">System Status</span>
                </div>
                <span className="text-[9px] bg-neutral-100 px-2 py-0.5 rounded text-[#5C5C5C] font-bold border border-neutral-200">LIVE</span>
              </div>
              <div className="space-y-3 text-[11px] pt-4">
                <p className="text-[#5C5C5C]">&gt; power_test ... <span className="text-[#111111] font-bold">ALL GOOD</span></p>
                <p className="text-[#5C5C5C]">&gt; temperature ... <span className="text-[#111111] font-bold">STABLE</span></p>
                <div className="bg-neutral-50 p-3 rounded text-[10px] text-[#111111] break-all border border-[#E2E2E2]">
                  BATTERY_CELL_CHECK::OK
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: PLANS / OPTIONS PACKS */}
      <section id="plans" className="py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#E82127] block">// Available Options</span>
            <h2 className="text-3xl font-medium tracking-tight text-[#111111]">Choose Your Setup Size</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Small Home Package", 
                rate: "120 kW", 
                term: "Always On", 
                entry: "1 Unit", 
                focus: "Standard Wall Batteries",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDNrAxsj6-q5V4HJttg-tj-2HcDsf-pYGRrcXducbR4Mq5T3jGypK90mVHQehybd3terGTeneMzaaptMOET3oSUfOxb00M2sZjpOGxGYSW&s=10" 
              },
              { 
                name: "Large Business Pack", 
                rate: "1.9 MW", 
                term: "Set Contract", 
                entry: "Full Setup", 
                focus: "Automatic Power Sharing",
                img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=500" 
              },
              { 
                name: "Industrial Grid Size", 
                rate: "25+ MW", 
                term: "Custom Lease", 
                entry: "Full Building", 
                focus: "Large Substation Support",
                img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=500" 
              }
            ].map((plan, i) => (
              <div key={i} className="bg-white border border-[#E2E2E2] rounded overflow-hidden flex flex-col justify-between items-start relative group hover:border-black transition-all duration-300">
                
                {/* PHOTO FRAME */}
                <div className="h-36 w-full bg-neutral-900 relative overflow-hidden">
                  <img 
                    src={plan.img} 
                    alt={plan.name} 
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:scale-102 transition-all duration-700 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white drop-shadow-sm">{plan.name}</h3>
                    <span className="text-[9px] font-mono bg-black text-white px-2 py-0.5 rounded uppercase tracking-wider font-semibold border border-white/10">In Stock</span>
                  </div>
                </div>

                <div className="p-8 w-full space-y-6 relative z-20 -mt-8">
                  <div className="bg-white/90 border border-[#E2E2E2] px-5 py-3 rounded inline-block backdrop-blur-sm shadow-sm">
                    <span className="text-3xl font-semibold tracking-tight text-[#111111]">{plan.rate}</span>
                    <span className="text-[9px] font-mono text-[#5C5C5C] block uppercase tracking-widest mt-1">Maximum Power Output</span>
                  </div>

                  <div className="w-full border-t border-[#E2E2E2] pt-4 space-y-3 font-mono text-[11px]">
                    <div className="flex justify-between"><span className="text-[#5C5C5C] uppercase">How Long It Lasts</span><span className="text-[#111111] font-semibold">{plan.term}</span></div>
                    <div className="flex justify-between"><span className="text-[#5C5C5C] uppercase">Starting Size</span><span className="text-[#111111] font-semibold">{plan.entry}</span></div>
                    <div className="flex justify-between items-start gap-4"><span className="text-[#5C5C5C] uppercase">Best Used For</span><span className="text-[#111111] font-semibold text-right max-w-[160px]">{plan.focus}</span></div>
                  </div>

                  <button className="w-full py-3 rounded bg-[#F4F4F4] border border-[#E2E2E2] text-[10px] font-mono uppercase tracking-widest text-[#111111] font-bold group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-200 flex items-center justify-center gap-2">
                    Get Started Now <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 9: PRODUCT SPECIFICATION COMPARISON TABLE */}
      <section className="py-24 bg-[#F4F4F4] border-t border-b border-neutral-200 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <p className="text-[11px] font-mono tracking-widest text-[#E82127] uppercase">// Side-By-Side Spec Sheet</p>
            <h2 className="text-3xl font-medium tracking-tight">Compare System Models</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-300 font-mono uppercase text-neutral-400 text-[10px]">
                  <th className="py-4 font-normal">Feature Spec</th>
                  <th className="py-4 font-normal text-black font-semibold">Small Home Pack</th>
                  <th className="py-4 font-normal text-black font-semibold">Large Business Pack</th>
                  <th className="py-4 font-normal text-black font-semibold">Industrial Grid Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                <tr>
                  <td className="py-4 font-medium text-black">Liquid Glycol Cooling</td>
                  <td className="py-4">Included</td>
                  <td className="py-4">Included (Dual Loop)</td>
                  <td className="py-4">Included (Multi-Zone)</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium text-black">Over-the-Air Updates</td>
                  <td className="py-4">Yes</td>
                  <td className="py-4">Yes</td>
                  <td className="py-4">Dedicated Local Line</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium text-black">Installation Strategy</td>
                  <td className="py-4">Wall Mount (1 Day)</td>
                  <td className="py-4">Floor Array (3 Days)</td>
                  <td className="py-4">Custom Site Build Out</td>
                </tr>
                <tr>
                  <td className="py-4 font-medium text-black">Structural Warranty</td>
                  <td className="py-4">10 Years</td>
                  <td className="py-4">15 Years</td>
                  <td className="py-4">25 Years Contracted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section id="faq" className="py-32 bg-[#FFFFFF] px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#E82127] block">// Common Questions</span>
            <h2 className="text-3xl font-medium tracking-tight text-[#111111]">How It Works</h2>
          </div>

          <div className="space-y-2">
            {[
              { q: "How does the system handle sudden power outages?", a: "The system monitors the city grid. If the main power drops, it instantly switches your home over to your battery pack backup without making your lights flicker." },
              { q: "What happens when my package contract ends?", a: "Once your contract is done, your unused power flows back into your main backup pool automatically, and you can change or stop your setup within 60 seconds." },
              { q: "Can I check my system logs at any time?", a: "Yes. Every single power shift and daily history check is saved directly on your home control unit, and you get a clean breakdown report every three months." }
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-[#E2E2E2] rounded overflow-hidden transition-all duration-200">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between cursor-pointer p-6 focus:outline-none text-left"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111111]">{faq.q}</h3>
                  <span className={`ml-4 flex-shrink-0 rounded bg-neutral-50 p-2 text-[#5C5C5C] border border-[#E2E2E2] transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === i ? "max-h-40 border-t border-[#E2E2E2]" : "max-h-0"}`}>
                  <p className="p-6 text-xs leading-relaxed text-[#5C5C5C] font-light bg-neutral-50">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: CONTACT FORM */}
      <section id="contact" className="py-32 bg-[#F4F4F4] border-t border-neutral-200">
        <div className="max-w-md mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#E82127] block">// Sign Up</span>
            <h2 className="text-2xl font-medium tracking-tight text-[#111111]">Request Your Setup</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[9px] font-mono uppercase tracking-widest text-[#5C5C5C] block">Your Name or Company Name</label>
              <input type="text" className="w-full bg-transparent border-b border-[#CBD5E1] text-xs font-mono text-[#111111] py-2 focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300" placeholder="ENTER YOUR FULL NAME" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-mono uppercase tracking-widest text-[#5C5C5C] block">Email Address</label>
              <input type="email" className="w-full bg-transparent border-b border-[#CBD5E1] text-xs font-mono text-[#111111] py-2 focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300" placeholder="name@yourdomain.com" />
            </div>
            <button type="submit" className="w-full py-4 mt-4 rounded bg-black text-white text-[11px] font-medium uppercase tracking-wider hover:bg-neutral-800 transition-all active:scale-[0.99]">
              Submit Form
            </button>
          </form>
        </div>
      </section>

      <StockMarquee speed={20} />
    </div>
  );
}

// "use client";

// import React, { useState, useEffect } from "react";
// import { 
//   ArrowUpRight, 
//   Shield, 
//   Cpu, 
//   RefreshCw, 
//   Layers, 
//   ChevronDown, 
//   Activity, 
//   Terminal, 
//   CheckCircle
// } from "lucide-react";
// import { StockMarquee } from "@/components/reuse/StockMarquee";


// export default function CoreDashboard() {
//   const [activeFaq, setActiveFaq] = useState<number | null>(null);
//   const [liveTransactions, setLiveTransactions] = useState([
//     { id: "TX-9021", amount: "$14,500", type: "Alpha Allocation", time: "Just Now", status: "Settled" },
//     { id: "TX-8944", amount: "$52,000", type: "Prime Vector", time: "2m ago", status: "Validated" },
//     { id: "TX-8812", amount: "$3,100", type: "Beta Horizon", time: "5m ago", status: "Settled" },
//   ]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const types = ["Alpha Allocation", "Beta Horizon", "Prime Vector"];
//       const newTx = {
//         id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
//         amount: `$${(Math.floor(5 + Math.random() * 95) * 500).toLocaleString()}`,
//         type: types[Math.floor(Math.random() * types.length)],
//         time: "Just Now",
//         status: "Settled"
//       };
//       setLiveTransactions(prev => [newTx, prev[0], prev[1]]);
//     }, 9000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full bg-[#FAFBFD] text-[#334155]">
      
//       {/* SECTION 1: CINEMATIC SHOWCASE VIDEO TERMINAL (HOME) */}
//       <section id="home" className="relative h-screen w-full flex flex-col justify-between items-center py-24 px-4 overflow-hidden border-b border-[#E2E8F0] bg-[#0F172A]">
//          <StockMarquee  speed={25} />
//         {/* BACKGROUND VIDEO MEDIA CANVAS */}
//         <div className="absolute inset-0 z-0">
//           {/* Shimmers of vibrant cobalt blue cutting through the dark canvas */}
//           <div className="absolute inset-0 bg-gradient-to-tr from-[#1E3A8A]/30 via-transparent to-[#2563EB]/20 z-10" />
          
//           {/* Crucial Fade Layer: Fades the dark top section into your clean white section seamlessly down the page */}
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFBFD]/10 to-[#FAFBFD] z-10" />
          
//           <video 
//             autoPlay 
//             muted 
//             loop 
//             playsInline 
//             /* The video now acts as a high-contrast moving light mask against the dark blue canvas */
//             className="w-full h-full object-cover opacity-35 mix-blend-screen scale-105 saturate-150 contrast-125 select-none pointer-events-none"
//           >
//             <source src="/video.mp4" type="video/mp4" />
//           </video>
//         </div>
        
//         {/* HERO HEADER TEXT BLOCK */}
//         <div className="relative z-10 text-center mt-28 space-y-6 max-w-4xl px-4 mx-auto">
//           {/* Frosted Glass Telemetry Status Pill */}
//           <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md shadow-inner">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//             <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300">System Pipeline v4.0 Active</span>
//           </div>

//           {/* Premium Multi-Color High-Contrast Heading */}
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[0.95] font-sans drop-shadow-sm">
//             Autonomous Wealth <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#2563EB]">
//               Architecture
//             </span>
//           </h1>

//           {/* High-Readability Description */}
//           <p className="text-xs md:text-sm font-mono text-blue-100/70 max-w-2xl mx-auto tracking-wide leading-relaxed">
//             Automated capital allocation channels engineered with absolute algorithmic execution and industrial-grade security constraints.
//           </p>
//         </div>

//         {/* CALL TO ACTION BUTTON BAR */}
//         <div className="relative z-10 w-full max-w-md flex flex-col sm:flex-row gap-3 px-4 mb-4">
//           <a 
//             href="#plans" 
//             className="w-full text-center px-6 py-3.5 rounded-full bg-[#2563EB] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#1D4ED8] hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-200"
//           >
//             Initialize Deployment
//           </a>
//           <a 
//             href="/calculator" 
//             className="w-full text-center px-6 py-3.5 rounded-full bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 hover:bg-white/10 active:scale-[0.98] transition-all backdrop-blur-sm"
//           >
//             Simulate Yield Curve
//           </a>
//         </div>

//       </section>

   


//       {/* SECTION 2: LIVE TELEMETRY MATRIX BLOCK */}
//       <section className="py-12 bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 relative z-20">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
//           <div className="space-y-1 md:border-r border-[#E2E8F0] pb-4 md:pb-0">
//             <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block">Live Streams</span>
//             <h4 className="text-xs font-bold uppercase text-[#1E293B] flex items-center gap-1.5 font-mono">
//               <Activity className="w-3.5 h-3.5 text-[#2563EB] animate-pulse" /> Global Node Activity
//             </h4>
//           </div>
//           {liveTransactions.map((tx, idx) => (
//             <div key={idx} className="flex justify-between items-center bg-white border border-[#E2E8F0] rounded-xl p-4 font-mono text-[11px] transition-all duration-300 hover:border-[#CBD5E1]">
//               <div className="space-y-0.5">
//                 <span className="text-[#64748B] block text-[10px]">{tx.id} — {tx.type}</span>
//                 <span className="text-[#1E293B] font-bold">{tx.amount} <span className="text-[#94A3B8] font-light">USD</span></span>
//               </div>
//               <div className="text-right space-y-0.5">
//                 <span className="text-[#64748B] block text-[10px]">{tx.time}</span>
//                 <span className="text-emerald-600 text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
//                   {tx.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* SECTION 3: SYSTEM ARCHITECTURE SPECIFICATIONS WITH SPLIT CONTRAST MEDIA CONTAINER */}
//       <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
//           <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
//             <span className="text-[10px] font-mono uppercase text-[#2563EB] tracking-widest block">// Cryptographic Integrity</span>
//             <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1E293B] font-sans">Engineered for Capital Security</h2>
//             <p className="text-xs text-[#64748B] leading-relaxed font-mono">
//               Removing centralized points of failure via multi-signature smart vaults and fully hardware-isolated operational models.
//             </p>
            
//             {/* VISUAL BREAKOUT DESK PANEL */}
//             <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-[#E2E8F0] group shadow-sm bg-black">
//               <img 
//                 src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" 
//                 alt="Complex quantitative real-time analytics monitoring interfaces" 
//                 className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent" />
//               <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
//                 <span className="font-mono text-[9px] uppercase tracking-widest text-white bg-blue-600/80 px-2 py-0.5 rounded">
//                   System Diagnostics Desk
//                 </span>
//                 <span className="text-[10px] text-blue-400 font-mono flex items-center gap-1">
//                   <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" /> Online
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               { icon: <Shield className="w-4 h-4 text-[#2563EB]" />, title: "Atomic Air-Gapped Safes", desc: "Reserves remain disconnected from external transaction loops until security matrices clear signatures across isolated regions." },
//               { icon: <Cpu className="w-4 h-4 text-[#2563EB]" />, title: "Algorithmic Rebalancing", desc: "Liquidity routing processes automatically shift capital assets across high-liquidity indexes on a rapid frame." },
//               { icon: <RefreshCw className="w-4 h-4 text-[#2563EB]" />, title: "Continuous Compounding", desc: "Yield values settle directly back into active deployment balances automatically, compound multiplying deployment velocity." },
//               { icon: <Layers className="w-4 h-4 text-[#2563EB]" />, title: "Zero Pipeline Friction", desc: "No manual routing configurations. Smart validation scripts handle execution streams directly upon memory block confirmations." }
//             ].map((item, idx) => (
//               <div key={idx} className="bg-white border border-[#E2E8F0] rounded-2xl p-8 space-y-4 hover:border-[#CBD5E1] transition-all duration-300 shadow-sm">
//                 <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center border border-[#E2E8F0]">{item.icon}</div>
//                 <h3 className="text-xs font-bold uppercase text-[#1E293B] font-sans tracking-widest">{item.title}</h3>
//                 <p className="text-xs text-[#64748B] leading-relaxed font-sans">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>


//       {/* SECTION 4: RISK MITIGATION WITH FULL-WIDTH IMAGE FRAME SPLIT */}
//       <section className="py-32 bg-[#F8FAFC] border-t border-b border-[#E2E8F0]">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//           <div className="lg:col-span-5 space-y-6">
//             <span className="text-[10px] font-mono tracking-widest uppercase text-[#2563EB] block">// Risk Parameters</span>
//             <h2 className="text-3xl font-black uppercase tracking-tight text-[#1E293B] font-sans">Dual-Layer Vault Protection</h2>
//             <p className="text-xs text-[#64748B] font-sans leading-relaxed">
//               Every asset pipeline initialized within the platform operates under multi-signature protocol mandates. This guarantees that capital pools are protected by institutional-grade thresholds before clearing global settlement rails.
//             </p>
//             <ul className="space-y-3 font-mono text-[11px] text-[#334155]">
//               <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#2563EB]" /> End-to-end hardware security module compliance</li>
//               <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#2563EB]" /> Decentralized oracles monitoring index spreads</li>
//             </ul>
//           </div>

//           {/* COMBINED TELEMETRY IMAGE & LOG BLOCK */}
//           <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="h-64 sm:h-auto rounded-2xl overflow-hidden border border-[#E2E8F0] relative bg-black shadow-sm group">
//               <img 
//                 src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=600" 
//                 alt="Cryptographic block calculations visualization" 
//                 className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
//               <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase text-white tracking-widest bg-[#0F172A]/80 px-2 py-1 rounded">
//                 Hardware Cryptography Module
//               </span>
//             </div>

//             <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between font-mono shadow-sm">
//               <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
//                 <div className="flex items-center gap-2">
//                   <Terminal className="w-4 h-4 text-[#64748B]" />
//                   <span className="text-[11px] uppercase tracking-wider text-[#334155]">Security Clearance</span>
//                 </div>
//                 <span className="text-[9px] bg-[#F1F5F9] px-2 py-0.5 rounded text-[#64748B] uppercase font-bold">ReadOnly</span>
//               </div>
//               <div className="space-y-3 text-[11px] pt-4">
//                 <p className="text-[#64748B]">&gt; initial_audit_state ... <span className="text-emerald-600 font-bold">PASSED</span></p>
//                 <p className="text-[#64748B]">&gt; multi_sig_handshake_status ... <span className="text-emerald-600 font-bold">SECURE</span></p>
//                 <div className="bg-[#F8FAFC] p-3 rounded text-[10px] text-[#475569] break-all border border-[#E2E8F0]">
//                   SHA256::9f86d081884c7d659a2f...
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 5: YIELD GENERATION CONTRACTS CARDS BUILT INTO MEDIA WRAPPERS */}
//       <section id="plans" className="py-32">
//         <div className="max-w-7xl mx-auto px-6 space-y-16">
//           <div className="text-center space-y-2">
//             <span className="text-[10px] font-mono tracking-widest uppercase text-[#2563EB] block">// High Throughput Parameters</span>
//             <h2 className="text-4xl font-black uppercase tracking-tight text-[#1E293B] font-sans">Yield Generation Contracts</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { 
//                 name: "Alpha Core Tier", 
//                 rate: "5.5%", 
//                 term: "15 Days", 
//                 entry: "$500", 
//                 focus: "High Stability Tickers",
//                 img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500" 
//               },
//               { 
//                 name: "Beta Horizon Tier", 
//                 rate: "7.2%", 
//                 term: "30 Days", 
//                 entry: "$5,000", 
//                 focus: "Algorithmic Arbitrage",
//                 img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=500" 
//               },
//               { 
//                 name: "Prime Vector Tier", 
//                 rate: "9.5%", 
//                 term: "60 Days", 
//                 entry: "$25,000", 
//                 focus: "Institutional Node Leases",
//                 img: "https://images.unsplash.com/photo-1644024314754-417f17f39efd?auto=format&fit=crop&q=80&w=500" 
//               }
//             ].map((plan, i) => (
//               <div key={i} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden flex flex-col justify-between items-start relative group hover:border-[#2563EB] transition-all duration-300 shadow-sm hover:shadow-md">
                
//                 {/* CONTRACT CARD METRIC FRAME */}
//                 <div className="h-32 w-full bg-[#0F172A] relative overflow-hidden">
//                   <img 
//                     src={plan.img} 
//                     alt={plan.name} 
//                     className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
//                   <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
//                     <h3 className="text-xs font-bold uppercase tracking-widest text-white/90 drop-shadow-sm font-sans">{plan.name}</h3>
//                     <span className="text-[9px] font-mono bg-blue-600 px-2 py-0.5 rounded text-white uppercase tracking-widest font-bold">Active</span>
//                   </div>
//                 </div>

//                 <div className="p-8 w-full space-y-6 relative z-20 -mt-10">
//                   <div className="bg-white/90 border border-[#E2E8F0] p-4 rounded-xl shadow-sm inline-block backdrop-blur-sm">
//                     <span className="text-4xl font-black tracking-tight text-[#1E293B] font-mono">{plan.rate}</span>
//                     <span className="text-[9px] font-mono text-[#64748B] block uppercase tracking-widest mt-0.5">Daily Payout</span>
//                   </div>

//                   <div className="w-full border-t border-[#E2E8F0] pt-4 space-y-3 font-mono text-[11px]">
//                     <div className="flex justify-between"><span className="text-[#64748B] uppercase">Lock Term</span><span className="text-[#334155] font-bold">{plan.term}</span></div>
//                     <div className="flex justify-between"><span className="text-[#64748B] uppercase">Entry Threshold</span><span className="text-[#334155] font-bold">{plan.entry}</span></div>
//                     <div className="flex justify-between items-start gap-4"><span className="text-[#64748B] uppercase">Focus Pool</span><span className="text-[#475569] font-bold text-right max-w-[150px]">{plan.focus}</span></div>
//                   </div>

//                   <button className="w-full py-3.5 rounded-full bg-[#FAFBFD] border border-[#E2E8F0] text-[10px] font-mono uppercase tracking-widest text-[#1E293B] font-bold group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all duration-300 flex items-center justify-center gap-2">
//                     Deploy Into Contract <ArrowUpRight className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SECTION 6: OPERATIONAL MECHANICS (FAQ) */}
//       <section id="faq" className="py-32 bg-[#F8FAFC] border-t border-b border-[#E2E8F0]">
//         <div className="max-w-4xl mx-auto px-6 space-y-12">
//           <div className="text-center space-y-2">
//             <span className="text-[10px] font-mono tracking-widest uppercase text-[#2563EB] block">// Inquiries Repository</span>
//             <h2 className="text-3xl font-black uppercase tracking-tight text-[#1E293B] font-sans">Operational Mechanics</h2>
//           </div>

//           <div className="space-y-3">
//             {[
//               { q: "How are yield metrics guaranteed against market volatility?", a: "Allocations operate within automated execution constraints backed by structural liquidity triggers, executing transactions only when safe-spread thresholds validate across decentralized oracles." },
//               { q: "What is the capital withdrawal sequence post lock-term completion?", a: "Upon contract cycle completion, both the initial core capital allocation and generated yields migrate atomically to your unallocated wallet balance pool, ready for extraction within 60 seconds." },
//               { q: "Is there an institution-level audit framework available?", a: "Yes. All system parameters, structural changes, and contract histories log directly onto decentralized ledgers, with quarterly technical status logs made fully viewable to participants." }
//             ].map((faq, i) => (
//               <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden transition-all duration-200 shadow-sm">
//                 <button 
//                   onClick={() => setActiveFaq(activeFaq === i ? null : i)}
//                   className="w-full flex items-center justify-between cursor-pointer p-6 focus:outline-none text-left"
//                 >
//                   <h3 className="text-xs font-bold uppercase tracking-wider font-sans text-[#1E293B]">{faq.q}</h3>
//                   <span className={`ml-1.5 flex-shrink-0 rounded-lg bg-[#F1F5F9] p-2 text-[#64748B] border border-[#E2E8F0] transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`}>
//                     <ChevronDown className="w-3.5 h-3.5" />
//                   </span>
//                 </button>
//                 <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === i ? "max-h-40 border-t border-[#E2E8F0]" : "max-h-0"}`}>
//                   <p className="p-6 text-xs leading-relaxed text-[#64748B] font-sans bg-[#FAFBFD]">{faq.a}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SECTION 7: ACCESS INTAKE MODULE (CONTACT) */}
//       <section id="contact" className="py-32">
//         <div className="max-w-md mx-auto px-6 space-y-8">
//           <div className="text-center space-y-2">
//             <span className="text-[10px] font-mono tracking-widest uppercase text-[#2563EB] block">// Secure Intake Gateway</span>
//             <h2 className="text-2xl font-black uppercase tracking-tight text-[#1E293B] font-sans">Initialize Deployment Request</h2>
//           </div>

//           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//             <div className="space-y-1">
//               <label className="text-[9px] font-mono uppercase tracking-widest text-[#64748B] block">Identified Entity Name</label>
//               <input type="text" className="w-full bg-transparent border-b border-[#CBD5E1] text-xs font-mono text-[#1E293B] py-2.5 focus:outline-none focus:border-[#2563EB] transition-colors placeholder:text-[#94A3B8]" placeholder="e.g., INVESTOR OR FIRM NAME" />
//             </div>
//             <div className="space-y-1">
//               <label className="text-[9px] font-mono uppercase tracking-widest text-[#64748B] block">Secure Comms Routing Address</label>
//               <input type="email" className="w-full bg-transparent border-b border-[#CBD5E1] text-xs font-mono text-[#1E293B] py-2.5 focus:outline-none focus:border-[#2563EB] transition-colors placeholder:text-[#94A3B8]" placeholder="name@secure-domain.com" />
//             </div>
//             <button type="submit" className="w-full py-4 mt-4 rounded-full bg-[#2563EB] text-white font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-[#1D4ED8] transition-all active:scale-[0.98] shadow-md shadow-blue-500/10">
//               Submit Access Profile
//             </button>
//           </form>
//         </div>
//       </section>
//  <StockMarquee  speed={25} />
//     </div>
//   );
// }