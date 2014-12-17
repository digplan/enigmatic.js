function menu() {

  this.children.forEach(function(c){

  });

  var e = this;
  document.addEventListener('click', function(ev) {
    e.hidden = true;
  })

}

function contextmenu() {

  var e = this;
  menu.call(e);
  e.hidden = true;

  document.addEventListener('mousemove', function(e) {
    window.cpos = [e.pageX, e.pageY];
  });

  var target = $('#'+e.attr('target')) || null;

  (target || document).oncontextmenu = function(ev) {
    e.style.position = 'absolute';
    var pos = window.cpos;
    e.style.top = pos[1];
    e.style.left = pos[0];
    ev.stopPropagation();   
    return e.hidden = false;
  };

}

/* test
body.innerHTML = "";
p=body.child('', 'contextmenu');
p.setAttribute('control', 'contextmenu');
child = p.child('', 'li');
child.innerHTML = 'one';
child2 = p.child('', 'li');
child2.innerHTML = 'two'
child3 = p.child('', 'li');
child3.innerHTML = 'three'

z = body.child();
z.classList.add('bg-yellow');
z.classList.add('one');
z.classList.add('two-high');
z.id = 'different';
z.innerHTML = 'Im different menu, right click me';

p2=body.child('', 'contextmenu');
p2.setAttribute('control', 'contextmenu');
p2.setAttribute('target', 'different');
child4 = p2.child('', 'li');
child4.innerHTML = 'four'
child5 = p2.child('', 'li');
child5.innerHTML = 'five'
child6 = p2.child('', 'li');
child6.innerHTML = 'six'

body.controls()
*/