//express stuff
import express from "express"
const app = express()

//bodyParser stuff
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Cors stuff
import cors from "cors"
app.use(cors())
app.options('*', cors())

//express-async-errors stuff
import "express-async-errors"

//Routes
import { routerExample } from "./example/index.js"
app.use("/", routerExample)

import { routerAuth } from "./auth/index.js"
app.use("/", routerAuth)

import { routerPosts } from "./posts/index.js"
app.use("/", routerPosts)

import { crudUsers } from "./crudusers/index.js"
app.use("/", crudUsers)

//Custom Handler
app.use((err, req, res, next) => {
  console.error(err)
  res.sendStatus(500)
})

export default app