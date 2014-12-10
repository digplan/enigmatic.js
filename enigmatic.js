$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
Element.prototype.$ = Element.prototype.querySelector;
Element.prototype.$$ = Element.prototype.querySelectorAll;

Element.prototype.child = function(h) {
  var e = document.createElement('div');
  if (h) e.innerHTML = h;
  this.appendChild(e);
  return e;
}

var load = function(s, cb) {
  var css = s.match(/css$/);
  var i = document.body.appendChild(document.createElement(css ? 'link' : 'script'));
  i.onload = cb;
  if (css)
    css.rel = "stylesheet";
  i[css ? 'href' : 'src'] = s;
  console.log('loading ' + s);
  css && cb && cb();
}

var json2qs = function(o) {
  if (typeof o !== 'object') return o;
  var a = [];
  for (i in o) a.push(i + '=' + o[i]);
  return a.join('&');
}

var ajax = function(verb, u, d, cb) {
  if(typeof window === 'undefined')  // node.js
    var XMLHttpRequest = require('xhr2');
  
  var x = new XMLHttpRequest;
  if (verb == 'GET') u = u + '?' + json2qs(d);
  x.open(verb, u, true);
  if (verb != 'GET') {
    x.setRequestHeader('accept', 'application/json');
    x.setRequestHeader('Content-type', 'application/json');
    if (typeof d === 'object') d = JSON.stringify(d);
  }
  x.send(d);
  x.onload = function(r) {
    var resp = r.target.responseText;
    try {
      resp = JSON.parse(resp);
    } catch (e) {}
    (cb || console.log.bind(console))(resp, r.target.status);
  };
}

var get = function(u, d, cb) {
  return ajax('GET', u, d, cb);
}
var head = function(u, d, cb) {
  return ajax('HEAD', u, d, cb);
}
var post = function(u, d, cb) {
  return ajax('POST', u, d, cb)
}
var put = function(u, d, cb) {
  return ajax('PUT', u, d, cb)
}
window.delete = function(u, d, cb) {
  return ajax('DELETE', u, d, cb)
}

window.onload = function() {
  load('http://twitter.github.com/hogan.js/builds/3.0.1/hogan-3.0.1.js', setup);
}

function sliceNodes(what, each) {
  Array.prototype.slice.call(what).forEach(each);
}

function docontrols(parent) {
  parent = parent || document.body;
  sliceNodes(parent.$$('[control]'), function(e) {
    var o = {},
      control = e.attributes['control'].value || e.tagName;
    sliceNodes(e.attributes, function(a) {
      o[a.nodeName] = a.value;
    })
    if (!window[control.toLowerCase()])
      throw Error('no control definition ' + control);

    // async
    var res = window[control.toLowerCase()](o, e, function(res) {
      if (typeof res === 'undefined' || !res) return;
      typeof res === 'string' ? e.innerHTML = res : window[e.id] = res;
    });
    console.log(control, res);
    if (typeof res === 'undefined' || !res) return;
    typeof res === 'string' ? e.innerHTML = res : window[e.id] = res;
    return;
  });
}

function setup() {
  sliceNodes($$('[template]'), function(e) {
    e.template = Hogan.compile(e.innerHTML);
    e.render = function(o) {
      if (typeof o === 'string')
        o = get(o, arguments.callee);
      e.innerHTML = e.template.render(o);
      e.hidden = false;
    }
  })
  docontrols();
  window.ready && window.ready();
}

String.prototype.f = function() {
  var f = this,
    r = arguments;
  for (a in r) {
    f = f.replace("$", r[a]);
  };
  return f;
}
