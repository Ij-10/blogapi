const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL

function connectToMongodb(){
    mongoose.connect(MONGODB_CONNECTION_URL)

    mongoose.connection.on('connected', ()=>{
        console.log('connection to mongodb successful');
    })

    mongoose.connection.on('error', (error)=>{
        console.log('connection to mongodb failed', error);
    })
}

module.exports = { connectToMongodb }