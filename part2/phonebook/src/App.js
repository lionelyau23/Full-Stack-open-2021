import React, {useState} from 'react'

const Entry = ({person}) => (
  <div>
    {person.name} {person.number}
  </div>
)

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

  console.log(filtered)

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
        <div>
          filter shown with <input value={filter} onChange={updateFilter}/>
        </div>
      <h3>add a new</h3>
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
      <h3>Numbers</h3>
        {filtered.map(person => 
          <Entry key={person.id} person={person} />
        )}
    </div>
  )
}

export default App;
