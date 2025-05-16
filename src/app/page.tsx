"use client";

import { useState, useMemo } from "react";
import { transactions, Transaction, stats } from "./data/mockData";
import StatsGrid from "./components/StatsGrid";
import QuickActions from "./components/QuickActions";
import TransferModal from "./components/TransferModal";
import SendMoneyModal from "./components/SendMoneyModal";
import RequestMoneyModal from "./components/RequestMoneyModal";
import AnalyticsModal from "./components/AnalyticsModal";
import TransactionFilters from "./components/TransactionFilters";
import Charts from "./components/Charts";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction: Transaction) => {
      const matchesCategory =
        !selectedCategory || transaction.category === selectedCategory;
      const matchesDateFrom = !dateFrom || transaction.date >= dateFrom;
      const matchesDateTo = !dateTo || transaction.date <= dateTo;
      return matchesCategory && matchesDateFrom && matchesDateTo;
    });
  }, [selectedCategory, dateFrom, dateTo]);

  // Get unique categories for the filter dropdown
  const categories = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.category)));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <StatsGrid stats={stats} />

        <QuickActions
          onTransfer={() => setShowTransferModal(true)}
          onSend={() => setShowSendModal(true)}
          onRequest={() => setShowRequestModal(true)}
          onAnalytics={() => setShowAnalyticsModal(true)}
        />

        <div className="mt-8">
          <Charts transactions={filteredTransactions} />
        </div>

        <div className="mt-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-xl font-semibold text-foreground">
                Recent Transactions
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A list of all your recent transactions including their date,
                description and amount.
              </p>
            </div>
          </div>

          <TransactionFilters
            selectedCategory={selectedCategory}
            dateFrom={dateFrom}
            dateTo={dateTo}
            onCategoryChange={setSelectedCategory}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            categories={categories}
          />

          <div className="mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-0">
                        Date
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                        Description
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                        Category
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                        Amount
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-foreground sm:pl-0">
                          {transaction.date}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-foreground">
                          {transaction.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-foreground">
                          {transaction.category}
                        </td>
                        <td
                          className={`whitespace-nowrap px-3 py-4 text-sm ${
                            transaction.amount >= 0
                              ? "text-green-accent-600 dark:text-green-accent-400"
                              : "text-red-accent-600 dark:text-red-accent-400"
                          }`}
                        >
                          {transaction.amount >= 0
                            ? `+$${transaction.amount.toFixed(2)}`
                            : `-$${Math.abs(transaction.amount).toFixed(2)}`}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              transaction.status === "Completed"
                                ? "bg-green-accent-100 text-green-accent-700 dark:bg-green-accent-900/30 dark:text-green-accent-400"
                                : "bg-yellow-accent-100 text-yellow-accent-700 dark:bg-yellow-accent-900/30 dark:text-yellow-accent-400"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <TransferModal
          isOpen={showTransferModal}
          onClose={() => setShowTransferModal(false)}
        />
        <SendMoneyModal
          isOpen={showSendModal}
          onClose={() => setShowSendModal(false)}
        />
        <RequestMoneyModal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
        />
        <AnalyticsModal
          isOpen={showAnalyticsModal}
          onClose={() => setShowAnalyticsModal(false)}
          transactions={filteredTransactions}
        />
      </main>
    </div>
  );
}
