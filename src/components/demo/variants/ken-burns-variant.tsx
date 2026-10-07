"use client";

import { AnimatePresence, motion } from "motion/react";
import { ImageRevealList } from "@/components/ui/image-reveal-list";
import { CONSTRUCTION_BACKGROUND, LANGUAGES, type LanguageId } from "@/lib/languages";
import { ContinueButton, DemoPanel, PanelSlot, SceneCaption } from "../demo-panel";
import { PhoneForm } from "../phone-form";
import { SceneImage, SceneShade } from "../scene-image";
import type { TransitionVariantProps } from "../types";

const CROSSFADE_SECONDS = 1.2;
const ZOOM_SECONDS = 14;

const LANGUAGE_ROWS = LANGUAGES.map((language, index) => ({
  id: language.id,
  title: language.nativeName,
  subtitle: language.englishName,
  image: language.image,
  number: String(index + 1).padStart(2, "0"),
}));

/** Variant 1: backgrounds crossfade while slowly zooming (Ken Burns); panels slide in from the side. */
export function KenBurnsVariant({
  step,
  shownLanguage,
  selectedLanguage,
  onPreview,
  onSelect,
  onContinue,
  onBack,
}: TransitionVariantProps) {
  const backgroundSrc = step === "phone" ? CONSTRUCTION_BACKGROUND : shownLanguage.image;
  const panelLanguage = step === "phone" ? selectedLanguage : shownLanguage;
  const slideFrom = panelLanguage.dir === "rtl" ? -48 : 48;

  return (
    <>
      <AnimatePresence initial={false}>
        <SceneImage
          key={backgroundSrc}
          src={backgroundSrc}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1.16 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: CROSSFADE_SECONDS, ease: "easeInOut" },
            scale: { duration: ZOOM_SECONDS, ease: "linear" },
          }}
        />
      </AnimatePresence>
      <SceneShade />

      <PanelSlot>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: slideFrom }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -slideFrom }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <DemoPanel language={panelLanguage}>
              {step === "language" ? (
                <>
                  <h1 className="mb-3 text-2xl font-semibold">{shownLanguage.copy.chooseLanguage}</h1>
                  <ImageRevealList
                    items={LANGUAGE_ROWS}
                    activeId={selectedLanguage.id}
                    onItemHover={(id) => onPreview(id as LanguageId)}
                    onItemLeave={() => onPreview(null)}
                    onItemSelect={(id) => onSelect(id as LanguageId)}
                    className="dark"
                    listClassName="bg-black/30 p-1"
                  />
                  <ContinueButton label={shownLanguage.copy.continue} onClick={onContinue} />
                </>
              ) : (
                <PhoneForm language={selectedLanguage} onBack={onBack} />
              )}
            </DemoPanel>
          </motion.div>
        </AnimatePresence>
      </PanelSlot>

      <SceneCaption text={step === "phone" ? "Construction site" : shownLanguage.sceneCaption} />
    </>
  );
}
