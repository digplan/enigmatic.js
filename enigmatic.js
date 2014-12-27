var enigmatic = {};
enigmatic.version = '0.0.4';

$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

Element.prototype.$ = Element.prototype.querySelector;
Element.prototype.$$ = Element.prototype.querySelectorAll;
Element.prototype.attr = function(name) {
  var node = this.attributes.getNamedItem(name);
  return node ? node.value : null;
};

Element.prototype.controls = function() {
  var parent = this;
  parent.$$('[control]').forEach(function(e) {
    var o = {},
      controls = e.tagName + ' ' + e.attr('control');
    controls.split(' ').forEach(function(name) {
      var name = name.toLowerCase().trim();
      if(name && !name.match(/input|div/)) processcontrol(name, e);
    });
  });
}

Element.prototype.set = function(s) {
  return this[this.hasOwnProperty('value') ? 'value' : 'innerHTML'] = s;
}

Element.prototype.child = function(s, type, attrs, classes, style) {
  var e = document.createElement(type || 'div');
  s && e.set(s);
  
  classes && classes.split(' ').forEach(function(cls){
  	e.classList.add(cls);
  });

  for(i in (attrs || {}))
  	e.setAttribute(i, attrs[i]);

  for(i in (style || {}))
  	e.style[i] = style[i];

  return this.appendChild(e);
}

Element.prototype.renderAll = function(obj) {
  var t = this.template || this.innerHTML;
  this.template = t;
  this.innerHTML = '';
  var all = '';
  obj.forEach(function(o){
    var htm = t;
  	for(i in o)
  	  htm = htm.replace('{{'+i+'}}', o[i]);
  	all += htm;
  });
  this.innerHTML = all;
  this.hidden = false;
}

Element.prototype.render = function(obj) {
  this.template = this.template || this.innerHTML;
  var all = this.template;
  for(i in obj)
  	all = all.replace('{{'+i+'}}', obj[i]);
  this.innerHTML = all;
  this.hidden = false;
}

NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;

var body = document.body;

function load(s, cb) {
  var css = s.match(/css$/);
  var i = document.body.appendChild(document.createElement(css ? 'link' : 'script'));
  i.onload = cb;
  if (css)
    css.rel = "stylesheet";
  i[css ? 'href' : 'src'] = s;
  console.log('loading ' + s);
  css && cb && cb();
}

function processcontrol(name, e) {

  if (!window[name])
    throw Error('no control definition ' + name);

  console.log(name, e);

  var res = window[name].call(e, function(res) {
    if(res) e.set(res);
  });

  if(res) e.set(res);

}

function setup() {
  document.body.controls();
  window.ready && window.ready();
}

window.onload = setup;
