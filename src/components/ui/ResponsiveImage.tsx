/* eslint-disable @next/next/no-img-element */

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  srcSet?: string;
  loading?: "lazy" | "eager";
}

export function ResponsiveImage({
  src,
  alt,
  aspectRatio = "16 / 9",
  className = "",
  imageClassName = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  srcSet,
  loading = "lazy",
}: ResponsiveImageProps) {
  const wrapperStyle = { aspectRatio } as CSSProperties;

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", className)}>
      <div style={wrapperStyle} className="relative w-full">
        <img
          src={src}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          loading={loading}
          decoding="async"
          className={cn("absolute inset-0 h-full w-full object-cover", imageClassName)}
        />
      </div>
    </div>
  );
}
