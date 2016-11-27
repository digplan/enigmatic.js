  window.$ = document.querySelectorAll.bind(document);
  NodeList.prototype.forEach = Array.prototype.forEach;
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
  cln = function(v, e){
    for(i in v){
      var ch = e.querySelector(`[data=${i}`);
      ch.innerHTML = v[i];
    }
  }
   arr: function(v, e){
      var first = v.shift();
      cln(first, e);
      v.forEach((i)=>{
       var ne = e.cloneNode(true);
       e.parentElement.appendChild(ne);
       cln(i, ne);
      })
    }
    
  window.data = new Proxy({}, {
    set: (t, p, v, r) => {
      var me = this;
      window.$(`[data=${p}]`).forEach((e) => {
         ['value', 'innerHTML'].forEach((k)=>{
            if(e[k]) {
              if(v.push) return this.arr(v, e);
              e[k] = v;
            }
         });
      });
      t[p] = v;
    }
  });
  window.data.me = 'test';
  window.data.you = [{a:1},{a:2},{a:3}];
