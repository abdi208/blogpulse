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
    db.post.findByPk(parseInt(req.params.id), {include: [db.comment, db.author, db.tag]})
    .then(function(post) {
        res.render('posts/show', {post})
        console.log(author)
})
})
//get new post through form on new file in post folder inside views
router.get('/new', function(req, res) {
    res.render('posts/new')
})
//post a new comment
router.post('/:id/comments', function(req, res){
    db.post.findByPk(parseInt(req.params.id))
    .then(function(post){
        post.createComment({
            name:req.body.name,
            content:req.body.content
        }).then(function(comment){
            res.redirect(`/posts/${req.params.id}`)
        })
    })
});

// //adding a new comment
// router.post('/:id/comments', function(req, res) {
//     db.post.findByPk(parseInt(req.params.id){
//         //then recieves data
//         .then(function(post) {
//             //create comment
//             post.createComment(req.body).then(function(comment) {
//                 res.redirect('/')
//             })
//         })
//     })
// })
module.exports = router;