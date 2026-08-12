"use client";

import { useLocale } from "next-intl";
import { ReactNode } from "react";

interface TProps {
  en: ReactNode;
  [key: string]: ReactNode;
}

/**
 * Inline translation component for cases where a translation key cannot
 * be used (e.g., JSX with complex markup). Pass any locale as a prop key.
 * Priority: current locale → en → first available prop
 */
export function T(props: TProps) {
  const locale = useLocale();

  if (props[locale] != null) return <>{props[locale]}</>;
  if (props.en != null) return <>{props.en}</>;

  // Last resort: return the first non-null value
  const first = Object.values(props).find((v) => v != null);
  return <>{first ?? null}</>;
}
