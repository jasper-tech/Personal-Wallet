import React, { useState } from "react";
import { BankAccount } from "@/app/Types/requestMoney";
import { Loader2 } from "lucide-react";

interface AmountInputProps {
  amount: string;
  selectedBankAccount: BankAccount | null;
  onAmountChange: (amount: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  selectedBankAccount,
  onAmountChange,
  onSubmit,
  onBack,
}) => {
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // allow numbers and one decimal point
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      onAmountChange(value);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 2000);
  };

  const isAmountValid =
    amount !== "" &&
    parseFloat(amount) > 0 &&
    (!selectedBankAccount || parseFloat(amount) <= selectedBankAccount.balance);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Enter Amount</h2>

      {selectedBankAccount && (
        <div className="p-3 border rounded-lg">
          <p className="text-sm text-green-700">
            Available Balance:{" "}
            <span className="font-semibold">
              GH₵{" "}
              {selectedBankAccount.balance.toLocaleString("en-GH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-bold mb-1">
            Amount
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">GH₵</span>
            </div>
            <input
              type="text"
              name="amount"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="pl-12 block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>

          {selectedBankAccount &&
            amount &&
            parseFloat(amount) > selectedBankAccount.balance && (
              <p className="mt-1 text-sm text-red-600">
                Amount exceeds available balance
              </p>
            )}
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-bold mb-1">
            Reference (Optional)
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What's this for?"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-lg"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isAmountValid || isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Requesting...
            </>
          ) : (
            "Request Money"
          )}
        </button>
      </div>
    </div>
  );
};

export default AmountInput;
