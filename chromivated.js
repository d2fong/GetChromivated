'use strict';

var getMotivatedPics = function() {
  var url = "http://www.reddit.com/r/GetMotivated/.json"
  var req = new XMLHttpRequest;
  req.open("GET", url, true);
    
  req.onload = function() {
    var jsonResp = JSON.parse(req.responseText);
    var submissions = jsonResp['data']['children'].sort(function(a,b) {
      return parseFloat(a['ups']) > parseFloat(b['ups']);
    });

    var random_img_not_found = true,
        img = document.getElementById('get-chromivated'),
        default_img = document.getElementById('default'),
        num_tries = 0;

    while(random_img_not_found && num_tries < 20) {

      var submission = submissions[Math.floor(Math.random()*submissions.length)]['data'];
      if ((submission['title'].slice(0,7)) == '[Image]') {
        img.src = submission['preview']['images'][0]['source']['url'];
        random_img_not_found = false;
      } 
      num_tries++;
    }
    if (num_tries >= 20) {
      default_img.className = "center fit";
    }
  }

  req.send();
}

function set_body_height() { 
    $('body').height($(window).height());
}


$(document).ready(function() {
    $(window).bind('resize', set_body_height);
    getMotivatedPics();
    set_body_height();
});
