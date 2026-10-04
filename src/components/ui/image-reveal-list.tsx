"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ImageRevealListItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  number: string;
  href?: string;
}

export interface ImageRevealListProps {
  items: ImageRevealListItem[];
  className?: string;
  listClassName?: string;
  /** Highlights one row and keeps its thumbnail revealed. */
  activeId?: string;
  onItemHover?: (id: string) => void;
  onItemLeave?: () => void;
  /** When set, rows without an href render as buttons instead of links. */
  onItemSelect?: (id: string) => void;
}

export function ImageRevealList({
  items,
  className,
  listClassName,
  activeId,
  onItemHover,
  onItemLeave,
  onItemSelect,
}: ImageRevealListProps) {
  return (
    <div className={cn("relative max-w-[500px] w-full mx-auto", className)}>
      <ul
        className={cn(
          "list-none bg-white/60 dark:bg-black/40 rounded-xl p-2 backdrop-blur-md border border-neutral-200 dark:border-white/10",
          listClassName
        )}
        onMouseLeave={onItemLeave}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          const rowClassName = cn(
            "group flex w-full items-center p-4 text-neutral-800 dark:text-neutral-200 no-underline text-[15px] font-medium rounded-lg transition-all duration-200 hover:bg-white/90 dark:hover:bg-white/10 hover:translate-x-1 text-start",
            isActive && "bg-white/90 dark:bg-white/10"
          );
          const content = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                className={cn(
                  "absolute -left-[100px] top-1/2 -translate-y-1/2 scale-90 w-[80px] h-[110px] rounded-md object-cover shadow-2xl opacity-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100] group-hover:opacity-100 group-hover:scale-100 group-hover:-left-[90px]",
                  isActive && "opacity-100 scale-100 -left-[90px]"
                )}
              />
              <span className="text-neutral-400 dark:text-neutral-500 text-[13px] me-4 min-w-[24px] font-normal">
                {item.number}
              </span>
              {item.title}
              {item.subtitle && (
                <span className="ms-auto text-neutral-400 dark:text-neutral-500 text-[13px] font-normal">
                  {item.subtitle}
                </span>
              )}
            </>
          );

          return (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => onItemHover?.(item.id)}
            >
              {onItemSelect && !item.href ? (
                <button
                  type="button"
                  aria-pressed={isActive}
                  className={rowClassName}
                  onClick={() => onItemSelect(item.id)}
                  onFocus={() => onItemHover?.(item.id)}
                >
                  {content}
                </button>
              ) : (
                <a href={item.href || "#"} className={rowClassName}>
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ImageRevealList;
