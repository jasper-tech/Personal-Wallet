import { ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  isStepComplete: (step: number) => boolean;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  handleSubmit: () => void;
  isProcessing: boolean;
}

export const NavigationButtons = ({
  currentStep,
  isStepComplete,
  goToPreviousStep,
  goToNextStep,
  handleSubmit,
  isProcessing,
}: NavigationButtonsProps) => (
  <div className="mt-8 flex justify-between">
    <button
      type="button"
      onClick={goToPreviousStep}
      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      Previous
    </button>

    {currentStep < 4 ? (
      <button
        type="button"
        onClick={goToNextStep}
        disabled={!isStepComplete(currentStep)}
        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${
            isStepComplete(currentStep)
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed dark:bg-blue-900"
          }`}
      >
        Next
        <ChevronRight className="ml-2 -mr-1 h-4 w-4" />
      </button>
    ) : (
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isProcessing}
        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${
            isProcessing
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {isProcessing ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          "Send Money"
        )}
      </button>
    )}
  </div>
);
