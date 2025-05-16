import {
  ArrowsRightLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface QuickActionsProps {
  onTransfer: () => void;
  onSend: () => void;
  onRequest: () => void;
  onAnalytics: () => void;
}

const styles = {
  buttonBase: {
    transition: "all 0.2s ease-in-out",
    transform: "scale(1)",
    boxShadow: "var(--shadow-sm)",
  },
  buttonHovered: {
    transform: "scale(1.02)",
    boxShadow: "var(--shadow-md)",
  },
  blueButton: {
    backgroundColor: "var(--blue-accent-800)",
  },
  greenButton: {
    backgroundColor: "var(--green-accent-800)",
  },
  redButton: {
    backgroundColor: "var(--red-accent-800)",
  },
  yellowButton: {
    backgroundColor: "var(--yellow-accent-800)",
  },
  blueButtonHover: {
    backgroundColor: "var(--blue-accent-200)",
  },
  greenButtonHover: {
    backgroundColor: "var(--green-accent-200)",
  },
  redButtonHover: {
    backgroundColor: "var(--red-accent-200)",
  },
  yellowButtonHover: {
    backgroundColor: "var(--yellow-accent-300)",
  },
  blueText: {
    color: "var(--blue-accent-700)",
  },
  greenText: {
    color: "var(--green-accent-700)",
  },
  redText: {
    color: "var(--red-accent-700)",
  },
  yellowText: {
    color: "var(--yellow-accent-700)",
  },
};

export default function QuickActions({
  onTransfer,
  onSend,
  onRequest,
  onAnalytics,
}: QuickActionsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const actions = [
    {
      id: "transfer",
      name: "Transfer",
      description: "Transfer between accounts",
      icon: ArrowsRightLeftIcon,
      onClick: onTransfer,
      baseStyle: { ...styles.buttonBase, ...styles.blueButton },
      hoverStyle: { ...styles.buttonHovered, ...styles.blueButtonHover },
      textStyle: styles.blueText,
      iconColor: "text-blue-500",
    },
    {
      id: "send",
      name: "Send",
      description: "Send money to someone",
      icon: ArrowUpIcon,
      onClick: onSend,
      baseStyle: { ...styles.buttonBase, ...styles.greenButton },
      hoverStyle: { ...styles.buttonHovered, ...styles.greenButtonHover },
      textStyle: styles.greenText,
      iconColor: "text-green-500",
    },
    {
      id: "request",
      name: "Request",
      description: "Request money from someone",
      icon: ArrowDownIcon,
      onClick: onRequest,
      baseStyle: { ...styles.buttonBase, ...styles.redButton },
      hoverStyle: { ...styles.buttonHovered, ...styles.redButtonHover },
      textStyle: styles.redText,
      iconColor: "text-red-500",
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "View detailed analytics",
      icon: ChartBarIcon,
      onClick: onAnalytics,
      baseStyle: { ...styles.buttonBase, ...styles.yellowButton },
      hoverStyle: { ...styles.buttonHovered, ...styles.yellowButtonHover },
      textStyle: styles.yellowText,
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          onMouseEnter={() => setHoveredId(action.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={`relative flex items-center space-x-3 rounded-lg px-6 py-5 focus:outline-none`}
          style={
            hoveredId === action.id
              ? { ...action.baseStyle, ...action.hoverStyle }
              : action.baseStyle
          }
        >
          <div className={`flex-shrink-0 ${action.iconColor}`}>
            <action.icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium" style={action.textStyle}>
              {action.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {action.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
