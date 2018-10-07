// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const URL = require('url')
const dns = require('dns')
const util = require('util')

const lookup = util.promisify(dns.lookup);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.post("/api/shorturl/new", async (req, res, next) => {
  const { url } = req.body
  try {
    await validateUrl(url)
    const shortUrl = await makeShortUrl(url)
    
    res.json({ original_url: url, "short_url": shortUrl })
  } catch(err) {
    response.sendStatus(400)
    res.json({ error: "invalid URL" })
  }
})

const validateUrl = url => {
  const { hostname } = URL.parse(url)
  return dns.lookup(hostname) 
}
const makeShortUrl = url => {
}

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
