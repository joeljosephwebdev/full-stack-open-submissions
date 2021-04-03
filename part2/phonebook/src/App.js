import React, { useState, useEffect } from 'react'
import contactsService from './services/contacts'

import ContactList from './components/ContactList'
import NewContactForm from './components/NewContactForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    contactsService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    setSearchString(e.target.value)
  }

  const resetNotification = () => {
    setMessage(null)
    setNotificationType('')
  }

  const createNotification = ({ content, type }) => {
    setMessage(content)
    setNotificationType(type)
    setTimeout(() => {
      resetNotification()
    }, 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (persons.some(person => person.number === newNumber)) {
      return alert(`${newNumber} is already in the phonebook`)
    }

    const newContact = { name: newName, number: newNumber }

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)) {
        const id = persons.find(person => person.name === newName).id
        contactsService
          .update(id, newContact)
          .then(returnedContact => {
            setPersons(persons.map(contact => contact.name !== newContact.name ? contact : returnedContact))
            setNewName('')
            setNewNumber('')
            createNotification({
              content: `Changed ${returnedContact.name}'s number`,
              type: 'success'
            })
          }).catch(error => {
            createNotification({
              content: `${newName} has already been removed from the server`,
              type: 'error'
            })
            setPersons(persons.filter(person => person.id !== id))
            setNewName('')
            setNewNumber('')
          })
        return
      }
    }

    contactsService
      .create(newContact)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
        createNotification({
          content: `Added ${returnedContact.name} to the phonebook`,
          type: 'success'
        })
      })
  }

  const handleDelete = (name, id) => {
    if (window.confirm(`are you sure you want to delete ${name}`)) {
      contactsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        }).catch(error => {
          createNotification({
            content: `${name} has already been removed from the server`,
            type: 'error'
          })
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const contactsToShow = searchString ?
    persons.filter(person => person.name.toLowerCase().includes(searchString.toLocaleLowerCase()))
    : persons

  return (
    <div>
      <Notification message={message} type={notificationType} handleReset={resetNotification} />
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
      <ContactList contactsToShow={contactsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App