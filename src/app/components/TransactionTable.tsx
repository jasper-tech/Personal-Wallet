import React from "react";
import { Transaction } from "../data/mockData";

interface TransactionTableProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

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

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <>
      <div className="mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-border">
                <thead className="">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
                      Date
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold">
                      Description
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold">
                      Category
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold">
                      Amount
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <tr key={transaction.id} className=" transition-colors">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-foreground sm:pl-6">
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-3 py-8 text-sm text-center">
                        No transactions found matching the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between px-4 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600  dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600  dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            {/* <p className="text-sm">
              Showing{" "}
              <span className="font-medium">
                {transactions.length > 0
                  ? (currentPage - 1) * Math.min(transactions.length, 6) + 1
                  : 0}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * 6, transactions.length)}
              </span>{" "}
              of <span className="font-medium">{transactions.length}</span>{" "}
              results
            </p> */}
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={onPreviousPage}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:ring-gray-700 dark:hover:bg-gray-800 dark:text-gray-500"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Page number */}
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0  dark:ring-gray-700">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={onNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:ring-gray-700 dark:hover:bg-gray-800 dark:text-gray-500"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionTable;
