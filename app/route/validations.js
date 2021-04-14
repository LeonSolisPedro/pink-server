import { body, param } from "express-validator"
import axios from "axios"

const example = [
  param("idUser").isNumeric().withMessage("Only numbers allowed"),
  body("name").not().isEmpty().withMessage("Name required"),
  body("description").not().isEmpty().withMessage("Description required").bail()  //bails only works in same statement
    .custom(async (value, {req}) => {

      if(value !== "Cool"){
        throw new Error("Description must say 'Cool'")
      }

      if(value === req.body.name) {
        throw new Error("Description should not be the same as the name")
      }

      await axios.get("https://jsonplaceholder.typicode.com/todos/1")
      

    })
]

export { example }