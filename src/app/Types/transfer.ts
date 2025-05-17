export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  balance: number;
}

export interface TransferFormData {
  fromAccountId: string;
  toAccountId: string;
  amount: string;
  reference: string;
}

export interface TransferHistoryItem {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  date: Date;
  reference: string;
  status: "completed" | "pending" | "failed";
}

export type AccountErrors = {
  fromAccount?: string;
  toAccount?: string;
  amount?: string;
  general?: string;
};
