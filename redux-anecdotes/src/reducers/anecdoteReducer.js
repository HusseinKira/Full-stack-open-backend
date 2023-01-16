import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesslice= createSlice({
name:'anecdotes',
initialState:[],
reducers: {

  createanecdotes(state,action){
    state.push(action.payload)

  },

  vote(state,action){
    const voted_anecdote=action.payload
    const id = voted_anecdote.id
    return state.map(anecdote=>anecdote.id===id?voted_anecdote:anecdote).sort((a,b)=>b.votes-a.votes)
  },
  setAnecdotes(state,action){

  return action.payload

  }


}

})

export const initializeAnecdotes= ()=>{

  return async dispatch =>{

   const anecdotes= await anecdoteService.getAll()
   dispatch(setAnecdotes(anecdotes))
  }

}

export const createNew= (content)=>{

  return async dispatch =>{
    const newelem= await anecdoteService.create(content)
    dispatch(createanecdotes(newelem))

  }

}

export const voteAnecdote= (anecdote)=>{

  return async dispatch =>{
    const num= anecdote.votes
    const votedelem ={...anecdote, votes:num+1 }
    const newelem = await anecdoteService.update(votedelem,anecdote.id)

    dispatch(vote(newelem))
  }

}




export const {createanecdotes, vote,setAnecdotes}= anecdotesslice.actions

export default anecdotesslice.reducer