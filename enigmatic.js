/*****************
 *    enigmatic
 */
var enigmatic = {};
enigmatic.version = '2016.05.28';

/*****************
 *    helpers
 */
var $ = document.querySelectorAll.bind(document);
/*  $('#id').innerHTML = 'some html'  */

NodeList.prototype.forEach = Array.prototype.forEach;
/*  $('div').forEach(...)   */

HTMLCollection.prototype.forEach = Array.prototype.forEach;
/*  $('div').forEach(...)   */

// Element helpers
Element.prototype.$ = Element.prototype.querySelectorAll;
/*  $('#id').innerHTML = 'somehtml'  */

Element.prototype.attr = function(name) {
  var node = this.attributes.getNamedItem(name);
  return node ? node.value : null;
};
/*  var attr_value = $('#id').attr('myattribute')  */

Element.prototype.control = function(name, attr, inner) {
  attr = attr || {};
  attr.control = '';
  var e = this.child(inner || '', name, attr);
  this.controls();
  return e;
}
/*  create control:  document.body.control('youtube', {watch: 'xxxxxx'})  */

Element.prototype.controls = function() {
  var parent = this;
  parent.$('[control]').forEach(function(e) {
    var o = {},
      controls = e.tagName + ' ' + e.attr('control');
    controls.split(' ').forEach(function(name) {
      var name = name.toLowerCase().trim();
      if(name && !name.match(/input|div/)) processcontrol(name, e);
    });
  });
}
/*  process controls:  document.body.controls()  */

Element.prototype.set = function(s) {
  return this[this.hasOwnProperty('value') ? 'value' : 'innerHTML'] = s;
}
/*  $('#myinput').set('value');  $('#mydiv').set('value');  */

Element.prototype.classes = function(s) {
  s.split(' ').forEach(function(c){
  	this.classList.add(c);
  }.bind(this));
  return this;
}
/*  $('#myinput').classes('classone classtwo');  */

Element.prototype.child = function(s, type, attrs, style) {
  var e = document.createElement(type || 'div');
  s && e.set(s);
  for(i in (attrs || {}))
  	e.setAttribute(i, attrs[i]);
  for(i in (style || {}))
  	e.style[i] = style[i];
  return this.appendChild(e);
}
/*  $('#mydiv').child('sometext', 'myclass', {attr1: '', attr2: ''}, {height:'100px'});  */


/*****************
 *    process controls
 */
 
var body = document.body;

enigmatic.load = function(s, cb) {
  var css = s.match(/css$/);
  var i = body.appendChild(document.createElement(css ? 'link' : 'script'));
  i.onload = cb;
  if (css)
    css.rel = "stylesheet";
  i[css ? 'href' : 'src'] = s;
  console.log('loading ' + s);
  css && cb && cb();
}
/*  load('script.js', callback)  */

function processcontrol(name, e) {
  if (!window[name])
    throw Error('no control definition ' + name);
  console.log(name, e);
  var res = window[name].call(e, function(res) {
    if(res) e.set(res);
  });
  if(res) e.set(res);
}

/*  process controls  */
window.onload = function setup() {
  document.body.controls();
  window.ready && window.ready();
};
/*  function ready(){
      // optional, called wnen controls processing is complete
    }
*/

/*  AJAX  */
enigmatic.method = function(verb, u, d, cb, headers) {
  var x = new XMLHttpRequest;
  x.open(verb, u, true);
  if (typeof d === 'object') 
    d = JSON.stringify(d);
  if(d && d[0] !== '{')
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  if(headers)
    for(var k in headers) x.setRequestHeader(k, headers[k]);
  if(verb == 'GET') d = null;
  x.send(d);
  x.onload = function(r) {
      var resp = r.target.responseText;
      try {
        resp = JSON.parse(resp);
      } catch (e) {}
      (cb || console.log.bind(console))(resp, x.status, x.getAllResponseHeaders().split(/\r?\n/));
  };
}
enigmatic.get = enigmatic.method.bind(this, 'GET');
enigmatic.head = enigmatic.method.bind(this, 'HEAD');
enigmatic.post = enigmatic.method.bind(this, 'POST');
enigmatic.put = enigmatic.method.bind(this, 'PUT');
enigmatic.delete = enigmatic.method.bind(this, 'DELETE'); 
enigmatic.patch = enigmatic.method.bind(this, 'PATCH'); 
