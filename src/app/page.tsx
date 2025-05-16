"use client";

import { useState, useMemo } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsRightLeftIcon,
  BanknotesIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import TransferModal from "./components/TransferModal";
import SendMoneyModal from "./components/SendMoneyModal";
import RequestMoneyModal from "./components/RequestMoneyModal";
import AnalyticsModal from "./components/AnalyticsModal";
import ThemeToggle from "./components/ThemeToggle";
import TransactionFilters from "./components/TransactionFilters";

const stats = [
  {
    id: 1,
    name: "Total Balance",
    amount: "$24,500.00",
    change: "+2.1%",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Monthly Income",
    amount: "$4,200.00",
    change: "+4.3%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Monthly Expenses",
    amount: "$3,100.00",
    change: "+1.2%",
    changeType: "increase",
  },
];

const spendingData = [
  { category: "Groceries", amount: 850 },
  { category: "Utilities", amount: 400 },
  { category: "Entertainment", amount: 300 },
  { category: "Transport", amount: 250 },
  { category: "Shopping", amount: 600 },
];

const monthlyData = [
  { month: "Jan", income: 4000, expenses: 3000 },
  { month: "Feb", income: 4200, expenses: 3100 },
  { month: "Mar", income: 4100, expenses: 2900 },
  { month: "Apr", income: 4300, expenses: 3200 },
];

const transactions = [
  {
    id: 1,
    date: "2025-05-16",
    description: "Grocery Store",
    category: "Groceries",
    amount: -120.5,
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-05-15",
    description: "Salary Deposit",
    category: "Income",
    amount: 4200.0,
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-05-14",
    description: "Electric Bill",
    category: "Utilities",
    amount: -85.0,
    status: "Completed",
  },
  {
    id: 4,
    date: "2025-05-14",
    description: "Online Transfer",
    category: "Transfer",
    amount: -500.0,
    status: "Pending",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-card text-card-foreground overflow-hidden rounded-lg shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BanknotesIcon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {stat.name}
                      </dt>
                      <dd>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {stat.amount}
                          </p>
                          <p
                            className={`ml-2 flex items-baseline text-sm font-semibold ${
                              stat.changeType === "increase"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {stat.change}
                          </p>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card text-card-foreground rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              <button
                onClick={() => setIsSendMoneyModalOpen(true)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <ArrowUpIcon className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Send Money
                </span>
              </button>
              <button
                onClick={() => setIsRequestMoneyModalOpen(true)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <ArrowDownIcon className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Request Money
                </span>
              </button>
              <button
                onClick={() => setIsTransferModalOpen(true)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <ArrowsRightLeftIcon className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Transfer
                </span>
              </button>
              <button
                onClick={() => setIsAnalyticsModalOpen(true)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <ChartPieIcon className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Analytics
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Income vs Expenses */}
          <div className="bg-card text-card-foreground rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Income vs Expenses
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#0088FE" name="Income" />
                  <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Spending Categories */}
          <div className="bg-card text-card-foreground rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Spending by Category
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

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

            {/* Transaction Filters */}
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
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
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
