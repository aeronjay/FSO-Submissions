import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback btn1={() => setGood(good + 1)} btn2={() => setNeutral(neutral + 1)} btn3={() => setBad(bad + 1) } />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
const Feedback = (props) => {

  return (
    <>
      <h1>Give Feedback</h1>
      <Button name={"good"} onClick={props.btn1} />
      <Button name={"neutral"} onClick={props.btn2} />
      <Button name={"bad"} onClick={props.btn3} />
    </>
  )
}
const Statistics = ({good, neutral, bad}) => {

  return (
    <>
    <h1>Statistics</h1>
    <p>good {good} </p>
    <p>neutral {neutral} </p>
    <p>bad {bad} </p>
    </>
  )
}
const Button = ({name, onClick}) => <button onClick={onClick}>{name} </button>

export default App