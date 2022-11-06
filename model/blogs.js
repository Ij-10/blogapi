const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type: String,
        required: true, 
        unique: true
    },

    description:{
        type: String
    },

    author:{
        type: String
    },

    state: {
        type: String,
        enum: ['draft', 'published']
    },

    read_count: {
        type: Number
    },

    reading_time: {
        type: Date
    },

    tags: [{
        name: String,
        id: String
    }],
    
    body: {
        type: String,
        required: true
    },

    timestamps: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    },
})


module.exports = mongoose.model('blogs', blogSchema)
