import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsRightLeftIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

interface QuickActionsProps {
  onTransfer: () => void;
  onSendMoney: () => void;
  onRequestMoney: () => void;
  onAnalytics: () => void;
}

export default function QuickActions({
  onTransfer,
  onSendMoney,
  onRequestMoney,
  onAnalytics,
}: QuickActionsProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow mb-8">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <button
            onClick={onSendMoney}
            className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <ArrowUpIcon className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Send Money
            </span>
          </button>
          <button
            onClick={onRequestMoney}
            className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <ArrowDownIcon className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Request Money
            </span>
          </button>
          <button
            onClick={onTransfer}
            className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <ArrowsRightLeftIcon className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Transfer
            </span>
          </button>
          <button
            onClick={onAnalytics}
            className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <ChartPieIcon className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Analytics
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
