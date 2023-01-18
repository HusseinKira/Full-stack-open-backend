import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {  setNotification } from '../reducers/NotificationReducer'


const AnecdoteList = ()=>{
const filter= useSelector(state=>state.filter)
const anecdotes = useSelector(state => state.anecdotes.filter(anecdote=>anecdote.content.includes(filter)).sort((a,b)=>b.votes-a.votes))
const notifstate =(useSelector(state => state.notification))
  const dispatch = useDispatch()

  const votes = async(anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`,5,notifstate))
    

   

  }

  return(
    <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => votes(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList