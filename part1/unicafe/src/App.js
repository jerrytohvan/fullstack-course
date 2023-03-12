import React from 'react';
import { useState } from 'react'


const Header = ({label}) => <h1>{label}</h1>;

const Text = ({label, total, suffix = undefined}) => <p>{label} {total} {suffix ?? ""}</p>

const getTotal = (good, neutral, bad) => good + neutral + bad;

const getAverage = (totalPoints, total) => totalPoints ? totalPoints / total : 0;

const getPositiveRate = (totalPositive, total) => totalPositive ? totalPositive / total * 100 : 0;

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
      <Text label="all" total={getTotal(good, neutral, bad)}/>
      <Text label="average" total={getAverage(good - bad, getTotal(good, neutral, bad))}/>
      <Text label="positive" total={getPositiveRate(good, getTotal(good, neutral, bad))} suffix={"%"}/>
    </>
  )
}

export default App;