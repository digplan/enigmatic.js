enig.data = new Proxy({}, {
    set: function(target, property, value, receiver) {
      $(`[data=${property}]`).forEach(function(e){
         var v = value;
         if(e.getAttribute('field')) v = v[e.getAttribute('field')];
         if(e.setValue) e.setValue(v);
         else if(typeof e.value != 'undefined') e.value = v;
         else if(typeof e.innerHTML != 'undefined') e.innerHTML = v;
      });
      target[property] = value;
    }
});
