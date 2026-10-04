"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Language } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { primaryButtonClass } from "./demo-panel";

const PRACTICE_CODE = "123456";

/** Converts Persian and Arabic-Indic digits to ASCII and drops spaces, dashes, and brackets. */
function normalizePhone(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[\s\-()]/g, "");
}

function isValidPhone(value: string): boolean {
  return /^\+?\d{10,14}$/.test(normalizePhone(value));
}

/** Second screen content. Sign-in is practice only: the code is shown on the page, nothing is sent. */
export function PhoneForm({ language, onBack }: { language: Language; onBack: () => void }) {
  const { copy } = language;
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "sent">("idle");
  const BackIcon = language.dir === "rtl" ? ArrowRight : ArrowLeft;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(isValidPhone(phone) ? "sent" : "invalid");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <button
        type="button"
        onClick={onBack}
        className="mb-3 inline-flex items-center gap-1.5 text-sm text-white/70 transition hover:text-white"
      >
        <BackIcon className="size-4" />
        {copy.changeLanguage}
      </button>

      <h2 className="text-2xl font-semibold leading-snug">{copy.phoneTitle}</h2>
      <p className="mt-1 text-sm text-white/70">{copy.phoneHint}</p>

      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        dir="ltr"
        placeholder="0912 345 6789"
        value={phone}
        aria-invalid={status === "invalid"}
        aria-describedby="phone-status"
        onChange={(event) => {
          setPhone(event.target.value);
          setStatus("idle");
        }}
        className="mt-4 h-12 rounded-xl border-white/20 bg-white/10 text-center text-lg tracking-widest text-white placeholder:text-white/40"
      />

      <p id="phone-status" role="status" className="mt-2 min-h-5 text-sm">
        {status === "invalid" && <span className="text-red-300">{copy.invalidPhone}</span>}
        {status === "sent" && (
          <span className="text-landup-yellow">
            {copy.practiceCode}: <bdi className="font-mono tracking-widest">{PRACTICE_CODE}</bdi>
          </span>
        )}
      </p>

      <button type="submit" className={cn("mt-2", primaryButtonClass)}>
        {copy.sendCode}
      </button>

      <p className="mt-3 text-center text-xs text-white/60">{copy.previewNote}</p>
    </form>
  );
}
