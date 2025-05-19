import React from "react";
import { CheckCircle } from "lucide-react";
import {
  BankAccount,
  TransferMethod,
  WalletAccount,
} from "@/app/Types/requestMoney";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const handleClose = () => {
    onDone();
    router.push("/");
  };
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-3xl border border-gray-200 rounded-xl shadow-md p-6 mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-green-900 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h2 className="text-xl font-semibold">Request Submitted!</h2>
        <p className="text-gray-700 text-sm px-4">
          Your money request has been submitted successfully.
        </p>

        <div className="p-6 rounded-lg mt-4">
          <div className="grid grid-cols-3 gap-x-12 gap-y-6 text-left max-w-2xl mx-auto">
            <div className="mb-2">
              <p className="text-xs text-gray-500">Source Bank</p>
              <p className="font-medium">{bankAccount?.bank || "N/A"}</p>
              <p className="text-xs text-gray-500">
                Account: **** {bankAccount?.accountNumber.slice(-4) || ""}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-xs text-gray-500">Destination</p>
              <p className="font-medium">{wallet?.name || "N/A"}</p>
              <p className="text-xs text-gray-500">Personal Wallet</p>
            </div>

            <div className="mb-2">
              <p className="text-xs text-gray-500">Method</p>
              <p className="font-medium">{method?.name || "N/A"}</p>
              <p className="text-xs text-gray-500">
                {method?.fee ? `Fee: GH₵ ${method.fee.toFixed(2)}` : "No fee"}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-xs text-gray-500">Amount</p>
              <p className="font-medium">
                GH₵{" "}
                {parsedAmount.toLocaleString("en-GH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-xs text-gray-500">Reference ID</p>
              <p className="font-medium">{referenceId}</p>
            </div>

            <div className="mb-2">
              <p className="text-xs text-gray-500">Expected Arrival</p>
              <p className="font-medium">{method?.duration || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 pb-2">
          <button
            onClick={handleClose}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>

        <div className="text-xs text-gray-700 pt-2">
          Thank you for using our service!
        </div>
      </div>
    </div>
  );
};

export default Review;
