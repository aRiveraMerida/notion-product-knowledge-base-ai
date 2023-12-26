const express = require('express')
const cors = require('cors')

const modelRoutes = require('./src/routes/modelRoutes')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/model', modelRoutes)
// app.use('/api/notion', notionRoutes);

// Catch-all route
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// Error handling middleware
app.use((err, req, res) => {
  // Handle the error
  console.error(err)

  // Set the response status code
  res.status(err.status || 500)

  // Send the error message as the response
  res.json({ error: err.message })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
