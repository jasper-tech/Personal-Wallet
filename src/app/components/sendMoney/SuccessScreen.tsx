import { CheckCircle } from "lucide-react";
import { RecipientInfo } from "@/app/Types/sendMoney";

interface SuccessScreenProps {
  amount: string;
  recipientInfo: RecipientInfo;
  transferMethod: string;
  onReturnToDashboard: () => void;
}

export const SuccessScreen = ({
  amount,
  recipientInfo,
  transferMethod,
  onReturnToDashboard,
}: SuccessScreenProps) => (
  <div className="text-center border py-10 space-y-6">
    <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-6 dark:bg-green-900">
      <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-300" />
    </div>
    <h2 className="text-2xl font-semibold ">Money Sent Successfully!</h2>
    <p className="text-gray-500 max-w-md mx-auto">
      Your transfer of ₵{parseFloat(amount || "0").toFixed(2)} to{" "}
      {recipientInfo.name}
      {transferMethod === "email"
        ? ` (${recipientInfo.email})`
        : transferMethod === "phone"
        ? ` (${recipientInfo.phone})`
        : ` at ${recipientInfo.bankName}`}{" "}
      has been completed.
    </p>

    <div className="mt-8">
      <button
        type="button"
        onClick={onReturnToDashboard}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Done
      </button>
    </div>
  </div>
);
