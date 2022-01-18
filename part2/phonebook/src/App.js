import React, {useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filtered = (filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

  // console.log(filtered)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat(personObject))
    } else {
      alert(`${newName} is already added to the phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const updateFilter = (event) => {
    let f = event.target.value
    setFilter(f.toLowerCase())
    // console.log(f)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={updateFilter}/>
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
