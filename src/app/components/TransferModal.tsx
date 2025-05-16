import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type TransferStep = "recipient" | "amount" | "confirm";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransferModal({ isOpen, onClose }: TransferModalProps) {
  const [step, setStep] = useState<TransferStep>("recipient");
  const [transferData, setTransferData] = useState({
    recipientId: "",
    recipientName: "",
    amount: "",
    note: "",
  });

  const handleNext = () => {
    if (step === "recipient") setStep("amount");
    else if (step === "amount") setStep("confirm");
    else {
      // Handle transfer submission
      handleTransfer();
    }
  };

  const handleBack = () => {
    if (step === "amount") setStep("recipient");
    else if (step === "confirm") setStep("amount");
  };

  const handleTransfer = () => {
    // Here you would typically make an API call to process the transfer
    console.log("Processing transfer:", transferData);
    onClose();
    setStep("recipient");
    setTransferData({
      recipientId: "",
      recipientName: "",
      amount: "",
      note: "",
    });
  };

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none"
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
                      className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                      {step === "recipient"
                        ? "Select Recipient"
                        : step === "amount"
                        ? "Enter Amount"
                        : "Confirm Transfer"}
                    </Dialog.Title>

                    <div className="mt-6">
                      {step === "recipient" && (
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="recipientId"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Recipient ID or Phone Number
                            </label>
                            <input
                              type="text"
                              id="recipientId"
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                              value={transferData.recipientId}
                              onChange={(e) =>
                                setTransferData({
                                  ...transferData,
                                  recipientId: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="recipientName"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Recipient Name
                            </label>
                            <input
                              type="text"
                              id="recipientName"
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                              value={transferData.recipientName}
                              onChange={(e) =>
                                setTransferData({
                                  ...transferData,
                                  recipientName: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      )}

                      {step === "amount" && (
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="amount"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Amount
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">
                                  $
                                </span>
                              </div>
                              <input
                                type="number"
                                id="amount"
                                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 pl-7 pr-12 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="0.00"
                                value={transferData.amount}
                                onChange={(e) =>
                                  setTransferData({
                                    ...transferData,
                                    amount: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="note"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Note (Optional)
                            </label>
                            <textarea
                              id="note"
                              rows={3}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                              value={transferData.note}
                              onChange={(e) =>
                                setTransferData({
                                  ...transferData,
                                  note: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      )}

                      {step === "confirm" && (
                        <div className="space-y-4">
                          <div className="rounded-md bg-gray-50 dark:bg-gray-700 p-4">
                            <dl className="space-y-3">
                              <div className="flex justify-between">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Recipient
                                </dt>
                                <dd className="text-sm text-gray-900 dark:text-white">
                                  {transferData.recipientName}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Amount
                                </dt>
                                <dd className="text-sm text-gray-900 dark:text-white">
                                  ${transferData.amount}
                                </dd>
                              </div>
                              {transferData.note && (
                                <div className="flex justify-between">
                                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Note
                                  </dt>
                                  <dd className="text-sm text-gray-900 dark:text-white">
                                    {transferData.note}
                                  </dd>
                                </div>
                              )}
                            </dl>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 sm:mt-6 sm:flex sm:flex-row-reverse gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
                    onClick={handleNext}
                  >
                    {step === "confirm" ? "Confirm Transfer" : "Next"}
                  </button>
                  {step !== "recipient" && (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
