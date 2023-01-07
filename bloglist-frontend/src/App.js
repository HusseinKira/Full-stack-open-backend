import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogservices'
import Notification from './components/Notification'
import forms from './services/loggedindisplay'
import Loginform from './components/Loginform'
import loggingservice from './services/logging'
import Input from './components/Input'


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
  
const get= async() =>{
  const blogs = await blogService.getAll()
  setBlogs(blogs)
}
  useEffect(() => {
  get()
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedbloguser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setuser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handler = (event) => {
    event.preventDefault()
    loggingservice.handlelogin({username,password,setuser,setusername,setpassword,setMessage,settype})
  }
  const blogfromref = useRef()
  return (
   <div>
    <Notification message={Message} text={type}/>
      {user === null ?
      <Loginform handler={handler}> 
       <Input text='username: ' type="text" name="username" value={username}  setfn={setusername}/>
       <Input text='password: ' type="password" name="password" value={password}  setfn={setpassword}/>
      </Loginform>
      
      :forms.loggedin({title,settitle,setauthor,author,seturl,url,blogs,user,setBlogs,setMessage,settype,blogfromref})}
      
    </div>
  )
}

export default App
