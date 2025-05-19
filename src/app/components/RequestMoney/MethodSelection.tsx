import React from "react";
import { TransferMethod } from "@/app/Types/requestMoney";

interface MethodSelectionProps {
  methods: TransferMethod[];
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const MethodSelection: React.FC<MethodSelectionProps> = ({
  methods,
  selectedMethod,
  onMethodChange,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-bold">Select Transfer Method</h2>
      <div className="space-y-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors
             `}
            onClick={() => onMethodChange(method.id)}
          >
            <div className="flex items-start">
              <div
                className={`w-5 h-5 rounded-full flex-shrink-0 border mt-1 ${
                  selectedMethod === method.id
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300"
                }`}
              >
                {selectedMethod === method.id && (
                  <div className="w-3 h-3 bg-white rounded-full m-1"></div>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{method.name}</h3>
                <p className="text-sm text-gray-500 ">{method.description}</p>
                <p className="text-xs mt-1">
                  {method.fee > 0
                    ? `Fee: GH₵ ${method.fee.toFixed(2)}`
                    : "No fee"}{" "}
                  • {method.duration}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedMethod}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MethodSelection;
