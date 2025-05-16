import { RecipientInfo, Errors } from "@/app/Types/sendMoney";
import { FormInput } from "./FormInput";

interface RecipientInfoStepProps {
  recipientInfo: RecipientInfo;
  transferMethod: string;
  handleRecipientChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: Errors;
}

export const RecipientInfoStep = ({
  recipientInfo,
  transferMethod,
  handleRecipientChange,
  errors,
}: RecipientInfoStepProps) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
      {transferMethod === "email"
        ? "Enter recipient's email"
        : transferMethod === "phone"
        ? "Enter recipient's phone number"
        : "Enter bank account details"}
    </h2>

    <div className="space-y-4">
      <FormInput
        id="name"
        label="Recipient's Name"
        type="text"
        value={recipientInfo.name}
        onChange={handleRecipientChange}
        placeholder="Enter recipient's name"
      />

      {transferMethod === "email" && (
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          value={recipientInfo.email}
          onChange={handleRecipientChange}
          placeholder="example@email.com"
          error={errors.email}
        />
      )}

      {transferMethod === "phone" && (
        <FormInput
          id="phone"
          label="Phone Number"
          type="tel"
          value={recipientInfo.phone}
          onChange={handleRecipientChange}
          placeholder="(123) 456-7890"
          error={errors.phone}
        />
      )}

      {transferMethod === "bank" && (
        <>
          <FormInput
            id="bankName"
            label="Bank Name"
            type="text"
            value={recipientInfo.bankName}
            onChange={handleRecipientChange}
            placeholder="Enter bank name"
          />
          <FormInput
            id="accountNumber"
            label="Account Number"
            type="text"
            value={recipientInfo.accountNumber}
            onChange={handleRecipientChange}
            placeholder="Enter account number"
          />
          <FormInput
            id="routingNumber"
            label="Routing Number"
            type="text"
            value={recipientInfo.routingNumber}
            onChange={handleRecipientChange}
            placeholder="Enter routing number"
          />
          {errors.bankDetails && (
            <p className="mt-1 text-sm text-red-600">{errors.bankDetails}</p>
          )}
        </>
      )}
    </div>
  </div>
);
