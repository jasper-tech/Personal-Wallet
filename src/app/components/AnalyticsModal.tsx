import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Charts from "./Charts";

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyData: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  spendingData: Array<{
    category: string;
    amount: number;
  }>;
}

export default function AnalyticsModal({
  isOpen,
  onClose,
  monthlyData,
  spendingData,
}: AnalyticsModalProps) {
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900 dark:text-white mb-4"
                    >
                      Detailed Analytics
                    </Dialog.Title>
                    <div className="mt-2">
                      <Charts
                        monthlyData={monthlyData}
                        spendingData={spendingData}
                      />

                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                          Summary
                        </h4>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Monthly Average
                            </h5>
                            <div className="mt-2">
                              <p className="text-sm text-gray-900 dark:text-white">
                                Income:{" "}
                                <span className="font-medium">
                                  $
                                  {(
                                    monthlyData.reduce(
                                      (acc, curr) => acc + curr.income,
                                      0
                                    ) / monthlyData.length
                                  ).toFixed(2)}
                                </span>
                              </p>
                              <p className="text-sm text-gray-900 dark:text-white">
                                Expenses:{" "}
                                <span className="font-medium">
                                  $
                                  {(
                                    monthlyData.reduce(
                                      (acc, curr) => acc + curr.expenses,
                                      0
                                    ) / monthlyData.length
                                  ).toFixed(2)}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Top Spending Categories
                            </h5>
                            <div className="mt-2">
                              {[...spendingData]
                                .sort((a, b) => b.amount - a.amount)
                                .slice(0, 3)
                                .map((item) => (
                                  <p
                                    key={item.category}
                                    className="text-sm text-gray-900 dark:text-white"
                                  >
                                    {item.category}:{" "}
                                    <span className="font-medium">
                                      ${item.amount}
                                    </span>
                                  </p>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
