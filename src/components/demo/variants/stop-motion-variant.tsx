"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PerspectiveCarousel } from "@/components/ui/perspective-carousel";
import { CONSTRUCTION_FRAMES, LANGUAGES } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { ContinueButton, DemoPanel, PanelSlot, SceneCaption } from "../demo-panel";
import { PhoneForm } from "../phone-form";
import { SceneImage, SceneShade } from "../scene-image";
import type { TransitionVariantProps } from "../types";

/** About 5 frames per second, the jerky rhythm of hand-made stop-motion. */
const FRAME_MS = 210;
const HOLD_LAST_FRAME_MS = 450;

const FRAMES = [
  ...LANGUAGES.map((language) => ({ src: language.image, title: language.nativeName })),
  ...CONSTRUCTION_FRAMES,
];
const FIRST_CONSTRUCTION_INDEX = LANGUAGES.length;
const LAST_INDEX = FRAMES.length - 1;

/** Small per-frame offsets so each held frame sits slightly differently, like a camera on a hand-built rig. */
const JITTER = [
  { rotate: -0.6, x: -4, y: 2 },
  { rotate: 0.4, x: 3, y: -3 },
  { rotate: -0.2, x: 5, y: 1 },
  { rotate: 0.7, x: -3, y: -2 },
];

const SMOOTH_SPRING = { type: "spring", bounce: 0.14, duration: 0.9 } as const;
const STEPPED = { type: "tween", duration: 0.12, ease: "easeOut" } as const;

/**
 * Variant 3: image-sequence "stop-motion" flip. A perspective carousel holds the six
 * language frames followed by six construction frames. Continue steps through the
 * construction frames one by one while the background hard-cuts in sync.
 */
export function StopMotionVariant({
  step,
  shownLanguage,
  selectedLanguage,
  onPreview,
  onSelect,
  onContinue,
  onBack,
}: TransitionVariantProps) {
  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const isPlaying = playIndex !== null;

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const shownIndex = LANGUAGES.findIndex((language) => language.id === shownLanguage.id);
  const frameIndex = playIndex ?? (step === "phone" ? LAST_INDEX : shownIndex);
  const frame = FRAMES[frameIndex];
  const jitter = JITTER[frameIndex % JITTER.length];

  const playSequence = () => {
    if (isPlaying) return;
    const selectedIndex = LANGUAGES.findIndex((language) => language.id === selectedLanguage.id);
    const sequence = [selectedIndex];
    for (let index = FIRST_CONSTRUCTION_INDEX; index <= LAST_INDEX; index++) sequence.push(index);

    sequence.forEach((index, order) => {
      timers.current.push(window.setTimeout(() => setPlayIndex(index), order * FRAME_MS));
    });
    timers.current.push(
      window.setTimeout(() => {
        setPlayIndex(null);
        onContinue();
      }, sequence.length * FRAME_MS + HOLD_LAST_FRAME_MS)
    );
  };

  return (
    <>
      <AnimatePresence initial={false}>
        <SceneImage
          key={frame.src}
          src={frame.src}
          initial={{ opacity: isPlaying ? 1 : 0 }}
          animate={
            isPlaying
              ? { opacity: 1, scale: 1.06, rotate: jitter.rotate, x: jitter.x, y: jitter.y }
              : { opacity: 1, scale: 1.04, rotate: 0, x: 0, y: 0 }
          }
          exit={{ opacity: 0, transition: { duration: isPlaying ? 0 : 0.6 } }}
          transition={isPlaying ? { duration: 0 } : { duration: 0.6 }}
        />
      </AnimatePresence>
      <SceneShade />

      <motion.div
        className={cn(
          "absolute inset-x-0 top-28 z-10 h-[360px] md:inset-y-0 md:left-0 md:right-auto md:top-0 md:my-auto md:h-[460px] md:w-[52%]",
          step === "phone" && "pointer-events-none"
        )}
        animate={step === "phone" ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: step === "phone" ? 0.1 : 0 }}
      >
        <PerspectiveCarousel
          items={FRAMES}
          activeIndex={frameIndex}
          onActiveIndexChange={(index) => {
            if (!isPlaying && index < FIRST_CONSTRUCTION_INDEX) onSelect(LANGUAGES[index].id);
          }}
          slideWidth={230}
          rotationStep={55}
          showControls={false}
          transition={isPlaying ? STEPPED : SMOOTH_SPRING}
          className="h-full"
          imageClassName="rounded-xl border-4 border-white/90 shadow-2xl"
          labelClassName={cn(
            "rounded-full bg-black/50 px-3 py-1 font-semibold text-white backdrop-blur",
            frameIndex < FIRST_CONSTRUCTION_INDEX &&
              LANGUAGES[frameIndex].dir === "rtl" &&
              "font-persian"
          )}
        />
      </motion.div>

      <PanelSlot>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, rotateY: -70 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 70 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ transformPerspective: 1200 }}
          >
            {step === "language" ? (
              <DemoPanel language={shownLanguage}>
                <h1 className="mb-3 text-2xl font-semibold">{shownLanguage.copy.chooseLanguage}</h1>
                <div className="grid grid-cols-3 gap-2" onMouseLeave={() => onPreview(null)}>
                  {LANGUAGES.map((language) => (
                    <button
                      key={language.id}
                      type="button"
                      aria-pressed={language.id === selectedLanguage.id}
                      disabled={isPlaying}
                      onMouseEnter={() => onPreview(language.id)}
                      onFocus={() => onPreview(language.id)}
                      onClick={() => onSelect(language.id)}
                      dir={language.dir}
                      className={cn(
                        "h-11 rounded-xl border text-sm font-semibold transition",
                        language.dir === "rtl" && "font-persian",
                        language.id === selectedLanguage.id
                          ? "border-landup-yellow bg-landup-yellow/15 text-landup-yellow"
                          : "border-white/15 bg-white/5 hover:border-white/40 hover:bg-white/10"
                      )}
                    >
                      {language.nativeName}
                    </button>
                  ))}
                </div>
                <ContinueButton label={shownLanguage.copy.continue} onClick={playSequence} />
              </DemoPanel>
            ) : (
              <DemoPanel language={selectedLanguage}>
                <PhoneForm language={selectedLanguage} onBack={onBack} />
              </DemoPanel>
            )}
          </motion.div>
        </AnimatePresence>
      </PanelSlot>

      <SceneCaption
        text={
          frameIndex >= FIRST_CONSTRUCTION_INDEX
            ? `Construction site, frame ${frameIndex - FIRST_CONSTRUCTION_INDEX + 1} of ${CONSTRUCTION_FRAMES.length}`
            : shownLanguage.sceneCaption
        }
      />
    </>
  );
}
