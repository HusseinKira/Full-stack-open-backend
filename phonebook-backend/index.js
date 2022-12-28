const { response, request, json } = require("express")
const express = require("express")
const app = express()
app.use(express.json())
const morgan = require("morgan")
app.use(express.static("build"))
const person = require("./models/person")

const m = function (tokens, request, response) {
  if (tokens.method(request, response) === "POST") {
    const content = JSON.stringify(request.body)
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, "content-length"),
      "-",
      tokens["response-time"](request, response),
      "ms",
      content,
    ].join(" ")
  }

  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, "content-length"),
    "-",
    tokens["response-time"](request, response),
    "ms",
  ].join(" ")
}

app.use(morgan(m))

app.get("/api/persons", (request, response) => {
  person.find({}).then((persons) => response.json(persons))
})
app.get("/info", (request, response) => {
  const date = new Date()
  person.count({}, function (err, count) {
    response.send(`<p>Phonebook has info for ${count} people</p>
    <p>${date}</p>`)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  person
    .findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const nperson = {
    name: body.name,
    number: body.number,
  }
  person
    .findByIdAndUpdate(request.params.id, nperson, {
      new: true,
      runValidators: true,
    })
    .then((updatedperson) => {
      response.json(updatedperson)
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  person
    .findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body
  const nperson = new person({
    name: body.name,
    number: body.number,
  })

  nperson
    .save()
    .then((savedperson) => response.json(savedperson))

    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log(error.name)
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
