function fbcomments(){

  this.innerHTML = '<div class="fb-comments" href="dpsw.info"></div>'
  load('http://connect.facebook.net/en_US/all.js#xfbml=1');
  
}

/* test

body.innerHTML = '';
t = body.control('', 'fbcomments', {}, 'four two-high');

body.controls();

*/