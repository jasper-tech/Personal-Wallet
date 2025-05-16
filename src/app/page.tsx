"use client";

import { useState, useMemo } from "react";
import {
  stats,
  spendingData,
  monthlyData,
  transactions,
} from "./data/mockData";
import StatsGrid from "./components/StatsGrid";
import QuickActions from "./components/QuickActions";
import Charts from "./components/Charts";
import TransferModal from "./components/TransferModal";
import SendMoneyModal from "./components/SendMoneyModal";
import RequestMoneyModal from "./components/RequestMoneyModal";
import AnalyticsModal from "./components/AnalyticsModal";
import ThemeToggle from "./components/ThemeToggle";
import TransactionFilters from "./components/TransactionFilters";

export default function Home() {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false);
  const [isRequestMoneyModalOpen, setIsRequestMoneyModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Extract unique categories from transactions
  const categories = useMemo(() => {
    const uniqueCategories = new Set(transactions.map((t) => t.category));
    return Array.from(uniqueCategories);
  }, []);

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesCategory =
        !selectedCategory || transaction.category === selectedCategory;
      const matchesDateFrom = !dateFrom || transaction.date >= dateFrom;
      const matchesDateTo = !dateTo || transaction.date <= dateTo;
      return matchesCategory && matchesDateFrom && matchesDateTo;
    });
  }, [selectedCategory, dateFrom, dateTo]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card text-card-foreground shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <StatsGrid stats={stats} />

        <QuickActions
          onTransfer={() => setIsTransferModalOpen(true)}
          onSendMoney={() => setIsSendMoneyModalOpen(true)}
          onRequestMoney={() => setIsRequestMoneyModalOpen(true)}
          onAnalytics={() => setIsAnalyticsModalOpen(true)}
        />

        <Charts monthlyData={monthlyData} spendingData={spendingData} />

        {/* Transactions Table */}
        <div className="bg-card text-card-foreground shadow rounded-lg">
          <div className="p-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Recent Transactions
                </h2>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  A list of all your recent transactions including their date,
                  description, and status.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  Export transactions
                </button>
              </div>
            </div>

            <TransactionFilters
              dateFrom={dateFrom}
              dateTo={dateTo}
              selectedCategory={selectedCategory}
              categories={categories}
              onDateFromChange={setDateFrom}
              onDateToChange={setDateTo}
              onCategoryChange={setSelectedCategory}
            />

            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                          Date
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Description
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Category
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Amount
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 dark:text-gray-300 sm:pl-0">
                            {transaction.date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-300">
                            {transaction.description}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-300">
                            {transaction.category}
                          </td>
                          <td
                            className={`whitespace-nowrap px-3 py-4 text-sm ${
                              transaction.amount >= 0
                                ? "text-green-600"
                                : "text-red-600"
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
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
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
        </div>

        <ThemeToggle />

        {/* Modals */}
        <TransferModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
        />
        <SendMoneyModal
          isOpen={isSendMoneyModalOpen}
          onClose={() => setIsSendMoneyModalOpen(false)}
        />
        <RequestMoneyModal
          isOpen={isRequestMoneyModalOpen}
          onClose={() => setIsRequestMoneyModalOpen(false)}
        />
        <AnalyticsModal
          isOpen={isAnalyticsModalOpen}
          onClose={() => setIsAnalyticsModalOpen(false)}
          monthlyData={monthlyData}
          spendingData={spendingData}
        />
      </main>
    </div>
  );
}
