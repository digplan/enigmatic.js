 // Controls

  window.modal = function() {
    loadcss('', `
<style>
modal {
  box-shadow: 2px 2px 2px #999999;
  padding: 20px;
}
.overlay {
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fcfcfc;
    opacity: 0.8;
    filter: alpha(opacity=80);
    z-index:1000;
}
</style>`);
    
    this.classList.add('center-screen');
    this.style.zIndex = 1001;
    var overlay = document.body.child();
    overlay.classList.add('overlay');
    overlay.hidden = true;
    var me = this;
    this.show = function() {
      overlay.hidden = false;
      me.hidden = false;
      document.onkeyup = function(k) {
        if(k.keyCode == 13) me.hide();
      };
    };
    this.hide = function() {
      overlay.hidden = me.hidden = true;
    };
    this.hidden = true;
  };

  window.menu = function(o){
    loadcss('', `
      <style>
        menu * {
          box-shadow: 1px #999999;
          padding: 4px;
          list-style-type:none;
          min-width:140px;
          max-width:130px;
          display: block;
          clear: both;
          cursor:default;
          background-color: white;
          margin-left: -20px
        }
        menu *:hover {
          text-decoration:none;
          color: white;
          background-color: #dddddd;
        }
        menu > li {
          color:yellow;  
        }
      </style>
    `);
    var me = this;
    var trigger = $('#'+o.for)[0];
    trigger.onclick = function(){
      me.hidden = !me.hidden;
    };
    me.hidden = true;
  };

  window.contextmenu = function(o) {
    loadcss('', `
<style>
contextmenu * {
  box-shadow: 1px #999999;
  padding: 6px;
  list-style-type:none;
  min-width:140px;
  max-width:300px;
  display: block;
  clear: both;
  cursor:default;
  background-color: white;
}
contextmenu *:hover {
  text-decoration:none;
  color: white;
  background-color: #dddddd;
}
</style>`);

    document.addEventListener('click', function(ev) {
      this.hidden = true;
    }.bind(this));
    document.addEventListener('mousemove', function(e) {
      window.cpos = [e.pageX, e.pageY];
    });
    var me = this;
    window.oncontextmenu = function(ev) {
      me.hidden = false;
      var pos = window.cpos;
      me.style.position = 'fixed';
      me.style.top = pos[1] - 30 + 'px';
      me.style.left = pos[0] - 30 + 'px';
      ev.stopPropagation();
      return false;
    };
    this.hidden = true;
  };

  window.gcomments = function(){
    this.innerHTML = `
      <script src="https://apis.google.com/js/plusone.js"></script>
      <div id="comments"></div>
      gapi.comments.render('comments', {
          href: window.location,
          width: '624',
          first_party_property: 'BLOGGER',
          view_type: 'FILTERED_POSTMOD'
      });
    `;
  };
  
  window.fbcomments = function(o) {
    this.innerHTML = `<div class="fb-comments" data-href="${location.href}" data-numposts="2"></div>`;
    load(`//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=${o.appid}`);
  };
  
  window.login = function(){
    loadcss('', `
<style>

login {
  position: fixed;
  background-color: red;
  height: 40px;
  width: 40px;
}

.loggedin {
  background-color: green;
}
</style>`);
    
    var img = this.child('img');
    var me = this;
    (function(){
      var t = arguments.callee;
      me.classList.remove('loggedin');
      var name = localStorage.getItem('user');
      me.onclick = function(){
        localStorage.setItem('user', 'cb');
        t();
      };
      img.src = 'https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/user.png';
      if(!name) return;
      
      img.src = 'https://d1avok0lzls2w.cloudfront.net/img_uploads/changing-urls-0(2).jpg';
      me.classList.add('loggedin');
      me.onclick = function(){
        localStorage.removeItem('user');
        t();
      };
    })();
  };
  window.mapstatic = function(o){
    this.innerHTML = `<img src="https://maps.googleapis.com/maps/api/staticmap?center=${o.where}&zoom=${o.zoom||13}&size=600x300">`;
  };
  window.views = function(o){
    var v = this;
    window._onviewchange = [];
    for(var ls = document.links, numLinks = ls.length, i=0; i<numLinks; i++){
      ls[i].onclick= (function(t, ch){
         return function(){
           var showid = t.split('/').pop();
           history.pushState({}, 'test', t);
           for(var i=0; i<ch.length; i++){
             ch[i].hidden = (showid != ch[i].id);
           }
           window._onviewchange.forEach(function(f){
             f(showid);
           });
           return false;
         };
      })(ls[i].href, v.children);
    }
    
  };
  window.logger = function(){
    loadcss('', `
      <style>
        logger {
          position: fixed;
          bottom: 0%;
          border: 1px #dbdbdb solid;
          padding: 10px;
          width: 100%;
          height:20%;
          background-color: #ddd;
          left: 0;
          font-family: Courier;
          font-size:14px;
          overflow:scroll;
          padding: 16px;
        }
      </style>
    `);
    var me = this;
    window._log = function(s){
      s = JSON.stringify(s);
      me.innerHTML += `${s}</br>`;
      me.scrollTop = me.scrollHeight;
    };
  };
  window.value = function(o){
    loadcss('', `
      <style>
        value:focus {
          outline: #dbdbdb solid thick;
        }
      </style>
    `);
    var me = this, k = o.data;
    me.setValue = function(s){
      me.innerHTML = s;
    };
    me.onkeypress = function(e){
      return e.which != 13;
    };
    me.onblur = function(){ 
      data[k] = me.innerText;
    };
  };
  window.datahandler = function(o){
    var k = this.getAttribute('data');
    this.setValue = function(v){
      var x = new XMLHttpRequest();
      x.open('GET', `https://httpbin.org/get?${k}=${v}`, false);
      x.send(null);
      _log(x.responseText);
    };
  };
  window.metube = function(o){
    this.innerHTML = `
      <link rel=stylesheet href=http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css>
      <style>
        metube > div {
         background-color: #e52d27;  
         width:100%;
         height:100%;
        }
        #metube_header span {
           color:white;
           margin: 20px;
        }
        #metube_header span:hover {
           color:black;
        }
        #metube_body {
           background-color: gray;
           height:70%;
        }
      </style>
      <div id=metubeapp>
        <div id=metube_header>
          <span>Metube Red</span>
          <span class=ion-android-home>
          <span class=ion-flame>
          <span class=ion-information-circled>
        </div>
        <div id=metube_body>

        </div>
      </div>`;
  };
  window.notification = function(o){
    Notification.requestPermission();
    this.setValue = function(s){
      new Notification(s);
    };
  };
  window.colors = function(o){
    loadcss('',`
<style>
.bg-navy {
  background-color: #001f3f
}
.bg-blue {
  background-color: #0074d9
}
.bg-aqua {
  background-color: #7fdbff
}
.bg-teal {
  background-color: #39cccc
}
.bg-olive {
  background-color: #3d9970
}
.bg-green {
  background-color: #2ecc40
}
.bg-lime {
  background-color: #01ff70
}
.bg-yellow {
  background-color: #ffdc00
}
.bg-orange {
  background-color: #ff851b
}
.bg-red {
  background-color: #ff4136
}
.bg-fuchsia {
  background-color: #f012be
}
.bg-purple {
  background-color: #b10dc9
}
.bg-maroon {
  background-color: #85144b
}
.bg-white {
  background-color: #fff
}
.bg-gray {
  background-color: #aaa
}
.bg-silver {
  background-color: #ddd
}
.bg-black {
  background-color: #111
}
.navy {
  color: #001f3f
}
.blue {
  color: #0074d9
}
.aqua {
  color: #7fdbff
}
.teal {
  color: #39cccc
}
.olive {
  color: #3d9970
}
.green {
  color: #2ecc40
}
.lime {
  color: #01ff70
}
.yellow {
  color: #ffdc00
}
.orange {
  color: #ff851b
}
.red {
  color: #ff4136
}
.fuchsia {
  color: #f012be
}
.purple {
  color: #b10dc9
}
.maroon {
  color: #85144b
}
.white {
  color: #fff !important
}
.silver {
  color: #ddd
}
.gray {
  color: #aaa
}
.black {
  color: #111
}
</style>`);
  };

window.youtube = function(o) {
  this.innerHTML = `
    <iframe height="${o.height}" 
            width="${o.width}" 
            src="//www.youtube.com/embed/${o.watch}" 
            frameborder="0" 
            allowfullscreen>
    </iframe>`;
};

window.ajax = function(u, v, d, cb){
  var x = new XMLHttpRequest();
  x.open(v, u, false);
  x.send();
  cb(x.responseText);
}
window.firebase = function(o){
  var k = o.data, db = o.db;
  this.setValue = function(v){
     window.ajax(`https://${db}.firebaseio.com/${k}.json`, 'POST');
  };
}

