import { RecipientInfo } from "@/app/Types/sendMoney";
import { ReviewItem } from "./ReviewItem";

interface ReviewStepProps {
  transferMethod: string;
  recipientInfo: RecipientInfo;
  amount: string;
  note: string;
}

export const ReviewStep = ({
  transferMethod,
  recipientInfo,
  amount,
  note,
}: ReviewStepProps) => (
  <div className="space-y-6">
    <h2 className="text-md font-semibold ">Review and confirm your transfer</h2>

    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
      <ReviewItem
        label="Transfer method"
        value={
          transferMethod === "email"
            ? "Email"
            : transferMethod === "phone"
            ? "Mobile Money"
            : "Bank Transfer"
        }
      />

      <ReviewItem
        label="Recipient"
        value={
          <>
            {recipientInfo.name || "Not specified"}
            {transferMethod === "email" && recipientInfo.email && (
              <div className="text-sm text-gray-500">{recipientInfo.email}</div>
            )}
            {transferMethod === "phone" && recipientInfo.phone && (
              <div className="text-sm text-gray-500">{recipientInfo.phone}</div>
            )}
            {transferMethod === "bank" && recipientInfo.bankName && (
              <div className="text-sm text-gray-500">
                {recipientInfo.bankName}
              </div>
            )}
          </>
        }
      />

      <ReviewItem
        label="Amount"
        value={`₵${parseFloat(amount || "0").toFixed(2)}`}
      />

      {note && (
        <ReviewItem
          label="Reference"
          value={note}
          valueClassName="max-w-xs text-right"
        />
      )}

      <div className="flex justify-between pt-2">
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          Total:
        </span>
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
          ₵{parseFloat(amount || "0").toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);
