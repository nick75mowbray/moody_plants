const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors= require("cors");

// api
const items = require('./routes/api/items');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client', 'build')));

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
        })
        .then(() => console.log("Database Connected Successfully"))
        .catch(err => console.log(err));



// use routes
app.use('/api/items', items);

// send index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });


app.listen(PORT, ()=> console.log(`server started on PORT ${PORT}`));
