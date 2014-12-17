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

body.innerHTML = "<link rel='stylesheet' href='//dpsw.info/css.css'>";

body.child('random link should disable', 'a');

e = body.child();
e.hidden = true;
e.id = 'mymodal';
e.innerHTML = "hey there Im modal<br><br>";

b=e.child('', 'button');
b.innerHTML = "OK"
b.classList.add('bg-green');
b.onclick=function(){ e.hide() }

e.hidden = true;
e.setAttribute('control', 'modal');
body.controls();

$('#mymodal').show();

*/