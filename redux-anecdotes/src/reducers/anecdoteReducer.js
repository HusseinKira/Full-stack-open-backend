import { createSlice } from '@reduxjs/toolkit'
const anecdotesAtStart = [
  {content:'If it hurts, do it more often', votes:0},
  {content:'Adding manpower to a late software project makes it later!',votes:0},
  {content:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',votes:0},
  {content:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',votes:0},
  {content:'Premature optimization is the root of all evil.',votes:0},
  {content:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',votes:0}
]




const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: getId(),
    votes: anecdote.votes
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesslice= createSlice({
name:'anecdotes',
initialState,
reducers: {

  createanecdotes(state,action){
    
   const newanecdotes = {
   content: action.payload,
   votes:0,
   id:getId()
   }
    state.push(newanecdotes)

  },

  vote(state,action){
    const id=action.payload
    const {content,votes}= state.find(anecdote=>anecdote.id===id)
    const voted_anecdote={content:content,id:id, votes:votes+1}
    return state.map(anecdote=>anecdote.id===id?voted_anecdote:anecdote).sort((a,b)=>b.votes-a.votes)
  }


}

})






export const {createanecdotes, vote}= anecdotesslice.actions
export default anecdotesslice.reducer