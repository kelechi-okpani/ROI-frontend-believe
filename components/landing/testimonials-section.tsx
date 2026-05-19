"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    location: "New York, USA",
    content:
      "VestFlow has completely transformed my approach to investing. The returns have been consistent, and the platform is incredibly easy to use. I&apos;ve already recommended it to all my colleagues.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    location: "Singapore",
    content:
      "As someone who works in tech, I appreciate the security measures VestFlow has in place. The transparency and regular updates give me confidence in my investments.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Emma Williams",
    role: "Financial Analyst",
    location: "London, UK",
    content:
      "I&apos;ve tried many investment platforms, but VestFlow stands out with its exceptional customer service and reliable returns. The Growth plan has exceeded my expectations.",
    rating: 5,
    initials: "EW",
  },
  {
    name: "James Rodriguez",
    role: "Entrepreneur",
    location: "Miami, USA",
    content:
      "The referral program alone has helped me earn significant passive income. Combined with my investments, VestFlow has become my primary wealth-building tool.",
    rating: 5,
    initials: "JR",
  },
  {
    name: "Linda Thompson",
    role: "Retired Teacher",
    location: "Toronto, Canada",
    content:
      "At my age, security is paramount. VestFlow gives me peace of mind while helping my retirement savings grow. The support team is always helpful and patient.",
    rating: 5,
    initials: "LT",
  },
  {
    name: "David Kim",
    role: "Marketing Director",
    location: "Seoul, South Korea",
    content:
      "The Premium plan has been a game-changer for my portfolio. The dedicated manager really understands my goals and provides personalized investment advice.",
    rating: 5,
    initials: "DK",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Trusted by Thousands of Investors
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our community of
            investors has to say about their experience with VestFlow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/30 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/10" />
                  <p className="text-muted-foreground leading-relaxed pl-4">
                    {testimonial.content}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
