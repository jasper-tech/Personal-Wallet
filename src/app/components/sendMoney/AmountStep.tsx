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
    <h2 className="text-lg font-bold">How much would you like to send?</h2>

    <div className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-base font-bold mb-1">
          Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-base">₵</span>
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm text-base py-3 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300"
            placeholder="0.00"
            min="0.01"
            step="0.01"
          />
        </div>
      </div>

      <div>
        <label htmlFor="note" className="block text-base font-medium  mb-1">
          Reference (optional)
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-base py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300"
          placeholder="Add a reference message for this transaction"
        />
      </div>
    </div>
  </div>
);
