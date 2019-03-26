let $ = require('jquery')
let count = 0
$('#click-counter').text(count.toString())
$('#countbtn').on('click', () => {
  count ++
  $('#click-counter').text(count)
})

var parser = require('rss-parser-browser');
// var entries = document.getElementById("click-counter");
parser.parseURL('https://www.reddit.com/.rss', function(err, parsed) {
  // entries.innerHTML = parsed.feed.title;
  console.log(parsed.feed.title);
  parsed.feed.entries.forEach(function(entry) {
    // entries.innerHTML = entry.title + ':' + entry.link;
    console.log(entry.title + ':' + entry.link);
  })
})
