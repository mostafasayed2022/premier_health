"use client";

import { useLocale } from "next-intl";
import { ReactNode } from "react";

interface TProps {
  en: ReactNode;
  ar: ReactNode;
  [key: string]: ReactNode;
}

export function T(props: TProps) {
  const locale = useLocale();
  
  if (locale === "ar" && props.ar) {
    return <>{props.ar}</>;
  }
  
  if (locale === "en" && props.en) {
    return <>{props.en}</>;
  }
  
  // Fallback to the requested locale if it exists, otherwise English, otherwise Arabic
  if (props[locale]) {
    return <>{props[locale]}</>;
  }
  
  return <>{props.en || props.ar}</>;
}
