import { Phone, Building } from "lucide-react";
import { TransferMethodOption } from "./TransferMethodOption";

interface TransferMethodStepProps {
  transferMethod: string;
  setTransferMethod: (method: string) => void;
}

export const TransferMethodStep = ({
  transferMethod,
  setTransferMethod,
}: TransferMethodStepProps) => (
  <div className="space-y-6">
    <h2 className="text-sm font-semibold ">
      How would you like to send money?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* <TransferMethodOption
        method="email"
        title="Send to Email"
        description="Send money using recipient's email address"
        icon={<User className="w-8 h-8 text-blue-600 mb-4" />}
        isSelected={transferMethod === "email"}
        onClick={() => setTransferMethod("email")}
      /> */}

      <TransferMethodOption
        method="phone"
        title="Mobile Money"
        description="Send money using recipient's phone number"
        icon={<Phone className="w-8 h-8 text-blue-600 mb-4" />}
        isSelected={transferMethod === "phone"}
        onClick={() => setTransferMethod("phone")}
      />

      <TransferMethodOption
        method="bank"
        title="Bank Transfer"
        description="Send directly to a bank account"
        icon={<Building className="w-8 h-8 text-blue-600 mb-4" />}
        isSelected={transferMethod === "bank"}
        onClick={() => setTransferMethod("bank")}
      />
    </div>
  </div>
);
