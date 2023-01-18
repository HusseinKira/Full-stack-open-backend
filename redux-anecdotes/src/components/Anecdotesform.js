
import { connect } from 'react-redux'
import {createNew}  from '../reducers/anecdoteReducer'
const Anecdotesform =(props)=>{



 const addnewanecdotes =async (event)=>{
    event.preventDefault()
    const anecdote= event.target.anecdote.value
    event.target.anecdote.value=''
    props.createNew(anecdote)

  }



return (<div>
        <h2>create new</h2>
      <form onSubmit={addnewanecdotes}>
        <div><input name='anecdote'  /></div>
        <button type='submit'>create</button>
      </form></div>
    )
}

const ConnectedAnecdotesform = connect(null,{createNew})(Anecdotesform)
export default ConnectedAnecdotesform