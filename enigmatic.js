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
  
  enig.ajax = (method, url, options) => {
    if(!options) options = {};
    if(!options.headers) options.headers = {};
    return new Promise(function (resolve, reject) {
        var x = new XMLHttpRequest();
        x.open(method, url);
        for(var k in options.headers) 
          x.setRequestHeader(k, options.headers[k]);
        x.onload = (ev)=>{ 
          var obj = {response: ev.target.response, headers: x.getAllResponseHeaders().split('\n'), json: null};
          try {
            obj.json = JSON.parse(ev.target.response);
          } catch(e){}
          if(options.setvalue && obj.json) enig.data[options.setvalue] = obj.json;
          resolve(obj);
        };
        x.onerror = reject;
        x.send(options.data);
    });
  }
  enig.get = (url, options)=>{
    return enig.ajax('GET', url, options);
  }
  
  enig.data = new Proxy({}, {
    set: function(target, property, value, receiver) {
      $(`[data=${property}]`).forEach(function(e){
         var v = value;
         var prop = e.getAttribute('data-property');
         if(prop) v = eval('value.' + prop);
         if(e.setValue) e.setValue(v);
         if(e.render) e.render(v);
      });
      target[property] = value;
    }
  });
  
  enig.format = function(str, obj) {
    return str.replace(/\${[^}]*}/g, function(o) { return obj[o.replace(/\$|{|}/g,'')] });
  }

  window.onload = enig.process = function(){
    if(enig.preready) enig.preready();
    $('[control]').forEach((e)=>{
      var ename = e.tagName.toLowerCase();
      e.css = (rules, sel)=>{
        var style = document.createElement("style");
        document.head.appendChild(style);
        style.sheet.insertRule(`${sel||e.tagName} { ${rules} }`); 
      }
      enig[ename](e);
    });
    if(enig.ready) enig.ready();
  };

  window.enig = enig;
})();
