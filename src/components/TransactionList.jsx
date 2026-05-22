function TransactionList({ transactions, onDeleteTransaction }) {
  if (transactions.length === 0) {
    return (
      <div className="transactions-list">
        <p className="no-transactions">Noch keine Transaktionen vorhanden.</p>
      </div>
    );
  }

  return (
    <div className="transactions-list">
      <h2>Transaktionen</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            <div className="transaction-details">
              <div className="transaction-info">
                <span className="transaction-category">
                  {transaction.category}
                </span>
                <span className="transaction-description">
                  {transaction.description}
                </span>
              </div>

              <span className={`transaction-amount ${transaction.type}`}>
                {transaction.type === "income" ? "+" : "-"}
                {transaction.amount.toFixed(2)} €
              </span>
            </div>
            <button
              onClick={() => onDeleteTransaction(transaction.id)}
              className="delete-btn"
            >
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
