import PropTypes from 'prop-types'
const Blogform = ({ addnew, children }) => {
  return (
    <form onSubmit={addnew}>
      <h2>Create new blog:</h2>
      {children}
      <button id='create' type="submit">create</button>
    </form>
  )
}

Blogform.propTypes ={
addnew:PropTypes.func.isRequired,
children:PropTypes.array.isRequired

}

export default Blogform
