// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our Note and Article models
var Boot = require("./models/boot.js");
var Comments = require("./models/comments.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
// mongoose.connect("mongodb://localhost/web-scraper");
// var db = mongoose.connection;

// mLab Heroku Connection
mongoose.connect("mongodb://heroku_wnk6wp68:m9ft3ihfhj39u2106iui1gmsd4@ds161493.mlab.com:61493/heroku_wnk6wp68");
var db = mongoose.connection;

// Require in routes
require("./controllers/api-routes.js")(app);

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose & on port, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});
app.listen(3000, function() {
    console.log("App running on port 3000!");
});