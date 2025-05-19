import React from "react";
import { WalletAccount } from "@/app/Types/requestMoney";

interface WalletSelectionProps {
  wallets: WalletAccount[];
  selectedWallet: string;
  onWalletChange: (walletId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const WalletSelection: React.FC<WalletSelectionProps> = ({
  wallets,
  selectedWallet,
  onWalletChange,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select Your Wallet</h2>
      <div className="space-y-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors
              ${
                selectedWallet === wallet.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
              }`}
            onClick={() => onWalletChange(wallet.id)}
          >
            <div className="flex items-start">
              <div
                className={`w-5 h-5 rounded-full flex-shrink-0 border mt-1 ${
                  selectedWallet === wallet.id
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300"
                }`}
              >
                {selectedWallet === wallet.id && (
                  <div className="w-3 h-3 bg-white rounded-full m-1"></div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{wallet.name}</h3>
                  <span className="font-semibold text-green-600">
                    GH₵{" "}
                    {wallet.balance.toLocaleString("en-GH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Personal Wallet
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
          disabled={!selectedWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WalletSelection;
