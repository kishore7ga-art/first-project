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
      "This platform revolutionized our data analysis process. The speed and accuracy are unparalleled. A must-have for any data-driven team.",
    name: "Priya Sharma",
    designation: "Data Scientist at QuantumLeap",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote:
      "The user interface is incredibly intuitive. We were up and running in hours, not days. Truly exceptional onboarding experience.",
    name: "Marcus Johnson",
    designation: "Head of Operations at Synergy Corp",
    src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote:
      "Customer support is top-notch. They are responsive, knowledgeable, and genuinely invested in our success.",
    name: "Isabella Rossi",
    designation: "Client Success Manager at Horizon",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote:
      "I am impressed by the constant stream of updates and new features. The team clearly listens to user feedback.",
    name: "Kenji Tanaka",
    designation: "Software Engineer at CodeCrafters",
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote:
      "The ROI was almost immediate. We cut project delivery times by nearly 30 percent. Absolutely worth every penny.",
    name: "Fatima Al-Jamil",
    designation: "CFO at Apex Financial",
    src: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=400&auto=format&fit=crop",
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
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20">
        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full max-w-xs">
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
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {testimonials[active].designation}
                </p>
                <p className="mt-8 text-lg text-slate-700 dark:text-slate-300">
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
      className="relative flex w-full items-center justify-center overflow-hidden bg-slate-50 py-12 dark:bg-slate-950"
    >
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
