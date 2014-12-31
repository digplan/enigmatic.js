function ondata() {
  
  this.clients = [];

  this.render = this.render || console.log.bind(console);
  this.renderAll = this.renderAll || console.log.bind(console);

  this.dispatchData = function(o) {  
    for(e in this.clients){
      var target = this.clients[e];
      var f = Array.isArray(o) ? 'renderAll' : 'render';
      if(window.debug) console.log('dispatchData', target, o);
      target[f](o);
    }
  }
  
  this.datafrom = function(from){
    if(!from) return;
    var src = (typeof from === 'string') ? $('#'+from.split('.')[0]) : from;
    src.clients.push(this);
  }

  this.datafrom(this.attr && this.attr('datafrom'));

}
