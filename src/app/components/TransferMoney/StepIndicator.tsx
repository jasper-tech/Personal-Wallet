import { CheckCircle } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  steps: {
    number: number;
    label: string;
  }[];
}

export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  // Calculate progress
  const totalSegments = steps.length - 1;
  const progressPercentage = Math.min(
    ((currentStep - 1) / totalSegments) * 100,
    100
  );

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                ${
                  currentStep > step.number
                    ? "bg-green-500"
                    : currentStep === step.number
                    ? "bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
            >
              {currentStep > step.number ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span>{step.number}</span>
              )}
            </div>
            <span className="text-xs mt-2 text-gray-600 dark:text-gray-300">
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative flex items-center mt-2">
        <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-1 bg-blue-600"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
