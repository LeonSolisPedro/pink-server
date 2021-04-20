import express from "express"
import checkIfAuthenticated, { hasRole } from "../../config/firebase.js"
import admin from "../../config/db.js"
import validate from "../../config/validate.js"
import { changePassword, users } from "./validations.js"
const router = express.Router()


router.get("/api/users", checkIfAuthenticated, hasRole("admin"), async (req, res) => {
  const listUsers = await admin.auth().listUsers()

  const mappedUsers = listUsers.users.map(value => ({ uid: value.uid, displayName: value.displayName, email: value.email }))

  return res.send(mappedUsers)
})

router.get("/api/users/:uid", checkIfAuthenticated, hasRole("admin"), async (req, res) => {
  const { uid } = req.params

  try {
    const user = await admin.auth().getUser(uid)
    const mappedUser = { uid: user.uid, displayName: user.displayName, email: user.email }
    return res.send(mappedUser)
  } catch {
    return res.sendStatus(422)
  }
})


router.post("/api/users", checkIfAuthenticated, hasRole("admin"), validate(users), async (req, res) => {
  const { displayName, email, password } = req.body

  try {
    await admin.auth().createUser({
      displayName: displayName,
      email: email,
      password: password
    })
    return res.sendStatus(200)
  } catch {
    return res.sendStatus(422)
  }
})




router.put("/api/users/:uid", checkIfAuthenticated, hasRole("admin"), validate(users), async (req, res) => {
  const { displayName, email } = req.body
  const { uid } = req.params

  try {
    await admin.auth().updateUser(uid, {
      displayName: displayName,
      email: email
    })
    return res.sendStatus(200)
  } catch {
    return res.sendStatus(422)
  }
})


router.put("/api/users/changePassword/:uid", checkIfAuthenticated, hasRole("admin"), validate(changePassword), async (req, res) => {
  const { password } = req.body
  const { uid } = req.params

  try {
    await admin.auth().updateUser(uid, {
      password: password
    })
    return res.sendStatus(200)
  } catch {
    return res.sendStatus(422)
  }
})



router.delete("/api/users/:uid", checkIfAuthenticated, hasRole("admin"), async (req, res) => {
  const { uid } = req.params

  try {
    if(uid === req.userInfo.uid) throw new Error("You can't delete your own account")
    await admin.auth().deleteUser(uid)
    return res.sendStatus(200)
  } catch {
    return res.sendStatus(422)
  }
})

export { router }