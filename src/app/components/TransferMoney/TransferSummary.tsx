//TransferSummary.tsx
import React from "react";
import { BankAccount } from "@/app/Types/transfer";

interface TransferSummaryProps {
  fromAccount: BankAccount | undefined;
  toAccount: BankAccount | undefined;
  amount: string;
  reference: string;
}

export const TransferSummary = ({
  fromAccount,
  toAccount,
  amount,
  reference,
}: TransferSummaryProps) => {
  if (!fromAccount || !toAccount || !amount) {
    return null;
  }

  const amountValue = parseFloat(amount);
  const formattedAmount = isNaN(amountValue) ? "0.00" : amountValue.toFixed(2);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-4">Transfer Summary</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
          <span className="text-gray-600 dark:text-gray-400">From</span>
          <div className="text-right">
            <p className="font-medium">{fromAccount.accountName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {fromAccount.bankName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {fromAccount.accountNumber}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
          <span className="text-gray-600 dark:text-gray-400">To</span>
          <div className="text-right">
            <p className="font-medium">{toAccount.accountName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {toAccount.bankName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {toAccount.accountNumber}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
          <span className="text-gray-600 dark:text-gray-400">Amount</span>
          <span className="font-bold text-lg">₵{formattedAmount}</span>
        </div>

        {reference && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Reference</span>
            <span className="text-right text-gray-800 dark:text-gray-200">
              {reference}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
