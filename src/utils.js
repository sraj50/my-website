const jwt = require('jsonwebtoken')
const APP_SECRET = 'W3EP2kH3ZMTJiBhBFCkuhdzVtQu9Yva4'

// retrieve userId when authenticating, contains user JWT
function getUserId(context) {
    const Autorization = context.request.get('Authorization')   // Authorization header in request 
    if (Autorization) {
        const token = Autorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, APP_SECRET)    // verify the JWT
        return userId
    }
    throw new Error('Not authenticated')
}

module.exports = {
    APP_SECRET,
    getUserId
}