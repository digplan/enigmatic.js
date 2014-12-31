function editable() {
  
  ondata.call(this);

  this.onclick = function(ev) {
    this.innerHTML = '<input value="{{v}}" />'.replace('{{v}}', this.innerHTML);
    this.onclick = null;
    ev.stopImmediatePropagation();
  }
  
  var e = this;
  function save() {
    if (e.children.length)
      e.innerHTML = e.children[0].value;
    e.onclick = function(ev) {
      e.innerHTML = '<input value="{{v}}" />'.replace('{{v}}', e.innerHTML);
      e.onclick = null;
      ev.stopImmediatePropagation();
    }
    e.dispatchData(e.innerHTML);
  }
  
  e.onkeyup = function(ev) {
    ev.keyCode == 13 && save();
  }

}

/* test
body.innerHTML = "";
var myedit = body.child('Im editable, nice to meet you', 'editable');
myedit.setAttribute('control', '');
myedit.id = 'myedit';

var catcher = body.control('I catch data', 'ondata');
catcher.setAttribute('datafrom', 'myedit');

body.controls();
*/