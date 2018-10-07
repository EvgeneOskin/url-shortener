// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const URL = require('url')

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.post("/api/shorturl/new", (request, response) => {
  const { url } = request.body
  validateUrl(url)
  response.sendStatus(200)
})

const validateUrl = (url) => {
  const { hostname } = new URL(url)
  dns.lookup(myURL.hostname;, cb) 
}

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
