import {
  BankAccount,
  TransferMethod,
  WalletAccount,
} from "@/app/Types/requestMoney";

// bank accounts
export const bankAccounts: BankAccount[] = [
  {
    id: "bank1",
    bank: "GCB Bank",
    accountNumber: "1234567890",
    balance: 5000.75,
    branch: "High Street Branch",
  },
  {
    id: "bank2",
    bank: "Ecobank Ghana",
    accountNumber: "0987654321",
    balance: 12345.5,
    branch: "Airport City Branch",
  },
  {
    id: "bank3",
    bank: "Fidelity Bank Ghana",
    accountNumber: "5678901234",
    balance: 2500.25,
    branch: "Osu Branch",
  },
];

// transfer methods
export const transferMethods: TransferMethod[] = [
  {
    id: "standard",
    name: "Standard Transfer",
    description: "Transfer funds with regular processing time",
    fee: 0,
    duration: "1-2 business days",
  },
  {
    id: "express",
    name: "Express Transfer",
    description: "Faster transfer with priority processing",
    fee: 5,
    duration: "Same day",
  },
  {
    id: "instant",
    name: "Instant Transfer",
    description: "Immediate transfer to your wallet",
    fee: 10,
    duration: "Instant",
  },
];

// wallets
export const wallets: WalletAccount[] = [
  {
    id: "wallet1",
    name: "Primary Wallet",
    balance: 1250.45,
  },
  {
    id: "wallet2",
    name: "Savings Wallet",
    balance: 3500.2,
  },
];
