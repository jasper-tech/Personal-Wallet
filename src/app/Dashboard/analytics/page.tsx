"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Charts from "@/app/components/Charts";
import { transactions as mockTransactions } from "../../data/mockData";

export default function AnalyticsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter transactions based on date range
  const filteredTransactions = (() => {
    const now = new Date();
    const startDate = new Date();

    if (dateRange === "30days") {
      startDate.setDate(now.getDate() - 30);
    } else if (dateRange === "90days") {
      startDate.setDate(now.getDate() - 90);
    } else if (dateRange === "year") {
      startDate.setFullYear(now.getFullYear() - 1);
    } else {
      return mockTransactions;
    }

    return mockTransactions.filter((tx) => new Date(tx.date) >= startDate);
  })();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
      <header className="mb-4 md:mb-8">
        <div className="flex items-center mb-2 md:mb-4">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-700 transition-colors mr-4"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="mr-1" />
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Track your income, expenses, and financial patterns
        </p>
      </header>

      {/* Date range filter */}
      <div className="mb-4 md:mb-6 p-3 md:p-5 rounded-lg shadow-sm">
        <label className="block text-sm font-bold mb-2 md:mb-3">
          Date Range:
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setDateRange("all")}
            className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md transition-colors ${
              dateRange === "all"
                ? "bg-blue-500 shadow-sm"
                : "border text-gray-500 hover:bg-gray-200"
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setDateRange("30days")}
            className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md transition-colors ${
              dateRange === "30days"
                ? "bg-blue-500 shadow-sm"
                : "border text-gray-500 hover:bg-gray-200"
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setDateRange("90days")}
            className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md transition-colors ${
              dateRange === "90days"
                ? "bg-blue-500 shadow-sm"
                : "border text-gray-500 hover:bg-gray-200"
            }`}
          >
            Last 90 Days
          </button>
          <button
            onClick={() => setDateRange("year")}
            className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md transition-colors ${
              dateRange === "year"
                ? "bg-blue-500 shadow-sm"
                : "border text-gray-500 hover:bg-gray-200"
            }`}
          >
            Last Year
          </button>
        </div>
      </div>

      {/* Charts section */}
      <div className="shadow-lg p-3 md:p-5 overflow-x-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-48 md:h-80">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <div className="text-sm md:text-base text-gray-500">
                Loading analytics data...
              </div>
            </div>
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <div className="min-w-full min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
              <Charts transactions={filteredTransactions} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-48 md:h-80">
            <div className="text-base md:text-lg text-gray-500 text-center">
              <p>No transaction data available for the selected period</p>
              <p className="text-xs md:text-sm mt-2">
                Try selecting a different date range
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
