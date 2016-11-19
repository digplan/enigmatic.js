  window.data = new Proxy({}, {
    set: function(target, property, value, receiver) {
      $(`[data=${property}]`).forEach(function(e){
         if(debugdata) console.log(`Setting ${e.tagName} ${property} to ${value}`);
         if(typeof e.value != 'undefined') e.value = value;
         if(e.setValue) e.setValue(value);
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
  window.debugdata = true;
  
  window.value = function(){
    loadcss('', `
      <style>
        value:focus {
          outline: #dbdbdb solid thick;
        }
      </style>
    `);
    if(debugdata) console.log(`init VALUE id=${this.id}`);
    var me = this, k = this.getAttribute('data');
    me.setValue = function(s){
      try{ s = JSON.parse(s);} catch(e){};
      var field = this.getAttribute('field');
      if(field) s = s[field];
      me.innerHTML = JSON.stringify(s);
    };
    me.onkeypress = function(e){
      return e.which != 13;
    };
    me.onblur = function(){ 
      data[k] = me.innerText;
    };
  };
  
  window.datahandler = function(){
    var k = this.getAttribute('data');
    this.setValue = function(v){
      var x = new XMLHttpRequest();
      x.open('GET', `https://httpbin.org/get?${k}=${v}`, false);
      x.send(null);
      console.log(x.responseText);
    };
    
    setTimeout(function(){
      window.ajax.get(`https://httpbin.org/get`, function(s){
        data.remotedata = JSON.parse(s);
      });
    }, 500);
    
  };
