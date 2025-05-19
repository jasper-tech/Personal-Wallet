export interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending";
}

export interface StatItem {
  id: number;
  name: string;
  amount: string;
  change: string;
  changeType: "increase" | "decrease";
}

export const transactions: Transaction[] = [
  {
    id: 1,
    date: "2025-05-16",
    description: "Grocery Shopping",
    category: "Food",
    amount: -120.5,
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-05-15",
    description: "Salary Deposit",
    category: "Others",
    amount: 3000.0,
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-05-14",
    description: "Netflix Subscription",
    category: "Others",
    amount: -15.99,
    status: "Completed",
  },
  {
    id: 4,
    date: "2025-05-14",
    description: "Freelance Payment",
    category: "Others",
    amount: 850.0,
    status: "Completed",
  },
  {
    id: 5,
    date: "2025-05-13",
    description: "Gas Station",
    category: "Others",
    amount: -45.0,
    status: "Completed",
  },
  {
    id: 6,
    date: "2025-05-13",
    description: "Restaurant Dinner",
    category: "Food",
    amount: -89.99,
    status: "Completed",
  },
  {
    id: 7,
    date: "2025-05-12",
    description: "Electricity Bill",
    category: "Utility and Bills",
    amount: -125.0,
    status: "Pending",
  },
  {
    id: 8,
    date: "2025-05-12",
    description: "Investment Return",
    category: "Others",
    amount: 235.5,
    status: "Completed",
  },
  {
    id: 9,
    date: "2025-05-11",
    description: "Gym Membership",
    category: "Others",
    amount: -50.0,
    status: "Completed",
  },
  {
    id: 10,
    date: "2025-05-11",
    description: "Online Shopping",
    category: "Others",
    amount: -175.25,
    status: "Pending",
  },
  {
    id: 11,
    date: "2025-05-10",
    description: "Dividend Payment",
    category: "Others",
    amount: 89.5,
    status: "Completed",
  },
  {
    id: 12,
    date: "2025-05-10",
    description: "Mobile Phone Bill",
    category: "Utility and Bills",
    amount: -65.0,
    status: "Completed",
  },
  {
    id: 13,
    date: "2025-05-09",
    description: "Rental Income",
    category: "Others",
    amount: 1200.0,
    status: "Completed",
  },
  {
    id: 14,
    date: "2025-05-09",
    description: "Coffee Shop",
    category: "Food",
    amount: -12.5,
    status: "Completed",
  },
  {
    id: 15,
    date: "2025-05-08",
    description: "Internet Bill",
    category: "Utility and Bills",
    amount: -79.99,
    status: "Pending",
  },
];

export const stats: StatItem[] = [
  {
    id: 1,
    name: "Total Balance",
    amount: "₵24,500.00",
    change: "+2.1%",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Monthly Income",
    amount: "₵4,200.00",
    change: "+4.3%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Monthly Expenses",
    amount: "₵3,100.00",
    change: "+1.2%",
    changeType: "increase",
  },
];

export const spendingData = [
  { category: "Food", amount: 223 },
  { category: "Utility and Bills", amount: 270 },
  { category: "Others", amount: 286 },
];

export const monthlyData = [
  { month: "Jan", income: 4000, expenses: 3000 },
  { month: "Feb", income: 4200, expenses: 3100 },
  { month: "Mar", income: 4100, expenses: 2900 },
  { month: "Apr", income: 4300, expenses: 3200 },
];

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
