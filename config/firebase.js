import db from "./db.js"


function getAuthToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1]
  } else {
    req.authToken = null
  }
}

function hasRole(role) {
  return function (req, res, next) {
    if (req.userInfo.role !== role){
      return res
      .status(401)
      .send({ error: 'You are not authorized to make this request' })
    }
    else next()
  }
}

async function checkIfAuthenticated(req, res, next) {
  try {
    getAuthToken(req)
    const { authToken } = req
    const userInfo = await db.auth().verifyIdToken(authToken)
    req.userInfo = userInfo
    return next()
  } catch (e) {
    return res
      .status(401)
      .send({ error: 'You are not authorized to make this request' })
  }
}

export { hasRole }

export default checkIfAuthenticated