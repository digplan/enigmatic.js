(function(){
  
  var enig = {};
  
  enig.load = function(s, cb) {
    var script = document.createElement('script');
    script.onload = cb;
    script.src = s;
    document.getElementsByTagName('head')[0].appendChild(script);
  };
  
  enig.loadcss = function(s, src){
    var i = document.body.appendChild(document.createElement('link'));
    i.rel = "stylesheet";
    if(s) i.href = s;
    if(src) i.innerHTML = src;
  };
  
  window.$ = document.querySelectorAll.bind(document);
  NodeList.prototype.forEach = Array.prototype.forEach;
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
  
  Element.prototype.child = function(type) {
    var e = document.createElement(type||'div');
    return this.appendChild(e);
  };
  
  enig.ajax = function(v, url, d, cb){
      var x = new XMLHttpRequest();
      x.open(v, url, false);
      x.send(d);
      cb(x.responseText);
 };
  
  window.onload = enig.process = function(){
    if(enig.preready) enig.preready();
    $('[control]').forEach(function(e) {
      var ename = e.tagName.toLowerCase();
      window.enig[ename](e);
    });
    if(enig.ready) enig.ready();
  };
  
  window.enig = enig;
  
})();
