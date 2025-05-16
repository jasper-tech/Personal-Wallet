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

const styles = {
  statAmount: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "var(--blue-accent-500)",
  },
  statName: {
    fontSize: "1.5rem",
    fontWeight: 700,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  statChange: {
    marginLeft: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    display: "flex",
    alignItems: "baseline",
  },
  increase: {
    color: "var(--green-accent-500)",
  },
  decrease: {
    color: "var(--red-accent-500)",
  },
};

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
                  <dt style={styles.statName}>{stat.name}</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <p style={styles.statAmount}>{stat.amount}</p>
                      <p
                        style={{
                          ...styles.statChange,
                          ...(stat.changeType === "increase"
                            ? styles.increase
                            : styles.decrease),
                        }}
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
