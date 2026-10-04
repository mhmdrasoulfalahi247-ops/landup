"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CONSTRUCTION_BACKGROUND, LANGUAGES } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { ContinueButton, DemoPanel, PanelSlot, SceneCaption } from "../demo-panel";
import { PhoneForm } from "../phone-form";
import { SceneImage, SceneShade } from "../scene-image";
import type { TransitionVariantProps } from "../types";

const MORPH_TRANSITION = { duration: 0.9, ease: [0.65, 0, 0.35, 1] } as const;
const CARD_RADIUS = 14;

const artLayoutId = (languageId: string) => `language-art-${languageId}`;

/**
 * Variant 2: shared-element morph. Each language card's picture has a motion layoutId;
 * on Continue the selected picture grows into the phone page background, then the
 * construction illustration develops inside it.
 */
export function CardMorphVariant({
  step,
  shownLanguage,
  selectedLanguage,
  onPreview,
  onSelect,
  onContinue,
  onBack,
}: TransitionVariantProps) {
  return (
    <LayoutGroup id="card-morph">
      <AnimatePresence initial={false}>
        <SceneImage
          key={shownLanguage.image}
          src={shownLanguage.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="scale-105 blur-[2px]"
        />
      </AnimatePresence>

      {step === "phone" && (
        <motion.div
          layoutId={artLayoutId(selectedLanguage.id)}
          transition={MORPH_TRANSITION}
          style={{ borderRadius: 0 }}
          className="absolute inset-0 overflow-hidden"
        >
          <SceneImage layout src={selectedLanguage.image} />
          <SceneImage
            src={CONSTRUCTION_BACKGROUND}
            initial={{ opacity: 0, scale: 1.12, filter: "saturate(0)" }}
            animate={{ opacity: 1, scale: 1, filter: "saturate(1)" }}
            transition={{ delay: 0.7, duration: 1.1, ease: "easeOut" }}
          />
        </motion.div>
      )}
      <SceneShade />

      <PanelSlot>
        {step === "language" ? (
          <motion.div
            key="language"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <DemoPanel language={shownLanguage}>
              <h1 className="mb-4 text-2xl font-semibold">{shownLanguage.copy.chooseLanguage}</h1>
              <div className="grid grid-cols-3 gap-2.5 md:grid-cols-2" onMouseLeave={() => onPreview(null)}>
                {LANGUAGES.map((language) => {
                  const isSelected = language.id === selectedLanguage.id;
                  return (
                    <button
                      key={language.id}
                      type="button"
                      aria-pressed={isSelected}
                      onMouseEnter={() => onPreview(language.id)}
                      onFocus={() => onPreview(language.id)}
                      onClick={() => onSelect(language.id)}
                      className={cn(
                        "group relative rounded-[16px] p-0.5 text-start transition",
                        isSelected ? "bg-landup-yellow" : "bg-white/10 hover:bg-white/30"
                      )}
                    >
                      <motion.div
                        layoutId={artLayoutId(language.id)}
                        transition={MORPH_TRANSITION}
                        style={{ borderRadius: CARD_RADIUS }}
                        className="relative aspect-[4/3] overflow-hidden"
                      >
                        <SceneImage
                          layout
                          src={language.image}
                          className="transition-transform duration-500 group-hover:scale-110"
                        />
                      </motion.div>
                      <span
                        dir={language.dir}
                        className={cn(
                          "absolute inset-x-1 bottom-1 rounded-b-[13px] bg-gradient-to-t from-black/80 to-transparent px-2 pb-1.5 pt-4 text-sm font-semibold text-white",
                          language.dir === "rtl" && "font-persian"
                        )}
                      >
                        {language.nativeName}
                      </span>
                    </button>
                  );
                })}
              </div>
              <ContinueButton label={shownLanguage.copy.continue} onClick={onContinue} />
            </DemoPanel>
          </motion.div>
        ) : (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease: "easeOut" }}
          >
            <DemoPanel language={selectedLanguage}>
              <PhoneForm language={selectedLanguage} onBack={onBack} />
            </DemoPanel>
          </motion.div>
        )}
      </PanelSlot>

      <SceneCaption text={step === "phone" ? "Construction site" : shownLanguage.sceneCaption} />
    </LayoutGroup>
  );
}
