// TransferConfirmation.tsx
import React from "react";
import { CheckCircle } from "lucide-react";
import { BankAccount } from "@/app/Types/transfer";

interface TransferConfirmationProps {
  fromAccount: BankAccount;
  toAccount: BankAccount;
  amount: string;
  reference: string;
  transactionId: string;
  date: Date;
  onClose: () => void;
}

export const TransferConfirmation = ({
  fromAccount,
  toAccount,
  amount,
  reference,
  transactionId,
  date,
  onClose,
}: TransferConfirmationProps) => {
  const amountValue = parseFloat(amount);
  const formattedAmount = isNaN(amountValue) ? "0.00" : amountValue.toFixed(2);

  return (
    <div className=" p-6 rounded-lg border shadow-md max-w-lg mx-auto">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-bold">Transfer Successful!</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Your transfer has been successfully processed
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Amount</p>
          <p className="text-2xl font-bold">₵{formattedAmount}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-gray-500 dark:text-gray-400 text-xs">From</p>
            <p className="font-medium text-sm">{fromAccount.accountName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {fromAccount.bankName}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-gray-500 dark:text-gray-400 text-xs">To</p>
            <p className="font-medium text-sm">{toAccount.accountName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {toAccount.bankName}
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-3 flex justify-between">
            <p className="text-gray-500 dark:text-gray-400">Date & Time</p>
            <p>{date.toLocaleString()}</p>
          </div>

          <div className="py-3 flex justify-between">
            <p className="text-gray-500 dark:text-gray-400">Transaction ID</p>
            <p className="font-mono text-sm">{transactionId}</p>
          </div>

          {reference && (
            <div className="py-3 flex justify-between">
              <p className="text-gray-500 dark:text-gray-400">Reference</p>
              <p>{reference}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
