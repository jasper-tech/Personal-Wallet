import React from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { TransferHistoryItem } from "@/app/Types/transfer";

interface TransactionsListProps {
  transactions: TransferHistoryItem[];
  currentAccountId?: string;
}

export const TransactionsList = ({
  transactions,
  currentAccountId,
}: TransactionsListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">
          No transactions found
        </p>
      </div>
    );
  }

  // Sort transactions by date (most recent first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Recent Transactions</h3>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedTransactions.map((transaction) => {
            // Determine if this is an incoming or outgoing transaction
            const isOutgoing = currentAccountId
              ? transaction.fromAccount === currentAccountId
              : false;

            return (
              <li
                key={transaction.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        isOutgoing
                          ? "bg-red-100 dark:bg-red-900"
                          : "bg-green-100 dark:bg-green-900"
                      }`}
                    >
                      {isOutgoing ? (
                        <ArrowUpRight
                          className={`h-5 w-5 text-red-600 dark:text-red-400`}
                        />
                      ) : (
                        <ArrowDownLeft
                          className={`h-5 w-5 text-green-600 dark:text-green-400`}
                        />
                      )}
                    </div>

                    <div>
                      <p className="font-medium">
                        {isOutgoing
                          ? `To: ${transaction.toAccount}`
                          : `From: ${transaction.fromAccount}`}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.date.toLocaleDateString()} •{" "}
                        {transaction.reference || "No reference"}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        isOutgoing
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {isOutgoing ? "-" : "+"} ₵{transaction.amount.toFixed(2)}
                    </p>
                    <p
                      className={`text-xs ${
                        transaction.status === "completed"
                          ? "text-green-600 dark:text-green-400"
                          : transaction.status === "pending"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
