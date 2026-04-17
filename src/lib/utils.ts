import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeHexColor(value: string | null | undefined, fallback: string) {
  const trimmed = (value ?? "").trim()
  const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`

  if (/^#[0-9a-fA-F]{6}$/.test(withHash)) {
    return withHash.toLowerCase()
  }

  if (/^#[0-9a-fA-F]{3}$/.test(withHash)) {
    const [, a, b, c] = withHash
    return `#${a}${a}${b}${b}${c}${c}`.toLowerCase()
  }

  return fallback
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatRating(value: number) {
  return value.toFixed(1)
}

export function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
        return
      }

      reject(new Error("Could not read the selected file."))
    }

    reader.onerror = () => {
      reject(reader.error ?? new Error("Could not read the selected file."))
    }

    reader.readAsDataURL(file)
  })
}
