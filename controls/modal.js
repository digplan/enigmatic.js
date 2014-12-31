function modal() {
  this.classList.add('center-screen');
  this.style.zIndex = 1001;
  var overlay = body.child('');
    overlay.classList.add('overlay');
    overlay.hidden = true;
  var me = this;
  this.show = function(){ 
    overlay.hidden = e.hidden = false;
    document.onkeyup=function(k){k.keyCode==13 && me.hide(); };
  };
  this.hide = function(){
    overlay.hidden = me.hidden = true; 
  };
  this.hidden = false;
}

/* test

body.innerHTML = '<a>link should be disabled</a>';

var e = body.control('modal', {id: 'mymodal'}, "hey there Im modal<br><br>");
e.hidden = true;

var b = e.child('', 'button').classes('bg-green');
b.innerHTML = 'OK';
b.onclick=function(){ e.hide() }

$('#mymodal').show();

*/