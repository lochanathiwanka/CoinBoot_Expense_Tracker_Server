const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/api');

//create a express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/lochana')
    .then(function () {
        console.log('Connected to the database!');
    })
    .catch(function () {
        console.log('Could not connect to the database!');
    });

//use body parser middleware
app.use(bodyParser.json());

//initialize routes
app.use('/api', routes);

//error handling middleware
app.use(function (err, req, res, next) {
    res.status(422).send({error: err.message});
});

app.listen(process.env.port || 3000, function () {
    console.log('Server is starting...');
});