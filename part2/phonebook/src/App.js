import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({message}) => {
  if (message == null) {
    return null
  }

  const notiStyle = {  
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notiStyle}>
      {message}
    </div>
  )
} 

const Warning = ({message}) => {
  if (message == null) {
    return null
  }

  const notiStyle = {  
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notiStyle}>
      {message}
    </div>
  )
} 


function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [warning, setWarning] = useState(null)

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

    if (!persons.some(person => {
      if (person.name === newName) {
        personObject.id = person.id
        return true
      } else {
        return false
      }
    })) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
  
        })

    } else {
      updatePerson(personObject)
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteEntry(person.id)
        .then(() => {
          setPersons(persons.filter(i => i.id !== person.id))
        })
    }
  }

  const updatePerson = (person) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(person.id, person)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNotification(`Updated ${returnedPerson.name}'s number`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(() => {
          setWarning(`Information of ${person.name} has already been removed from the server`)
          setTimeout(() => {
            setWarning(null)
          }, 3000)
          setPersons(persons.filter(p => p.name !== person.name))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Warning message={warning} />
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)}/>
      <h3>add a new</h3>
      <PersonForm submit={addPerson} 
        nameValue={newName} nameOnChange={(event) => setNewName(event.target.value)}
        numValue={newNumber} numOnChange={(event) => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={filtered} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
