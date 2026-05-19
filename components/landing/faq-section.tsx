"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does VestFlow generate returns?",
    answer:
      "VestFlow utilizes a diversified investment strategy that includes forex trading, cryptocurrency arbitrage, and real estate investments. Our team of expert traders and AI-powered algorithms work together to identify profitable opportunities while minimizing risk.",
  },
  {
    question: "Is my investment secure?",
    answer:
      "Yes, security is our top priority. We use bank-grade encryption, two-factor authentication, and segregated client funds. Our platform is regularly audited by independent security firms, and we maintain full regulatory compliance in all jurisdictions we operate in.",
  },
  {
    question: "What is the minimum investment amount?",
    answer:
      "The minimum investment amount starts at $100 for our Starter plan. This makes investing accessible to everyone, whether you&apos;re just starting your investment journey or looking to diversify your portfolio.",
  },
  {
    question: "How long does it take to process withdrawals?",
    answer:
      "Withdrawal processing times vary by plan. Starter plan withdrawals are processed within 24-48 hours, Growth plan within 12-24 hours, and Premium and Enterprise plans enjoy instant or same-day processing.",
  },
  {
    question: "Can I have multiple active investments?",
    answer:
      "Absolutely! You can have multiple active investments across different plans simultaneously. This allows you to diversify your portfolio and maximize your earning potential based on your investment goals.",
  },
  {
    question: "How does the referral program work?",
    answer:
      "Our referral program rewards you for bringing new investors to VestFlow. You earn a percentage of your referrals&apos; deposits as a bonus, ranging from 3% to 10% depending on your investment plan. There&apos;s no limit to how many people you can refer.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept a variety of payment methods including bank transfers, credit/debit cards, Bitcoin, Ethereum, USDT, and other major cryptocurrencies. This flexibility ensures you can fund your account using your preferred method.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Yes, VestFlow is fully responsive and works seamlessly on all devices. We also have dedicated iOS and Android apps available for download, allowing you to manage your investments on the go.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Find answers to the most common questions about VestFlow and our
            investment services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
