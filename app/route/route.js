import express from "express"
import validate from "../../config/validate.js"
import { example } from "./validations.js"
const router = express.Router()


router.post("/api/route/:idUser", validate(example), async (req, res) => {

  let { name, description } = req.body

  let { idUser } = req.params

  res.send(`idUser: ${idUser}, Name: ${name}, Description: ${description}`)

})


export { router }