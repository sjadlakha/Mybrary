const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})
// Author below is the table in our db and authorChema is the definition for it.
module.exports = mongoose.model('Author', authorSchema)