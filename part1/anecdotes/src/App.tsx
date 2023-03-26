
import { Dispatch, useState } from 'react';

type RandomButtonType = {
  arrayLength: number,
  setSelected: Dispatch<React.SetStateAction<number>>
}


type VoteButtonType = {
  anecdotesIndex: number,
  votes: number[],
  setVotes: Dispatch<React.SetStateAction<number[]>>
}

const addNewVotes = (array: number[], index: number) => {
  const newArray = [...array];
  newArray[index] = newArray[index] + 1;
  return newArray;
};

const initArray = (anecdotesLength: number) => new Array(anecdotesLength).fill(0)
const getRandomNumber = (anecdotesLength: number) => Math.floor(Math.random() * anecdotesLength);


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState<number>(0);
  const [votes, setVotes] = useState<number[]>(initArray(anecdotes.length));

  const RandomButton = ({ arrayLength, setSelected }: RandomButtonType) => {
    return <button onClick={() => setSelected(getRandomNumber(arrayLength))}>next anecdote</button>
  }

  const VoteButton = ({ anecdotesIndex, votes, setVotes }: VoteButtonType) => {
    const newArray = addNewVotes(votes, anecdotesIndex);
    return <button onClick={() => setVotes(newArray)}>vote</button>;
  }

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected]} votes.</p>
      <br />
      <VoteButton anecdotesIndex={selected} votes={votes} setVotes={setVotes} />
      <RandomButton arrayLength={anecdotes.length} setSelected={setSelected} />
    </div>
  )
}

export default App;