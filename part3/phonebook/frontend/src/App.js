import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({notification}) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
} 

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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

    const duplicate = persons.filter(person => person.name === newName)

    if (duplicate.length === 0) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Added ${returnedPerson.name}`, 'notification')
        })
        .catch(error => {
          showNotification(error.response.data.error, 'warning')
          console.log(error.response.data.error)
        })

    } else {
      personObject.id = duplicate[0].id
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
          showNotification(`Deleted ${person.name}'s entry from phonebook`, 'notification')
        })
    }
  }

  const updatePerson = (person) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(person.id, person)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          showNotification(`Updated ${returnedPerson.name}'s number`, 'notification')
        })
        .catch(error => {
          // console.log(error.response.data.error)
          // setPersons(persons.filter(p => p.name !== person.name))
          // showNotification(`Information of ${person.name} has already been removed from the server`, 'warning')
          showNotification(error.response.data.error, 'warning')
        })
    }
  }

  const showNotification = (message, type) => {

    setNotification({
      message: message,
      type: type
    })

    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook_123</h2>
      <Notification notification={notification} />
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
