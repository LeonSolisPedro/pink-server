import { body } from "express-validator"


const register = [
  body("displayName").not().isEmpty(),
  body("email").isEmail(),
  body("password").not().isEmpty().isLength({min: 6}),
  body("passwordconfirm").not().isEmpty().isLength({min: 6})
    .bail().custom(async (value, { req }) => {

      if(value !== req.body.password){
        throw new Error("Passwords do not match")
      }

    })
]

export { register }