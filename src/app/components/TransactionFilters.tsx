"use client";

import { useState } from "react";
import { Calendar, Filter, X } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount = [
    dateFrom !== "",
    dateTo !== "",
    selectedCategory !== "",
  ].filter(Boolean).length;

  return (
    <div className=" rounded-lg  p-4 mb-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-indigo-500" />
          <h3 className="font-medium">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-600 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {/* Active filters display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {dateFrom && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
              <span className="mr-1">From: {dateFrom}</span>
              <button
                onClick={() => onDateFromChange("")}
                className="ml-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {dateTo && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
              <span className="mr-1">To: {dateTo}</span>
              <button
                onClick={() => onDateToChange("")}
                className="ml-1 text-indigo-500 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {selectedCategory && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
              <span className="mr-1">Category: {selectedCategory}</span>
              <button
                onClick={() => onCategoryChange("")}
                className="ml-1 text-indigo-500 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Expanded filter controls */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="relative">
            <label
              htmlFor="date-from"
              className="block text-sm font-medium mb-1"
            >
              Date From
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="date-from"
                name="date-from"
                value={dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
                className="pl-10 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="date-to" className="block text-sm font-medium mb-1">
              Date To
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                type="date"
                id="date-to"
                name="date-to"
                value={dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
                className="pl-10 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium  mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
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
      )}

      {/* Quick filter presets */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const today = new Date().toISOString().split("T")[0];
                onDateFromChange(today);
                onDateToChange(today);
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => {
                const today = new Date();
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7);
                onDateFromChange(sevenDaysAgo.toISOString().split("T")[0]);
                onDateToChange(today.toISOString().split("T")[0]);
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
            >
              Last 7 days
            </button>
            <button
              onClick={() => {
                const today = new Date();
                const thirtyDaysAgo = new Date(today);
                thirtyDaysAgo.setDate(today.getDate() - 30);
                onDateFromChange(thirtyDaysAgo.toISOString().split("T")[0]);
                onDateToChange(today.toISOString().split("T")[0]);
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
            >
              Last 30 days
            </button>
            <button
              onClick={() => {
                onDateFromChange("");
                onDateToChange("");
                onCategoryChange("");
              }}
              className="px-3 py-1 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900 dark:hover:bg-rose-800 rounded-md text-sm font-medium text-rose-700 dark:text-rose-300 transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
