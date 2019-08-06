var fs = require("fs");
var parser = require("rss-parser-browser");

var jsonContent = JSON.parse(fs.readFileSync("feeds.json"));

var feedEntriesDiv = document.getElementById("content");

function rssOnLoad() {
  for (let currentItem in jsonContent.feeds) {
    var feedEntry = document.createElement("li");
    var a = document.createElement("a");
    var ul = document.getElementById("mainMenu");
    feedEntry.setAttribute("id", "ul-" + currentItem);
    ul.appendChild(feedEntry);
    a.setAttribute("href", "javascript:feedClicked('"+jsonContent.feeds[currentItem].url+"')");
    a.appendChild(document.createTextNode(jsonContent.feeds[currentItem].name));
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
    name.setAttribute("type", "text");
    name.setAttribute("placeholder", "Name");
    name.setAttribute("id", "text-name");
    name.setAttribute("class",  "form-control");

    var url = document.createElement('input');
    url.setAttribute("type", "text");
    url.setAttribute("placeholder", "URL");
    url.setAttribute("id", "text-url");
    url.setAttribute("class", "form-control");

    var button = document.createElement('button');
    button.setAttribute("onclick", "addFeed()");
    button.setAttribute("class", "btn btn-outline-dark")
    button.innerHTML = 'Add the feed';

    var br = document.createElement('br');
    var header = document.createElement('h3');
    header.innerHTML = 'Add a feed.'

    feedEntriesDiv.appendChild(header);
    feedEntriesDiv.appendChild(name);
    feedEntriesDiv.appendChild(br);
    feedEntriesDiv.appendChild(url);
    feedEntriesDiv.appendChild(br);
    feedEntriesDiv.appendChild(button);
}

function addFeed() {
  var jsonContent = fs.readFileSync("feeds.json");
  var jsonStr

  var theName = document.getElementById("text-name").value;
  var theURL = document.getElementById("text-url").value;
  var createdObject = JSON.parse(jsonContent);
  createdObject['feeds'].push({"name":theName,"url":theURL});
  jsonStr = JSON.stringify(createdObject);
  writeToFile('feeds.json', jsonStr);
}

function removeFeedScreen() {
  var body = document.getElementById("content");
  var feed = document.createElement("input");
  body.innerHTML = "";
  feed.setAttribute("type", "text");
  feed.setAttribute("id", "feedToRemove");
  feed.setAttribute("placeholder", "Enter the name of the feed to remove.");
  feed.setAttribute("class", "form-control");

  var button = document.createElement("button");
  button.setAttribute("onclick", "removeFeed()");
  button.setAttribute("class", "btn btn-outline-dark")
  button.innerHTML="Remove the feed";

  var header = document.createElement("h3");
  header.innerHTML="Remove a feed."

  body.appendChild(header);
  body.appendChild(feed);
  body.appendChild(document.createElement("p"));
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
