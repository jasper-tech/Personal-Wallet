"use client";

import { useState, useMemo, useEffect } from "react";
import { transactions, Transaction, stats } from "../data/mockData";
import StatsGrid from "../components/StatsGrid";
import QuickActions from "../components/QuickActions";
import TransferModal from "../components/TransferModal";
import RequestMoneyModal from "../components/RequestMoneyModal";
import AnalyticsModal from "../components/AnalyticsModal";
import TransactionFilters from "../components/TransactionFilters";
import Charts from "../components/Charts";

const styles = {
  positiveAmount: {
    color: "var(--green-accent-500)",
  },
  negativeAmount: {
    color: "var(--red-accent-500)",
  },
  statusCompleted: {
    backgroundColor: "var(--green-accent-100)",
    color: "var(--green-accent-600)",
    borderRadius: "9999px",
    padding: "0.25rem 0.625rem",
    fontSize: "0.75rem",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
  },
  statusPending: {
    backgroundColor: "var(--yellow-accent-100)",
    color: "var(--warning)",
    borderRadius: "9999px",
    padding: "0.25rem 0.625rem",
    fontSize: "0.75rem",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
  },
};

export default function Dashboard() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction: Transaction) => {
      const matchesCategory =
        !selectedCategory || transaction.category === selectedCategory;
      const matchesDateFrom = !dateFrom || transaction.date >= dateFrom;
      const matchesDateTo = !dateTo || transaction.date <= dateTo;
      return matchesCategory && matchesDateFrom && matchesDateTo;
    });
  }, [selectedCategory, dateFrom, dateTo]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  // unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.category)));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, dateFrom, dateTo]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      {/* <header className="bg-card shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header> */}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <StatsGrid stats={stats} />

        <QuickActions />

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
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-0">
                        Date
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold ">
                        Description
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold ">
                        Category
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold ">
                        Amount
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold ">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paginatedTransactions.map((transaction) => (
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
                          className="whitespace-nowrap px-3 py-4 text-sm"
                          style={
                            transaction.amount >= 0
                              ? styles.positiveAmount
                              : styles.negativeAmount
                          }
                        >
                          {transaction.amount >= 0
                            ? `+$${transaction.amount.toFixed(2)}`
                            : `-$${Math.abs(transaction.amount).toFixed(2)}`}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            style={
                              transaction.status === "Completed"
                                ? styles.statusCompleted
                                : styles.statusPending
                            }
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

          {/* Pagination controls */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-semibold bg-card text-foreground rounded-md shadow-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-semibold bg-card text-foreground rounded-md shadow-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <TransferModal
          isOpen={showTransferModal}
          onClose={() => setShowTransferModal(false)}
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
