enig.data = new Proxy({}, {
    set: function(target, property, value, receiver) {
      $(`[data=${property}]`).forEach(function(e){
         if(e.setValue) e.setValue(value);
         else if(typeof e.value != 'undefined') e.value = value;
         else if(typeof e.innerHTML != 'undefined') e.innerHTML = value;
      });
      target[property] = value;
    }
});