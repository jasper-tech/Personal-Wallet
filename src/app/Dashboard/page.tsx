"use client";

import { useState, useMemo, useEffect } from "react";
import { transactions, Transaction, stats } from "../data/mockData";
import StatsGrid from "../components/StatsGrid";
import QuickActions from "../components/QuickActions";
import TransactionFilters from "../components/TransactionFilters";
import TransactionTable from "../components/TransactionTable";

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [amountMin, setAmountMin] = useState<string>("");
  const [amountMax, setAmountMax] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction: Transaction) => {
      // Category filter
      const matchesCategory =
        !selectedCategory || transaction.category === selectedCategory;

      // Date filters
      const matchesDateFrom = !dateFrom || transaction.date >= dateFrom;
      const matchesDateTo = !dateTo || transaction.date <= dateTo;

      // Amount filters
      const transactionAmount = parseFloat(
        transaction.amount.toString().replace(/[₵,]/g, "")
      );
      const matchesAmountMin =
        !amountMin || transactionAmount >= parseFloat(amountMin);
      const matchesAmountMax =
        !amountMax || transactionAmount <= parseFloat(amountMax);

      return (
        matchesCategory &&
        matchesDateFrom &&
        matchesDateTo &&
        matchesAmountMin &&
        matchesAmountMax
      );
    });
  }, [selectedCategory, dateFrom, dateTo, amountMin, amountMax]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  // categories
  const categories = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.category)));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, dateFrom, dateTo, amountMin, amountMax]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <StatsGrid stats={stats} />

        <QuickActions />

        <div className="mt-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Recent Transactions
              </h2>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
          </div>

          <TransactionFilters
            selectedCategory={selectedCategory}
            dateFrom={dateFrom}
            dateTo={dateTo}
            amountMin={amountMin}
            amountMax={amountMax}
            onCategoryChange={setSelectedCategory}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onAmountMinChange={setAmountMin}
            onAmountMaxChange={setAmountMax}
            categories={categories}
          />

          <TransactionTable
            transactions={paginatedTransactions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </div>
      </main>
    </div>
  );
}
