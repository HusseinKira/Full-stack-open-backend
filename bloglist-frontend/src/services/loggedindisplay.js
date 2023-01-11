 import Input from '../components/Input'
import loggingservice from "./logging"
import Blog from '../components/Blog'
import blogService from './blogservices'
import Togglable from '../components/Togglable'
import Blogform from '../components/Blogform'


  const loggedin=({title,settitle,setauthor,author,seturl,url,blogs,user,setBlogs,setMessage,settype,blogfromref})=>{
    
    
    const addnew = async (event)=>{
      event.preventDefault()
      try{
        blogfromref.current.toggleVisibility()
        const object = {
        title: title,
        author: author,
        url: url
        }
        const newblog = await blogService.create(object)
        
        await setBlogs(blogs.concat(newblog))
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
      blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes))
    return(
      <div>
    <h1>Blogs</h1>
 <p>{user.name} logged-in <button onClick={loggingservice.logout}>logout</button></p>
   <Togglable buttonLabel= 'create blog' id='createblog' id1='cancel' ref={blogfromref}>
   <Blogform addnew={addnew}  >
   <Input text='title:' type="text" name="title" value={title}  setfn={settitle} id='title'/>
    <Input text='author:' type="text" name="author" value={author}  setfn={setauthor} id='author'/>
    <Input text='url:' type="text" name="url" value={url}  setfn={seturl} id='url'/>
   </Blogform>
   </Togglable>
 
 {blogs.map((blog) => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />  )}
  </div>
  )
  }


  export default { loggedin}