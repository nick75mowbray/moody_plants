const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// auth0 login uri
var axios = require("axios").default;

var options = {
  method: 'PATCH',
  url: 'https://dev-n4ayh-gg.au.auth0.com/api/v2/clients/JLf5qYWZQrJ8RfYaV1t9Z75XXTfyb0gc',
  headers: {
    'content-type': 'application/json',
    authorization: 'Bearer API2_ACCESS_TOKEN',
    'cache-control': 'no-cache'
  },
  data: {initiate_login_uri: 'https://www.moodyplants.com/login'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

const db = require("./config/keys").mongodb_URI;
console.log(db);
// Connect to the Mongo DB
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const mongooseConnection = mongoose.connection;
mongooseConnection.on('error', console.error.bind(console, 'connection error:'));
mongooseConnection.once('open', function() {
  console.log(`connected to mongoosedb! ${mongooseConnection}`);

});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});



