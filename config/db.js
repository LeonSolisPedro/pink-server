const mysql = require("mysql")
const util = require("util")

//Connection configuration
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "",
  charset: "utf8mb4",
  dateStrings: true
})

//Test the connection
db.connect((err) => {
  if (err) throw err
})

//To promises
db.query = util.promisify(db.query)

module.exports = db