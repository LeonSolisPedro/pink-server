const { body, param } = require("express-validator")

const example = [
  param("idUser").isNumeric().withMessage("Only numbers allowed"),
  body("name").not().isEmpty().withMessage("Name required"),
  body("description").not().isEmpty().withMessage("Description required")
]

module.exports = {
  example: example
}