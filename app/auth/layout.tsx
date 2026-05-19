import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.55 0.18 165) 1px, transparent 1px), linear-gradient(90deg, oklch(0.55 0.18 165) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow circles */}
        <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />

        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-semibold text-2xl text-sidebar-foreground">VestFlow</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-sidebar-foreground leading-tight text-balance">
              Grow your wealth with confidence
            </h1>
            <p className="text-sidebar-foreground/70 text-lg leading-relaxed">
              Join over 50,000 investors who trust VestFlow to build their financial future with smart, transparent investment plans.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "$2.4B+", label: "Assets managed" },
              { value: "50K+", label: "Active investors" },
              { value: "99.9%", label: "Uptime reliability" },
              { value: "24/7", label: "Expert support" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-sidebar-accent rounded-xl p-4 border border-sidebar-border"
              >
                <div className="text-2xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-sidebar-foreground/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sidebar-foreground/40 text-sm relative z-10">
          &copy; {new Date().getFullYear()} VestFlow. All rights reserved.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">VestFlow</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
