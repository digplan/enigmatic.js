var enigmatic = {};
enigmatic.version = '0.0.3';

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

Element.prototype.control = function(html, tag, attrs, classes) {
  
  var e = this.child(html, tag);
  e.setAttribute('control', '');
  
  for (var name in attrs) {
    e.setAttribute(name, attrs[name])
  }

  if(!classes) return e;

  classes.split(' ').forEach(function(name) {
    e.classList.add(name);
  });

  return e;

}

Element.prototype.set = function(s) {
  return this[this.hasOwnProperty('value') ? 'value' : 'innerHTML'] = s;
}

Element.prototype.child = function(s, type) {
  var e = document.createElement(type || 'div');
  s && e.set(s);
  return this.appendChild(e);
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

function json2qs(o) {
  if (typeof o !== 'object') return o;
  var a = [];
  for (i in o) a.push(i + '=' + o[i]);
  return a.join('&');
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
