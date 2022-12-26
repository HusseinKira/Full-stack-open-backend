const { response, request, json } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')


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


let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/api/persons',(request,response)=>{

    response.json(persons)
  

})
app.get('/info',(request,response)=>{

  const count= persons.length
  const date=new Date()
  
  response.send(`<p>Phonebook has info for ${count} people</p>
  <p>${date}</p>`)
  
  

})
 
app.get('/api/persons/:id',(request,response)=>{ 

const id= Number (request.params.id)
const person=persons.find(person=>person.id===id)
if(!person){
return response.status(404).end()
}

response.json(person)


})

app.delete('/api/persons/:id',(request,response)=>{

const id=Number(request.params.id)
persons=persons.filter(person=>person.id!==id)

response.status(204).end()


})

app.post('/api/persons',(request,response)=>{
    const body= request.body

    const names= persons.map(person=>person.name)
    
    if(!body.name||!body.number){
    return response.status(400).json({error:'content missing'})

    }

 if(names.includes(body.name)){

    return response.status(400).json({error:'name must be unique'})

 }


    const person={
    name:body.name,
    number:body.number,
    id:Math.floor(Math.random()*(10000-1)+1),
    }
 persons=persons.concat(person)

  response.json(person)


})

 



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


