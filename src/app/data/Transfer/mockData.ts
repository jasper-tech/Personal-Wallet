import { BankAccount } from "@/app/Types/transfer";

export const mockAccounts: BankAccount[] = [
  {
    id: "acc1",
    accountName: "Personal Savings",
    accountNumber: "0123456789",
    bankName: "GCB Bank",
    balance: 5000.0,
  },
  {
    id: "acc2",
    accountName: "Salary Account",
    accountNumber: "9876543210",
    bankName: "Ecobank Ghana",
    balance: 12500.75,
  },
  {
    id: "acc3",
    accountName: "Business Account",
    accountNumber: "5432109876",
    bankName: "Zenith Bank",
    balance: 35000.25,
  },
];

import { TransferHistoryItem } from "@/app/Types/transfer";

export const mockTransactions: TransferHistoryItem[] = [
  {
    id: "trx1",
    fromAccount: "acc1",
    toAccount: "acc2",
    amount: 1000,
    date: new Date(2025, 4, 10),
    reference: "Monthly transfer",
    status: "completed",
  },
  {
    id: "trx2",
    fromAccount: "acc3",
    toAccount: "acc1",
    amount: 5000,
    date: new Date(2025, 4, 5),
    reference: "Business investment",
    status: "completed",
  },
  {
    id: "trx3",
    fromAccount: "acc2",
    toAccount: "acc3",
    amount: 750,
    date: new Date(2025, 4, 1),
    reference: "Project payment",
    status: "completed",
  },
];
