interface TransactionFiltersProps {
  dateFrom: string;
  dateTo: string;
  selectedCategory: string;
  categories: string[];
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function TransactionFilters({
  dateFrom,
  dateTo,
  selectedCategory,
  categories,
  onDateFromChange,
  onDateToChange,
  onCategoryChange,
}: TransactionFiltersProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <label
          htmlFor="date-from"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date From
        </label>
        <input
          type="date"
          id="date-from"
          name="date-from"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="date-to"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date To
        </label>
        <input
          type="date"
          id="date-to"
          name="date-to"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
