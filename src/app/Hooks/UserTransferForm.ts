"use client";

import { useState } from "react";
import {
  BankAccount,
  TransferHistoryItem,
  TransferFormErrors,
} from "../Types/transfer";
import {
  validateTransfer,
  generateTransactionId,
} from "../Utils/transferUtils";

interface UseTransferFormProps {
  initialAccounts: BankAccount[];
  initialTransactions: TransferHistoryItem[];
}

export const useTransferForm = ({
  initialAccounts,
  initialTransactions,
}: UseTransferFormProps) => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState<TransferFormErrors>({
    fromAccount: "",
    toAccount: "",
    amount: "",
  });

  // Process state
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransferComplete, setIsTransferComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [transferDate, setTransferDate] = useState<Date>(new Date());

  // Data state
  const [accounts, setAccounts] = useState<BankAccount[]>(initialAccounts);
  const [transactions, setTransactions] =
    useState<TransferHistoryItem[]>(initialTransactions);

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

    setIsTransferComplete(true);
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

  return {
    // State
    fromAccountId,
    toAccountId,
    amount,
    reference,
    errors,
    currentStep,
    isTransferComplete,
    transactionId,
    transferDate,
    accounts,
    transactions,
    fromAccount,
    toAccount,

    // Handlers
    handleFromAccountChange,
    handleToAccountChange,
    handleAmountChange,
    handleReferenceChange,
    goToNextStep,
    goToPreviousStep,
    resetForm,
    processTransfer,
  };
};
