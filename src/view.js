/*let $ = require('jquery')
let count = 0
$('#click-counter').text(count.toString())
$('#countbtn').on('click', () => {
  count ++
  $('#click-counter').text(count)
})*/

var parser = require('rss-parser-browser');
// var entries = document.getElementById("click-counter");
parser.parseURL('https://www.reddit.com/.rss', function(err, parsed) {
  // entries.innerHTML = parsed.feed.title;
  document.createTextNode(parsed.feed.title);
  parsed.feed.entries.forEach(function(entry) {

    var element = document.createElement('h3');
    var titleback = (entry.title).replace(/ /g,'');
    element.setAttribute('id', titleback);
    document.body.appendChild(element);

    var title = entry.title;
    var result = title.link(entry.url);

    document.getElementById(titleback).innerHTML = result;
  })
})
