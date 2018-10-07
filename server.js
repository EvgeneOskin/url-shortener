// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const URL = require('url')
const dns = require('dns')
const util = require('util')


app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: false }))


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.post("/api/shorturl/new", async (req, res) => {
  const { url } = req.body
  try {
    await validateUrl(url)
    const shortUrl = await makeShortUrl(url)
    console.log(shortUrl)
    res.json({ original_url: url, "short_url": shortUrl._id })
  } catch(err) {
    res.statusCode = 400;
    res.json({ error: "invalid URL" })
  }
})

const lookupDNS = util.promisify(dns.lookup);
const validateUrl = url => {
  const { hostname } = URL.parse(url)
  return lookupDNS(hostname) 
}
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const linkSchema = new mongoose.Schema({
  link: { type: String, required: true },
  count: Number,
});


const Link = mongoose.model('Link', linkSchema);

const makeShortUrl = url => Link.findOneAndUpdate({link: url}, {$inc: { count: 1} }, {upsert: true})


app.get("/api/shorturl/:id", async (req, res) => {
  const id = req.param('id')
  try {
    const shortUrl = await Link.findById(id)
    res.redirect(shortUrl.link)
  } catch(err) {
    res.statusCode = 404;
    res.json({ error: "no such URL" })
  }
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
