import React from "react";
import { BankAccount } from "@/app/Types/requestMoney";

interface BankAccountSelectionProps {
  accounts: BankAccount[];
  selectedAccount: string;
  onAccountChange: (accountId: string) => void;
  onNext: () => void;
}

const BankAccountSelection: React.FC<BankAccountSelectionProps> = ({
  accounts,
  selectedAccount,
  onAccountChange,
  onNext,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select Bank Account</h2>
      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors
              ${
                selectedAccount === account.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
              }`}
            onClick={() => onAccountChange(account.id)}
          >
            <div className="flex items-start">
              <div
                className={`w-5 h-5 rounded-full flex-shrink-0 border mt-1 ${
                  selectedAccount === account.id
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300"
                }`}
              >
                {selectedAccount === account.id && (
                  <div className="w-3 h-3 bg-white rounded-full m-1"></div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{account.bank}</h3>
                  <span className="font-semibold text-green-600">
                    GH₵{" "}
                    {account.balance.toLocaleString("en-GH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Account: **** {account.accountNumber.slice(-4)}
                </p>
                {account.branch && (
                  <p className="text-xs text-gray-500">
                    Branch: {account.branch}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedAccount}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BankAccountSelection;
