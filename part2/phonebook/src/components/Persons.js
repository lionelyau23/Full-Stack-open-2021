import React from "react"

const Entry = ({person}) => (
    <div>
        {person.name} {person.number}
    </div>
)  

const Persons = ({persons}) => (
    <div>
        {persons.map(person => 
          <Entry key={person.id} person={person} />
        )}
    </div>
)

export default Persons