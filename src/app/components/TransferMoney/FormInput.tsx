import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
}

export const FormInput = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}: FormInputProps) => (
  <div>
    <label htmlFor={id} className="block text-sm  mb-1">
      {label}
    </label>
    <input
      type={type}
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-3 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 placeholder-opacity-70 disabled:opacity-70 disabled:cursor-not-allowed"
      placeholder={placeholder}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
