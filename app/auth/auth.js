import express from "express"
import validate from "../../config/validate.js"
import checkIfAuthenticated from "../../config/firebase.js"
import { register } from "./validations.js"
import admin from "../../config/db.js"
const router = express.Router()

router.get("/api/getRoles", checkIfAuthenticated, async (req, res) => {
  
  const { uid } = req.userInfo

  const db = admin.database()
  const dbroles = db.ref("roles")

  const roles = await dbroles.once("value")
  
  const hasAnyRole = roles.val()?.hasOwnProperty(uid) ?? false
  if(hasAnyRole === true){
    await admin.auth().setCustomUserClaims(uid, {role: "admin"})
  } else {
    await admin.auth().setCustomUserClaims(uid, null)
  }

  return res.status(200).send({ hasAnyRole })
})

router.post("/api/register", validate(register), async (req, res) => {
  const { displayName, email, password } = req.body

  try {
    await admin.auth().createUser({
      displayName: displayName,
      email: email,
      password: password
    })
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(422)
  }
})

export { router }