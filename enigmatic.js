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

function docontrols(parent) {
  parent = parent || document.body;
  Array.prototype.slice.call(parent.$$('[control]')).forEach(function(e) {
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

window.addEventListener('load', function() {
  docontrols();
  window.ready && window.ready();
});
