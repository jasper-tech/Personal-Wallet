import { FunnelIcon } from "@heroicons/react/24/outline";

interface TransactionFiltersProps {
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
  dateFrom: string;
  dateTo: string;
  selectedCategory: string;
}

export default function TransactionFilters({
  onDateFromChange,
  onDateToChange,
  onCategoryChange,
  categories,
  dateFrom,
  dateTo,
  selectedCategory,
}: TransactionFiltersProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filters:
          </span>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label
              htmlFor="dateFrom"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              From:
            </label>
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
              className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="dateTo"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              To:
            </label>
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
              className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="category"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Category:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-blue-500 focus:border-blue-500"
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
      </div>
    </div>
  );
}
