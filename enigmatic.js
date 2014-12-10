$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
Element.prototype.$ = Element.prototype.querySelector;
Element.prototype.$$ = Element.prototype.querySelectorAll;

Element.prototype.child = function(h, type) {
  var e = document.createElement(type || 'div');
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
