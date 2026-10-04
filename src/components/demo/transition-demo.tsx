"use client";

import { useState } from "react";
import { MotionConfig } from "motion/react";
import { getLanguage, type LanguageId } from "@/lib/languages";
import { BrandHeader } from "./brand-header";
import type { DemoStep, TransitionVariantProps } from "./types";
import { VariantSwitcher, type VariantId } from "./variant-switcher";
import { CardMorphVariant } from "./variants/card-morph-variant";
import { KenBurnsVariant } from "./variants/ken-burns-variant";
import { StopMotionVariant } from "./variants/stop-motion-variant";

const VARIANT_COMPONENTS: Record<VariantId, (props: TransitionVariantProps) => React.ReactNode> = {
  1: KenBurnsVariant,
  2: CardMorphVariant,
  3: StopMotionVariant,
};

/** Language page → phone page, rendered with whichever transition variant is picked at the top. */
export function TransitionDemo() {
  const [variant, setVariant] = useState<VariantId>(1);
  const [step, setStep] = useState<DemoStep>("language");
  const [selectedId, setSelectedId] = useState<LanguageId>("fa");
  const [previewId, setPreviewId] = useState<LanguageId | null>(null);

  const selectedLanguage = getLanguage(selectedId);
  const shownLanguage = step === "language" && previewId ? getLanguage(previewId) : selectedLanguage;
  const Variant = VARIANT_COMPONENTS[variant];

  const switchVariant = (id: VariantId) => {
    setVariant(id);
    setStep("language");
    setPreviewId(null);
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative h-dvh w-full overflow-hidden bg-neutral-900">
        <Variant
          key={variant}
          step={step}
          shownLanguage={shownLanguage}
          selectedLanguage={selectedLanguage}
          onPreview={setPreviewId}
          onSelect={setSelectedId}
          onContinue={() => {
            setPreviewId(null);
            setStep("phone");
          }}
          onBack={() => setStep("language")}
        />

        <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col items-center gap-3 p-3 md:block">
          <div className="pointer-events-auto md:absolute md:left-1/2 md:top-3 md:-translate-x-1/2">
            <VariantSwitcher value={variant} onChange={switchVariant} />
          </div>
          <div className="hidden md:absolute md:left-6 md:top-5 md:block">
            <BrandHeader />
          </div>
        </header>
      </main>
    </MotionConfig>
  );
}
