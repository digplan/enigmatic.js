function eventsource(){
  ondata.call(this);
  var es = new EventSource(this.attr('href'));
  es.onmessage = this.dispatchData.bind(this);
}

/*
body.innerHTML = '{{data}}';
var events = body.control('eventsource', {href:'//http-echo.com/stream'});
ondata.call(body);
body.datafrom(events);
*/