const app = require("../index")

app.get("/api/hello", async (req, res) => {

  res.send("Hello World!")

})