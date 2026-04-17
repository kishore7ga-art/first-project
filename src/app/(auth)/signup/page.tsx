"use client";

import Link from "next/link";
import { startTransition, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const strength = useMemo(() => {
    if (password.length >= 12) return "Strong";
    if (password.length >= 8) return "Good";
    return "Needs work";
  }, [password]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      startTransition(() => {
        router.push("/dashboard");
      });
    }, 900);
  };

  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
          <Sparkles className="h-3.5 w-3.5" />
          Start building
        </div>
        <h2 className="mt-4 text-3xl font-semibold text-slate-950">Create your account</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Set up your workspace and go straight into the builder with a stronger starting point.
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Full name
            </span>
            <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100">
              <UserRound className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
                placeholder="Jane Founder"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Email address
            </span>
            <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
                placeholder="you@example.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Password
            </span>
            <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100">
              <LockKeyhole className="h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="text-slate-400 transition hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500">Use at least 8 characters.</span>
              <span className="font-semibold text-slate-700">{strength}</span>
            </div>
          </label>

          <Button type="submit" className="h-12 w-full rounded-full text-sm font-semibold" disabled={loading}>
            {loading ? "Creating your workspace..." : "Create account"}
          </Button>
        </form>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Log in instead
          </Link>
        </div>
      </div>
    </div>
  );
}
