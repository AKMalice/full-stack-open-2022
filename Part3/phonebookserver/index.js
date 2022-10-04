const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001
app.use(cors())
app.use(express.json())

app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))

let persons =[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/',(request,response) => {
    response.send('<h1>Server Running</h1>')
})

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/info',(request,response)=>{
    const date = new Date()
    response.send(
      `  <div>  
       <p>Phonebook has info for ${persons.length} people</p> 
       <p> ${date} </p>
      </div>`
    )
})

app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id) 
    const person = persons.find(per => per.id === id)

    response.json(person)
})

app.delete('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(per=> per.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name)
    return response.status(400).json({error: 'missing name'})
    if(!body.number)
    return response.status(400).json({error: 'missing number'})
    if(persons.filter(person=> person.name === body.name).length!==0)
    return response.status(400).json({error:"name must be unique"})

    const person = {
        name :body.name,
        number : body.number,
        id : Math.floor(Math.random() * 10000)
    }
    persons=persons.concat(person)

    response.json(person)
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})