var fs = require("fs");
var jsonStr;
fs.readFile('feeds', 'utf-8', function(err, contents) {
  jsonStr = contents;
})
console.log(jsonStr);

function edit() {
  const file = "feeds";
  const jsonfile = require("jsonfile");
  // Name element
  var dataone = document.getElementById("yeet").value;
  // URL element
  var datatwo = document.getElementById("yeettwo").value;

  // Now i understand
  console.log(jsonStr);
  var object = JSON.parse(jsonStr);
  object['feeds'].push({"name":dataone,"url":datatwo});
  jsonStr = JSON.stringify(object);
  console.log(jsonStr);

  fs.writeFile('feeds', jsonStr, (err) => {
    if (err) {
      console.error(err);
      return;
    };
    console.log('File has been written');
  })
}


function rss() {
  var divt = document.getElementById("feedAddDiv");
  divt.style.display = "none";
  var div = document.createElement("div");
  div.setAttribute("id", "rssFeedDiv");

  var parser = require("rss-parser-browser");

  parser.parseURL("http://rss.slashdot.org/Slashdot/slashdotMain/to", function(err, parsed) {
    document.createTextNode(parsed.feed.title);
    parsed.feed.entries.forEach(function(entry) {
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
  })
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
