import db from "firebase-admin"

db.initializeApp({
  credential: db.credential.applicationDefault(),
  databaseURL: 'https://pink-5ac5a-default-rtdb.firebaseio.com/'
})

export default db