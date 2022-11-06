const { sign, verify } = require('jsonwebtoken')
require('dotenv').config()

const createToken = (user) =>{
    const accessToken = sign({email: user.email, id: user.id}, 'JWT_SECRET')

    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['token']
    if(!accessToken) {
        return res.status(404).send({message: 'user not authenticated'})
    }

    try {
        const validToken = verify(accessToken, 'JWT_SECRET')
        if (validToken){
            req.authenticated = true
            return next()
        }
    } catch(error){
        res.status(404).send({message: error})
    }
}

module.exports = { createToken, validateToken }