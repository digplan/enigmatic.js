var enigmatic = {};
enigmatic.version = '0.0.1';

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

  var res = window[name](e, function(res) {
    if (typeof res === 'undefined' || !res) return;
    typeof res === 'string' ? e.innerHTML = res : window[e.id] = res;
  });

  if (typeof res === 'undefined' || !res) return;
  typeof res === 'string' ? e.innerHTML = res : window[e.id] = res;
}

function setup() {
  document.body.controls();
  window.ready && window.ready();
}

window.onload = setup;
