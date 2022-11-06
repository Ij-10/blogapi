const express = require('express')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const { connectToMongodb } = require('./db/db')
const authRouter = require('./routes/authRoutes')
const blogRouter = require('./routes/blogsRoute')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT

connectToMongodb()

app.use(express.json())
app.use(cookieParser())
app.use('/', authRouter)
app.use('/', blogRouter)

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})

