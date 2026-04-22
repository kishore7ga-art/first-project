"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FaApple,
  FaAws,
  FaDocker,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaNodeJs,
  FaReact,
  FaTwitter,
} from "react-icons/fa";
import {
  SiFacebook,
  SiNextdotjs,
  SiRedux,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const fallbackUrls = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=128&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=128&q=80",
];

const iconConfigs = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: FaAws, color: "#FF9900" },
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiNextdotjs, color: "#000000" },
  { Icon: SiVercel, color: "#000000" },
  { Icon: SiRedux, color: "#764ABC" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaGithub, color: "#181717" },
  { Icon: FaTwitter, color: "#1DA1F2" },
  { Icon: FaLinkedin, color: "#0077B5" },
  { Icon: FaInstagram, color: "#E1306C" },
  { Icon: FaGoogle, color: "#DB4437" },
  { Icon: FaApple, color: "#000000" },
  { Icon: SiFacebook, color: "#1877F2" },
  { Icon: null, img: fallbackUrls[0] },
  { Icon: null, img: fallbackUrls[1] },
] as const;

export default function FeatureSection() {
  const orbitCount = 3;
  const orbitGap = 8;
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className="relative mx-auto my-32 flex min-h-[30rem] max-w-6xl flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-10 dark:border-gray-700 dark:bg-black sm:px-10 lg:h-[30rem] lg:flex-row lg:items-center lg:justify-between">
      <div className="z-10 w-full lg:w-1/2">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-6xl">
          Build your idea
        </h1>
        <p className="mb-6 max-w-lg text-gray-500 dark:text-gray-300">
          Sections is a modern and responsive UI kit for React, Next.js, and Tailwind CSS.
        </p>
        <div className="flex items-center gap-3">
          <Button asChild variant="default">
            <Link href="/builder/demo-project">Get Started</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/marketplace">Learn More</Link>
          </Button>
        </div>
      </div>

      <div className="relative flex h-[24rem] w-full items-center justify-center overflow-hidden lg:h-full lg:w-1/2 lg:justify-start">
        <div className="relative flex h-[36rem] w-[36rem] items-center justify-center sm:h-[50rem] sm:w-[50rem]">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 shadow-lg dark:bg-gray-800">
            <FaReact className="h-12 w-12 text-blue-400" />
          </div>

          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${12 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dotted border-gray-300 dark:border-gray-600"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${12 + orbitIdx * 6}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={iconIdx}
                        className="absolute rounded-full bg-white p-1 shadow-md dark:bg-gray-800"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {cfg.Icon ? (
                          <cfg.Icon className="h-8 w-8" style={{ color: cfg.color }} />
                        ) : (
                          <img
                            src={cfg.img}
                            alt=""
                            aria-hidden="true"
                            className="h-8 w-8 object-contain"
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
