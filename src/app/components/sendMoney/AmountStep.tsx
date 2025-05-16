interface AmountStepProps {
  amount: string;
  setAmount: (amount: string) => void;
  note: string;
  setNote: (note: string) => void;
}

export const AmountStep = ({
  amount,
  setAmount,
  note,
  setNote,
}: AmountStepProps) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
      How much would you like to send?
    </h2>

    <div className="space-y-4">
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="0.00"
            min="0.01"
            step="0.01"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="note"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Add a note (optional)
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Add a message to the recipient"
        />
      </div>
    </div>
  </div>
);
