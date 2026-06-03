import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts/umd/Recharts";

function Charts({ transactions }) {
  // Calculate expense breakdown by category
  const expenseData = transactions
    .filter((tr) => tr.type === "expense")
    .reduce((accumExp, tr) => {
      const existing = accumExp.find((item) => item.category === tr.category);

      if (existing) {
        existing.value += tr.amount;
      } else {
        accumExp.push({
          category: tr.category,
          value: tr.amount,
        });
      }

      return accumExp;
    }, []);

  // Calculate income breakdown by category
  const incomeData = transactions
    .filter((tr) => tr.type === "income")
    .reduce((accumInc, tr) => {
      const existing = accumInc.find((item) => item.category === tr.category);

      if (existing) {
        existing.value += tr.amount;
      } else {
        accumInc.push({ category: tr.category, value: tr.amount });
      }

      return accumInc;
    }, []);

  // Income vs Expense
  const totalInc = incomeData.reduce((sum, item) => sum + item.value, 0);
  const totalExp = expenseData.reduce((sum, item) => sum + item.value, 0);
  const balance = totalInc - totalExp;
  const balanceCol = balance >= 0 ? "#10b981" : "#ef4444";

  const comparisonData = [
    { name: "Einnahmen", value: totalInc, color: "#10b981" },
    { name: "Ausgaben", value: totalExp, color: "#ef4444" },
    { name: "Saldo", value: balance, color: balanceCol },
  ];

  // Colors for pie chart
  const EXPENSE_COLORS = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
  ];

  const INCOME_COLORS = ["#10b981", "#22c55e", "#84cc16"];

  if (transactions.length === 0) {
    return (
      <div className="charts">
        <p className="no-data">
          Keine Daten zum Anzeigen. Füge Transaktionen hinzu!
        </p>
      </div>
    );
  }

  return (
    <div className="charts">
      <div className="charts-grid">
        {/* Expense Pie Chart */}
        {expenseData.length > 0 && (
          <div className="chart-item">
            <h3>Ausgaben nach Kategorie</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {expenseData.map((item, index) => (
                    <Cell
                      key={item.category}
                      fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Income Pie Chart */}
        {incomeData.length > 0 && (
          <div className="chart-item">
            <h3>Einnahmen nach Kategorie</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={incomeData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {incomeData.map((item, index) => (
                    <Cell
                      key={item.category}
                      fill={INCOME_COLORS[index % INCOME_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Comparison Bar Chart */}
        <div className="chart-item-full">
          <h3>Einnahmen vs. Ausgaben</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={comparisonData}>
              <CartesianGrid stroke="#646464" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#cacaca" />
              <YAxis niceTicks="snap125" stroke="#cacaca" />
              <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
              <Bar dataKey="value" name="Wert" fill="#8884d8">
                {comparisonData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Charts;
