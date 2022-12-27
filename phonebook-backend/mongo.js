const mongoose = require('mongoose')

if (process.argv.length < 5 ) {
  console.log('Please provide the password name and number: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.yhma2gw.mongodb.net/conactList?retryWrites=true&w=majority`


const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const person = mongoose.model('person', personSchema)



mongoose
  .connect(url)
 


  .then((result) => {
    console.log('connected')
    
       
    const note = new person({
     name: process.argv[3],
      number: process.argv[4]
    })

    return note.save()
})
.then(() => {
  console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
 
})

person.find({}).then(result=>{
   console.log('phonebook:');
    result.forEach(person => {
        console.log(person);
    })
    mongoose.connection.close()
  })

.catch((err) => console.log(err))