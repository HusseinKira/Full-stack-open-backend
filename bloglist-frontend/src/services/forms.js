 import Input from "../components/Input"
import loggingservice from "./logging"
import Blog from '../components/Blog'
import blogService from '../services/blogs'
 
 
 
 const loginform =({setusername,setpassword,username,password,setuser,setMessage,settype})=>{
    const handler = (event) => {
        event.preventDefault()
        loggingservice.handlelogin({username,password,setuser,setusername,setpassword,setMessage,settype})
      }
    
return( 
<div>
<form onSubmit={handler}>
  <h3> Login: </h3>
  
  <Input text='username: ' type="text" name="username" value={username}  setfn={setusername}/>
  <Input text='password: ' type="password" name="password" value={password}  setfn={setpassword}/>
<button type="submit">Login</button>
</form></div>)

  }

  const loggedin=({title,settitle,setauthor,author,seturl,url,blogs,user,setBlogs,setMessage,settype})=>{
    const addnew = async (event)=>{
        event.preventDefault()
        try{
          const object = {
          title: title,
          author: author,
          url: url
          }
          const newblog = await blogService.create(object)
          setBlogs(blogs.concat(newblog))
          settitle('')
          setauthor('')
          seturl('')
          settype('newadd')
          setMessage(`a new blog ${newblog.title} ${newblog.author} added`)
              setTimeout(() => {
                settype(null)
                setMessage(null)
              }, 5000)
       
        }
        catch{
          settype('error')
          setMessage('Was not added')
              setTimeout(() => {
                settype(null)
                setMessage(null)
              }, 5000)
    
        }}
    return(
      <div>
    <h2>blogs</h2>
 <p>{user.name} logged-in <button onClick={loggingservice.logout}>logout</button></p>
    <form onSubmit={addnew}>
  <h2>create new</h2>
  <Input text='title:' type="text" name="title" value={title}  setfn={settitle}/>
  <Input text='author:' type="text" name="author" value={author}  setfn={setauthor}/>
  <Input text='url:' type="text" name="url" value={url}  setfn={seturl}/>
  <button type="submit">create</button>
  </form>
  
 {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>
  )
  }





  export default {loginform, loggedin}