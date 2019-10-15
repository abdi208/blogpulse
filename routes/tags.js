const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', function(req, res) {
    let postId = parseInt(req.body.postId)
    db.post.findByPk(postId)
    .then(function(post) {
        console.log(`Post: ${post}`)
        db.tag.findOrCreate({
            where:{
                name: req.body.name
            }
        }).then(function([tag, created]) {
            console.log(`Tag: ${tag}`)
            post.addTag(tag).then(function(data) {
                res.redirect(`/posts/${postId}`)
            })
        })
    })
})

module.exports = router;