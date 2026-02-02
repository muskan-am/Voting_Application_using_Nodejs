const mongoose = require('mongoose');
require('dotenv').config();

//Define the mongoose connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL

//set up mongodb connection
mongoose.connect(mongoURL);

//Get the default connection
//mongoose maintain a default connection object representing the mongodb connections
const db = mongoose.connection;

//Define event listener for databases connection
db.on('connected',()=> {
    console.log('connected tothe mongodb server');
})

db.on('error', (err)=> {
    console.log('mongodb connection error', err);
})

db.on('disconnected', ()=> {
    console.log('mongodb disconnected');
});

module.exports = db;