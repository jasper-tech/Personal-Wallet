import { ReactNode } from "react";

interface ReviewItemProps {
  label: string;
  value: ReactNode;
  valueClassName?: string;
}

export const ReviewItem = ({
  label,
  value,
  valueClassName = "",
}: ReviewItemProps) => (
  <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
    <span className="text-white dark:text-shadow-white ">{label}:</span>
    <span
      className={`font-medium text-gray-900 dark:text-white ${valueClassName}`}
    >
      {value}
    </span>
  </div>
);
