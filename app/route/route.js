const app = require("../index")
const validate = require("../../config/validate")
const { example } = require("./validations")
const checkIfAuthenticated = require("../../config/firebase")

app.post("/api/route/:idUser", validate(example), checkIfAuthenticated, async (req, res) => {

  let { name, description } = req.body

  let { idUser } = req.params

  let { email } = req.userInfo

  res.send(`idUser: ${idUser}, Name: ${name}, Description: ${description}, Logged user: ${email}`)

})