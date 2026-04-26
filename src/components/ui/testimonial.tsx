'use client';

/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Our mission at Zelmora is to democratize high-end web design. We're building the future where anyone can create a cinematic web experience in minutes.",
    name: "Maheshwari.P",
    designation: "CEO of Zenix",
    src: "/team/ceo.png",
  },
  {
    quote:
      "The vision for Zelmora was born from a need for speed and beauty. We wanted to eliminate the barrier between imagination and reality.",
    name: "Kishore.GA",
    designation: "Founder of Zenix",
    src: "/team/founder1.png",
  },
  {
    quote:
      "We've combined the power of AI with elite design standards to give creators a toolkit that feels like magic.",
    name: "Santhosh.M",
    designation: "Founder of Zenix",
    src: "/team/founder2.png",
  },
  {
    quote:
      "Technically, Zelmora is pushed to the limit of what's possible in the browser. Our stack is optimized for performance and fluid animations.",
    name: "Akash.K",
    designation: "CTO of Zenix",
    src: "/team/cto.png",
  },
];

export function AnimatedTestimonials({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) {
  const [active, setActive] = React.useState(0);

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = React.useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  React.useEffect(() => {
    if (!autoplay) {
      return;
    }

    const interval = window.setInterval(handleNext, 5000);
    return () => window.clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;
  const getRotate = (index: number) => `${((index * 7) % 16) - 8}deg`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 font-sans antialiased md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-32">
        <div className="flex items-center justify-center">
          <div className="relative h-[450px] w-full max-w-sm md:h-[550px] md:max-w-md">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 50,
                    rotate: getRotate(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index)
                      ? testimonials.length
                      : testimonials.length - Math.abs(index - active),
                    rotate: isActive(index) ? "0deg" : getRotate(index),
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: "1000px" }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="h-full w-full rounded-3xl object-cover shadow-2xl"
                    onError={(event) => {
                      event.currentTarget.src = `https://placehold.co/500x500/e2e8f0/64748b?text=${testimonial.name.charAt(0)}`;
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-4xl font-bold text-slate-900 dark:text-slate-50 md:text-5xl">
                  {testimonials[active].name}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 md:text-xl">
                  {testimonials[active].designation}
                </p>
                <p className="mt-8 text-xl leading-relaxed text-slate-700 dark:text-slate-300 md:text-3xl">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 pt-12">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <ArrowLeft className="h-5 w-5 text-slate-800 transition-transform duration-300 group-hover:-translate-x-1 dark:text-slate-300" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <ArrowRight className="h-5 w-5 text-slate-800 transition-transform duration-300 group-hover:translate-x-1 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Component() {
  return (
    <div
      id="testimonials"
      className="relative flex w-full items-center justify-center overflow-hidden bg-[#030303] py-24"
    >
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
