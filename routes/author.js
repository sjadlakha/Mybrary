const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')
const bodyParser = require('body-parser')
// All Authors route
router.get('/', (req, res) => {
    res.render('authors/index')
})

// New Authors route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Create  Author route - used in the form
router.post('/',urlencodedParser, (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    author.save((err, newAuthor) => {
        if(err){
            res.render('authors/new',{
                author: author,
                errorMessage: 'Error Creating author'
            })
        } else {
            // res.redirect(`authors/${newAuthor.id}`)
            res.redirect('authors')
            console.log('New author added')
        }
    })

})
module.exports = router