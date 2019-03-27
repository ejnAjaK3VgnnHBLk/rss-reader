
function rss() {
  var parser = require('rss-parser-browser');
  // var entries = document.getElementById("click-counter");
  parser.parseURL('http://rss.slashdot.org/Slashdot/slashdotMain/to', function(err, parsed) {
    // entries.innerHTML = parsed.feed.title;
    document.createTextNode(parsed.feed.title);
    parsed.feed.entries.forEach(function(entry) {

      var element = document.createElement('h3');
      var titleback = (entry.title).replace(/ /g,'');
      console.log(entry.link);
      element.setAttribute('id', titleback);
      document.body.appendChild(element);

      var title = entry.title;
      var result = title.link(entry.link);

      document.getElementById(titleback).innerHTML = result;
    })
  })
}
function addFeed() {
  var userid = prompt('Userid','');
  var password = prompt('Password','');
  alert('userid = ' + userid + '\npassword = ' + password);
}
