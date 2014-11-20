function helloworld(p, e){
   return 'Hello ' + p.name || 'World';
}
function appstore(p, e){
  return '<meta name="apple-itunes-app" content="app-id="'+p.n+'>';
}
function soundcloud(p, e){
   return '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+p.trackno+'&amp;color=ff6600&amp;auto_play=false&amp;show_artwork=true"></iframe>';
}
function gcomments(p, e){
  load('https://apis.google.com/js/plusone.js', function(){});
  return '<div class="g-comments" data-href="'+location.href+'" data-width="642" data-first_party_property="BLOGGER" data-view_type="FILTERED_POSTMOD"></div>';
}
function dropmenu(p, e){
  load('http://code.jquery.com/jquery-1.10.2.min.js', function(){
      load('http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js');
  });
  var x = '';
  var a = p.items.split(','); 
  for(i = 0; i < a.length; i = i + 2){
    var y = i + 1;
    x += '<li><a href="'+a[y]+'">'+a[i]+'</a></li>';
  }
  return '<div class="span8"><ul class="nav nav-pills"><li class="dropdown" id="menu1">' + 
  '<a class="dropdown-toggle" data-toggle="dropdown" href="#menu1">' + p.label + 
  '<b class="caret"></b></a><ul class="dropdown-menu">'+x+'</ul></li></ul></div>';
}
function tweet(p, e){
  load('//platform.twitter.com/widgets.js');
  return "<blockquote class='twitter-tweet'><a href='https://twitter.com/"+p.user+"/statuses/"+p.status+"'></a></blockquote>";
}
function fbregister(p, e) {
  return '<iframe frameborder=0 height=340 src="https://www.facebook.com/plugins/registration.php?'+
  			'client_id=461567240538848&redirect_uri='+p.url+'/fbreg/&fields=name,birthday,email"></iframe>';
}
function feedburner(p, e){
  if(!p.n) return '';
  return '<form style="border:1px solid #ccc;padding:3px;text-align:center;" '+
  	'action="http://feedburner.google.com/fb/a/mailverify" method="post" target="popupwindow"'+
  	' onsubmit="window.open(\'http://feedburner.google.com/fb/a/mailverify?uri='+p.n+
  	'\', \'popupwindow\', \'scrollbars=yes,width=550,height=520\');return true"><p>Enter your email '+
	'address:</p><p><center><input type="text" style="width:240px" name="email"/></center>'+
	'</p><input type="hidden" value="'+p.n+'" name="uri"/><input type="hidden" name="loc" '+
	'value="en_US"/><input type="submit" value="Subscribe" /></form>';
}
function filepickerio(p, e){
    load('//api.filepicker.io/v1/filepicker.js', function(){
        filepicker.setKey(p.key);
    })
    return "<a href='javascript:filepicker.pick("+p.handler+")'>Select file</a>";
}
function tweetbtn(p, e){
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
    return '<a href="https://twitter.com/share" class="twitter-share-button" data-via="b_man__">Tweet</a>';
}
function gplusbtn(p, e){
    load('https://apis.google.com/js/plusone.js');
    return '<g:plusone></g:plusone>';
}
function fblike(p, e){
    (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=461567240538848";
  fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    return '<div id="fb-root"></div><div class="fb-like" data-href="'+location.href+'" data-width="200" data-show-faces="false" data-send="false"></div>'
}
function fbcomments(p, e) {
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  return '<div class="fb-comments" href="'+location.href+'"></div>';
}

var mapid = null, mapcenter = null, mapzoom = null, maptype = 'SATELLITE';
function map_init(){
  var mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: parseInt(mapzoom),
          mapTypeId: eval('google.maps.MapTypeId.'+maptype)
        };
  window[mapid] = {
    _map: new google.maps.Map(document.getElementById("map-canvas"), mapOptions),
    center: function(lat, long){
        var that = this;
        if(arguments.length < 2){
          new google.maps.Geocoder().geocode({'address': lat+''}, function(r){
             that._map.setCenter(r[0].geometry.location);
          })
          return;
        }
        this._map.setCenter(new google.maps.LatLng(lat, long));
    },
    info: function(msg){
       var iw = new google.maps.InfoWindow({content: msg});
       iw.open(this._map);
       this.iw = iw;
    }
  }
  window[mapid].center(mapcenter);
}
function map(p, e) {
    //https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initialize
    mapid = e.id; mapcenter = p.center; mapzoom = p.zoom; maptype = p.type;
    load('https://developers.google.com/maps/documentation/javascript/examples/default.css');
    load('https://maps.googleapis.com/maps/api/js?key=AIzaSyAQ2PRSPVY3srky-fP3DsUDBjAyPuNWPB4&sensor=true&callback=map_init');
    return '<div id="map-canvas" style="width:'+p.w+'px; height:'+p.h+'px"></div>';
}
function mapstatic(p,e){
    e.child('<img src=\"https://maps.googleapis.com/maps/api/staticmap?center='+p.where+'&zoom=13&size=600x300&maptype=roadmap\"/>');
}