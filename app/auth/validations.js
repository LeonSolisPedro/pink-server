import { body } from "express-validator"


const register = [
  body("displayName").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password").not().isEmpty().withMessage("Password is required")
  .isLength({min: 6}).withMessage("Password must be at least 6 characters"),
  body("passwordconfirm").not().isEmpty().withMessage("Please confirm your password")
  .isLength({min: 6}).withMessage("Password must be at least 6 characters")
    .bail().custom(async (value, { req }) => {

      if(value !== req.body.password){
        throw new Error("Passwords do not match")
      }

    })
]

export { register }