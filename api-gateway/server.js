require('dotenv').config();
const express = require('express')
const cors = require('cors');

const {setupLogging} = require("./logging");

const app = express()
setupLogging(app);

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// setup cors using cors library
app.use(cors());

app.use('/users', require('./routes/users'))
app.use('/blogs', require('./routes/blogs'))
app.use('/comments', require('./routes/comments'))
app.use('/likes', require('./routes/likes'))

app.listen(process.env.port, () => {
    console.log(`API-Gateway listening at http://localhost:${process.env.PORT}`)
})
