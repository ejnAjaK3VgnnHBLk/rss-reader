var fs = require('fs')

document.addEventListener("keydown", function (e) {
  if (e.which === 123) {
    require('remote').getCurrentWindow().toggleDevTools();
  } else if (e.which === 116) {
    location.reload();
  }
});

// For test purposes
function edit() {
  fs.appendFile('feeds', 'works', function (err) {
    if (err) throw err;
    console.log('Saved!');
  })
}
// For


/* WIP:
var divtwo = document.createElement('div');
divtwo.setAttribute('id', 'feedAddDiv');
document.body.appendChild(divtwo);*/

function rss() {
  var div = document.createElement('div');
  div.setAttribute('id', 'rssFeedDiv');

  var parser = require('rss-parser-browser');

  parser.parseURL('http://rss.slashdot.org/Slashdot/slashdotMain/to',

  function(err, parsed) {
    document.createTextNode(parsed.feed.title);
    parsed.feed.entries.forEach(function(entry) {
      // Create elements.
      var element = document.createElement('h3');
      // Creaate id for the h3, so that they aren't overwritten
      var titleback = (entry.title).replace(/ /g,'');
      // Add the id we just made to the h3 tag.
      element.setAttribute('id', titleback);
      // Add h3 tag with id to the document.
      div.appendChild(element);
      document.body.appendChild(div);
        //document.body.appendChild(element);
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
  var rss = document.getElementById('rssFeedDiv');
  // WIP: var feedAdd = document.getElementById('')
  if (rss.style.display == 'none') {
    rss.style.display = 'block';
    // Hide feed adding
  } else {
    rss.style.display = 'none';
    // Show feed adding thing
  }
}
