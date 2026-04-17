"use client";

import Link from "next/link";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("founder@nexus.app");
  const [password, setPassword] = useState("demo-password");

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
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
          <UserCheck className="h-3.5 w-3.5" />
          Welcome back
        </div>
        <h2 className="mt-4 text-3xl font-semibold text-slate-950">Log in to your workspace</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Jump back into the builder, review your latest draft, and keep shipping.
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Email address
            </span>
            <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
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
            <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
              <LockKeyhole className="h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
                placeholder="Enter your password"
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
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <button
              type="button"
              onClick={() => {
                setEmail("founder@nexus.app");
                setPassword("demo-password");
              }}
              className="font-medium text-blue-600 transition hover:text-blue-700"
            >
              Use demo credentials
            </button>
            <span className="text-slate-400">Password reset coming in the Supabase phase</span>
          </div>

          <Button type="submit" className="h-12 w-full rounded-full text-sm font-semibold" disabled={loading}>
            {loading ? "Signing you in..." : "Log in"}
          </Button>
        </form>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
            Create your account
          </Link>
        </div>
      </div>
    </div>
  );
}
