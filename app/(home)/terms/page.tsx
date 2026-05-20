import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ChatWidget } from "@/components/landing/chat-widget";

export default function TermsPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto prose prose-neutral dark:prose-invert">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using our services, you agree to be
                  bound by these Terms of Service and all applicable laws and
                  regulations. If you do not agree with any of these terms, you
                  are prohibited from using or accessing our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  2. Eligibility
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You must be at least 18 years old to use our services. By
                  using our platform, you represent and warrant that you are of
                  legal age and have the legal capacity to enter into these
                  Terms of Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  3. Account Registration
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To use our services, you must:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly update any changes to your information</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Complete identity verification as required</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  4. Investment Services
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We provides investment opportunities with varying rates
                  of return. All investments carry risk, including the potential
                  loss of principal. Past performance is not indicative of
                  future results. You should carefully consider your investment
                  objectives and risk tolerance before investing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  5. Deposits and Withdrawals
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Regarding financial transactions:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Minimum deposit amounts vary by investment plan</li>
                  <li>Deposits require verification and approval</li>
                  <li>Withdrawal processing times vary by plan tier</li>
                  <li>You are responsible for providing accurate payment details</li>
                  <li>We reserve the right to verify transactions</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  6. Referral Program
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our referral program allows you to earn commissions by
                  referring new users. Referral bonuses are subject to
                  verification and may be revoked if obtained through fraudulent
                  means. We reserve the right to modify referral rates at any
                  time.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  7. Prohibited Activities
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Use the platform for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to accounts</li>
                  <li>Engage in money laundering or fraud</li>
                  <li>Manipulate or abuse the referral system</li>
                  <li>Interfere with the proper functioning of the platform</li>
                  <li>Create multiple accounts without authorization</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from
                  your use of or inability to use the service. This includes,
                  but is not limited to, loss of profits, data, or other
                  intangible losses.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  9. Termination
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to terminate or suspend your account at
                  any time for violations of these terms or for any other reason
                  at our sole discretion. Upon termination, your right to use
                  the service will immediately cease.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  10. Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time.
                  Changes will be effective immediately upon posting. Your
                  continued use of the platform constitutes acceptance of the
                  modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  11. Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance
                  with the laws of the State of New York, United States, without
                  regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  12. Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us
                  at legal@vestflow.com or through our Contact page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
