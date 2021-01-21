const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// api
const items = require('./routes/api/items');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.json());

app.use(express.static('client/build'));

// DB Config
const db= require("./config/keys").mongoURI;
// set port
const PORT = process.env.PORT || 3002;
// connect to mongoose
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost/print_site', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
        });

const mongooseConnection = mongoose.connection;
    mongooseConnection.on('error', console.error.bind(console, 'connection error:'));
    mongooseConnection.once('open', function() {
        console.log("connected to mongoosedb!");
    });   

// use routes
app.use('/api/items', items);

// send index.html
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });


app.listen(PORT, ()=> console.log(`server started on PORT ${PORT}`));
