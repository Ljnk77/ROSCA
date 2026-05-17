import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useWalletStore } from "@/lib/wallet-store";

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => 
    `${prefix}${current.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export function SummaryStrip() {
  const { isConnected, balance } = useWalletStore();

  const totalPortfolio = isConnected ? 125000 : 0;
  const totalEarned = isConnected ? 8450.50 : 0;
  const walletBalance = isConnected ? Number(balance) : 0;
  const apy = isConnected ? 8.2 : 0;

  return (
    <div className="w-full bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex flex-col space-y-1 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-border hidden md:block"></div>
            <span className="text-sm font-medium text-muted-foreground">Tổng Tài Sản</span>
            <div className="text-2xl font-bold text-foreground">
              <AnimatedNumber value={totalPortfolio} prefix="$" />
            </div>
          </div>

          <div className="flex flex-col space-y-1 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-border hidden md:block"></div>
            <span className="text-sm font-medium text-muted-foreground">Lãi Đã Nhận</span>
            <div className="text-2xl font-bold text-primary">
              <AnimatedNumber value={totalEarned} prefix="+$" decimals={2} />
            </div>
          </div>

          <div className="flex flex-col space-y-1 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-border hidden md:block"></div>
            <span className="text-sm font-medium text-muted-foreground">Số Dư Ví (ARC)</span>
            <div className="text-2xl font-bold text-foreground">
              <AnimatedNumber value={walletBalance} prefix="$" />
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">APY Tháng Này</span>
            <div className="text-2xl font-bold text-accent">
              <AnimatedNumber value={apy} suffix="%" decimals={1} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
