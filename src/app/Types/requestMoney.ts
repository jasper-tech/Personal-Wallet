export interface BankAccount {
  id: string;
  accountNumber: string;
  bank: string;
  balance: number;
  branch?: string;
}

export interface WalletAccount {
  id: string;
  name: string;
  balance: number;
}

export interface TransferMethod {
  id: string;
  name: string;
  description: string;
  fee: number;
  duration: string;
}
