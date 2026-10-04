"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const VARIANTS = [
  { id: 1, label: "Crossfade + slow zoom", short: "Ken Burns", hint: "Ken Burns background, content slides in" },
  { id: 2, label: "Card morph", short: "Morph", hint: "Language picture expands into the next page" },
  { id: 3, label: "Stop-motion flip", short: "Stop-motion", hint: "Frames flip through as the page changes" },
] as const;

export type VariantId = (typeof VARIANTS)[number]["id"];

/** Small segmented control pinned to the top so the three transition styles can be compared. */
export function VariantSwitcher({
  value,
  onChange,
}: {
  value: VariantId;
  onChange: (id: VariantId) => void;
}) {
  const active = VARIANTS.find((variant) => variant.id === value) ?? VARIANTS[0];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        role="tablist"
        aria-label="Transition style"
        className="flex items-center gap-1 rounded-full border border-white/15 bg-neutral-950/70 p-1 text-white shadow-xl backdrop-blur-xl"
      >
        <span className="hidden px-3 text-[11px] font-semibold uppercase tracking-wider text-landup-yellow sm:inline">
          Demo
        </span>
        {VARIANTS.map((variant) => {
          const isActive = variant.id === value;
          return (
            <button
              key={variant.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(variant.id)}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
                isActive ? "text-neutral-950" : "text-white/80 hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="variant-switcher-pill"
                  className="absolute inset-0 rounded-full bg-landup-yellow"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative whitespace-nowrap">
                {variant.id}. <span className="sm:hidden">{variant.short}</span>
                <span className="hidden sm:inline">{variant.label}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="rounded-full bg-black/40 px-3 py-0.5 text-center text-[11px] text-white/80 backdrop-blur">
        Variant {active.id}: {active.hint} · not the final app
      </p>
    </div>
  );
}
