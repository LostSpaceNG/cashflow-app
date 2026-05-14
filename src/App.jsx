import { useState } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([])

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction])
  }

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <div className="app">
      <header>
        <h1>Cashflow App</h1>
        <p>Deine Finanzen im Überblick</p>
      </header>

      <main>
        <TransactionForm onAddTransaction={addTransaction} />
        <TransactionList 
          transactions={transactions}
          onDeleteTransaction={deleteTransaction}
        />
      </main>
    </div>
  )
}

export default App