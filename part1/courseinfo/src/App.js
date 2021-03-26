import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundementals of React',
        excercises: 10
      },
      {
        name: 'Using props to pass data',
        excercises: 7
      },
      {
        name: 'State of a component',
        excercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  let content = []
  props.parts.forEach((part, i) => {
    content.push(<Part part={part} key={i} />)
  })

  return (
    <div>
      {content}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of excercises {props.parts[0].excercises + props.parts[1].excercises + props.parts[2].excercises}</p>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.excercises}</p>
  )
}
