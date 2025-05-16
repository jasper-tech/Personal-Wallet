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
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <label
          htmlFor="dateFrom"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date From
        </label>
        <input
          type="date"
          id="dateFrom"
          name="dateFrom"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="dateTo"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date To
        </label>
        <input
          type="date"
          id="dateTo"
          name="dateTo"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
