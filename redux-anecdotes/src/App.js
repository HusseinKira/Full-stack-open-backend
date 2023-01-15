import AnecdoteList from './components/AnecdoteList'
import Anecdotesform from './components/Anecdotesform'
import Notification from './components/Notification'
import Filter from './components/Filter'
const App = () => {
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