"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, type Transition, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextProps {
  children: ReactNode;
  reverse?: boolean;
  transition?: Transition;
  splitBy?: "words" | "characters" | "lines" | string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  containerClassName?: string;
  wordLevelClassName?: string;
  elementLevelClassName?: string;
  onClick?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
  autoStart?: boolean;
}

export interface VerticalCutRevealRef {
  startAnimation: () => void;
  reset: () => void;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
}

const VerticalCutReveal = forwardRef<VerticalCutRevealRef, TextProps>(
  (
    {
      children,
      reverse = false,
      transition = {
        type: "spring",
        stiffness: 190,
        damping: 22,
      },
      splitBy = "words",
      staggerDuration = 0.2,
      staggerFrom = "first",
      containerClassName,
      wordLevelClassName,
      elementLevelClassName,
      onClick,
      onStart,
      onComplete,
      autoStart = true,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const text = typeof children === "string" ? children : children?.toString() || "";
    const [isAnimating, setIsAnimating] = useState(autoStart);

    const words = text.split(" ");
    const elements =
      splitBy === "characters"
        ? words.map((word, index) => ({
            characters: splitIntoCharacters(word),
            needsSpace: index !== words.length - 1,
          }))
        : splitBy === "words"
          ? text.split(" ")
          : splitBy === "lines"
            ? text.split("\n")
            : text.split(splitBy);

    const getTotalElements = () => {
      if (splitBy !== "characters") {
        return elements.length;
      }

      return (elements as WordObject[]).reduce(
        (acc, word) => acc + word.characters.length + (word.needsSpace ? 1 : 0),
        0,
      );
    };

    const getStaggerDelay = (index: number) => {
      const total = getTotalElements();

      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.abs(Math.sin(index + 1) * 10000) % total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }

      return Math.abs(staggerFrom - index) * staggerDuration;
    };

    const startAnimation = () => {
      setIsAnimating(true);
      onStart?.();
    };

    useImperativeHandle(ref, () => ({
      startAnimation,
      reset: () => setIsAnimating(false),
    }));

    useEffect(() => {
      if (autoStart) {
        onStart?.();
      }
    }, [autoStart, onStart]);

    const variants: Variants = {
      hidden: { y: reverse ? "-100%" : "100%" },
      visible: (index: number) => ({
        y: 0,
        transition: {
          ...transition,
          delay: ((transition?.delay as number) || 0) + getStaggerDelay(index),
        },
      }),
    };

    const renderedWords =
      splitBy === "characters"
        ? (elements as WordObject[])
        : (elements as string[]).map((element, index) => ({
            characters: [element],
            needsSpace: index !== elements.length - 1,
          }));

    return (
      <span
        className={cn(
          containerClassName,
          "flex flex-wrap whitespace-pre-wrap",
          splitBy === "lines" && "flex-col",
        )}
        onClick={onClick}
        ref={containerRef}
        {...props}
      >
        <span className="sr-only">{text}</span>

        {renderedWords.map((wordObj, wordIndex, array) => {
          const previousCharsCount = array
            .slice(0, wordIndex)
            .reduce((sum, word) => sum + word.characters.length, 0);

          return (
            <span
              key={`${wordObj.characters.join("")}-${wordIndex}`}
              aria-hidden="true"
              className={cn("inline-flex overflow-hidden", wordLevelClassName)}
            >
              {wordObj.characters.map((char, charIndex) => (
                <span
                  className={cn(elementLevelClassName, "relative whitespace-pre-wrap")}
                  key={`${char}-${charIndex}`}
                >
                  <motion.span
                    custom={previousCharsCount + charIndex}
                    initial="hidden"
                    animate={isAnimating ? "visible" : "hidden"}
                    variants={variants}
                    onAnimationComplete={
                      wordIndex === elements.length - 1 &&
                      charIndex === wordObj.characters.length - 1
                        ? onComplete
                        : undefined
                    }
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
              {wordObj.needsSpace && <span> </span>}
            </span>
          );
        })}
      </span>
    );
  },
);

VerticalCutReveal.displayName = "VerticalCutReveal";

export { VerticalCutReveal };
