"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

/** Full-bleed illustration layer. Plain <img> because the art is static SVG in /public. */
export function SceneImage({ className, alt = "", ...props }: HTMLMotionProps<"img">) {
  return (
    <motion.img
      alt={alt}
      draggable={false}
      className={cn("absolute inset-0 h-full w-full select-none object-cover", className)}
      {...props}
    />
  );
}

/** Darkens the edges so panel text stays readable on any illustration. */
export function SceneShade() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_30%,rgba(10,10,12,0.55)_100%)] after:absolute after:inset-x-0 after:bottom-0 after:h-1/2 after:bg-gradient-to-t after:from-black/60 after:to-transparent"
    />
  );
}
