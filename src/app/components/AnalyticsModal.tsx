import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Transaction } from "../data/mockData";

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export default function AnalyticsModal({
  isOpen,
  onClose,
  transactions,
}: AnalyticsModalProps) {
  // Calculate total income
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate total expenses
  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Calculate by category
  const categoryTotals = transactions.reduce((acc, t) => {
    if (!acc[t.category]) {
      acc[t.category] = 0;
    }
    acc[t.category] += Math.abs(t.amount);
    return acc;
  }, {} as Record<string, number>);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background/80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-card text-card-foreground px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-card text-muted-foreground hover:text-foreground focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-foreground"
                    >
                      Analytics Overview
                    </Dialog.Title>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Total Income
                        </h4>
                        <p className="text-2xl font-semibold text-green-accent-600 dark:text-green-accent-400">
                          ${totalIncome.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Total Expenses
                        </h4>
                        <p className="text-2xl font-semibold text-red-accent-600 dark:text-red-accent-400">
                          ${totalExpenses.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          By Category
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(categoryTotals)
                            .sort(([, a], [, b]) => b - a)
                            .map(([category, amount]) => (
                              <div
                                key={category}
                                className="flex justify-between items-center text-sm"
                              >
                                <span className="text-foreground">
                                  {category}
                                </span>
                                <span className="text-muted-foreground">
                                  ${amount.toFixed(2)}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
