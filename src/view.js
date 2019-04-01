var fs = require("fs");
var jsonStr;
var path = require('path');

var filePath = path.join(__dirname, '../feeds.json');

var contentss = fs.readFileSync("feeds.json");
var jsonContent = JSON.parse(contentss);
console.log(jsonContent);


var jsonContent;
var currentURL;
var currentFeed;


function rss() {
  var parser = require("rss-parser-browser");
  console.log(jsonContent);
  var divt = document.getElementById("feedAddDiv");
  divt.style.display = "none";
  var div = document.createElement("div");
  div.setAttribute("id", "rssFeedDiv");
  for (let unifiedrl in jsonContent.feeds) {
    var currentURL = jsonContent.feeds[unifiedrl].url;
    var currentFeed = jsonContent.feeds[unifiedrl].name;
    parser.parseURL(currentURL, function(err, parsed) {
      console.log(jsonContent.feeds[unifiedrl].name);
      // Only print the name of the feed once.

      var elementTitle = document.createElement("h2");
      elementTitle.setAttribute("id", ((jsonContent.feeds[unifiedrl].name).replace(/ /g,"")));
      document.body.appendChild(elementTitle);
      document.getElementById((jsonContent.feeds[unifiedrl].name).replace(/ /g,"")).innerHTML = (jsonContent.feeds[unifiedrl].name);

      parsed.feed.entries.forEach(function(entry) {
        console.log(entry.title);
        // Create elements.
        var element = document.createElement("h3");
        // Creaate id for the h3, so that they aren"t overwritten
        var titleback = (entry.title).replace(/ /g,"");
        // Add the id we just made to the h3 tag.
        element.setAttribute("id", titleback);
        // Add h3 tag with id to the document.
        div.appendChild(element);
        document.body.appendChild(div);
        // Get article title and url
        var title = entry.title;
        // Make text become hyperlink
        var result = title.link(entry.link);
        // Add hyperlink to the h3
        document.getElementById(titleback).innerHTML = result;

      })
    });
  }
}

function addFeed() {
  var rss = document.getElementById("rssFeedDiv");
  var feedAdd = document.getElementById("feedAddDiv");
  if (rss.style.display == "none") {
    rss.style.display = "block";
    feedAdd.style.display = "none";
    // Hide feed adding
  } else {
    rss.style.display = "none";
    feedAdd.style.display = "block";
    // Show feed adding thing
  }
}

function edit() {
  const file = "feeds.json";
  const jsonfile = require("jsonfile");
  // Name element
  var dataone = document.getElementById("yeet").value;
  // URL element
  var datatwo = document.getElementById("yeettwo").value;

  // console.log(jsonStr);
  var obje = JSON.parse(jsonStr);

  obje['feeds'].push({"name":dataone,"url":datatwo});
  jsonStr = JSON.stringify(obje);
  // console.log(jsonStr);

  fs.writeFile('feeds.json', jsonStr, (err) => {
    if (err) {
      console.error(err);
      return;
    };
    // console.log('File has been written');
  })
}
