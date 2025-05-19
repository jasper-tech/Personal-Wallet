import React from "react";
import { CheckCircle } from "lucide-react";
import {
  BankAccount,
  TransferMethod,
  WalletAccount,
} from "@/app/Types/requestMoney";

interface ReviewProps {
  bankAccount: BankAccount | null;
  method: TransferMethod | null;
  wallet: WalletAccount | null;
  amount: string;
  onDone: () => void;
}

const Review: React.FC<ReviewProps> = ({
  bankAccount,
  method,
  wallet,
  amount,
  onDone,
}) => {
  const parsedAmount = parseFloat(amount);
  const referenceId = `GH${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;

  return (
    <div className="space-y-6 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-semibold">Request Submitted!</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Your money request has been submitted successfully.
      </p>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-4">
        <div className="grid grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Source Bank
            </p>
            <p className="font-medium">{bankAccount?.bank || "N/A"}</p>
            <p className="text-xs text-gray-500">
              Account: **** {bankAccount?.accountNumber.slice(-4) || ""}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Destination
            </p>
            <p className="font-medium">{wallet?.name || "N/A"}</p>
            <p className="text-xs text-gray-500">Personal Wallet</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Method</p>
            <p className="font-medium">{method?.name || "N/A"}</p>
            <p className="text-xs text-gray-500">
              {method?.fee ? `Fee: GH₵ ${method.fee.toFixed(2)}` : "No fee"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
            <p className="font-medium">
              GH₵{" "}
              {parsedAmount.toLocaleString("en-GH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reference ID
            </p>
            <p className="font-medium">{referenceId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Expected Arrival
            </p>
            <p className="font-medium">{method?.duration || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onDone}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Review;
