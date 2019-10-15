const express = require('express');
const router = express.Router();
const db = require('../models');

// get all /authors/
router.get('/', function(req, res) {
    db.author.findAll()
    .then(function(authors) {
        res.render('authors/index', {authors})
    });
});

// get a new author
router.get('/new', function(req, res) {
    res.render('authors/new')
})

//post after creting an author
router.post('/', function(req, res) {
    db.author.create(req.body)
    .then(function(author) {
        res.redirect('/authors')
    });
});
//get one///
router.get('/:id', function(req, res) {
    db.author.findByPk(parseInt(req.params.id))
        .then(function(author) {
            //go through posts and attach every post with the authors id.
            author.getPosts().then(function(posts) {
                res.render('authors/show', {author, posts})
            })
        })
})

router.post('/:id/posts', function(req, res) {
    db.author.findByPk(parseInt(req.params.id))
        .then(function(author) {
            author.createPost(req.body).then(function(post) {
                res.redirect(`authors/${author.id}`)
            })
        })
    
})

module.exports = router;