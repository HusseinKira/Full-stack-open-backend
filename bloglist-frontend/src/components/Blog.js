import { useState } from "react"
import blogService from "../services/blogservices"

const Blog = ({blog,blogs,setBlogs,user}) => {
  
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addlikes = async()=>{
    const newblog= {
    user: blog.user,
    likes: blog.likes +1 ,
    author: blog.author,
    title: blog.title,
    url: blog.url
    }

  const ublog= await blogService.update(newblog,blog.id)

  setBlogs(blogs.map((blogelement)=> blogelement.id===ublog.id?ublog:blogelement))


  }

  const deleteblog = () =>{
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
    const removeid=blog.id
    blogService.remove(blog.id)
    setBlogs(blogs.filter((blogelement)=> blogelement.id!==removeid))
    
    }
      }



  const toggleVisibility = () => {
    setVisible(!visible)
    
  }
  

  
  return(
  <div style={blogStyle}>
    
    <div style={hideWhenVisible}>
    {blog.title} {blog.author} <button onClick={toggleVisibility}>veiw</button>
      </div>
      <div style={showWhenVisible}>
       <div>{blog.title} <button onClick={toggleVisibility}>hide</button></div> 
       <div> {blog.url}</div>  
       <div> likes:{blog.likes}  <button onClick={addlikes}>like</button></div> 
       <div>{blog.author}</div>
      
      
       { user.id===blog.user.id || user.id===blog.user?<button onClick={deleteblog}>delete</button>:null}
       
       
    
        
      </div>
  </div> ) 



}

export default Blog