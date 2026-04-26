'use client';

/* eslint-disable @next/next/no-img-element */

import * as React from "react";

type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  className?: string;
};

export function ArcGalleryHero({
  images,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 800,
  radiusMd = 600,
  radiusSm = 400,
  cardSizeLg = 250,
  cardSizeMd = 200,
  cardSizeSm = 150,
  className = "",
}: ArcGalleryHeroProps) {
  const [dimensions, setDimensions] = React.useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section
      id="gallery"
      className={`relative flex flex-col overflow-hidden bg-[#030303] text-white pb-24 ${className}`}
    >
      <div
        className="relative mx-auto w-full"
        style={{ height: dimensions.radius * 1.1 }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          {images.map((src, index) => {
            const angle = startAngle + step * index;
            const angleRad = (angle * Math.PI) / 180;
            const x = (Math.cos(angleRad) * dimensions.radius).toFixed(3);
            const y = (Math.sin(angleRad) * dimensions.radius).toFixed(3);

            return (
              <div
                key={src}
                className="absolute animate-fade-in-up opacity-0"
                style={{
                  width: `${dimensions.cardSize}px`,
                  height: `${dimensions.cardSize}px`,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: "translate(-50%, 50%)",
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                  zIndex: count - index,
                }}
              >
                <div
                  className="h-full w-full overflow-hidden rounded-2xl bg-gray-800 shadow-2xl ring-1 ring-white/10 transition-transform hover:scale-105"
                  style={{ transform: `rotate(${angle / 4}deg)` }}
                >
                  <img
                    src={src}
                    alt={`Gallery item ${index + 1}`}
                    className="block h-full w-full object-fill"
                    draggable={false}
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://placehold.co/400x400/334155/e2e8f0?text=Photo";
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mt-12 flex flex-1 items-center justify-center px-6">
        <div
          className="animate-fade-in max-w-screen-2xl px-6 text-center opacity-0"
          style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[9rem] leading-none tracking-tighter">
            Power of Zelmora
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Our intelligent platform finds, organizes, and brings your most cherished
            moments back to life.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translate(-50%, 60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 50%);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation-duration: 0.8s;
          animation-name: fade-in-up;
          animation-timing-function: ease-out;
        }

        .animate-fade-in {
          animation-duration: 0.8s;
          animation-name: fade-in;
          animation-timing-function: ease-out;
        }
      `}</style>
    </section>
  );
}
