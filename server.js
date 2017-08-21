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
mongoose.connect("mongodb://localhost/web-scraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

app.get("/scrape", function(req, res) {
    request("https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313.TR11.TRC1.A0.H0.Xlucchese+womens.TRS0&_nkw=lucchese+womens&_sacat=0", function(error, response, html) {

        var $ = cheerio.load(html);
        var results = [];

        $("li.lvresult").each(function(i, element) {

            var link = $(element).find("a").attr("href");
            var title = $(element).find("h3").find("a").text().toLowerCase();
            var image = $(element).find("img").attr("src");
            var price = $(element).find("li").find("span").text();

            var newEntry = new Boot({
                title: title,
                link: link,
                image: image,
                price: price
            });

            newEntry.save(function(error, doc) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(doc);
                }
            });
        });
        console.log(results);
    });
    res.send("Scrape Complete");
});

// Once logged in to the db through mongoose & on port, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});
app.listen(3000, function() {
    console.log("App running on port 3000!");
});