const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const Config = require('./utils/config')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {

  Blog.find({}).then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {

  const blog = new Blog(request.body)

  blog.save().then(result => {
      response.status(201).json(result)
    })
})

app.listen(Config.PORT, () => {
  console.log(`Server running on port ${Config.PORT}`)
})