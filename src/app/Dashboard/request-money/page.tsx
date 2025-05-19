"use client";

import React, { useState, useMemo } from "react";
import StepIndicator from "@/app/components/RequestMoney/StepIndicator";
import BankAccountSelection from "@/app/components/RequestMoney/BankAccountSelection";
import MethodSelection from "@/app/components/RequestMoney/MethodSelection";
import WalletSelection from "@/app/components/RequestMoney/WalletSelection";
import AmountInput from "@/app/components/RequestMoney/AmountInput";
import Review from "@/app/components/RequestMoney/Review";
import {
  BankAccount,
  TransferMethod,
  WalletAccount,
} from "@/app/Types/requestMoney";

// Mock data for bank accounts
const bankAccounts: BankAccount[] = [
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

// Mock data for transfer methods
const transferMethods: TransferMethod[] = [
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

// Mock data for wallets
const wallets: WalletAccount[] = [
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

export default function RequestMoneyPage() {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedMethodId, setSelectedMethodId] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Derived state
  const selectedBank = useMemo(
    () => bankAccounts.find((bank) => bank.id === selectedBankId) || null,
    [selectedBankId]
  );

  const selectedMethod = useMemo(
    () =>
      transferMethods.find((method) => method.id === selectedMethodId) || null,
    [selectedMethodId]
  );

  const selectedWallet = useMemo(
    () => wallets.find((wallet) => wallet.id === selectedWalletId) || null,
    [selectedWalletId]
  );

  // Navigation handlers
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedBankId("");
    setSelectedMethodId("");
    setSelectedWalletId("");
    setAmount("");
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Request Money from Bank
        </h1>

        {!isSubmitted ? (
          <>
            <StepIndicator currentStep={currentStep} />

            {currentStep === 1 && (
              <BankAccountSelection
                accounts={bankAccounts}
                selectedAccount={selectedBankId}
                onAccountChange={setSelectedBankId}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <MethodSelection
                methods={transferMethods}
                selectedMethod={selectedMethodId}
                onMethodChange={setSelectedMethodId}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <WalletSelection
                wallets={wallets}
                selectedWallet={selectedWalletId}
                onWalletChange={setSelectedWalletId}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <AmountInput
                amount={amount}
                selectedBankAccount={selectedBank}
                onAmountChange={setAmount}
                onSubmit={handleSubmit}
                onBack={handleBack}
              />
            )}
          </>
        ) : (
          <Review
            bankAccount={selectedBank}
            method={selectedMethod}
            wallet={selectedWallet}
            amount={amount}
            onDone={handleReset}
          />
        )}
      </div>
    </div>
  );
}
