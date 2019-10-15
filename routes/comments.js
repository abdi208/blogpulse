const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/posts/:id', function (req, res) {
    db.comment.findOne({
        where: { id: parseInt(req.params.id) },
        include: [db.post]
    }).then(function (comment) {
        // by using eager loading, the article model should have a comments key
        console.log(post.comments)
        res.render('posts/show', { comment })
    })
})

router.post('/new', function (req, res) {
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        postId: req.body.postId
    })
        .then(function (comment) {
            res.redirect('/posts/' + req.body.postId)
        });
});

module.exports = router;