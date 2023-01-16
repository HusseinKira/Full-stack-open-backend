import { useDispatch } from 'react-redux'
import {createNew}  from '../reducers/anecdoteReducer'
const Anecdotesform =()=>{

 const dispatch = useDispatch()

 const addnewanecdotes =async (event)=>{
    event.preventDefault()
    const anecdote= event.target.anecdote.value
    event.target.anecdote.value=''
    dispatch(createNew(anecdote))

  }



return (<div>
        <h2>create new</h2>
      <form onSubmit={addnewanecdotes}>
        <div><input name='anecdote'  /></div>
        <button type='submit'>create</button>
      </form></div>
    )
}

export default Anecdotesform