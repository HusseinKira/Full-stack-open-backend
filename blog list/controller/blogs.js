const blogsrouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../model/blog')
const User = require('../model/user')

const middleware = require('../utils/middleware')
blogsrouter.get('/', async(request, response) => {
   const blogs= await Blog.find({}).populate('user',{username:1,name:1})
   response.json(blogs)
      })

  
    
  blogsrouter.post('/',middleware.userExtractor,async (request, response) => {
   
    const body = request.body
    const user= response.locals.user
    const blog = new Blog ({
      
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    })

   
   const result= await blog.save()
   user.blogs=user.blogs.concat(result._id)
   await user.save()
    response.status(201).json(result)
  })

  blogsrouter.put('/:id',async (request,response)=>{
 const body = request.body
 const blog ={ 
  likes: body.likes
 }

 const updated =await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true } )

 response.status(204).json(updated)



  })



  blogsrouter.delete('/:id',middleware.userExtractor,async(request,response)=>{
    
   
 const user= response.locals.user
  const blog= await Blog.findById(request.params.id)
  if ( blog.user.toString() === user.id.toString() ) {

    await Blog.findByIdAndRemove(request.params.id)
   response.status(204).end()

  }
  if ( blog.user.toString() !== user.id.toString() ) {

    
   return response.status(401).json({error: 'must be same user to delete'})

  }
  

  })

  module.exports = blogsrouter