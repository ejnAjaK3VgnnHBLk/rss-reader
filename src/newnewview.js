var fs = require("fs");
var path = require("path");
var parser = require("rss-parser-browser");
var jsonfile = require("jsonfile");

var jsonStr;

var content = fs.readFileSync("feeds.json");
var jsonContent = JSON.parse(content);

var addFeedsHereDiv = document.getElementById("addFeedsHere");
var feedEntriesDiv = document.getElementById("content"); // Update this

function rssOnLoad() {
  for (let currentFeedd in jsonContent.feeds) {
    var feedName = document.createTextNode(jsonContent.feeds[currentFeedd].name);
    var feedEntry = document.createElement("li");
    var a = document.createElement("a");
    var ul = document.getElementById("mainMenu");
    feedEntry.setAttribute("id", "ul-" + currentFeedd);
    ul.appendChild(feedEntry);
    a.setAttribute("href", "javascript:feedClicked('"+jsonContent.feeds[currentFeedd].url+"')");
    a.appendChild(feedName);
    document.getElementById("ul-"+currentFeedd).appendChild(a);
  };
  feedClicked(jsonContent.feeds[0].url);
}

function feedClicked(url) {
  feedEntriesDiv.innerHTML = ''; // clear the div
  parser.parseURL(url, function(err, parsed) {
    parsed.feed.entries.forEach(function(entry) {
      var addToMe = document.getElementById("content");
      var text = document.createTextNode(entry.title);
      var entryy = document.createElement("p");
      var hr = document.createElement("hr");

      var titleback = (entry.title).replace(/ /g,"");
      var result = entry.title.link(entry.link);
      //entryy.appendChild(result); // Append text to h3

      entryy.setAttribute("id", titleback); // Add id to h3
      entryy.setAttribute("style", "font-weight: normal; font-color: black;")

      feedEntriesDiv.appendChild(entryy); // Append h3 to div

      document.getElementById(titleback).innerHTML = result;
      feedEntriesDiv.appendChild(hr);
    })
  });
}

function addFeed() {
    feedEntriesDiv.innerHTML = '';
    var name = document.createElement('input');
    var url = document.createElement('input');
    var button = document.createElement('button');
    var br = document.createElement('br');

    name.setAttribute("type", "text");
    name.setAttribute("placeholder", "Name");
    name.setAttribute("id", "text-name");
    name.setAttribute("class",  "form-control");
    url.setAttribute("type", "text");
    url.setAttribute("placeholder", "URL");
    url.setAttribute("id", "text-url");
    url.setAttribute("class", "form-control")
    button.setAttribute("onclick", "createFeed()");
    button.setAttribute("class", "btn btn-outline-dark")
    button.innerHTML = 'Add the feed';

    feedEntriesDiv.appendChild(name);
    feedEntriesDiv.appendChild(br);
    feedEntriesDiv.appendChild(url);
    feedEntriesDiv.appendChild(br);
    feedEntriesDiv.appendChild(button);
}

function createFeed() {
  const file = "feeds.json";
  const jsonfile = require("jsonfile");
  var jsonContent = fs.readFileSync(file);

  // Name element
  var dataone = document.getElementById("text-name").value;
  // URL element
  var datatwo = document.getElementById("text-url").value;
  var obje = JSON.parse(jsonContent);
  obje['feeds'].push({"name":dataone,"url":datatwo});
  jsonStr = JSON.stringify(obje);
  fs.writeFile('feeds.json', jsonStr, (err) => {
    if (err) {
      console.error(err);
      return;
    };
    location.reload();
  })
}
