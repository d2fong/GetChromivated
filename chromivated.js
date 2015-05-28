'use strict';



var getMotivatedPics = function() {
  var img = document.getElementById('get-chromivated');

  var url = "http://www.reddit.com/r/GetMotivated/.json"
  var req = new XMLHttpRequest;
  req.open("GET", url, true);
    
  req.onload = function() {
    var jsonResp = JSON.parse(req.responseText);
    var submissions = jsonResp['data']['children'].sort(function(a,b) {
      return parseFloat(a['ups']) > parseFloat(b['ups']);
    });
    var random_img_not_found = true;
    while (random_img_not_found) {
        var submission = submissions[Math.floor(Math.random()*submissions.length)]['data'];
        var url = submission['url'];
        if (submission['link_flair_css_class'] == 'image') {
          var img_extension = url.substr(url.length - 4, url.length-1);
          console.log(url);
          console.log(img_extension);
          if (img_extension == '.png' ||  img_extension == '.jpg') {
            img.src = url;
          } else {
            url += '.png';
            img.src = url;
          }
          random_img_not_found = false;

        }
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
