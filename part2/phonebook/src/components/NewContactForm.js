import React from 'react'

const NewContactForm = ({ handleSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input onChange={handleNameChange} value={newName} placeholder="enter a name" required />
            </div>
            <div>
                number: <input onChange={handleNumberChange} value={newNumber} placeholder="enter a number" required />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default NewContactForm