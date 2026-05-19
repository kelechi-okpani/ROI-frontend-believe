"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRegisterMutation } from "@/store/api/authApiSlice";

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralCode: "",
    agreeTerms: false,
  });


  // Validation Logic
  const errors = {
    firstName: form.firstName.length > 0 && form.firstName.length < 2,
    lastName: form.lastName.length > 0 && form.lastName.length < 2,
    email: form.email.length > 0 && !/^\S+@\S+\.\S+$/.test(form.email),
    password: form.password.length > 0 && passwordRules.filter(r => r.test(form.password)).length < 4,
  };

  const passwordStrength = passwordRules.filter((r) => r.test(form.password)).length;
  const strengthColor = ["", "bg-destructive", "bg-orange-500", "bg-yellow-500", "bg-green-500"][passwordStrength];
  const isFormValid = 
    form.firstName.length >= 2 && 
    form.lastName.length >= 2 && 
    /^\S+@\S+\.\S+$/.test(form.email) && 
    passwordStrength === 4 && 
    form.agreeTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast.error("Please complete the form correctly.");
      return;
    }

    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        referralCode: form.referralCode || undefined,
      }).unwrap();
      
      toast.success("Account created successfully!");
      router.push("/auth/login");
    } catch (err: any) {
      const msg = err?.data?.message || err?.data?.error || "Registration failed.";
      toast.error(msg);
    }
  };


  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Create your account</h2>
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground font-medium uppercase">Email Registration</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="John"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className={cn("h-11", errors.firstName && "border-destructive focus-visible:ring-destructive")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className={cn("h-11", errors.lastName && "border-destructive focus-visible:ring-destructive")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={cn("h-11", errors.email && "border-destructive focus-visible:ring-destructive")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={cn("h-11 pr-11", errors.password && "border-destructive")}
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
          <Label htmlFor="referralCode">Referral code <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <Input
            id="referralCode"
            placeholder="VF-ABC123"
            value={form.referralCode}
            onChange={(e) => setForm({ ...form, referralCode: e.target.value })}
            className="h-11"
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <Checkbox
            id="agreeTerms"
            checked={form.agreeTerms}
            onCheckedChange={(checked) => setForm({ ...form, agreeTerms: checked as boolean })}
            className="mt-1"
          />
          <Label htmlFor="agreeTerms" className="text-xs text-muted-foreground cursor-pointer leading-tight select-none">
            I agree to the <Link href="/terms" className="text-primary font-medium hover:underline">Terms</Link> and <Link href="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</Link>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-11 gap-2 font-semibold shadow-sm"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}