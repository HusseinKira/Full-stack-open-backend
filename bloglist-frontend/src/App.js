import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import forms from './services/forms'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setusername]= useState('')
  const [password, setpassword]= useState('')
  const [user, setuser] = useState(null)
  const [title, settitle]= useState('')
  const [author, setauthor]=useState('')
  const [url,seturl]=useState('')
  const [Message, setMessage] = useState(null)
  const [type, settype] = useState(null)
  

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedbloguser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setuser(user)
      blogService.setToken(user.token)
    }
  }, [])


  return (
   <div>
    <Notification message={Message} text={type}/>
      {user === null ?
      forms.loginform({setusername,setpassword,username,password,setuser,setMessage,settype}) :forms.loggedin({title,settitle,setauthor,author,seturl,url,blogs,user,setBlogs,setMessage,settype})}
      
    </div>
  )
}

export default App
