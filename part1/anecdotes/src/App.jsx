import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const getRandAnecdote = () => Math.floor(Math.random() * anecdotes.length);
  const getNextAnecdote = () => setSelected(getRandAnecdote());
  const voteCurrentAnecdote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);

  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes </p>
      <button onClick={voteCurrentAnecdote}>vote</button>
      <button onClick={getNextAnecdote}>Next Anecdote</button>
      {
        (Math.max(...points) > 0) ? 
        <MostVotes anecdotes={anecdotes} points={points} />:
        <><p>Vote to see which has most votes</p></>
      }
      
      

    </div>
  )
}
const MostVotes = (props) => {
  const anecdotes = props.anecdotes;
  const points = [...props.points];
  


  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[
        points.reduce((maxIndex, element, i, arr) => {
           if((points[i] > points[maxIndex])){
            return i
           }else{
            return maxIndex
           }
          
        }, 0) 
      ]}</p>
      <p>Has {Math.max(...points)} votes </p>

    </>
  )
}
export default App