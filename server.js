const express = require('express')
const app = express()

const port = 8000
let connection = null

setInterval(() => {
  on({ date: new Date() })    
}, 1000)

app.get('/', (req, res) => {
  console.log('Client connected')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', '*')
  connection = res

  res.on('close', () => {
    console.log('Client closed connection')
    res.end()
  })
})

function on(data) {
  if(!connection) { return }
  connection.write(`data: ${JSON.stringify(data)}\n\n`)
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
