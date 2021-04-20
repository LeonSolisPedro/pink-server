import express from "express"
import validate from "../../config/validate.js"
import { example } from "./validations.js"
const router = express.Router()


router.post("/api/example/:idUser", validate(example), async (req, res) => {
  const { name, description } = req.body
  let { idUser } = req.params

  res.send(`idUser: ${idUser}, Name: ${name}, Description: ${description}`)
})


export { router }