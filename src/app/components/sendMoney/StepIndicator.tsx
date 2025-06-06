import { CheckCircle } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const progressPercentage = Math.min(((currentStep - 1) / 2) * 100, 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                ${
                  currentStep > step
                    ? "bg-green-500"
                    : currentStep === step
                    ? "bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
            >
              {currentStep > step ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            <span className="text-xs mt-2 ">
              {step === 1 ? "Method" : step === 2 ? "Recipient" : "Amount"}
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
