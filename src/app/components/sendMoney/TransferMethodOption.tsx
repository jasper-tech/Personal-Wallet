import { ReactNode } from "react";

interface TransferMethodOptionProps {
  method: string;
  title: string;
  description: string;
  icon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export const TransferMethodOption = ({
  title,
  description,
  icon,
  isSelected,
  onClick,
}: TransferMethodOptionProps) => (
  <div
    className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all
      ${
        isSelected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-200 dark:border-gray-700"
      }`}
    onClick={onClick}
  >
    <div className="flex flex-col items-center p-4">
      {icon}
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
        {description}
      </p>
    </div>
  </div>
);
