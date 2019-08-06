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
  for (let currentItem in jsonContent.feeds) {
    var feedName = document.createTextNode(jsonContent.feeds[currentItem].name);
    var feedEntry = document.createElement("li");
    var a = document.createElement("a");
    var ul = document.getElementById("mainMenu");
    feedEntry.setAttribute("id", "ul-" + currentItem);
    ul.appendChild(feedEntry);
    a.setAttribute("href", "javascript:feedClicked('"+jsonContent.feeds[currentItem].url+"')");
    a.appendChild(feedName);
    document.getElementById("ul-"+currentItem).appendChild(a);
  };
  feedClicked(jsonContent.feeds[0].url);
}

function feedClicked(url) {
  feedEntriesDiv.innerHTML = ''; // clear the div
  parser.parseURL(url, function(err, parsed) {
    parsed.feed.entries.forEach(function(entry) { // entry is giving us a name and url
      var entryItem = document.createElement("a");
      var line = document.createElement("hr");

      entryItem.setAttribute("href", "javascript:showPage('"+entry.link+"')");
      entryItem.innerHTML = entry.title;

      feedEntriesDiv.appendChild(entryItem);
      feedEntriesDiv.appendChild(document.createElement("hr"));
    })
  });
}

function showPage(url) {
  var iframe = document.createElement("iframe");
  var content = document.getElementById("content");

  content.innerHTML = '';

  iframe.setAttribute("src", url);
  iframe.setAttribute("style", "width: 100%; height: 100%;");

  content.appendChild(iframe);
}

function addFeedScreen() {
    feedEntriesDiv.innerHTML = '';
    var name = document.createElement('input');
    var url = document.createElement('input');
    var button = document.createElement('button');
    var br = document.createElement('br');
    var header = document.createElement('h3');

    name.setAttribute("type", "text");
    name.setAttribute("placeholder", "Name");
    name.setAttribute("id", "text-name");
    name.setAttribute("class",  "form-control");
    url.setAttribute("type", "text");
    url.setAttribute("placeholder", "URL");
    url.setAttribute("id", "text-url");
    url.setAttribute("class", "form-control")
    button.setAttribute("onclick", "addFeed()");
    button.setAttribute("class", "btn btn-outline-dark")
    button.innerHTML = 'Add the feed';
    header.innerHTML = 'Add a feed.'

    feedEntriesDiv.appendChild(header);
    feedEntriesDiv.appendChild(name);
    feedEntriesDiv.appendChild(br);
    feedEntriesDiv.appendChild(url);
    feedEntriesDiv.appendChild(br);
    feedEntriesDiv.appendChild(button);
}

function addFeed() {
  const file = "feeds.json";
  const jsonfile = require("jsonfile");
  var jsonContent = fs.readFileSync(file);

  // Name element
  var theName = document.getElementById("text-name").value;
  // URL element
  var theURL = document.getElementById("text-url").value;
  var obje = JSON.parse(jsonContent);
  obje['feeds'].push({"name":theName,"url":theURL});
  jsonStr = JSON.stringify(obje);
  writeToFile('feeds.json', jsonStr);
}

function removeFeedScreen() {
  var body = document.getElementById("content");
  var feed = document.createElement("input");
  var button = document.createElement("button");
  var indent = document.createElement("p");
  var header = document.createElement("h3");

  body.innerHTML = "";
  feed.setAttribute("type", "text");
  feed.setAttribute("id", "feedToRemove");
  feed.setAttribute("placeholder", "Enter the name of the feed to remove.");
  feed.setAttribute("class", "form-control");

  button.setAttribute("onclick", "removeFeed()");
  button.setAttribute("class", "btn btn-outline-dark")
  button.innerHTML="Remove the feed";
  header.innerHTML="Remove a feed."

  body.appendChild(header);
  body.appendChild(feed);
  body.appendChild(indent);
  body.appendChild(button);
}

function removeFeed() {
  var toRemove = document.getElementById("feedToRemove").value;

  for (var i = 0; i<jsonContent.feeds.length; i++) {
    if (jsonContent.feeds[i].name == toRemove) {
      jsonContent.feeds.splice(i, 1);
    }
  }
  var output = JSON.stringify(jsonContent)
  writeToFile('feeds.json', output);
}

function writeToFile(file, toWrite) {
  fs.writeFile(file, toWrite, (err) => {
    if (err) {
      console.error(err);
      return;
    };
    location.reload();
  })
}
