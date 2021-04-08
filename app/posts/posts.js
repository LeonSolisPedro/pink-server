const app = require("../index")
const checkIfAuthenticated = require("../../config/firebase")
const admin = require("firebase-admin")


app.get("/api/posts", checkIfAuthenticated, async (req, res) => {
  
  const db = admin.database();
  const ref = db.ref("posts");

  const posts = await ref.once("value")

  res.send(posts.val())

})