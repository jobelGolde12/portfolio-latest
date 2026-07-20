"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { FacebookIcon, LinkedinIcon, InstagramIcon } from '../Icons';

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);

  return (
    <motion.span
      className={cn("inline-block text-black dark:text-white", isSpace && "w-4")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-16 w-16 shrink-0 object-contain will-change-transform"
      style={{ x, scale, y, transformOrigin: "center" }}
    />
  );
};

const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.img
      src={char}
      alt=""
      className="h-16 w-16 shrink-0 object-contain will-change-transform"
      style={{ x, rotate, y, scale, transformOrigin: "center" }}
    />
  );
};

const Skiper31 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const { scrollYProgress: scrollYProgress3 } = useScroll({ target: targetRef3 });

  const text = "Social media ";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const socialIcons = [
    { icon: FacebookIcon, href: 'https://www.facebook.com/jobelGolde', label: 'Facebook' },
    { icon: InstagramIcon, href: 'https://www.instagram.com/jobelgolde/', label: 'Instagram' },
    { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/jobel-golde-6a8822411/', label: 'LinkedIn' },
  ];
  const iconCenterIndex = Math.floor(socialIcons.length / 2);

  return (
    <ReactLenis root>
      <div className="w-full bg-zinc-50 dark:bg-zinc-900/50">
        {/* Scroll hint */}
        <div className="top-22 absolute left-1/2 z-10 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-zinc-800 dark:text-zinc-200">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-zinc-300 after:to-zinc-800 dark:after:from-zinc-600 dark:after:to-zinc-200 after:content-['']">
            Scroll to see more
          </span>
        </div>

        {/* Block 1 - Text animation */}
        <div
          ref={targetRef}
          className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 p-[2vw]"
        >
          <div
            className="w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-zinc-900 dark:text-zinc-100"
            style={{ perspective: "500px" }}
          >
            {characters.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Block 3 - Social icons with rotation */}
        <div
          ref={targetRef3}
          className="relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 p-[2vw]"
        >
          <div className="flex flex-wrap items-center justify-center gap-12" style={{ perspective: "500px" }}>
            {socialIcons.map((item, index) => {
              const distanceFromCenter = index - iconCenterIndex;
              const x = useTransform(scrollYProgress3, [0, 0.5], [distanceFromCenter * 90, 0]);
              const rotate = useTransform(scrollYProgress3, [0, 0.5], [distanceFromCenter * 50, 0]);
              const y = useTransform(scrollYProgress3, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0]);
              const scale = useTransform(scrollYProgress3, [0, 0.5], [0.75, 1]);
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  style={{ x, rotate, y, scale, transformOrigin: "center" }}
                >
                  <Icon className="h-16 w-16 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

const Bracket = ({ className }: { className: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

export { CharacterV1, CharacterV2, CharacterV3, Skiper31 };
