"use client";

import { motion } from "framer-motion";

interface StockItem {
  symbol: string;
  price: string;
  change: string;
  isUp: boolean;
}

interface MarqueeProps {
  items: StockItem[];
  speed?: number;
}

const stockData = [
  { symbol: "BTC/USD", price: "64,231.00", change: "1.2%", isUp: true },
  { symbol: "ETH/USD", price: "3,450.12", change: "0.8%", isUp: false },
  { symbol: "SOL/USD", price: "145.89", change: "3.4%", isUp: true },
  { symbol: "NVDA", price: "920.40", change: "2.1%", isUp: true },
  { symbol: "AAPL", price: "189.20", change: "0.5%", isUp: false },
];

export const StockMarquee = ({ speed = 20 }) => {
    
  return (
    <div className="w-full bg-[#0F172A] border-y border-[#1E293B] py-3 overflow-hidden flex items-center">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {/* We duplicate the items array to create a seamless infinite loop */}
        {[...stockData, ...stockData].map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-xs font-bold text-white font-mono">{item.symbol}</span>
            <span className="text-xs text-slate-400 font-mono">{item.price}</span>
            <span className={`text-[10px] font-bold font-mono ${item.isUp ? "text-emerald-400" : "text-rose-400"}`}>
              {item.isUp ? "▲" : "▼"} {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};