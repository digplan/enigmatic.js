$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

var load = function(s, cb) {
    var i = document.body.appendChild(document.createElement('script'));
    i.onload = cb; i.src = s;
}

var get = function(u, cb) {
    var x = new XMLHttpRequest;
    x.open('GET', u, true);
    x.send();
    x.onload = function(r) {
        var resp = r.target.responseText;
        try {
            resp = JSON.parse(resp);
        } catch (e) {}
        (cb || console.log.bind(console))(resp);
    };
}

window.onload = function(){
  load('http://twitter.github.com/hogan.js/builds/3.0.1/hogan-3.0.1.js', setup);
}

function setup(){
	Array.prototype.slice.call($$('[hidden]')).forEach(function(e){
	  console.log(e)
	  e.template = Hogan.compile(e.innerHTML);
	  e.render = function(o){
	  	if(typeof o === 'string')
	  	  return get(o, arguments.callee);
	  	e.innerHTML = e.template.render(o); e.hidden = false;
	  }
	})
	ready();
}
