const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/user')


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs',{url:1, title:1, author:1})

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  if (password===undefined || password.length<3){
 
const string = password===undefined ?'need to provide password ':'need to provide password more than 3 letters '
    return response.status(400).json({
        error: string
      })
    
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter