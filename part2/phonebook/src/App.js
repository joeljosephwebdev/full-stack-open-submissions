import React, { useState } from 'react'
import ContactList from './components/ContactList'
import NewContactForm from './components/NewContactForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    setSearchString(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      return alert(`${newName} is already in the phonebook`)
    }

    if (persons.some(person => person.number === newNumber)) {
      return alert(`${newNumber} is already in the phonebook`)
    }

    const phoneBookObject = persons.concat({ name: newName, number: newNumber })
    setPersons(phoneBookObject)
    setNewName('')
    setNewNumber('')
  }

  const contactsToShow = searchString ?
    persons.filter(person => person.name.toLowerCase().includes(searchString.toLocaleLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchString={searchString} handleSearch={handleSearch} />
      <h3>Add a new contact</h3>
      <NewContactForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <ContactList contactsToShow={contactsToShow} />
    </div>
  )
}

export default App