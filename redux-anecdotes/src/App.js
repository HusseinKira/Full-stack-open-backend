import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import Anecdotesform from './components/Anecdotesform'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'

import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(initializeAnecdotes())
      
  }, [])// eslint-disable-line react-hooks/exhaustive-deps  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification/>
      <AnecdoteList/>
      <Anecdotesform/>
    </div>
  )
}

export default App