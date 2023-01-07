const Blogform = ({ addnew, children }) => {
  return (
    <form onSubmit={addnew}>
      <h2>create new</h2>
      {children}
      <button type="submit">create</button>
    </form>
  )
}

export default Blogform
