"use client";

import React, { useState } from "react";
import { 
  TrendingUp, BatteryCharging, ShieldCheck, Cpu, 
  MapPin, ArrowUpRight, Car, Zap, Activity, Info, Server, Layers
} from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TeslaFleetMonitor() {
  const [selectedAsset, setSelectedAsset] = useState("robotaxi_alpha");

  // Production Reality Datastore Matrix
  const assets: Record<string, {
    name: string;
    category: "ROBOTAXI_FLEET" | "MEGAPACK_SOLAR" | "AI_COMPUTE" | "SUPERCHARGER_NET";
    imageUrl: string;
    totalPool: number;
    allocated: number;
    roi: number;
    daysLeft: number;
    totalDays: number;
    utilization: number;
    dailyYield: number;
    location: string;
    hardware: string;
  }> = {
    robotaxi_alpha: {
      name: "Autonomous Robotaxi Fleet Alpha",
      category: "ROBOTAXI_FLEET",
      imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
      totalPool: 2499,
      allocated: 1845,
      roi: 13.9,
      daysLeft: 18,
      totalDays: 30,
      utilization: 94.2,
      dailyYield: 11.57,
      location: "Austin, TX Sector",
      hardware: "FSD Computer v5 (AI5)",
    },
    megapack_industrial: {
      name: "Industrial Megapack Array V1",
      category: "MEGAPACK_SOLAR",
      imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=1200&auto=format&fit=crop",
      totalPool: 9999,
      allocated: 8120,
      roi: 20.5,
      daysLeft: 45,
      totalDays: 90,
      utilization: 98.7,
      dailyYield: 22.77,
      location: "Willow Creek Microgrid",
      hardware: "Cortex Powerhub Matrix v2",
    },
    dojo_cluster: {
      name: "Dojo Supercomputing AI Cluster",
      category: "AI_COMPUTE",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      totalPool: 250000,
      allocated: 195000,
      roi: 55.0,
      daysLeft: 240,
      totalDays: 360,
      utilization: 99.1,
      dailyYield: 381.94,
      location: "Palo Alto Node-04",
      hardware: "Tesla D1 AI Core Architecture",
    },
    supercharger_nexus: {
      name: "Metropolitan Cyber-Freight Hub",
      category: "SUPERCHARGER_NET",
      imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      totalPool: 49999,
      allocated: 32000,
      roi: 26.5,
      daysLeft: 112,
      totalDays: 180,
      utilization: 87.4,
      dailyYield: 73.60,
      location: "LA Port Distribution Nexus",
      hardware: "V4 Megawatt Supercharger Grid",
    }
  };

  const current = assets[selectedAsset] || assets.robotaxi_alpha;
  const fundingProgress = Math.round((current.allocated / current.totalPool) * 100);
  const timelineProgress = Math.round(((current.totalDays - current.daysLeft) / current.totalDays) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto m-2 p-4 md:p-6 space-y-6 bg-background text-foreground rounded-2xl border border-border/80 shadow-2xl transition-all duration-300">
      
      {/* Dynamic Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
            <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 fill-current" />
            Live Infrastructure Nodes
          </div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Telemetry & Yield Engine
          </h2>
        </div>
        
        <Tabs value={selectedAsset} onValueChange={setSelectedAsset} className="w-full lg:w-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted/60 border border-border/60 p-1 rounded-xl h-auto gap-1">
            <TabsTrigger value="robotaxi_alpha" className="rounded-lg gap-1.5 py-2 text-xs font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Car className="w-3.5 h-3.5 shrink-0" /> Robotaxi Fleet
            </TabsTrigger>
            <TabsTrigger value="megapack_industrial" className="rounded-lg gap-1.5 py-2 text-xs font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BatteryCharging className="w-3.5 h-3.5 shrink-0" /> Megapack Grid
            </TabsTrigger>
            <TabsTrigger value="dojo_cluster" className="rounded-lg gap-1.5 py-2 text-xs font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Server className="w-3.5 h-3.5 shrink-0" /> Dojo Compute
            </TabsTrigger>
            <TabsTrigger value="supercharger_nexus" className="rounded-lg gap-1.5 py-2 text-xs font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Layers className="w-3.5 h-3.5 shrink-0" /> Freight Hub
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Grid Layout Frame */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Media Graphic & Pools */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative h-64 md:h-85 rounded-2xl overflow-hidden border border-border/80 group bg-muted shadow-inner">
            <img 
              src={current.imageUrl} 
              alt={current.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* High Contrast Overlay Mask Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-md border-none shadow-sm">
                {current.category}
              </Badge>
              <Badge variant="outline" className="bg-zinc-950/70 backdrop-blur-md border-emerald-500/40 text-emerald-400 font-mono text-[10px] flex items-center gap-1 shadow-sm">
                <Activity className="w-3 h-3 animate-pulse" /> TELEMETRY ACTIVE
              </Badge>
            </div>

            <div className="absolute bottom-4 inset-x-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white md:max-w-md leading-snug">{current.name}</h3>
                <p className="text-xs text-zinc-300 font-medium flex items-center gap-1 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" /> {current.location}
                </p>
              </div>
              <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 p-3 rounded-xl text-right shrink-0 shadow-lg">
                <span className="block text-[9px] font-mono tracking-widest text-zinc-400 uppercase">Yield Baseline</span>
                <span className="text-lg font-black text-emerald-400">{current.roi}% ROI</span>
              </div>
            </div>
          </div>

          {/* Allocation Progress Tracker Card */}
          <Card className="border-border/60 bg-card shadow-sm rounded-2xl">
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Capital Pool Infrastructure Funding</span>
                  <p className="text-2xl font-bold font-mono tracking-tight">
                    ${current.allocated.toLocaleString()} <span className="text-sm font-normal text-muted-foreground/60">/ ${current.totalPool.toLocaleString()}</span>
                  </p>
                </div>
                <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                  {fundingProgress}% Linked
                </span>
              </div>
              <Progress value={fundingProgress} className="h-2.5 bg-muted" />
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Metrics Monitor & Action Modules */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Node Grid Specs */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-border/60 bg-card/50 shadow-sm rounded-2xl">
              <CardContent className="p-4 space-y-3">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center border border-border/40">
                  <Cpu className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground font-mono tracking-wider uppercase">System Architecture</span>
                  <span className="text-xs font-bold block truncate mt-0.5 text-foreground">{current.hardware}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/50 shadow-sm rounded-2xl">
              <CardContent className="p-4 space-y-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground font-mono tracking-wider uppercase">Real-Time Daily Velocity</span>
                  <span className="text-sm font-bold text-emerald-500 block mt-0.5">+${current.dailyYield.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline Tracking Block */}
          <Card className="border-border/60 bg-card/50 shadow-sm rounded-2xl">
            <CardContent className="pt-5 pb-4 space-y-4">
              <CardTitle className="text-xs font-semibold tracking-wider uppercase text-muted-foreground flex items-center justify-between">
                <span>Contract Lifecycle Monitor</span>
                <span className="font-mono text-foreground font-semibold tracking-tight">{current.daysLeft} days remaining</span>
              </CardTitle>
              
              <Progress value={timelineProgress} className="h-2 bg-muted" />
              
              <div className="border-t border-border/40 pt-3 flex justify-between items-center text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-muted-foreground" /> Hardware Operating Threshold
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{current.utilization}% Load Capacity</span>
              </div>
            </CardContent>
          </Card>

       

        </div>
      </div>
    </div>
  );
}