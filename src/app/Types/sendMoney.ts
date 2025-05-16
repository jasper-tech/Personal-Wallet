export interface RecipientInfo {
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
}

export interface Errors {
  email?: string;
  phone?: string;
  bankDetails?: string;
}

export interface StepProps {
  recipientInfo: RecipientInfo;
  transferMethod: string;
  setTransferMethod: (method: string) => void;
  handleRecipientChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: Errors;
  amount: string;
  setAmount: (amount: string) => void;
  note: string;
  setNote: (note: string) => void;
  isProcessing: boolean;
}
