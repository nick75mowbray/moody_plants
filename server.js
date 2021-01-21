const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// api
const items = require('./routes/api/items');


const app = express();

app.use(bodyParser.json());

// DB Config
const db= require("./config/keys").mongoURI;
// set port
const PORT = process.env.PORT || 3002;
// connect to mongoose
mongoose
    .connect(process.env.MONGODB_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
        })
    .then(()=> console.log("MongoBD Connected..."))
    .catch(err=>console.error(err));

// use routes
app.use('/api/items', items);



app.listen(PORT, ()=> console.log(`server started on PORT ${PORT}`));
