(function(){
  
  window.data = new Proxy({}, {
    set: function(target, property, value, receiver) {
      $('[data]').forEach(function(e){
         var de = e.getAttribute('data');
         if(de == property && e.setValue) 
           e.setValue(value);
      });
      target[property] = value;
    },
    get: function(target, property, receiver){
      return target[property];
    }
  });
  //  o.hash = (o).hash();
  //  var id = new Date().getTime()+Math.random();
  //  o.id = id;
  
  window.load = function(s, cb) {
    var script = document.createElement('script');
    script.onload = cb;
    script.src = s;
    document.getElementsByTagName('head')[0].appendChild(script);
  };
  
  window.loadcss = function(s, src){
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

  window.onload = function() {
    $('[control]').forEach(function(e) {
      var ename = e.tagName.toLowerCase();
      window[ename].call(e);
    });
    ready();
  };
})();

function ready(){

   window._onviewchange = (n) => {
     console.log(`view changed to ${n}`);
   };
 
   setInterval(function(){
     data.currenttime = new Date();
   },1000);

   data.incme = 0;
}
