"use client";

import Link from "next/link";
import { startTransition, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Code2, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import {
  hasSupabasePublicConfig,
  startOAuth,
  submitEmailPasswordAuth,
} from "@/lib/supabaseAuthClient";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const supabaseReady = hasSupabasePublicConfig();
  const strength = useMemo(() => {
    if (password.length >= 12) return "Strong";
    if (password.length >= 8) return "Good";
    return "Needs work";
  }, [password]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await submitEmailPasswordAuth({
      email,
      password,
      mode: "signup",
    });

    setLoading(false);
    setMessage(result.message);

    if (result.ok) {
      startTransition(() => router.push("/dashboard"));
    }
  };

  const handleOAuth = (provider: "google" | "github") => {
    if (!startOAuth(provider)) {
      setMessage("Add Supabase public env vars to enable OAuth. Demo mode is still available.");
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">
        <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
        Create workspace
      </div>
      <h1 className="mt-5 text-3xl font-black text-white">Start building free</h1>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        Email and password are wired for Supabase Auth when env vars are present.
        Google and GitHub OAuth use Supabase provider redirects.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleOAuth("google")}
          className="rounded-lg border border-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/5"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuth("github")}
          className="rounded-lg border border-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/5"
        >
          <Code2 className="mr-2 inline h-4 w-4" />
          GitHub
        </button>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Email
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#0F0F12] px-4 py-3 focus-within:border-cyan-300/60">
            <Mail className="h-4 w-4 text-zinc-500" />
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              placeholder="you@example.com"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Password
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#0F0F12] px-4 py-3 focus-within:border-cyan-300/60">
            <LockKeyhole className="h-4 w-4 text-zinc-500" />
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="text-zinc-500 transition hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
            <span>Use at least 8 characters.</span>
            <span>{strength}</span>
          </div>
        </label>

        {message ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
            {message}
          </div>
        ) : null}

        {!supabaseReady ? (
          <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/5 px-4 py-3 text-xs leading-5 text-cyan-100/80">
            Demo mode is active until `NEXT_PUBLIC_SUPABASE_URL` and
            `NEXT_PUBLIC_SUPABASE_ANON_KEY` are added.
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-white px-4 py-3 text-sm font-black text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/auth/signin" className="font-bold text-white hover:text-cyan-200">
          Sign in
        </Link>
      </p>
    </div>
  );
}
