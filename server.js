if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs');
// create views folder
app.set('views', __dirname + '/views');

// hooking up express layouts: every single file will be put inside this layout file so we don't need to duplicate code for html template and header, footer, etc

// create layouts folderinside views
app.set('layout', 'layouts/layout');
// telling that we will use express layouts
app.use(expressLayouts);

// telling where to get all the public files like the style sheets and stuff
// create the public folder
app.use(express.static('public'));

// setting up the database connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error)=>console.log('ERROR: ', error))
db.once('open', () => console.log('Database Connected'))


// Index Route:
app.use('/', indexRouter)

// process.env.PORT is the port that the server will tell when we host it on it but for now in dev we can use 3000 hence that 'or'
app.listen(process.env.PORT || 3000);