import { useState } from 'react'
import ReactDOM from 'react-dom/client'

const Header=({name})=><h2>{name}</h2>

const Anecdote = ({text, votesCount}) =>
  <div>
    <p>{text}</p>
    <p>has {votesCount} votes</p>
  </div>

const Winner = ({anecdotes,allVotes})=>{
  const highestVoteCount = Math.max(...allVotes)
  const winnderIndex = allVotes.indexOf(highestVoteCount)
  const winner = anecdotes[winnderIndex]
  if(highestVoteCount===0)return <p>No Votes Yet</p>
  return(
    <div>
      <p>{winner}</p>
      <p>has {highestVoteCount} votes!</p>
    </div>
  )
}

const Button=({onClick,text})=><button onClick={onClick}>{text}</button>

const App = ({anecdotes}) => {
   
  const [selected, setSelected] = useState(0)
  const [allVotes,setAllVotes] = useState(Array(6).fill(0))

  const handleVoteClick=()=>{
    const newAllCotes = [...allVotes]
    newAllCotes[selected]+=1
    setAllVotes(newAllCotes)
  }

  const handleAnecdoteClick=()=>{
    const arrayIndex = Math.floor(Math.random()*anecdotes.length)
    setSelected(arrayIndex)
  }

  return (
    <div>
      <Header name="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />
      <Button onClick={handleVoteClick} text="vote"/>
      <Button onClick={handleAnecdoteClick} text="Next anecdote"/>

      <Header name="Anecdote with most votes" />
      <Winner anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App anecdotes={anecdotes} />)
