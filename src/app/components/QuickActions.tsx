import {
  ArrowsRightLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

interface QuickActionsProps {
  onTransfer: () => void;
  onSend: () => void;
  onRequest: () => void;
  onAnalytics: () => void;
}

export default function QuickActions({
  onTransfer,
  onSend,
  onRequest,
  onAnalytics,
}: QuickActionsProps) {
  const actions = [
    {
      name: "Transfer",
      description: "Transfer between accounts",
      icon: ArrowsRightLeftIcon,
      onClick: onTransfer,
      bgColor: "bg-blue-accent-100 dark:bg-blue-accent-900/30",
      textColor: "text-blue-accent-700 dark:text-blue-accent-400",
    },
    {
      name: "Send",
      description: "Send money to someone",
      icon: ArrowUpIcon,
      onClick: onSend,
      bgColor: "bg-green-accent-100 dark:bg-green-accent-900/30",
      textColor: "text-green-accent-700 dark:text-green-accent-400",
    },
    {
      name: "Request",
      description: "Request money from someone",
      icon: ArrowDownIcon,
      onClick: onRequest,
      bgColor: "bg-red-accent-100 dark:bg-red-accent-900/30",
      textColor: "text-red-accent-700 dark:text-red-accent-400",
    },
    {
      name: "Analytics",
      description: "View detailed analytics",
      icon: ChartBarIcon,
      onClick: onAnalytics,
      bgColor: "bg-yellow-accent-100 dark:bg-yellow-accent-900/30",
      textColor: "text-yellow-accent-700 dark:text-yellow-accent-400",
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <button
          key={action.name}
          onClick={action.onClick}
          className={`relative flex items-center space-x-3 rounded-lg px-6 py-5 shadow-sm focus:outline-none ${action.bgColor}`}
        >
          <div className={`flex-shrink-0 ${action.textColor}`}>
            <action.icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className={`text-sm font-medium ${action.textColor}`}>
              {action.name}
            </p>
            <p className={`text-sm ${action.textColor}`}>
              {action.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
