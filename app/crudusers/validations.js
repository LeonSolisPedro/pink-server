import { body } from "express-validator"


const users = [
  body("displayName").not().isEmpty(),
  body("email").isEmail()
]


const changePassword = [
  body("password").not().isEmpty().isLength({min: 6})
]

export { users, changePassword }