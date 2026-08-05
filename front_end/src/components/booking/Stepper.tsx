import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  steps: { title: string; subtitle: string }[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="flex w-full items-center justify-between px-4 pb-12">
      {steps.map((step, i) => {
        const stepNumber = i + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-3 relative">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isActive ? "var(--color-primary)" : "var(--color-slate-200)",
                  scale: isActive ? 1.1 : 1,
                }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  isCompleted || isActive ? "text-white" : "text-slate-500"
                )}
              >
                {isCompleted ? <Check size={18} /> : stepNumber}
              </motion.div>
              <div className="absolute top-12 flex flex-col items-center w-max">
                <span className={cn(
                  "text-xs font-bold uppercase tracking-wider transition-colors",
                  isActive ? "text-primary" : "text-slate-400"
                )}>
                  {step.title}
                </span>
              </div>
            </div>
            
            {i < steps.length - 1 && (
              <div className="h-[2px] w-full mx-4 bg-slate-100 relative overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute h-full bg-primary"
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
