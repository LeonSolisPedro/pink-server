import express from "express"
import checkIfAuthenticated from "../../config/firebase.js"
import admin from "../../config/db.js"
const router = express.Router()


router.get("/api/posts", checkIfAuthenticated, async (req, res) => {
  
  const db = admin.database()
  const dbPosts = db.ref("posts")

  const posts = await dbPosts.once("value")

  res.send(posts.val())

})

export { router }