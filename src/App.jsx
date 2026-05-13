import { useState } from 'react'
import TransactionForm from './components/TransactionForm'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([])

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction])
  }

  return (
    <div className="app">
      <header>
        <h1>Cashflow App</h1>
        <p>Deine Finanzen im Überblick</p>
      </header>

      <main>
        <TransactionForm onAddTransaction={addTransaction} />

        <div className="transactions-preview">
          <p>Transaktionen: {transactions.length}</p>
        </div>
      </main>
    </div>
  )
}

export default App