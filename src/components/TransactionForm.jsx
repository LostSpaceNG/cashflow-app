import { useState } from 'react'

function TransactionForm({ onAddTransaction }) {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('expense')

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount || !description) {
            alert('Bitte fülle alle Felder aus!')
            return
        }

        const transaction = {
            id: Date.now(),
            amount: parseFloat(amount),
            description,
            type,
            date: new Date().toISOString()
        }

        onAddTransaction(transaction)

        // Reset form
        setAmount('')
        setDescription('')
        setType('expense')
    }

    return (
        <form className="transaction-form" onSubmit={handleSubmit}>
            <h2>Neue Transaktion</h2>

            <div className="form-group">
                <label>Typ:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="expense">Ausgabe</option>
                    <option value="income">Einnahme</option>
                </select>
            </div>

            <div className="form-group">
                <label>Betrag:</label>
                <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="z.B. 50"
                    step="0.01"
                />
            </div>

            <div className="form-group">
                <label>Beschreibung:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="z.B. Einkaufen"
                />
            </div>

            <button type="submit">Hinzufügen</button>
        </form>
    )
}

export default TransactionForm