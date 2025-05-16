import { BanknotesIcon } from "@heroicons/react/24/outline";

export interface StatItem {
  id: number;
  name: string;
  amount: string;
  change: string;
  changeType: "increase" | "decrease";
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="relative overflow-hidden rounded-lg bg-card text-card-foreground shadow ring-1 ring-border/5"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BanknotesIcon
                  className="h-6 w-6 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </dt>
                  <dd>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-foreground">
                        {stat.amount}
                      </p>
                      <p
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === "increase"
                            ? "text-green-accent-600 dark:text-green-accent-400"
                            : "text-red-accent-600 dark:text-red-accent-400"
                        }`}
                      >
                        {stat.change}
                      </p>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
