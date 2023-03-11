import React from 'react';
import { useState } from 'react'


const Header = ({label}) => <h1>{label}</h1>;

const Text = ({label, total}) => <p>{label} {total}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Header label="give feedback"/>
      <button  onClick={() => setGood(good + 1)}>good</button>
      <button  onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button  onClick={() => setBad(bad + 1)}>bad</button>
      <Header label="statistics"/>
      <Text label="good" total={good}/>
      <Text label="neutral" total={neutral}/>
      <Text label="bad" total={bad}/>

    </>
  )
}

export default App;