import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState({ points: 0, value: 0 })
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const newPoints = avg.points + 1
    const newAll = all + 1
    setGood(good + 1)
    setAll(newAll)
    setAvg({ ...avg, points: newPoints, value: newPoints / newAll })
    setPositive((good + 1) * 100 / newAll)
  }
  const handleNeutralClick = () => {
    const newAll = all + 1
    setNeutral(neutral + 1)
    setAll(newAll)
    setAvg({ ...avg, value: avg.points / newAll })
    setPositive(good * 100 / newAll)
  }
  const handleBadClick = () => {
    const newPoints = avg.points - 1
    const newAll = all + 1
    setBad(bad + 1)
    setAll(newAll)
    setAvg({ ...avg, points: newPoints, value: newPoints / newAll })
    setPositive(good * 100 / newAll)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={avg.value}
        positive={positive}
      />
    </div>
  )
}

export default App

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad, all, avg, positive }) => {
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <tr>
          <Statistic text="good" value={good} symbol="" />
        </tr>
        <tr>
          <Statistic text="neutral" value={neutral} symbol="" />
        </tr>
        <tr>
          <Statistic text="bad" value={bad} symbol="" />
        </tr>
        <tr>
          <Statistic text="all" value={all} symbol="" />
        </tr>
        <tr>
          <Statistic text="avg" value={avg} symbol="" />
        </tr>
        <tr>
          <Statistic text="positive" value={positive} symbol="%" />
        </tr>
      </tbody>
    </table>
  )
}

const Statistic = ({ text, value, symbol }) => {
  return (
    <>
      <td>
        {text}
      </td>
      <td>
        {value} {symbol}
      </td>
    </>
  )
}

