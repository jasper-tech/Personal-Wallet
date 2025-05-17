// Form Select component
import React from "react";

interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  disabled?: boolean;
}

export const FormSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
  disabled = false,
}: FormSelectProps) => (
  <div>
    <label htmlFor={id} className="block text-base font-semibold mb-1">
      {label}
    </label>
    <select
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-3 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
