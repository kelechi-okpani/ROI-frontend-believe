"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async () => {
    if (otp.length < 6) return;
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsVerifying(false);
    setIsVerified(true);
  };

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsResending(false);
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (isVerified) {
    return (
      <div className="space-y-8">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
          <MailCheck className="w-7 h-7 text-accent" />
        </div>
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Email verified!
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Your email address has been successfully verified. Your account is now fully active.
          </p>
        </div>
        <Link href="/dashboard">
          <Button className="w-full h-11 font-medium">Go to your dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to login
      </Link>

      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">
          Verify your email
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We sent a 6-digit verification code to your email address. Enter it below to activate
          your account.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Verification code</p>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            className="justify-center"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
              <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
              <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
              <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
              <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
              <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          className="w-full h-11 font-medium gap-2"
          onClick={handleVerify}
          disabled={otp.length < 6 || isVerifying}
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify email"
          )}
        </Button>
      </div>

      <div className="rounded-lg bg-muted/50 border border-border p-4 flex items-start gap-3">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-foreground">Didn&apos;t receive the code?</p>
          <p className="text-xs text-muted-foreground">
            Check your spam folder or request a new code.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResend}
          disabled={isResending || resendCooldown > 0}
          className="gap-1.5 shrink-0"
        >
          {isResending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5" />
          )}
          {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : "Resend"}
        </Button>
      </div>
    </div>
  );
}
