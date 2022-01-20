import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(personList => setPersons(personList))
  }, [])

  const filtered = (filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1
    }

    if (!persons.some(person => person.name === newName)) {
      personService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))

    } else {
      alert(`${newName} is already added to the phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)}/>
      <h3>add a new</h3>
      <PersonForm submit={addPerson} 
        nameValue={newName} nameOnChange={(event) => setNewName(event.target.value)}
        numValue={newNumber} numOnChange={(event) => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={filtered}/>
    </div>
  )
}

export default App;
