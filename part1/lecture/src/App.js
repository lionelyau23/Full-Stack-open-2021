import React from "react";

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
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