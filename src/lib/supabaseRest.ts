interface SupabaseSectionRow {
  id?: string;
  name?: string;
  category?: string;
  code?: string | null;
  dna_hash?: string | null;
  dna_color?: string | null;
  dna_color_hex?: string | null;
  dna_font?: string | null;
  is_free?: boolean;
  ai_generated?: boolean;
}

function getSupabaseServiceConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  };
}

export function hasSupabaseServiceConfig() {
  const { url, serviceRoleKey } = getSupabaseServiceConfig();
  return Boolean(url && serviceRoleKey);
}

function getHeaders() {
  const { serviceRoleKey } = getSupabaseServiceConfig();
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

export async function selectSectionHashes() {
  const { url } = getSupabaseServiceConfig();
  if (!hasSupabaseServiceConfig()) {
    return [] as string[];
  }

  const response = await fetch(`${url}/rest/v1/sections?select=dna_hash`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not read section hashes: ${response.status}`);
  }

  const rows = (await response.json()) as SupabaseSectionRow[];
  return rows.map((row) => row.dna_hash).filter(Boolean) as string[];
}

export async function insertSection(row: SupabaseSectionRow) {
  const { url } = getSupabaseServiceConfig();
  if (!hasSupabaseServiceConfig()) {
    throw new Error("Supabase service env vars are not configured.");
  }

  const response = await fetch(`${url}/rest/v1/sections`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Could not insert section: ${response.status}`);
  }
}

export async function selectSectionById(sectionId: string) {
  const { url } = getSupabaseServiceConfig();
  if (!hasSupabaseServiceConfig()) {
    return null;
  }

  const response = await fetch(
    `${url}/rest/v1/sections?id=eq.${encodeURIComponent(sectionId)}&select=code,name,category`,
    {
      headers: getHeaders(),
      cache: "force-cache",
    },
  );

  if (!response.ok) {
    throw new Error(`Could not load section: ${response.status}`);
  }

  const rows = (await response.json()) as SupabaseSectionRow[];
  return rows[0] ?? null;
}
