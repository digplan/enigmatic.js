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

/*
body.innerHTML = '{{msg}}';
var events = body.control('ajax', {href:'//dpsw.info/data.json'});
ondata.call(body);
body.datafrom(events);
*/

function appstore(){
  this.innerHTML = '<meta name="apple-itunes-app" content="app-id='+this.attr('id')+'">';
}

/* body.control('appstore'); */

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

}

function editable() {
  
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
*/

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

function fbcomments(){
  this.innerHTML = '<div class="fb-comments" href="'+this.attr("url")+'"></div>'
  load('http://connect.facebook.net/en_US/all.js#xfbml=1');
}

/*  body.control('fbcomments', {url: 'dpsw.info'});  */

function feedburner() {
  this.innerHTML = '<form style="border:1px solid #ccc;padding:3px;text-align:center;" '+
  	'action="http://feedburner.google.com/fb/a/mailverify" method="post" target="popupwindow"'+
  	' onsubmit="window.open(\'http://feedburner.google.com/fb/a/mailverify?uri='+this.attr("name")+
  	'\', \'popupwindow\', \'scrollbars=yes,width=550,height=520\');return true"><p>Enter your email '+
	'address:</p><p><center><input type="text" style="width:240px" name="email"/></center>'+
	'</p><input type="hidden" value="'+this.attr("name")+'" name="uri"/><input type="hidden" name="loc" '+
	'value="en_US"/><input type="submit" value="Subscribe" /></form>';
}

/* body.control('feedburner', {name: 'electronicdj'});  */

function footer(){
  var items = this.attr('items').split(' ');
  for(var i=0; i<items.length; i++){
    this.child(items[i++], items[i]=='#' ? 'span':'a', {href: items[i]}); 
  }
}

/* body.control('footer', {items:'terms /terms privacy /privacy &#9731; # api /api contact /contact'}); */

function gcomments() {
  
  this.innerHTML = '<div class="g-comments" data-href="'+location.href+'" data-width="642" data-first_party_property="BLOGGER" data-view_type="FILTERED_POSTMOD"></div>';
  load('https://apis.google.com/js/plusone.js');

}

/* body.control('gcomments') */

function header(){
  var items = this.attr('items').split(' ');
  for(var i=0; i<items.length; i++){
    this.child(items[i++], items[i]=='#' ? 'span':'a', {href: items[i]}); 
  }
}

/* body.control('header', {items:'terms /terms privacy /privacy &#9731; # api /api contact /contact'}); */

function mapstatic(){
 
    ondata.call(this);
    this.innerHTML = '<img src="https://maps.googleapis.com/maps/api/staticmap?center={{where}}&zoom=13&size=600x300&maptype=roadmap">';
    this.attr('where') && this.render({where: this.attr('where')});

}

/*  body.control('mapstatic', {where: 'vegas'})  */

function menu() {

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

/* body.control('contextmenu').innerHTML = '<li>hey there</li><li>hey there 2</li>' */

function modal() {
  this.classList.add('center-screen');
  this.style.zIndex = 1001;
  var overlay = body.child('');
    overlay.classList.add('overlay');
    overlay.hidden = true;
  var me = this;
  this.show = function(){ 
    overlay.hidden = false;
    document.onkeyup=function(k){k.keyCode==13 && me.hide(); };
  };
  this.hide = function(){
    overlay.hidden = me.hidden = true; 
  };
  this.hidden = false;
}

/* body.control('modal', {id: 'mymodal'}, "hey there Im modal<br><br><button class='bg-green' onclick='parentElement.hide()'>OK</button>");  */


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

function soundcloud() {
  this.innerHTML = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{{id}}&amp;color=ff6600&amp;auto_play=false&amp;show_artwork=true"></iframe>';
  this.attr('id') && this.render({id: this.attr('id')});
}

/* body.control('soundcloud', {id: '35273963'}) */

function tweet() {  
  ondata.call(this);
  this.innerHTML = "<blockquote class='twitter-tweet'><a href='https://twitter.com/{{user}}/statuses/{{status}}'></a></blockquote>";
  if (this.attr('status'))
    this.render({ status: this.attr('status') });

  load('//platform.twitter.com/widgets.js');
}

/* body.control('tweet', {status:'551046226699767808'}) */
