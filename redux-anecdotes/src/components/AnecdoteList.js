import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setmessage, clearmessage } from '../reducers/NotificationReducer'


const AnecdoteList = ()=>{
const filter= useSelector(state=>state.filter)
const anecdotes = useSelector(state => state.anecdotes.filter(anecdote=>anecdote.content.includes(filter)))

  const dispatch = useDispatch()

  const votes = async(anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setmessage(`you voted '${anecdote.content}'`))
    
    setTimeout(() => {
     dispatch(clearmessage()) 
 }, 5000)
   

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