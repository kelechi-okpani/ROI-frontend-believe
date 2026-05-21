"use client";

import React, { useState, useEffect } from "react";
import { Globe, HelpCircle, User, ChevronDown, Menu, X } from "lucide-react";

// Full dataset representing the current 2026 Tesla lineup configuration
const TESLA_LINEUP = [
  {
    id: "model-y",
    title: "Model Y",
    subtitle: "From $31,4901",
    subtext: "After Federal Tax Credit & Est. Gas Savings",
    primaryBtn: "Order Now",
    secondaryBtn: "Demo Drive",
    bgImage: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200",
    darkText: false,
  },
  {
    id: "model-3",
    title: "Model 3",
    subtitle: "From $29,9902",
    subtext: "After Federal Tax Credit & Est. Gas Savings",
    primaryBtn: "Order Now",
    secondaryBtn: "Demo Drive",
    bgImage: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200",
    darkText: true,
  },
  {
    id: "model-x",
    title: "Model X",
    subtitle: "From $65,9903",
    subtext: "After Federal Tax Credit & Est. Gas Savings",
    primaryBtn: "Custom Order",
    secondaryBtn: "Demo Drive",
    bgImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200",
    darkText: false,
  },
  {
    id: "model-s",
    title: "Model S",
    subtitle: "From $71,4904",
    subtext: "After Est. Gas Savings",
    primaryBtn: "Custom Order",
    secondaryBtn: "Demo Drive",
    bgImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200",
    darkText: true,
  },
  {
    id: "cybertruck",
    title: "Cybertruck",
    subtitle: "Stainless Steel Exoskeleton",
    primaryBtn: "Order Now",
    secondaryBtn: "Learn More",
    bgImage: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1200", // Representative rugged geometric framing
    darkText: false,
    isCybertruck: true,
  },
  {
    id: "solar-panels",
    title: "Solar Panels",
    subtitle: "Schedule a Virtual Consultation",
    primaryBtn: "Order Now",
    secondaryBtn: "Learn More",
    bgImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200",
    darkText: false,
  },
];

export default function TeslaHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("model-y");

  // Intersection Observer to detect current vehicle frame view state for clean UI context
  useEffect(() => {
    const observers = TESLA_LINEUP.map((vehicle) => {
      const el = document.getElementById(vehicle.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(vehicle.id);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => obs?.observer.unobserve(obs.el));
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative bg-black font-sans antialiased selection:bg-neutral-800 selection:text-white">
      
      {/* GLOBAL PERSISTENT NAVIGATION OVERLAY */}
      <header className="fixed top-0 left-0 w-full z-40 px-8 py-4 flex items-center justify-between pointer-events-none">
        
        {/* Tesla Wordmark SVG Branding */}
        <div className="pointer-events-auto transition-opacity duration-300 hover:opacity-70">
          <svg 
            className="h-6 w-32 fill-current text-white mix-blend-difference" 
            viewBox="0 0 342 35" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1a1 1 0 0 1 .1-.3h21a1 1 0 0 1 .2.3l4 15.3 4-15.3a1 1 0 0 1 .2-.3h21a1 1 0 0 1 .1.3L41.3 34h-8.5L25.3 5.4 17.8 34H9.3zm67.2 16.7h23.3V25H67.2v1.5h27v7.2H58.6V.3h35v7.2h-26.4zm54.8-2h17.5a1 1 0 0 1 .3.1c.4.3.4.8.1 1.2l-6.6 6.3 7 11.2a1 1 0 0 1-.2.5h-9a1 1 0 0 1-.3-.1l-5.3-9h-3.5v9h-8.6V.3h16a12 12 0 0 1 2.6 15.4zm-2.6-6.6h7.5a4 4 0 0 0 0-8h-7.5zM172 16.7h23.3V25H172v1.5h27v7.2h-35.6V.3h35v7.2H172zm64.8 17.1h-8.6V.3h8.6zm33.4-15h21.4V34h-8.6v-7.4h-12.8V34h-8.6V1c.4-.4.8-.7 1.3-.7h19.8a12 12 0 0 1 1 24.3zm-12.8-7.7h12.8a4 4 0 0 0 0-8.2h-12.8z" />
          </svg>
        </div>

        {/* Desktop Central Links Matrix */}
        <nav className="hidden lg:flex items-center gap-1.5 pointer-events-auto">
          {["Vehicles", "Energy", "Charging", "Discover", "Shop"].map((item) => (
            <button 
              key={item} 
              className="text-xs font-semibold px-4 py-2 rounded text-white mix-blend-difference hover:bg-neutral-500/10 transition-colors tracking-wide"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right-Hand Functional Utility Control Dock */}
        <div className="hidden lg:flex items-center gap-1 pointer-events-auto text-white mix-blend-difference">
          <button className="p-2 rounded hover:bg-neutral-500/10 transition-colors"><HelpCircle className="w-4 h-4" /></button>
          <button className="p-2 rounded hover:bg-neutral-500/10 transition-colors"><Globe className="w-4 h-4" /></button>
          <button className="p-2 rounded hover:bg-neutral-500/10 transition-colors"><User className="w-4 h-4" /></button>
        </div>

        {/* Mobile Interactive Action Trigger */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden pointer-events-auto bg-black/5 backdrop-blur-md px-4 py-1.5 rounded text-xs font-semibold text-white border border-white/10 hover:bg-white hover:text-black transition-all"
        >
          <Menu className="w-4 h-4" />
        </button>
      </header>

      {/* COMPONENT SIDEBAR MODAL SYSTEM DRAWER */}
      <div className={`fixed inset-0 z-50 bg-white text-black transition-transform duration-500 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-8 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-end mb-8">
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
                <X className="w-6 h-6 text-neutral-800" />
              </button>
            </div>
            <nav className="flex flex-col space-y-2">
              {["Model S", "Model 3", "Model X", "Model Y", "Cybertruck", "Solar Roof", "Solar Panels", "Powerwall", "Existing Inventory", "Used Inventory", "Trade-In", "Demo Drive"].map((link) => (
                <a key={link} href="#" className="text-sm font-medium px-4 py-2.5 rounded hover:bg-neutral-100 transition-colors tracking-wide">
                  {link}
                </a>
              ))}
            </nav>
          </div>
          <div className="border-t border-neutral-100 pt-6 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>Tesla Inc. © 2026</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-black"><Globe className="w-3.5 h-3.5" /> United States</span>
          </div>
        </div>
      </div>

      {/* MAIN VIEWPORT HERO FRAMES MATRIX */}
      <main className="w-full h-full">
        {TESLA_LINEUP.map((vehicle, index) => (
          <section
            id={vehicle.id}
            key={vehicle.id}
            className="w-full h-screen snap-start snap-always relative flex flex-col justify-between items-center pt-28 pb-16 px-4 bg-neutral-900 overflow-hidden"
          >
            {/* Visual Media Layer Asset */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
              <div className={`absolute inset-0 z-10 ${vehicle.isCybertruck ? "bg-black/20" : "bg-black/5"}`} />
              <img 
                src={vehicle.bgImage} 
                alt={vehicle.title} 
                className="w-full h-full object-cover object-center scale-100"
              />
            </div>

            {/* Typography Content Identity Shield */}
            <div className="relative z-10 text-center space-y-1.5 animate-fade-in px-4">
              <h2 className={`text-4xl md:text-5xl font-semibold tracking-tight ${vehicle.darkText ? "text-neutral-900" : "text-white"}`}>
                {vehicle.title}
              </h2>
              <div className="space-y-0.5">
                <p className={`text-sm font-medium tracking-wide ${vehicle.darkText ? "text-neutral-800" : "text-neutral-200"}`}>
                  {vehicle.subtitle}
                </p>
                {vehicle.subtext && (
                  <p className={`text-[11px] font-light tracking-wide ${vehicle.darkText ? "text-neutral-500" : "text-neutral-300"}`}>
                    {vehicle.subtext}
                  </p>
                )}
              </div>
            </div>

            {/* Control Activation Panel Array */}
            <div className="relative z-10 w-full max-w-md mx-auto space-y-6 px-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`w-full text-center px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.99] backdrop-blur-md ${
                  vehicle.isCybertruck 
                    ? "bg-[#111111]/80 text-white border border-neutral-700 hover:bg-[#111111]/90" 
                    : "bg-[#222222]/80 text-white hover:bg-[#222222]/90"
                }`}>
                  {vehicle.primaryBtn}
                </button>
                {vehicle.secondaryBtn && (
                  <button className={`w-full text-center px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.99] backdrop-blur-md ${
                    vehicle.isCybertruck
                      ? "bg-transparent text-white border border-white/20 hover:bg-white/10"
                      : "bg-white/70 text-neutral-800 hover:bg-white/80"
                  }`}>
                    {vehicle.secondaryBtn}
                  </button>
                )}
              </div>

              {/* Infinite Context Frame Down Arrow Bounce Indicator */}
              {index === 0 && (
                <div className="flex justify-center pt-2">
                  <ChevronDown className="w-5 h-5 text-white animate-bounce cursor-pointer mix-blend-difference" onClick={() => {
                    document.getElementById(TESLA_LINEUP[1].id)?.scrollIntoView({ behavior: "smooth" });
                  }} />
                </div>
              )}
            </div>
          </section>
        ))}
      </main>

      {/* FLOATING INDEX FLIP INDICATOR TRACKER */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-2.5 bg-black/10 backdrop-blur-sm p-2 rounded-full border border-white/5">
        {TESLA_LINEUP.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => document.getElementById(vehicle.id)?.scrollIntoView({ behavior: "smooth" })}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              activeSection === vehicle.id ? "bg-white h-4" : "bg-white/40 hover:bg-white/70"
            }`}
            title={vehicle.title}
          />
        ))}
      </div>
    </div>
  );
}