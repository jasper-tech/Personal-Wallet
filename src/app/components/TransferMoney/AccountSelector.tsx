import React from "react";
import { FormSelect } from "./FormSelect";
import { BankAccount } from "@/app/Types/transfer";

interface AccountSelectorProps {
  accounts: BankAccount[];
  selectedAccountId: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  id: string;
  excludeAccountId?: string;
  error?: string;
}

export const AccountSelector = ({
  accounts,
  selectedAccountId,
  onChange,
  label,
  id,
  excludeAccountId,
  error,
}: AccountSelectorProps) => {
  // Filter out the excluded account (e.g., don't show "from" account in "to" dropdown)
  const filteredAccounts = excludeAccountId
    ? accounts.filter((account) => account.id !== excludeAccountId)
    : accounts;

  // Format accounts as options for dropdown
  const accountOptions = filteredAccounts.map((account) => ({
    value: account.id,
    label: `${account.accountName} - ${
      account.bankName
    } (₵${account.balance.toFixed(2)})`,
  }));

  return (
    <FormSelect
      id={id}
      label={label}
      value={selectedAccountId}
      onChange={onChange}
      options={accountOptions}
      error={error}
    />
  );
};
