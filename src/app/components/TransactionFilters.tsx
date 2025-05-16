interface TransactionFiltersProps {
  dateFrom: string;
  dateTo: string;
  selectedCategory: string;
  categories: string[];
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onCategoryChange: (category: string) => void;
}

const styles = {
  formLabel: {
    fontSize: "0.875rem",
    fontWeight: 500,
    marginBottom: "0.5rem",
    display: "block",
    color: "var(--foreground)",
  },
  formInput: {
    width: "100%",
    borderRadius: "0.375rem",
    borderWidth: "1px",
    borderColor: "var(--border)",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    marginTop: "0.25rem",
    outline: "none",
  },
  filterContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    gap: "1rem",
    marginTop: "1.5rem",
  },
};

export default function TransactionFilters({
  dateFrom,
  dateTo,
  selectedCategory,
  categories,
  onDateFromChange,
  onDateToChange,
  onCategoryChange,
}: TransactionFiltersProps) {
  return (
    <div style={styles.filterContainer} className="sm:grid-cols-3">
      <div>
        <label htmlFor="date-from" style={styles.formLabel}>
          Date From
        </label>
        <input
          type="date"
          id="date-from"
          name="date-from"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          style={styles.formInput}
          className="focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label htmlFor="date-to" style={styles.formLabel}>
          Date To
        </label>
        <input
          type="date"
          id="date-to"
          name="date-to"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          style={styles.formInput}
          className="focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label htmlFor="category" style={styles.formLabel}>
          Category
        </label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={styles.formInput}
          className="focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
