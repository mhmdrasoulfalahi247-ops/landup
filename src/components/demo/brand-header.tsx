import { FlipText } from "@/components/ui/flip-text";

/** Landup mark (yellow slab on a gray slab), flipping wordmark, and tagline. */
export function BrandHeader() {
  return (
    <div className="pointer-events-none flex items-center gap-3 text-white drop-shadow-md">
      <div aria-hidden className="relative h-9 w-11">
        <span className="absolute bottom-0 left-0 h-3.5 w-9 rounded-[3px] bg-neutral-400" />
        <span className="absolute bottom-4 left-2 h-3.5 w-9 rounded-[3px] bg-landup-yellow" />
      </div>
      <div className="flex flex-col leading-none">
        <FlipText className="text-xl font-semibold tracking-tight" duration={3.2}>
          Landup
        </FlipText>
        <span dir="rtl" lang="fa" className="mt-1 font-persian text-xs text-white/80">
          گنجینه ساخت
        </span>
      </div>
    </div>
  );
}
