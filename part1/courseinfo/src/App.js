import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Content = (props) => (
   props.content.map(content =>(
    <p>
      {content.part} {content.exercise}
    </p>
    )
  )
);

const Total = (props) => {
  const totalExercise = props.content.reduce((accumulator, content) => accumulator + content.exercise, 0)
  return (
    <p>
      Number of exercises {totalExercise}
    </p>
  )
};


const App = () => {
  const course = 'Half Stack application development'
  const contents = [
    {
      part: 'Fundamentals of React',
      exercise: 10
    },
    {
      part: 'Using props to pass data',
      exercise: 7
    },
    {
      part: 'State of a component',
      exercise: 14
    },
  ]

  return (
    <>
      <Header course={course} />
      <Content content={contents} />
      <Total content={contents} />
    </>
  )
}

export default App