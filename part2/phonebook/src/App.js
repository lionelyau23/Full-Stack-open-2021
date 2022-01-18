import React, {useState} from 'react'

const Entry = ({person}) => (
  <div>
    {person.name}
  </div>
)

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace'}
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({
      name: newName
    }))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
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
