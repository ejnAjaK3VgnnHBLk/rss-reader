var fs = require("fs");
var path = require("path");
var parser = require("rss-parser-browser");

var content = fs.readFileSync("feeds.json");
var jsonContent = JSON.parse(content);

var addFeedsHereDiv = document.getElementById("addFeedsHere");
var feedEntriesDiv = document.getElementById("addEntriesHere"); // Update this

function rssOnLoad() {
  for (let currentFeedd in jsonContent.feeds) {

    var feedName = document.createTextNode(jsonContent.feeds[currentFeedd].name);
    var feedEntry = document.createElement("li");
    var a = document.createElement("a");
    var ul = document.getElementById("mainMenu");

    console.log(feedName)

    feedEntry.setAttribute("id", "ul-" + currentFeedd);
    ul.appendChild(feedEntry);
    a.setAttribute("href", "javascript:feedClicked('"+jsonContent.feeds[currentFeedd].url+"')");
    a.appendChild(feedName);
    document.getElementById("ul-"+currentFeedd).appendChild(a);
  };
  feedClicked(jsonContent.feeds[0].url);
}

function feedClicked(url) {
//  feedEntriesDiv.innerHTML = ''; // clear the div
  parser.parseURL(url, function(err, parsed) {
    parsed.feed.entries.forEach(function(entry) {
      var text = document.createTextNode(entry.title);
      var entryy = document.createElement("h3");
      var titleback = (entry.title).replace(/ /g,"");
      var result = entry.title.link(entry.link);
      //entryy.appendChild(result); // Append text to h3
      entryy.setAttribute("id", titleback); // Add id to h3
      feedEntriesDiv.appendChild(entryy); // Append h3 to div
      document.getElementById(titleback).innerHTML = result;
    })
  });
}

function toptopkek() {
  var divExisting = document.getElementById("addEntriesHere");

  var div = document.createElement("div");
  var ht = document.createElement("h3");
  var text = document.createTextNode("This is new next.");
  ht.appendChild(text);
  div.appendChild(ht);

  divExisting.appendChild(div);
}
