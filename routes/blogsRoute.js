const express = require('express')
const blogModel = require('../model/blogs')
const { createToken, validateToken } = require('../jwt/jwt')
const blogRouter = express.Router()


blogRouter.get('/blogs', (req, res) => {
    blogModel.find({}).limit(20)
        .then((blogs)=>{
            res.status(200).send(blogs)
        }).catch(()=>{
            res.status(404).send({message: 'An error occurred'})
        })
})

blogRouter.get('/blogs/:id', (req, res)=>{
    const id = req.params.id

    blogModel.findById(id)
        .then((blog)=>{
            res.status(200).send({author: blogModel.author, data: blog})
        }).catch((error)=>{
            res.status(404).send({message: 'An error occurred'})
        })

})

// create blog
blogRouter.post('/blogs', validateToken, (req, res)=>{
    const {title, description, author, state, tags, timestamp, reading_time, read_count, body} = req.body
    blogModel.create({
        title: title,
        description: description,
        author: author,
        state: state.enum['draft'],
        tags: tags,
        timestamp: timestamp,
        reading_time: reading_time,
        read_count: read_count,
        body: body
    })
        .then((blog)=>{
            res.status(201).send(blog)
        }).catch(()=>{
            res.status(404).send({message: 'An error occurred'})
        })
})

// update blog
blogRouter.put('/blogs/:id', validateToken, (req, res)=>{
    const id = req.params.id
    const blog = req.body

    blogModel.findByIdAndUpdate(id, blog, {new: true})
    .then((blogs)=>{
        res.status(200).send(blog)
    }).catch(()=>{
        res.status(404).send({message: 'An error occurred'})
    })
} )

// delete blog
blogRouter.delete('/blogs/:id', validateToken, (req, res)=>{
    const id = req.params.id

    blogModel.findByIdAndDelete(id)
    .then(()=>{
        res.status(200).send({message: 'Successfully deleted!'})
    }).catch(()=>{
        res.status(404).send({message: 'An error occurred'})
    })
})


module.exports = blogRouter