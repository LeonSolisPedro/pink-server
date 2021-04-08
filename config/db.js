var admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://pink-5ac5a-default-rtdb.firebaseio.com/'
});

module.exports = admin