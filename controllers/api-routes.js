// // Requiring our Note and Article models
var Boot = require("../models/boot.js");
var Comments = require("../models/comments.js");

// / // Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {

// Route to scrape Ebay.com & save data to MongoDB
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

// Route to display data from Index.handlebars
app.get("/", function(req, res) {
    Boot.find({}, function(error, docs) {
        if (error) {
            res.send(error);
        } else {
            res.render('index', {
                "boots" : docs});    
        }
    });
});

// Route to reset filter & db collection
app.post("/reset", function(req, res) {
    Boot.remove(function(err, p){
        if(err){ 
            throw err;
        } else{
            console.log('No Of Documents deleted:' + p);
            res.redirect("/");
        }
    });
});

// Route to view all comments
app.get("/comments", function(req, res) {
    Comments.find({}, function(error, doc) {
        if (error) {
            res.send(error);
        } else {
            res.send(doc);
        }
    });
});

// Route to view a specific boot JSON
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

// Route to update a boot to "watched"
app.post("/watch/:id", function(req, res) {
    Boot.update({ _id: req.params.id }, { $set: { watch: true }}, function(err, data) {
    if (err) {
        throw err;
    } else {
        res.redirect("/watching");
    }
    });
});

// Route to display watched boots
app.get("/watching", function(req, res) {
    Boot.find({watch: true}, function(error, docs) {
        if (error) {
            res.send(error);
        } else {
            res.render('watchingBoots', {
                "boots" : docs});    
        }
    });
});

// Route to update a boot to "unwatched"
app.post("/unwatch/:id", function(req, res) {
    Boot.update({ _id: req.params.id }, { $set: { watch: false }}, function(err, data) {
    if (err) {
        throw err;
    } else {
        res.redirect("/watching");
    }
    });
});

}