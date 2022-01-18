import React from "react"

const Header = ({text}) => (
  <h1>
    {text}
  </h1>
)


const Content = ({parts}) => (
  <div>
    {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
    )}
  </div>
)

const Part = ({name, exercises}) => (
  <div>
    {name} {exercises}
  </div>
)


const Total = ({course}) => {
  return (
    <div>
      total of {course.parts.reduce((prev, curr) => prev + curr.exercises, 0)} exercises
    </div>
  )
}

const Course = ({course}) => (
  <div>
    <Header key={course.id} text={course.name} />
    <Content parts={course.parts}/>
    <Total course={course}/>
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
