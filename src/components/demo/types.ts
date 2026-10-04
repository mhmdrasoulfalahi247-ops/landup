import type { Language, LanguageId } from "@/lib/languages";

export type DemoStep = "language" | "phone";

/** Everything a transition variant needs; the parent owns the state so switching variants keeps the choice. */
export interface TransitionVariantProps {
  step: DemoStep;
  /** Language under the pointer, or the selected one when nothing is hovered. */
  shownLanguage: Language;
  selectedLanguage: Language;
  onPreview: (id: LanguageId | null) => void;
  onSelect: (id: LanguageId) => void;
  onContinue: () => void;
  onBack: () => void;
}
