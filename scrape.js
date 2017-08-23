// var cheerio = require("cheerio");
// var request = require("request");

// // request("https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313.TR11.TRC1.A0.H0.Xlucchese+womens.TRS0&_nkw=lucchese+womens&_sacat=0", function(error, response, html) {

// //     var $ = cheerio.load(html);
// //     var results = [];

// //     $("li.lvresult").each(function(i, element) {

// //         var link = $(element).find("a").attr("href");
// //         var title = $(element).find("h3").find("a").text().toLowerCase();
// //         var image = $(element).find("img").attr("src");
// //         var price = $(element).find("li").find("span").text();

// //         results.push({
// //             title: title,
// //             link: link,
// //             image: image,
// //             price: price
// //         });
// //     });
// //     console.log(results);
// // });