const express = require('express')
const bcrypt = require('bcrypt')
const UserModel = require('../model/users')
const { createToken, validateToken } = require('../jwt/jwt')
const authRouter = express.Router()


// sign up user 
authRouter.post('/signup', (req, res)=>{
    const { firstname, lastname, email, password } = req.body

        bcrypt.hash(password, 10).then((hash)=>{
            UserModel.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hash
            })
            .then(()=>{
                res.status(201).send({
                    message: 'User added successfully',
                })
            })
            .catch((error)=>{
                res.status(401).send('An error occurred', error)
            })  
        })
})

// login route
authRouter.post('/login', async (req, res)=>{
    const { email, password } = req.body
    
    const user = await UserModel.findOne({email: email})
    if(!user){
        return res.status(400).send({message: 'User not found!'})
    }

    const dbPassword = user.password
    bcrypt.compare(password, dbPassword).then((match)=>{
        if (!match){
            return res.status(404).send({message: 'Wrong Username and Password'})
        } 
        else {
            const accessToken = createToken(user)
            res.cookie('token', accessToken, {maxAge: 60*60})

            res.status(200).send({message: 'Logged in successfully'})
        }
    }).catch((error)=>{
        res.status(400).send({message: 'an error occurred', error})
    })
})

module.exports = authRouter