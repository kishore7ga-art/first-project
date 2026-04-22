export type AuthMode = "signin" | "signup";

interface AuthResult {
  ok: boolean;
  message: string;
}

function getSupabasePublicConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  };
}

export function hasSupabasePublicConfig() {
  const { url, anonKey } = getSupabasePublicConfig();
  return Boolean(url && anonKey);
}

export async function submitEmailPasswordAuth({
  email,
  mode,
  password,
}: {
  email: string;
  mode: AuthMode;
  password: string;
}): Promise<AuthResult> {
  const { url, anonKey } = getSupabasePublicConfig();

  if (!url || !anonKey) {
    return {
      ok: true,
      message: "Demo auth enabled. Add Supabase env vars to connect real accounts.",
    };
  }

  const endpoint = mode === "signup" ? "signup" : "token?grant_type=password";
  const response = await fetch(`${url}/auth/v1/${endpoint}`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { msg?: string; message?: string };
    return {
      ok: false,
      message: body.msg ?? body.message ?? "Supabase could not complete this auth request.",
    };
  }

  return {
    ok: true,
    message: mode === "signup" ? "Account created." : "Signed in.",
  };
}

export function startOAuth(provider: "google" | "github") {
  const { url, anonKey } = getSupabasePublicConfig();

  if (!url || !anonKey || typeof window === "undefined") {
    return false;
  }

  const redirectTo = `${window.location.origin}/dashboard`;
  const params = new URLSearchParams({
    provider,
    redirect_to: redirectTo,
  });

  window.location.href = `${url}/auth/v1/authorize?${params.toString()}`;
  return true;
}
