import React from "react"

const Persons = ({persons, deletePerson}) => (
    <div>
        {persons.map(person => (
            <div key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></div>
        ))}
    </div>
)

export default Persons