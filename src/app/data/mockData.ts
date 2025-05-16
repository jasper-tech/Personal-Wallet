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
    category: "Income",
    amount: 3000.0,
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-05-14",
    description: "Utility Bill",
    category: "Bills",
    amount: -85.0,
    status: "Completed",
  },
  {
    id: 4,
    date: "2025-05-14",
    description: "Online Transfer",
    category: "Transfer",
    amount: -500.0,
    status: "Pending",
  },
];

export const stats: StatItem[] = [
  {
    id: 1,
    name: "Total Balance",
    amount: "$24,500.00",
    change: "+2.1%",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Monthly Income",
    amount: "$4,200.00",
    change: "+4.3%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Monthly Expenses",
    amount: "$3,100.00",
    change: "+1.2%",
    changeType: "increase",
  },
];

export const spendingData = [
  { category: "Groceries", amount: 850 },
  { category: "Utilities", amount: 400 },
  { category: "Entertainment", amount: 300 },
  { category: "Transport", amount: 250 },
  { category: "Shopping", amount: 600 },
];

export const monthlyData = [
  { month: "Jan", income: 4000, expenses: 3000 },
  { month: "Feb", income: 4200, expenses: 3100 },
  { month: "Mar", income: 4100, expenses: 2900 },
  { month: "Apr", income: 4300, expenses: 3200 },
];

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
