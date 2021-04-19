import express from "express"
import validate from "../../config/validate.js"
import { register } from "./validations.js"
import admin from "../../config/db.js"
const router = express.Router()

router.get("/api/getRoles", async (req, res) => {

})

router.post("/api/register", validate(register), async (req, res) => {
  const { displayName, email, password } = req.body

  try {
    await admin.auth().createUser({
      displayName: displayName,
      email: email,
      password: password
    })
  } catch (error) {
    return res.sendStatus(422)
  }

  res.sendStatus(200)
})

export { router }