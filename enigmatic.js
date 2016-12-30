(function(){
  
  var enig = {};
  enig.loadedScripts = {};
  
  enig.load = function(s, cb) {
    if(enig.loadedScripts[s]){
       console.log(s + ' already loaded');
       if(cb) cb();
       return;
    }
    enig.loadedScripts[s] = true;
    var script = document.createElement('script');
    script.onload = () => {
      if(cb) cb();
    }
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
  
  enig.ajax = (method, url, data={}, headers={}) => {
    return new Promise(function (resolve, reject) {
        var x = new XMLHttpRequest();
        x.open(method, url);
        for(var k in headers) 
          x.setRequestHeader(k, headers[k]);
        x.onload = (ev)=>{ resolve({response: ev.target.response, headers: x.getAllResponseHeaders().split('\n')}) };
        x.onerror = reject;
        x.send(data);
    });
  }
  enig.get = enig.ajax.bind(this, 'GET');
  
  enig.format = function(str, obj) {
    return str.replace(/\${[^}]*}/g, function(o) { return obj[o.replace(/\$|{|}/g,'')] });
  }

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
