import React from 'react';
import { useState } from 'react'


const Header = ({ label }) => <h1>{label}</h1>;

const StatisticLine  = ({ value, total, suffix = undefined }) => <td>{value} {total} {suffix ?? ""}</td>

const getTotal = (good, neutral, bad) => good + neutral + bad;

const getAverage = (totalPoints, total) => totalPoints ? totalPoints / total : 0;

const getPositiveRate = (totalPositive, total) => totalPositive ? totalPositive / total * 100 : 0;

const Statistics = ({ good, neutral, bad, getTotal, getAverage, getPositiveRate }) => {
  return (
    <>
      <Header label="statistics" />
      <table>
        <tbody>
      {
        getTotal(good, neutral, bad) > 0 ?
          <>
           
                <tr>         
                  <StatisticLine  value="good" total={good} />
                </tr>
                <tr>
                  <StatisticLine  value="neutral" total={neutral} />
                </tr>
                <tr>
                  <StatisticLine  value="bad" total={bad} />
                </tr>
                <tr>
                  <StatisticLine  value="all" total={getTotal(good, neutral, bad)} />
                </tr>
                <tr>
                  <StatisticLine  value="average" total={getAverage(good - bad, getTotal(good, neutral, bad))} />
                </tr>
                <tr>
                  <StatisticLine  value="positive" total={getPositiveRate(good, getTotal(good, neutral, bad))} suffix={"%"} />
                </tr>
              
          </>
          : 
                <><tr> 
                  <StatisticLine  value="No feedback given" />
                </tr></>
      }
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Header label="give feedback" />
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral} getTotal={getTotal} getAverage={getAverage} getPositiveRate={getPositiveRate} />
    </>
  )
}

export default App;