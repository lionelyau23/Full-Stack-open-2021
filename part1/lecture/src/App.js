import React, { useState } from "react";

const Display = (props) => {
    return (
        <div>{props.counter}</div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

const App = (props) => {
    const [ counter, setCounter ] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <>
            <Display counter={counter} /> 
            <Button
                onClick={increaseByOne}
                text='plus'
            />
            <Button
                onClick={setToZero}
                text='zero'
            />
            <Button
                onClick={decreaseByOne}
                text='minus' 
            />
        </>
    )
}

export default App