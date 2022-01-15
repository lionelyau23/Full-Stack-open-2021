import React, { useState } from "react";

const App = (props) => {
    const [ counter, setCounter ] = useState(0)

    setTimeout(
        () => setCounter(counter + 1),
        1000
    )

    return (
        <div>{counter}</div> 
    )
}

export default App