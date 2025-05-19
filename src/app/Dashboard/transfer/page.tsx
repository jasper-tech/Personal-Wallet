"use client";
import React, { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { mockAccounts } from "@/app/data/Transfer/mockData";
import { mockTransactions } from "@/app/data/Transfer/mockData";
import { StepIndicator } from "@/app/components/sendMoney/StepIndicator";
import { AccountSelector } from "@/app/components/TransferMoney/AccountSelector";
import {
  AmountInput,
  ReferenceInput,
} from "@/app/components/TransferMoney/AmountInput";
import { TransferSummary } from "@/app/components/TransferMoney/TransferSummary";
import { TransferConfirmation } from "@/app/components/TransferMoney/TransferConfirmation";
import {
  validateTransfer,
  generateTransactionId,
} from "@/app/Utils/transferUtils";
import {
  BankAccount,
  TransferHistoryItem,
  TransferFormErrors,
} from "@/app/Types/transfer";

export default function TransferMoney() {
  // Steps for the transfer process
  const steps = [
    { number: 1, label: "Details" },
    { number: 2, label: "Review" },
    { number: 3, label: "Confirm" },
  ];

  // Form state
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState<TransferFormErrors>({
    fromAccount: "",
    toAccount: "",
    amount: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isTransferComplete, setIsTransferComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [transferDate, setTransferDate] = useState<Date>(new Date());
  const router = useRouter();

  // Data state
  const [accounts, setAccounts] = useState<BankAccount[]>(mockAccounts);
  const [transactions, setTransactions] =
    useState<TransferHistoryItem[]>(mockTransactions);

  // Derived values
  const fromAccount = accounts.find((acc) => acc.id === fromAccountId);
  const toAccount = accounts.find((acc) => acc.id === toAccountId);

  // Form handlers
  const handleFromAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromAccountId(e.target.value);
    setErrors((prev) => ({ ...prev, fromAccount: "" }));
  };

  const handleToAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToAccountId(e.target.value);
    setErrors((prev) => ({ ...prev, toAccount: "" }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const handleReferenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReference(e.target.value);
  };

  // Validation and processing
  const validateForm = () => {
    const newErrors = validateTransfer(
      fromAccountId,
      toAccountId,
      amount,
      fromAccount?.balance
    );

    setErrors(newErrors);
    return !newErrors.fromAccount && !newErrors.toAccount && !newErrors.amount;
  };

  const processTransfer = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Generate a transaction ID
      const newTransactionId = generateTransactionId();
      setTransactionId(newTransactionId);
      setTransferDate(new Date());

      // Update account balances
      if (fromAccount && toAccount) {
        const transferAmount = parseFloat(amount);

        setAccounts(
          accounts.map((account) => {
            if (account.id === fromAccountId) {
              return { ...account, balance: account.balance - transferAmount };
            } else if (account.id === toAccountId) {
              return { ...account, balance: account.balance + transferAmount };
            }
            return account;
          })
        );

        // Add to transaction history
        const newTransaction: TransferHistoryItem = {
          id: newTransactionId,
          fromAccount: fromAccountId,
          toAccount: toAccountId,
          amount: transferAmount,
          date: new Date(),
          reference: reference,
          status: "completed",
        };

        setTransactions([newTransaction, ...transactions]);
      }

      setIsProcessing(false);
      setIsTransferComplete(true);

      // Show toast notification
      toast.success("Transfer completed successfully!", {
        duration: 4000,
        position: "top-center",
      });
    }, 2000);
  };

  // Navigation
  const goToNextStep = () => {
    if (currentStep === 1) {
      if (validateForm()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
      processTransfer();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFromAccountId("");
    setToAccountId("");
    setAmount("");
    setReference("");
    setIsTransferComplete(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <button
          onClick={goToPreviousStep}
          className="mr-4 p-2 rounded-full hover:bg-[var(--muted)] transition-colors"
          disabled={isProcessing}
        >
          <ArrowLeft className="h-5 w-5 text-[var(--muted-foreground)]" />
        </button>
      </div>
      {!isTransferComplete ? (
        <>
          <StepIndicator currentStep={currentStep} steps={steps} />

          {currentStep === 1 && (
            <div className="space-y-6">
              <AccountSelector
                accounts={accounts}
                selectedAccountId={fromAccountId}
                onChange={handleFromAccountChange}
                label="From Account"
                id="fromAccount"
                error={errors.fromAccount}
              />

              <AccountSelector
                accounts={accounts}
                selectedAccountId={toAccountId}
                onChange={handleToAccountChange}
                label="To Account"
                id="toAccount"
                excludeAccountId={fromAccountId}
                error={errors.toAccount}
              />

              <AmountInput
                amount={amount}
                onChange={handleAmountChange}
                error={errors.amount}
                maxAmount={fromAccount?.balance}
              />

              <ReferenceInput
                reference={reference}
                onChange={handleReferenceChange}
              />
            </div>
          )}

          {currentStep === 2 && !isProcessing && (
            <div className="space-y-6">
              <TransferSummary
                fromAccount={fromAccount}
                toAccount={toAccount}
                amount={amount}
                reference={reference}
              />
              <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-yellow-700 dark:text-yellow-300">
                  Please verify all details before confirming the transfer. This
                  action cannot be undone.
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && isProcessing && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin mb-4" />
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Processing your transfer...
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Please wait while we complete your transaction
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {currentStep > 1 && currentStep < 3 && !isProcessing && (
              <button
                onClick={goToPreviousStep}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-md transition-colors"
              >
                Back
              </button>
            )}

            {(currentStep < 3 || !isProcessing) && (
              <button
                onClick={goToNextStep}
                disabled={isProcessing}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors ml-auto disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {currentStep === 2 ? "Confirm Transfer" : "Next"}
              </button>
            )}
          </div>
        </>
      ) : (
        fromAccount &&
        toAccount && (
          <TransferConfirmation
            fromAccount={fromAccount}
            toAccount={toAccount}
            amount={amount}
            reference={reference}
            transactionId={transactionId}
            date={transferDate}
            onClose={resetForm}
          />
        )
      )}

      {currentStep === 1 && !isTransferComplete && (
        <div className="mt-12">
          {/* <TransactionsList
            transactions={transactions}
            currentAccountId={fromAccountId || undefined}
          /> */}
        </div>
      )}
    </div>
  );
}
