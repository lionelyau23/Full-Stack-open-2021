import React from "react";

const Hello = ({name, age}) => {
    const bornYear = new Date().getFullYear() - age
    console.log(bornYear)

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>you were born in {bornYear}</p>
        </div>
    )
}

const App = () => {
    const name = "Peter"
    const age = 10

    return (
        <>
            <p>Greetings</p>
            <Hello name='george' age={26+10}/>
            <Hello name={name} age={age}/>
        </>
    )
}


export default App