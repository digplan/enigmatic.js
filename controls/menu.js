function menu() {

  document.addEventListener('click', function(ev) {
    this.hidden = true;
  }.bind(this));

  this.hidden = true;
  var e = this.parentElement.nodeName == 'BODY' ? document : this.parentElement;
  e.addEventListener('click', function(ev) {
    this.hidden = false;
    ev.stopPropagation();
  }.bind(this));

}

function contextmenu() {

  document.addEventListener('click', function(ev) {
    this.hidden = true;
  }.bind(this));

  this.hidden = true;

  document.addEventListener('mousemove', function(e) {
    window.cpos = [e.pageX, e.pageY];
  });

  var e = this.parentElement.nodeName == 'BODY' ? document : this.parentElement;
  e.oncontextmenu = function(ev) {
    this.hidden = false;
    var pos = window.cpos;
    this.style.top = pos[1]-30 + 'px';
    this.style.left = pos[0]-30 + 'px';
    ev.stopPropagation();
    return false;
  }.bind(this);

}

/* test

  menu
body.innerHTML = "";

var ml = body.child('menulink').classes('left padding');
var menulink = ml.control('menu');
menulink.child('', 'li').innerHTML = 'one';
menulink.child('', 'li').innerHTML = 'two';

var ml2 = body.child('menulink').classes('left padding');
var menulink2 = ml2.control('menu');
menulink2.child('', 'li').innerHTML = 'three';
menulink2.child('', 'li').innerHTML = 'four';


body.controls()

  ctxmenu
body.innerHTML = "";
var ctxmenu = body.control('contextmenu');
ctxmenu.child('', 'li').innerHTML = 'one';
ctxmenu.child('', 'li').innerHTML = 'two';
ctxmenu.child('', 'li').innerHTML = 'three';
ctxmenu.child('', 'li').innerHTML = 'four';
var target = body.child('click here').classes('bg-black one one-high');
var ctxmenu2 = target.control('contextmenu');
ctxmenu2.child('', 'li').innerHTML = 'five';
ctxmenu2.child('', 'li').innerHTML = 'six';
ctxmenu2.child('', 'li').innerHTML = 'seven';
body.controls()
*/