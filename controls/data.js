// usage <ajax href='http://dpsw.info/data.json' control />
// ondata applies a datachannel to an element, .dispatchData(obj)
//  when used with datafrom='id.field', will receive data from that id

function ondata() {
  
  this.dispatchData = function(o) {
    
    this.outdata = o;
    this.dispatchEvent(new CustomEvent('ondata'));
  
  }
  
  if (!this.attr('datafrom'))
    return;
  
  var arr = this.attr('datafrom').split('.');
  
  var datatarget = this;
  $('#' + arr[0]).addEventListener('ondata', function(ev) {
    
    var data = typeof arr[1] === 'undefined' ? ev.target.outdata : ev.target.outdata[arr[1]];
    datatarget.set(data);
  
  });

}

function ajax(){

  // inherit ondata
  ondata.call(this);

  if(!AJAX){

    if(this.loading) 
      throw Error('Could not get AJAX library http://dpsw.info/ajax.js');

    this.loading = true;
    load('http://dpsw.info/ajax.js', arguments.callee);

  }

  var href = this.attr('href');
  
  if(!href)
    throw Error('ajax href must be set');

  var e = this;

  AJAX.get(href, null, function(err, r, b){

    e.dispatchData(b);

  });

}

function teststub(){
  
  this.set = function(s){

    this.innerHTML = 'Test receive: ' + s;

  }

}

/* test
body.innerHTML = '';
e=body.child();
e.id = 'server';
e.setAttribute('control', 'ajax');
e.setAttribute('href', 'http://dpsw.info/data.json');
c=body.child();
c.setAttribute('control', 'teststub ondata');
c.setAttribute('datafrom', 'server.msg');

body.controls();
*/