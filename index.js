// import expres js
const express = require('express');

// create app
const app = express();

// import dotenv
require('dotenv').config();

// set port
const port = process.env.PORT;

// import CORS
const cors = require('cors');

// import path
const path = require('path');

// import axios
const axios = require('axios');

// set CORS
app.use(cors());

// import body parser
const bodyParser = require('body-parser');

// set body parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse to json
app.use(bodyParser.json());

// set route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// import route for router
const router = require('./routes/api.js');

// set route for register
app.use('/api', router);

// Set folder views dan view engine EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// import route web
const web = require("./routes/web.js");
// web route
app.use("/admin", web);

// konfigurasi folder public
app.use('/public', express.static(path.join(__dirname, 'public')));

// start app
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});