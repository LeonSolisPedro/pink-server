//express stuff
const express = require("express")
const app = module.exports = express()

//bodyParser stuff
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Cors stuff
const cors = require('cors')
app.use(cors());
app.options('*', cors())

//express-async-errors stuff
require("express-async-errors")

//Routes
require("./hello")
require("./posts")

//Custom Handler
app.use((err, req, res, next) => {
  console.error(err)
  res.sendStatus(500)
})