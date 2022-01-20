import React from "react"

const Persons = ({persons, onClick}) => (
    <div>
        {persons.map(person => (
            <div key={person.id}>{person.name} {person.number} <button onClick={() => onClick(person)}>delete</button></div>
        ))}
    </div>
)

export default Persons