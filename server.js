var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose');
// parse requests of content-type - application/json
app.use(bodyParser.json())

require('./app/routes/employee.route')(app);

// create express app

mongoose.Promise = global.Promise;

// define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
    });
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});