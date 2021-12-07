require('dotenv').config();

// sample express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// parse application/json
app.use(bodyParser.json());


// enable cors
app.use(cors());


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', require('./routes/users'))
app.use('/blogs', require('./routes/blogs'))
app.use('/comments', require('./routes/comments'))
app.use('/likes', require('./routes/likes'))
