function ondata() {
  this.clients = [];

  this.dispatchData = function(o) {  
    console.log('dispatchData', this, o);

    for(e in this.clients){
      var a = this.clients[e];
      var f = Array.isArray(o) ? 'renderAll' : 'render';
      if(o[a[1]]) o = o[a[1]];
      console.log(a[0], o);

      a[0][f](o);
    }
  }
  
  var from = this.datafrom || this.attr('datafrom');
  if (from){
    var a = from.split('.');
    $('#'+a[0]).clients.push([this, a[1]]);
  }
}

// usage: to extend other controls  ondata.call(this)