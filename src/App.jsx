import { useState } from 'react'
import TransactionForm from './components/TransactionForm'
import Summary from './components/Summary'
import TransactionList from './components/TransactionList'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions')
    return saved ? JSON.parse(saved) : []
  })

  const addTransaction = (transaction) => {
    const newTransactions = [...transactions, transaction]
    setTransactions(newTransactions)
    localStorage.setItem('transactions', JSON.stringify(newTransactions))
  }

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter(t => t.id !== id)
    setTransactions(newTransactions)
    localStorage.setItem('transactions', JSON.stringify(newTransactions))
  }

  return (
    <div className="app">
      <header>
        <h1>Cashflow App</h1>
        <p>Deine Finanzen im Überblick</p>
      </header>

      <main>
        <TransactionForm onAddTransaction={addTransaction} />
        <Summary transactions={transactions} />
        <TransactionList 
          transactions={transactions}
          onDeleteTransaction={deleteTransaction}
        />
      </main>
    </div>
  )
}

export default App