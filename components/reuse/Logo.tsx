"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logoAsset from "@/public/Logo_T.png"; 

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({ 
  className, 
  priority = true 
}: LogoProps) {
  
  return (
    <div className={cn("flex items-center gap-1.5 sm:gap-3 select-none max-w-full", className)}>
      {/* Responsive Logo Sizing */}
      <div className="shrink-0">
        <Image
          src={logoAsset}
          alt="Platform Logo"
          width={300} 
          height={80} 
          priority={priority}
          className="object-contain w-auto h-8 sm:h-10 md:h-12" 
        />
      </div>
      
      {/* Responsive Separator Line */}
      <span className="text-gray-300 text-base sm:text-xl font-light shrink-0" aria-hidden="true">
        |
      </span>
      
      {/* Fully Responsive Typography */}
      <span className="text-[10px] xs:text-xs sm:text-sm font-black tracking-[0.12em] sm:tracking-[0.20em] text-black uppercase truncate min-w-0 raw-tracking">
        Infrastructure
      </span>
    </div>
  );
}