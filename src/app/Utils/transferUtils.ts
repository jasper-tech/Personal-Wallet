/**
 * Generate a unique transaction ID
 * @returns A transaction ID with "TRX" prefix followed by numbers
 */
export const generateTransactionId = (): string => {
  return "TRX" + Date.now().toString().slice(-8);
};

/**
 * Format amount to Ghana Cedis with 2 decimal places
 * @param amount - Number or string amount to format
 * @returns Formatted amount string
 */
export const formatAmount = (amount: number | string): string => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return isNaN(numAmount) ? "0.00" : numAmount.toFixed(2);
};

/**
 * Validate a transfer form
 * @param fromAccountId - Source account ID
 * @param toAccountId - Destination account ID
 * @param amount - Transfer amount
 * @param fromAccountBalance - Source account balance
 * @returns Object with validation errors
 */
export const validateTransfer = (
  fromAccountId: string,
  toAccountId: string,
  amount: string,
  fromAccountBalance?: number
) => {
  const errors = {
    fromAccount: "",
    toAccount: "",
    amount: "",
  };

  if (!fromAccountId) {
    errors.fromAccount = "Please select a source account";
  }

  if (!toAccountId) {
    errors.toAccount = "Please select a destination account";
  }

  if (fromAccountId === toAccountId && fromAccountId && toAccountId) {
    errors.toAccount = "Source and destination accounts cannot be the same";
  }

  const amountValue = parseFloat(amount);
  if (!amount || isNaN(amountValue) || amountValue <= 0) {
    errors.amount = "Please enter a valid amount";
  } else if (
    fromAccountBalance !== undefined &&
    amountValue > fromAccountBalance
  ) {
    errors.amount = "Insufficient funds";
  }

  return errors;
};
