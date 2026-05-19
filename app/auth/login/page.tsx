"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useLoginMutation } from "@/store/api/authApiSlice";
import { getSession, signIn } from "next-auth/react";


export default function LoginPage() {
  const router = useRouter();
  // const [login, { isLoading }] = useLoginMutation();

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });


  // 2. Client-side validation state
    const errors = {
        email: form.email.length > 0 && !/^\S+@\S+\.\S+$/.test(form.email),
        password: form.password.length > 0 && form.password.length < 6,
      };

     const isFormValid = form.email && form.password && !errors.email && !errors.password;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isFormValid) {
    toast.error("Please enter a valid email and password.");
    return;
  }

  setIsLoading(true);

  try {
    const result = await signIn("credentials", {
      email: form.email.toLowerCase().trim(),
      password: form.password,
      redirect: false,
    });

    console.log("SIGNIN_RESULT:", result);

    if (result?.error) {
      toast.error("Invalid email or password.");
      setIsLoading(false);
      return;
    }

    // Wait briefly for session hydration
    await new Promise((resolve) => setTimeout(resolve, 500));

    const session = await getSession();

    console.log("SESSION_AFTER_LOGIN:", session);

    if (!session?.user) {
      toast.error("Session could not be established.");
      setIsLoading(false);
      return;
    }

    toast.success("Login successful!");

    const role = session.user.role;

    router.refresh();

    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard");
    }
  } catch (error) {
    console.error(error);

    toast.error("Something went wrong.");

    setIsLoading(false);
  }
};

//      const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
  
//   if (!isFormValid) {
//     toast.error("Please enter a valid email and password.");
//     return;
//   }

//   setIsLoading(true);

//   try {
//     const result = await signIn("credentials", {
//       email: form.email.toLowerCase().trim(),
//       password: form.password,
//       redirect: false, // Maintain smooth client-side transitions
//     });

//     if (result?.error) {
//       const errorMsg = result.error === "CredentialsSignin" 
//         ? "Invalid email or password." 
//         : result.error;
        
//       toast.error(errorMsg);
//       setIsLoading(false);
//       return;
//     }

//     // Fetch the fresh session containing our token payloads
//     const session = await getSession();
//     const userRole = session?.user?.role;

//     toast.success("Login successful! Syncing workspace...");
    
//     // ⚡️ CRITICAL: Tell the router to invalidate its local client cache vectors 
//     // before pushing the new location path stack
//     router.refresh();

//     if (userRole === "ADMIN" || userRole === "SUPER_ADMIN") {
//       router.replace("/admin");
//     } else {
//       router.replace("/dashboard");
//     }
//   } catch (err) {
//     toast.error("An unexpected error occurred. Please try again.");
//     setIsLoading(false);
//   }
// };




  
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary font-medium hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground font-medium">OR CONTINUE WITH EMAIL</span>
        <Separator className="flex-1" />
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
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={cn("h-11", errors.email && "border-destructive focus-visible:ring-destructive")}
          />
          {errors.email && <p className="text-[10px] text-destructive font-medium">Please enter a valid email address</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={cn("h-11 pr-11", errors.password && "border-destructive")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={form.remember}
            onCheckedChange={(checked) =>
              setForm({ ...form, remember: checked as boolean })
            }
          />
          <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">
            Remember me for 30 days
          </Label>
        </div> */}

        <Button 
          type="submit" 
          className="w-full h-11 gap-2 font-medium" 
          disabled={ isLoading || !isFormValid}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in to your account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-foreground transition-colors">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-foreground transition-colors">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}