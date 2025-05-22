"use client";

import React, { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import StepIndicator from "@/app/components/RequestMoney/StepIndicator";
import BankAccountSelection from "@/app/components/RequestMoney/BankAccountSelection";
import MethodSelection from "@/app/components/RequestMoney/MethodSelection";
import WalletSelection from "@/app/components/RequestMoney/WalletSelection";
import AmountInput from "@/app/components/RequestMoney/AmountInput";
import Review from "@/app/components/RequestMoney/Review";

import {
  bankAccounts,
  transferMethods,
  wallets,
} from "@/app/data/RequestMoney/mockData";

export default function RequestMoneyPage() {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedMethodId, setSelectedMethodId] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

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

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full mx-auto p-6  rounded-xl shadow-md">
        <div className="flex items-center mb-6">
          <button
            onClick={goToPreviousStep}
            className="mr-4 p-2 rounded-full hover:bg-[var(--muted)] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[var(--muted-foreground)]" />
          </button>
        </div>
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
