const express = require('express');
const router = express.Router();
const db = require('../models');

//get all posts
router.get('/', function(req, res) {
    db.post.findAll()
    .then(function(posts){
        res.render('post/index');
    });
});
 //get ONE post

router.get('/:id', function(req, res) {
    //--find by primRY KEY
    //--parseInt the params
    db.post.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.comment]
    }).then(function(post) {
        post.getAuthor().then(function(author) {
            res.render('posts/show', {post, author})
        })
    })
})
//get new post through form on new file in post folder inside views
router.get('/new', function(req, res) {
    res.render('posts/new')
})

router.post('/:id/comments', function(req, res){
    db.post.findByPk(parseInt(req.params.id))
    .then(function(post){
        post.createComment({
            name:req.body.name,
            content:req.body.content
        }).then(function(comment){
            res.redirect('/posts/' +req.params.id)
        })
    })
});

module.exports = router;