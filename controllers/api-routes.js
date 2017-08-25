// // Requiring our Note and Article models
var Boot = require("../models/boot.js");
var Comments = require("../models/comments.js");

// / // Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {

app.get("/", function(req, res) {
    Boot.find({}, function(error, docs) {
        if (error) {
            res.send(error);
        } else {
            // res.send(doc);
            res.render('index', {
                "boots" : docs});    
        }
    });
});

app.post("/scrape", function(req, res) {

    var gender = req.body.gender;
    var size = req.body.size;

    var queryUrl;
    if (gender === "men") {
        queryUrl = "https://www.ebay.com/sch/i.html?_sacat=0&_nkw=mens+lucchese+"+size+"&_frs=1"
    } else if (gender === "women") {
        queryUrl = "https://www.ebay.com/sch/i.html?_sacat=0&_nkw=womens+lucchese+"+size+"&_frs=1"
    }

    request(queryUrl, function(error, response, html) {
        var $ = cheerio.load(html);
        var result = {};

        $("li.lvresult").each(function(i, element) {
            result.link = $(element).find("a").attr("href");
            result.title = $(element).find("h3").find("a").text().toLowerCase();
           result.image = $(element).find("img").attr("src");
            result.price = $(element).find("li").find("span").text();
            result.size = size;
            result.gender = gender;

            var newEntry = new Boot(result);

            newEntry.save(function(error, doc) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(doc);
                }
            });
        });
        console.log(result);
        res.redirect("/");
    });
});

app.delete("/reset", function(req, res) {
    Boot.remove({}, function(err, row) {
        if (err) {
            console.log("Collection couldn't be removed" + err);
            return;
        }
        console.log("collection removed");
        res.redirect("/");
      }) 
});

app.get("/boots", function(req, res) {
    Boot.find({}, function(error, doc) {

        if (error) {
            res.send(error);
        } else {
            res.send(doc);
        }
    });
});

app.get("/comments", function(req, res) {
    Comments.find({}, function(error, doc) {
        if (error) {
            res.send(error);
        } else {
            res.send(doc);
        }
    });
});

app.get("/boots/:id", function(req, res) {
    Boot.findOne({_id: req.params.id}).populate("comments").exec(function(error, doc) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(doc);
        }
    });
});


app.post("/watch/:id", function(req, res) {
    console.log(req.params.id)
    Boot.update({ _id: req.params.id }, { $set: { watch: true }}, function(err, data) {
    if (err) {
        throw err;
    } else {
        res.redirect("/");
    }
    });
});

app.post("/comments/:id", function(req, res) {
    // Use our Note model to make a new note from the req.body
    var newComments = new Comments(req.body);
    // Save the new note to mongoose
    newComments.save(function(error, doc) {
        // Send any errors to the browser
        if (error) {
            res.send(error);
        }
        // Otherwise
        else {
            // Find our user and push the new note id into the User's notes array
            Boot.findOneAndUpdate({}, { $push: { "comments": doc._id } }, { new: true }, function(err, newdoc) {
                // Send any errors to the browser
                if (err) {
                    res.send(err);
                }
                // Or send the newdoc to the browser
                else {
                    res.send(newdoc);
                }
            });
        }
    });
});

}