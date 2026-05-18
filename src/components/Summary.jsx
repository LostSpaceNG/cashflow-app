function Summary({ transactions }) {
    const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
    
    const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

    const balance = totalIncome - totalExpense

    return (
        <div className="summary">
            <div className="summary-item">
                <span className="summary-label">Einnahmen</span>
                <span className="summary-value income">+{totalIncome.toFixed(2)} €</span>
            </div>
            <div className="summary-item">
                <span className="summary-label">Ausgaben</span>
                <span className="summary-value expense">-{totalExpense.toFixed(2)} €</span>
            </div>
            <div className="summary-item balance-item">
                <span className="summary-label">Saldo</span>
                <span className={`summary-value ${balance >= 0 ? 'income' : 'expense'}`}>
                    {balance.toFixed(2)} €
                </span>
            </div>
        </div>
    )
}

export default Summary