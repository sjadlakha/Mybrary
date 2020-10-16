const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const bodyParser = require('body-parser')
// All Authors route
router.get('/',async (req, res) => {
    let searchOptions={}
    // req.query for get request values
    if (req.query.name != null && req.query.name !== ''){
        // saving case insensitive
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        // console.log(authors)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
            })
    } catch {
        res.redirect('/')
    }
})

// New Authors route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Create  Author route - used in the form
// without async await
// router.post('/',urlencodedParser, (req, res) => {
//     const author = new Author({
//         name: req.body.name
//     })
//     author.save((err, newAuthor) => {
//         if(err){
//             res.render('authors/new',{
//                 author: author,
//                 errorMessage: 'Error Creating author'
//             })
//         } else {
//             // res.redirect(`authors/${newAuthor.id}`)
//             res.redirect('authors')
//             console.log('New author added')
//         }
//     })
// })

// with async await
router.post('/',urlencodedParser, async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
       
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating author'
        })
    }

})
module.exports = router