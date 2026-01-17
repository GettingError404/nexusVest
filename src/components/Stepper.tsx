import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="relative flex justify-between items-center w-full mb-8">
      {/* Connector Line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 transform -translate-y-1/2 rounded-full" />
      <div
        className="absolute top-1/2 left-0 h-1 bg-accent -z-10 transform -translate-y-1/2 rounded-full transition-all duration-500"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;

        return (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 z-10",
                isCompleted || isCurrent
                  ? "bg-primary border-accent text-white"
                  : "bg-primary border-slate-700 text-slate-500",
                isCurrent && "ring-4 ring-blue-500/20 scale-110",
              )}
            >
              {isCompleted ? (
                <Check className="w-5 h-5 text-accent" />
              ) : (
                <span className="font-bold text-sm">{idx + 1}</span>
              )}
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                isCurrent ? "text-white" : "text-slate-500",
              )}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
