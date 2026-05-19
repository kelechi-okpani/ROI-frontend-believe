"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Headphones, ArrowUpRight, Binary } from "lucide-react";

const contactInfo = [
  { icon: Mail, title: "Email Us", value: "support@vestflow.com", desc: "Response within 24h" },
  { icon: Phone, title: "Call Us", value: "+1 (555) 123-4567", desc: "Mon-Fri 9am-6pm EST" },
  { icon: MapPin, title: "Visit Us", value: "Financial District", desc: "New York, NY 10001" },
  { icon: Clock, title: "Support", value: "24/7 Operations", desc: "Autonomous monitoring" },
];

export default function ContactPage() {
  return (
    <div className="w-full bg-[#FAFBFD] text-[#334155]">
      
      {/* 1. HEADER: DARK CANVAS WITH BACKGROUND IMAGE */}
      <section className="relative h-[50vh] w-full flex flex-col justify-center items-center px-6 overflow-hidden bg-[#0F172A]">
        {/* Background Atmosphere Image */}
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          alt="Tech Infrastructure"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/40 to-[#FAFBFD] z-10" />
        
        <div className="relative z-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 px-3 py-1 rounded-full">
            <Binary className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-blue-300">Communication Terminal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">Contact Operations</h1>
        </div>
      </section>

      {/* 2. CONTACT DISPATCH GRID */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => (
            <div key={i} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:border-[#CBD5E1] transition-all">
              <info.icon className="w-6 h-6 text-[#2563EB] mb-4" />
              <div className="text-sm font-bold uppercase text-[#1E293B] font-sans">{info.title}</div>
              <div className="text-[10px] font-mono text-[#64748B] mt-1">{info.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FORM & SIDEBAR MANIFESTO */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* FORM AREA */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#1E293B]">Message Submission</h2>
            </div>

            <form className="bg-white border border-[#E2E8F0] p-8 rounded-3xl space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#2563EB]" />
                <input type="email" placeholder="Email Address" className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#2563EB]" />
              </div>
              <textarea placeholder="How can we assist your infrastructure needs?" rows={6} className="w-full p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#2563EB]" />
              <button className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-[#1D4ED8] transition-all flex items-center justify-center gap-2">
                Transmit Message <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F172A] p-8 rounded-3xl text-white">
              <Headphones className="w-8 h-8 mb-4 text-[#38BDF8]" />
              <h3 className="text-xl font-bold mb-2">24/7 Live Support</h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">Our autonomous and human support teams are synced for constant uptime.</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase tracking-wider">Start Live Session</button>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-3xl">
              <h3 className="font-bold text-[#1E293B] mb-2">Office Vector</h3>
              <div className="aspect-video bg-[#E2E8F0] rounded-xl flex items-center justify-center text-[10px] font-mono text-[#64748B]">
                // STATIC MAP COORDINATES
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}