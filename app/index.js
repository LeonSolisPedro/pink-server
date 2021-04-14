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
import { route } from "./route/index.js"
app.use("/", route)

import { routerPosts } from "./posts/index.js"
app.use("/", routerPosts)

//Custom Handler
app.use((err, req, res, next) => {
  console.error(err)
  res.sendStatus(500)
})

export default app