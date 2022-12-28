const mongoose = require("mongoose")
mongoose.set("strictQuery", true)
require("dotenv").config()
const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        const firsthalf = v.split("-")

        return (
          firsthalf.length === 2 &&
          firsthalf[0].length < 4 &&
          firsthalf[0].length > 1
        )
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
    minlength: 8,
  },
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("person", personSchema)
