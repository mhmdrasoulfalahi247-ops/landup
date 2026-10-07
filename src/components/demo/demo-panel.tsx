import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/languages";

/** Dark glass card that holds each screen's content, laid out in the shown language's direction. */
export function DemoPanel({
  language,
  className,
  children,
}: {
  language: Language;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      dir={language.dir}
      lang={language.id}
      className={cn(
        "w-full max-w-[400px] rounded-2xl border border-white/10 bg-neutral-950/60 p-5 text-white shadow-2xl backdrop-blur-xl",
        language.dir === "rtl" && "font-persian",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Positions the panel: bottom sheet on phones, right-hand column on wider screens. */
export function PanelSlot({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center p-4 pt-32 md:items-center md:justify-end md:pe-[7vw]">
      <div className="pointer-events-auto w-full max-w-[400px]">{children}</div>
    </div>
  );
}

export function SceneCaption({ text }: { text: string }) {
  return (
    <p className="pointer-events-none absolute bottom-3 left-4 z-10 hidden text-xs text-white/70 md:block">
      Illustration: {text}
    </p>
  );
}

export const primaryButtonClass =
  "h-12 w-full rounded-xl bg-landup-yellow text-base font-semibold text-neutral-950 shadow-lg transition hover:brightness-105 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-landup-yellow";

export function ContinueButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn("mt-4", primaryButtonClass)}>
      {label}
    </button>
  );
}
