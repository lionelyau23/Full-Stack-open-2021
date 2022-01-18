import React, {useState} from 'react'

const Entry = ({person}) => (
  <div>
    {person.name} {person.number}
  </div>
)

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123456'
  },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat(personObject))
    } else {
      alert(`${newName} is already added to the phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <Entry key={person.name} person={person} />
        )}
    </div>
  )
}

export default App;
