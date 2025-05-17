import React from "react";

interface AmountInputProps {
  amount: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxAmount?: number;
}

export const AmountInput = ({
  amount,
  onChange,
  error,
  maxAmount,
}: AmountInputProps) => (
  <div>
    <label htmlFor="amount" className="block text-base font-bold mb-1">
      Amount
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 text-base">₵</span>
      </div>
      <input
        type="number"
        name="amount"
        id="amount"
        value={amount}
        onChange={onChange}
        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-3 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300"
        placeholder="0.00"
        min="0.01"
        step="0.01"
        max={maxAmount}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    {maxAmount && (
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Available balance: ₵{maxAmount.toFixed(2)}
      </p>
    )}
  </div>
);

// Reference input component
interface ReferenceInputProps {
  reference: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ReferenceInput = ({
  reference,
  onChange,
}: ReferenceInputProps) => (
  <div>
    <label
      htmlFor="reference"
      className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      Reference (optional)
    </label>
    <textarea
      id="reference"
      name="reference"
      rows={3}
      value={reference}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300"
      placeholder="Add a reference message for this transaction"
    />
  </div>
);
