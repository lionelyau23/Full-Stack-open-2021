import React from "react"

const PersonForm = ({submit, nameValue, nameOnChange, numValue, numOnChange}) => (
    <form onSubmit={submit}>
        <div>
            name: <input value={nameValue} onChange={nameOnChange}/>
        </div>
        <div>
            number: <input value={numValue} onChange={numOnChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm