const { response, request, json } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
app.use(express.static('build'))
const person= require('./models/person')


const m =function (tokens, request, response) {
  
  if(tokens.method(request, response)==='POST'){
     const content =JSON.stringify(request.body)
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, 'content-length'), '-',
      tokens['response-time'](request, response), 'ms',
      content
    ].join(' ')


  }

  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
   
  ].join(' ')
}

app.use(morgan(m))



app.get('/api/persons',(request,response)=>{
  person.find({})
  .then( persons => response.json(persons) )
    
  

})
app.get('/info',(request,response)=>{

  const count= persons.length
  const date=new Date()
  
  response.send(`<p>Phonebook has info for ${count} people</p>
  <p>${date}</p>`)
  
  

})
 
app.get('/api/persons/:id',(request,response)=>{ 
person.findById(request.params.id) 
.then(person => {
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
.catch(error => next(error))


})

app.delete('/api/persons/:id', (request, response, next) => {
  person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.post('/api/persons',(request,response)=>{
    const body= request.body
    const nperson= new person({
    name:body.name,
    number:body.number
  
    })
 

  nperson.save().then(savedperson=> response.json(savedperson))


})

 




app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
 console.log(error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


