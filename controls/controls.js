var AJAX = {};

(function (AJAX) {

  var json2qs = function(o) {
    if (typeof o !== 'object') return o;
    var a = [];
    for (i in o) a.push(i + '=' + o[i]);
    return a.join('&');
  }
  
  AJAX.method = function(verb, u, d, cb) {
    var XMLHttpRequest = typeof window !== 'undefined' ? window.XMLHttpRequest : require('xhr2');
    var x = new XMLHttpRequest;
    if (verb == 'GET' && d && Object.keys(d).length) u = u + '?' + json2qs(d);
    x.open(verb, u, true);
    if (verb != 'GET') {
      x.setRequestHeader('accept', 'application/json');
      x.setRequestHeader('Content-type', 'application/json');
      if (typeof d === 'object') d = JSON.stringify(d);
    }
    x.send(d);
    x.onload = function(r) {
      var resp = r.target.responseText;
      try {
        resp = JSON.parse(resp);
      } catch (e) {}

      var err = r.target.status.toString()[0] !== "2";
      (cb || console.log.bind(console))(resp);
    };
  }

  AJAX.get = AJAX.method.bind(this, 'GET');
  AJAX.head = AJAX.method.bind(this, 'HEAD');
  AJAX.post = AJAX.method.bind(this, 'POST');
  AJAX.put = AJAX.method.bind(this, 'PUT');
  AJAX.delete = AJAX.method.bind(this, 'DELETE'); 
  
})(typeof exports !== 'undefined' ? exports : AJAX);


function ajax(){
  ondata.call(this);
  var e = this;
  AJAX.get(e.attr('href'), null, function(b){
    try{
      b = jsyaml.load(b);
    } catch(e){}
    e.dispatchData(b)
  });
}

function appstore(){
  this.innerHTML = '<meta name="apple-itunes-app" content="app-id={{id}}">'.replace('{{id}}', this.attr('id'));
}

// usage <appstore id='317642398'>   
// viewable on ios only
function autocomplete() {

  ondata.call(this);

  var e = this;
  var size = this.attr('size') || Error('no size');
  e.style.backgroundImage = "url("+this.attr('image')+")";

  // override .renderAll() for getting data
  e.renderAll = function(data){
    this.data = data;
  }

  this.style.position = 'relative';

  var parent = this.parentElement.child();
  parent.style.position = 'fixed';
  parent.style.backgroundColor = 'white';
  parent.style.opacity = '1';
   
  for (var i = 0; i < size; i++) {

    var item = parent.child();
    item.classList.add('acitem');
    item.hidden = true;

    item.onclick = function() {
      e.value = this.data.value;
      e.dispatchData(this.data);
      parent.hidden = true;
    };

    e.onkeyup = function() {

      if (!e.value) {
        e.style.backgroundImage = "url(api.png)";
        parent.children.forEach(function(c) {
          c.hidden = true;
        });
        return parent.hidden = true;
      }

      //var i = 0;
      parent.hidden = false;

      var show = this.data

        .filter(function(i) {
          var ret = i.value.match(RegExp(e.value, 'i'));
          return ret;
        })

        .sort(function(a, b) {
          return a > b;
        });

      parent.children.forEach(function(itemdiv) {
        if (!show.length) return itemdiv.hidden = true;

        var item = show.shift();
        var rx = new RegExp(e.value, 'i');
        var txt = item.value.match(rx)[0];
        txt = item.value.replace(txt, '<b>' + txt + '</b>')

        itemdiv.set('<i class="'+item.class+' left" style=""></i><div style="line-height:auto; margin-left:70px">'+item.value+'</div>');
        itemdiv.data = item;
        itemdiv.hidden = false;

      });

    }

  };

}function editable() {
  
  ondata.call(this);

  this.onclick = function(ev) {
    this.innerHTML = '<input value="{{v}}" />'.replace('{{v}}', this.innerHTML);
    this.onclick = null;
    ev.stopImmediatePropagation();
  }
  
  var e = this;
  function save() {
    if (e.children.length)
      e.innerHTML = e.children[0].value;
    e.onclick = function(ev) {
      e.innerHTML = '<input value="{{v}}" />'.replace('{{v}}', e.innerHTML);
      e.onclick = null;
      ev.stopImmediatePropagation();
    }
    e.dispatchData(e.innerHTML);
  }
  
  e.onkeyup = function(ev) {
    ev.keyCode == 13 && save();
  }

}

/* test
body.innerHTML = "";
var myedit = body.child('Im editable, nice to meet you', 'editable');
myedit.setAttribute('control', '');
myedit.id = 'myedit';

var catcher = body.control('I catch data', 'ondata');
catcher.setAttribute('datafrom', 'myedit');

body.controls();
*/function eventsource(){
  ondata.call(this);
  var es = new EventSource(this.attr('href'));
  es.onmessage = this.dispatchData.bind(this);
}

/*
body.innerHTML = '{{data}}';
var events = body.control('eventsource', {href:'//http-echo.com/stream'});
ondata.call(body);
body.datafrom(events);
*/function fbcomments(){

  this.innerHTML = '<div class="fb-comments" href="dpsw.info"></div>'
  load('http://connect.facebook.net/en_US/all.js#xfbml=1');
  
}

/* test

body.innerHTML = '';
t = body.control('', 'fbcomments', {}, 'four two-high');

body.controls();

*/function feedburner() {
  
  this.innerHTML = '<form style="border:1px solid #ccc;padding:3px;text-align:center;" '+
  	'action="http://feedburner.google.com/fb/a/mailverify" method="post" target="popupwindow"'+
  	' onsubmit="window.open(\'http://feedburner.google.com/fb/a/mailverify?uri='+p.n+
  	'\', \'popupwindow\', \'scrollbars=yes,width=550,height=520\');return true"><p>Enter your email '+
	'address:</p><p><center><input type="text" style="width:240px" name="email"/></center>'+
	'</p><input type="hidden" value="'+this.attr("name")+'" name="uri"/><input type="hidden" name="loc" '+
	'value="en_US"/><input type="submit" value="Subscribe" /></form>';

}

/* test

body.innerHTML = '';
window.t = body.control('', 'feedburner', {name: 'electronicdj'}, 'four two-high');
body.controls();

*/
function filepickerio(){

    ondata.call(this);
    load('//api.filepicker.io/v1/filepicker.js');

}

/* test

must use https

body.innerHTML = '';
t = body.control('', 'filepickerio', {key: 'AYEAvo9QNSLu9ujF0D4rsz'}, 'four two-high');
t.id = 'datasrc';
a = t.child('Select file', 'a');
a.href='javascript:io=document.querySelector("filepickerio");filepicker.setKey(io.getAttribute("key"));filepicker.pick(io.dispatchData)';

function teststub(){
}
h = body.control('file name', 'teststub', {datafrom: 'datasrc', control: 'ondata'}, '');

body.controls();
*/function footer(){
  var items = this.attr('items').split(' ');
  for(var i=0; i<items.length; i++){
    this.child(items[i++], items[i]=='#' ? 'span':'a', {href: items[i]}); 
  }
}
  // body.child('', '', {items:'terms /terms privacy /privacy &#9731; # api /api contact /contact', control:'footer'});
function gcomments() {
  
  this.innerHTML = '<div class="g-comments" data-href="'+location.href+'" data-width="642" data-first_party_property="BLOGGER" data-view_type="FILTERED_POSTMOD"></div>';
  load('https://apis.google.com/js/plusone.js');

}

/* test

body.innerHTML = '';
window.t = body.control('', 'gcomments', {}, 'four two-high');
body.controls();

*/function header(){
  var items = this.attr('items').split(' ');
  for(var i=0; i<items.length; i++){
    this.child(items[i++], items[i]=='#' ? 'span':'a', {href: items[i]}); 
  }
}
  // body.child('', '', {items:'terms /terms privacy /privacy &#9731; # api /api contact /contact', control:'footer'});
function mapstatic(){
 
    ondata.call(this);
    this.innerHTML = '<img src="https://maps.googleapis.com/maps/api/staticmap?center={{where}}&zoom=13&size=600x300&maptype=roadmap">';
    this.attr('where') && this.render({where: this.attr('where')});

}

/* test 

body.innerHTML='';
body.control('mapstatic', {where: 'vegas'})

*/function menu() {

  document.addEventListener('click', function(ev) {
    this.hidden = true;
  }.bind(this));

  this.hidden = true;
  var e = this.parentElement.nodeName == 'BODY' ? document : this.parentElement;
  e.addEventListener('click', function(ev) {
    this.hidden = false;
    ev.stopPropagation();
  }.bind(this));

}

function contextmenu() {

  document.addEventListener('click', function(ev) {
    this.hidden = true;
  }.bind(this));

  this.hidden = true;

  document.addEventListener('mousemove', function(e) {
    window.cpos = [e.pageX, e.pageY];
  });

  var e = this.parentElement.nodeName == 'BODY' ? document : this.parentElement;
  e.oncontextmenu = function(ev) {
    this.hidden = false;
    var pos = window.cpos;
    this.style.top = pos[1]-30 + 'px';
    this.style.left = pos[0]-30 + 'px';
    ev.stopPropagation();
    return false;
  }.bind(this);

}

/* test

  menu
body.innerHTML = "";

var ml = body.child('menulink').classes('left padding');
var menulink = ml.control('menu');
menulink.child('', 'li').innerHTML = 'one';
menulink.child('', 'li').innerHTML = 'two';

var ml2 = body.child('menulink').classes('left padding');
var menulink2 = ml2.control('menu');
menulink2.child('', 'li').innerHTML = 'three';
menulink2.child('', 'li').innerHTML = 'four';


body.controls()

  ctxmenu
body.innerHTML = "";
var ctxmenu = body.control('contextmenu');
ctxmenu.child('', 'li').innerHTML = 'one';
ctxmenu.child('', 'li').innerHTML = 'two';
ctxmenu.child('', 'li').innerHTML = 'three';
ctxmenu.child('', 'li').innerHTML = 'four';
var target = body.child('click here').classes('bg-black one one-high');
var ctxmenu2 = target.control('contextmenu');
ctxmenu2.child('', 'li').innerHTML = 'five';
ctxmenu2.child('', 'li').innerHTML = 'six';
ctxmenu2.child('', 'li').innerHTML = 'seven';
body.controls()
*/function modal() {
  this.classList.add('center-screen');
  this.style.zIndex = 1001;
  var overlay = body.child('');
    overlay.classList.add('overlay');
    overlay.hidden = true;
  var me = this;
  this.show = function(){ 
    overlay.hidden = e.hidden = false;
    document.onkeyup=function(k){k.keyCode==13 && me.hide(); };
  };
  this.hide = function(){
    overlay.hidden = me.hidden = true; 
  };
  this.hidden = false;
}

/* test

body.innerHTML = '<a>link should be disabled</a>';

var e = body.control('modal', {id: 'mymodal'}, "hey there Im modal<br><br>");
e.hidden = true;

var b = e.child('', 'button').classes('bg-green');
b.innerHTML = 'OK';
b.onclick=function(){ e.hide() }

$('#mymodal').show();

*/function ondata() {
  
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
function soundcloud() {
  
  this.template = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{{id}}&amp;color=ff6600&amp;auto_play=false&amp;show_artwork=true"></iframe>';

  this.set = function(obj) {

    var html = this.template.replace('{{id}}', obj.id);
    this.innerHTML = html;

  }
  
  this.attr('id') && this.set({id: this.attr('id')});

}

/* test
body.innerHTML = '';
window.t = body.control('', 'soundcloud', {id: '121966611'}, 'four two-high');
body.controls();

// test set
setTimeout(change, 3000);

function change(){
  window.t.set({id:'143443476'});
}

*/function tweet() {
  
  ondata.call(this);
  this.innerHTML = "<blockquote class='twitter-tweet'><a href='https://twitter.com/{{user}}/statuses/{{status}}'></a></blockquote>";
  this.hidden = true;
  load('//platform.twitter.com/widgets.js');

  if (this.attr('user') && this.attr('status'))
    this.render({user: this.attr('user'), status: this.attr('status')});

  load('//platform.twitter.com/widgets.js');
}
