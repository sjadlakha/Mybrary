const mongoose = require('mongoose')
const coverImageBasePath = 'uploads/bookCovers' // in the public folder
const bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    publishDate:{
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        // this type is telling that we are referring to another collections records id in the db
        required: true,
        // the ref attribute is telling which collection we are referring to
        ref: 'Author'
    }

})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath