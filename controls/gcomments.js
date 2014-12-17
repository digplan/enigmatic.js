function gcomments() {
  
  this.innerHTML = '<div class="g-comments" data-href="'+location.href+'" data-width="642" data-first_party_property="BLOGGER" data-view_type="FILTERED_POSTMOD"></div>';
  load('https://apis.google.com/js/plusone.js');

}

/* test

body.innerHTML = '';
window.t = body.control('', 'gcomments', {}, 'four two-high');
body.controls();

*/