"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoAsset from "@/public/Logo_T.png"; 

interface LogoProps {
  className?: string;
  href?: string;
  priority?: boolean;
}

export function Logo({ 
  className, 
  href = "/dashboard", 
  priority = true 
}: LogoProps) {
  
  return (

    <div>
        {/* <Link 
      href={href} 
      className={cn(
        "inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg transition-opacity hover:opacity-90 select-none shrink-0", 
        className
      )} */}
    {/* > */}
      <Image
        src={logoAsset}
        alt="Platform Logo"
        width={300} // Increased base bounding box to prevent layout cropping
        height={80} 
        priority={priority}
        className="object-contain w-auto h-10 md:h-12" // Scaled from h-7/h-8 up to h-10/h-12
      />
    {/* </Link>  */}
    </div>
   
  );
}