"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/store/api/authApiSlice";

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

// ⚡️ 1. INNER COMPONENT: Handles the functional parameters and UI layout rendering
function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({ password: "", confirm: "" });

  const passwordStrength = passwordRules.filter((r) => r.test(form.password)).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-destructive", "bg-orange-500", "bg-yellow-500", "bg-green-500"][passwordStrength];

  const passwordsMatch = form.password && form.confirm && form.password === form.confirm;
  const allRulesPassed = passwordStrength === 4;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }
    if (!passwordsMatch || !allRulesPassed) return;

    try {
      await resetPassword({ token, password: form.password }).unwrap();
      setIsSuccess(true);
      toast.success("Password updated successfully!");
    } catch (err: any) {
      console.error("Reset password error:", err);
      toast.error(err?.data?.error || "Something went wrong. Link might be expired.");
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-7 h-7 text-green-600" />
        </div>
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Password reset!
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Your password has been updated successfully. You can now sign in to your account
            with your new password.
          </p>
        </div>
        <Link href="/auth/login">
          <Button className="w-full h-11 gap-2 font-semibold">
            Continue to login
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">
          Reset your password
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Choose a new, strong password for your VestFlow account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a new password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="h-11 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {form.password && (
            <div className="space-y-3 pt-1">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all duration-300",
                      i <= passwordStrength ? strengthColor : "bg-muted"
                    )}
                  />
                ))}
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {passwordRules.map((rule) => {
                  const passed = rule.test(form.password);
                  return (
                    <li key={rule.label} className="flex items-center gap-1.5">
                      {passed ? (
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      )}
                      <span className={cn("text-[11px]", passed ? "text-foreground font-medium" : "text-muted-foreground")}>
                        {rule.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm new password</Label>
          <div className="relative">
            <Input
              id="confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your new password"
              required
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className={cn(
                "h-11 pr-11",
                form.confirm && !passwordsMatch && "border-destructive focus-visible:ring-destructive"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.confirm && (
            <p className={cn("text-xs font-medium", passwordsMatch ? "text-green-600" : "text-destructive")}>
              {passwordsMatch ? "Passwords match" : "Passwords do not match"}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-11 gap-2 font-semibold"
          disabled={isLoading || !passwordsMatch || !allRulesPassed}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            <>
              Reset password
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

// ⚡ 2. ROOT ROUTE EXPORT: Wraps the hook-consuming code safely inside a clean boundary container
export default function ResetPasswordPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center py-20 min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}