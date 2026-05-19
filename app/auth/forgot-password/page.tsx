"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/store/api/authApiSlice"; // Adjust path as needed

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      setIsSubmitted(true);
      toast.success("Reset link sent successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send reset link. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Mail className="w-7 h-7 text-primary" />
        </div>
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Check your email
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-medium text-foreground">{email}</span>. Click the link in the
            email to reset your password.
          </p>
        </div>

        <Alert className="bg-muted/50 border-none">
          <AlertDescription className="text-sm text-center py-1">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-semibold text-primary hover:underline transition-all"
            >
              try again
            </button>
          </AlertDescription>
        </Alert>

        <div className="pt-2">
          <Link href="/auth/login">
            <Button variant="outline" className="w-full gap-2 font-medium h-11">
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Button>
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          The reset link will expire in 1 hour for security reasons.
        </p>
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
          Forgot your password?
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          No worries! Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
        </div>

        <Button type="submit" className="w-full h-11 gap-2 font-semibold" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending reset link...
            </>
          ) : (
            <>
              Send reset link
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      <div className="rounded-lg bg-muted/30 p-4 border border-border/50">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Need help?</span> Contact our support team
          at{" "}
          <a
            href="mailto:support@vestflow.com"
            className="text-primary hover:underline font-medium"
          >
            support@vestflow.com
          </a>
        </p>
      </div>
    </div>
  );
}