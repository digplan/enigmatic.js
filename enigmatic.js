$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

var load = function(s, cb) {
    var i = document.body.appendChild(document.createElement('script'));
    i.onload = cb;
    i.src = s;
}

var ajax = function(verb, u, d, cb) {
    var x = new XMLHttpRequest;
    x.open(verb, u, true);
    if(verb != 'GET') 
      x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    x.send(d);
    x.onload = function(r) {
        var resp = r.target.responseText;
        try {
            resp = JSON.parse(resp);
        } catch (e) {}
        (cb || console.log.bind(console))(resp);
    };
}

var get = function(u, cb){ return ajax('GET', u, cb)}
var post = function(u, d, cb){ return ajax('POST', u, d, cb)}
var put = function(u, d, cb){ return ajax('PUT', u, d, cb)}
window.delete = function(u, d, cb){ return ajax('DELETE', u, d, cb)}

window.onload = function() {
    load('http://twitter.github.com/hogan.js/builds/3.0.1/hogan-3.0.1.js', setup);
}

function sliceNodes(what, each){
   Array.prototype.slice.call(what).forEach(each);
}

function setup() {
    sliceNodes($$('[hidden]'), function(e) {
        console.log(e)
        e.template = Hogan.compile(e.innerHTML);
        e.render = function(o) {
            if (typeof o === 'string')
                return get(o, arguments.callee);
            e.innerHTML = e.template.render(o);
            e.hidden = false;
        }
    })
    sliceNodes($$('[control]'), function(e) {
        var o = {};
        sliceNodes(e.attributes, function(a) {
            o[a.nodeName] = a.nodeValue;
        })
        e.innerHTML = window[e.tagName.toLowerCase()](o, e);
    })
    window.ready && window.ready();
}
