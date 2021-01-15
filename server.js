var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

app.use(cors())
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json())

app.all("*", function (req, res, next) {
    const allowedOrigins = [
      "http://localhost:4200", //URL
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type, x-cm-user-id"
    );
    next();
  });

require('./app/routes/employee.route')(app);
require('./app/routes/holiday.route')(app);
require('./app/routes/leave.route')(app);
require('./app/routes/login.route')(app);


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
