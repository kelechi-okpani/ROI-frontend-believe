"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Lightbulb,
  Award,
  Globe,
  CheckCircle2,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize wealth creation by providing accessible, secure, and profitable investment opportunities for everyone.",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    description:
      "To become the world&apos;s most trusted investment platform, empowering millions to achieve financial freedom.",
  },
  {
    icon: Award,
    title: "Our Values",
    description:
      "Transparency, security, and customer success are at the core of everything we do.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Operating in 50+ countries, we bring world-class investment opportunities to investors everywhere.",
  },
];

const highlights = [
  "Licensed and regulated investment platform",
  "SSL encrypted transactions",
  "Segregated client funds",
  "Regular third-party audits",
  "24/7 dedicated support team",
  "Multi-currency support",
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
            About VestFlow
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Building the Future of Investment
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Founded in 2020, VestFlow has grown to become a leading investment
            platform trusted by thousands of investors worldwide. Our
            cutting-edge technology and expert team ensure your investments
            work harder for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value) => (
            <Card
              key={value.title}
              className="bg-card border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Why Choose VestFlow?
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    We combine cutting-edge technology with financial expertise
                    to deliver exceptional returns while maintaining the highest
                    security standards.
                  </p>
                  <div className="grid gap-3">
                    {highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                        <span className="text-foreground text-sm">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-6xl font-bold text-primary mb-2">5+</p>
                      <p className="text-muted-foreground">
                        Years of Excellence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
