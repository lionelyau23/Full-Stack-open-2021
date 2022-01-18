import React from "react"

const Header = ({text}) => {
  return (
    <h1>
      {text}
    </h1>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = (prop) => {
  return (
    <p>
      Number of exercises {prop.parts[0].exercises + prop.parts[1].exercises + prop.parts[2].exercises}
    </p>
  )
}

const Course = ({course}) => (
  <div>
    <Header key={course.id} text={course.name} />
    <Content parts={course.parts}/>
  </div>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      }
  
    ]

  } 

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
