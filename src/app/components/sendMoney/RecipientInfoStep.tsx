import { RecipientInfo, Errors } from "@/app/Types/sendMoney";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

// Ghana banks list
const GHANA_BANKS = [
  { value: "ghana-commercial-bank", label: "Ghana Commercial Bank" },
  { value: "ecobank-ghana", label: "Ecobank Ghana" },
  {
    value: "agricultural-development-bank",
    label: "Agricultural Development Bank",
  },
  { value: "cal-bank", label: "CAL Bank" },
  { value: "fidelity-bank", label: "Fidelity Bank" },
  { value: "zenith-bank", label: "Zenith Bank" },
  { value: "stanbic-bank", label: "Stanbic Bank" },
  { value: "republic-bank", label: "Republic Bank" },
  { value: "access-bank", label: "Access Bank" },
  { value: "standard-chartered", label: "Standard Chartered Bank" },
  { value: "uba", label: "United Bank for Africa (UBA)" },
  { value: "gt-bank", label: "Guaranty Trust Bank" },
];

interface RecipientInfoStepProps {
  recipientInfo: RecipientInfo;
  transferMethod: string;
  handleRecipientChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
    <h2 className="text-lg font-bold ">
      {transferMethod === "email"
        ? "Enter recipient's email"
        : transferMethod === "phone"
        ? "Enter recipient's name and phone number"
        : "Enter bank account details"}
    </h2>

    <div className="space-y-4  ">
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
          placeholder="(233) xxx-xxx-xxx"
          error={errors.phone}
        />
      )}

      {transferMethod === "bank" && (
        <>
          <FormSelect
            id="bankName"
            label="Bank Name"
            value={recipientInfo.bankName}
            onChange={handleRecipientChange}
            options={GHANA_BANKS}
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
            label="Ghana Card Number"
            type="text"
            value={recipientInfo.routingNumber}
            onChange={handleRecipientChange}
            placeholder="Enter GH-card number"
          />
          {errors.bankDetails && (
            <p className="mt-1 text-sm text-red-600">{errors.bankDetails}</p>
          )}
        </>
      )}
    </div>
  </div>
);
