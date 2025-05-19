import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Transaction } from "../data/mockData";
import { useMemo } from "react";

// /** @internal */
// interface MonthlyData {
//   month: string;
//   income: number;
//   expenses: number;
// }

// /** @internal */
// interface SpendingData {
//   category: string;
//   amount: number;
// }

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function Charts({ transactions }: ChartsProps) {
  // Process transactions into monthly data
  const monthlyData = useMemo(() => {
    const monthlyMap = new Map<string, { income: number; expenses: number }>();

    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "short",
      });
      const current = monthlyMap.get(month) || { income: 0, expenses: 0 };

      if (transaction.amount >= 0) {
        current.income += transaction.amount;
      } else {
        current.expenses += Math.abs(transaction.amount);
      }

      monthlyMap.set(month, current);
    });

    return Array.from(monthlyMap.entries())
      .map(([month, data]) => ({
        month,
        income: parseFloat(data.income.toFixed(2)),
        expenses: parseFloat(data.expenses.toFixed(2)),
      }))
      .sort((a, b) => {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return months.indexOf(a.month) - months.indexOf(b.month);
      });
  }, [transactions]);

  // Process transactions into spending by category
  const spendingData = useMemo(() => {
    const categoryMap = new Map<string, number>();

    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        const current = categoryMap.get(transaction.category) || 0;
        categoryMap.set(
          transaction.category,
          current + Math.abs(transaction.amount)
        );
      }
    });

    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category,
        amount: parseFloat(amount.toFixed(2)),
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">
          Monthly Income vs Expenses
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--card-foreground)",
                }}
              />
              <Legend />
              <Bar
                dataKey="income"
                fill="var(--blue-accent-500)"
                name="Income"
              />
              <Bar
                dataKey="expenses"
                fill="var(--red-accent-500)"
                name="Expenses"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => entry.category}
              >
                {spendingData.map((entry, index) => (
                  <Cell
                    key={entry.category}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `₵${value.toFixed(2)}`,
                  "Amount",
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
