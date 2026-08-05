"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  step?: number;
  currentStep?: number;
  total?: number;
}

export function StepIndicator({
  step,
  currentStep,
  total = 7,
}: StepIndicatorProps) {
  const activeStep = currentStep ?? step ?? 1;
  const t = useTranslations("Booking");

  const steps = [
    t("step1"),
    t("step2"),
    t("step3"),
    t("step4"),
    t("step5"),
    t("step6"),
    t("step7"),
  ];

  return (
    <div className="w-full mb-8">
      {/* Mobile Step Progress Text */}
      <div className="flex items-center justify-between sm:hidden mb-4 px-2">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          {t("step" + activeStep as any)} ({activeStep}/{total})
        </span>
        <div className="h-1.5 flex-1 mx-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full"
            style={{ width: `${(activeStep / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop & Tablet Stepper Bar */}
      <div className="flex items-center overflow-x-auto scrollbar-hide py-2 px-1 justify-between w-full">
        {steps.slice(0, total).map((label, i) => {
          const stepNum = i + 1;
          const isPassed = stepNum < activeStep;
          const isCurrent = stepNum === activeStep;

          return (
            <div
              key={i}
              className="flex items-center shrink-0 flex-1 justify-center last:flex-initial"
            >
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-extrabold transition-all duration-300 shadow-sm ${
                    isPassed
                      ? "bg-accent border-2 border-accent text-white"
                      : isCurrent
                      ? "bg-primary border-2 border-accent text-white shadow-lg ring-4 ring-accent/20 scale-110"
                      : "bg-white border-2 border-accent/20 text-slate-400"
                  }`}
                >
                  {isPassed ? <Check size={16} strokeWidth={3} /> : stepNum}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors text-center ${
                    isCurrent
                      ? "text-primary font-extrabold scale-105"
                      : isPassed
                      ? "text-accent font-semibold"
                      : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < total - 1 && (
                <div
                  className={`h-[2px] flex-1 mx-2 sm:mx-3 min-w-[16px] sm:min-w-[28px] mt-[-18px] transition-colors duration-300 ${
                    isPassed ? "bg-accent" : "bg-accent/15"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
