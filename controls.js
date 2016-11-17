// Controls

  window.modal = function() {
    loadcss('', `
<style>
modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}
/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
</style>`);
    
  var me = this;
  this.open = function() {
    me.style.display = "block";
  };
  this.close = function() {
    me.style.display = "none";
  };

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
    var trigger = $('#'+ this.getAttribute('for'))[0];
    trigger.onclick = function(){
      me.hidden = !me.hidden;
    };
    me.hidden = true;
  };

  window.contextmenu = function(o) {
    loadcss('', `
<style>
contextmenu {
  display: hidden;
}
contextmenu li {
  box-shadow: 1px #999999;
  padding: 6px;
  list-style-type:none;
  min-width:140px;
  max-width:300px;
  clear: both;
  cursor:default;
  background-color: white;
}
contextmenu li:hover {
  background-color: #dbdbdb;
}
</style>`);

    var me = this;
    document.addEventListener('click', function(ev) {
      me.style.display = 'none';
    });
    window.oncontextmenu = function(ev) {
      me.style.display = 'block';
      var pos = window.cpos;
      me.style.position = 'fixed';
      me.style.top = `${ev.clientY}px`;
      me.style.left = `${ev.clientX-30}px`;
      ev.stopPropagation();
      return false;
    };
  };

  window.gcomments = function(){
    this.innerHTML = `<div id="comments"></div>`;
    load('https://apis.google.com/js/plusone.js', () => {
      gapi.comments.render('comments', {
          href: window.location,
          width: '624',
          first_party_property: 'BLOGGER',
          view_type: 'FILTERED_POSTMOD'
      });
    })
  };
  
  window.fbcomments = function() {
    this.innerHTML = `<div class="fb-comments" data-href="${location.href}" data-numposts="2"></div>`;
    load(`//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=${this.getAttribute('appid')}`);
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
  window.mapstatic = function(){
    var where = this.getAttribute('where');
    this.innerHTML = `<img src="https://maps.googleapis.com/maps/api/staticmap?center=${where}&zoom=${this.getAttribute('zoom')||13}&size=600x300">`;
  };
  
  window.views = function(){
    for(var ls = document.links, numLinks = ls.length, i=0; i<numLinks; i++){
      // Clicking a link will push state
      ls[i].onclick= (function(linktarget){
         return function(){
           var path = linktarget.split('/').pop();
           history.pushState({}, '', path);
           // Hide views other than selected
           $('views > view').forEach((view)=>{
             view.style.display = view.id == path ? '' : 'none';
             view.hidden = false;
           });
           if(window._onviewchange) window._onviewchange(path);
           return false;
         };
         // link target
      })(ls[i].href);
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
    window.onerror = console.log = function(s){
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
    var me = this, k = this.getAttribute('data');
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
  window.datahandler = function(){
    var k = this.getAttribute('data');
    this.setValue = function(v){
      var x = new XMLHttpRequest();
      x.open('GET', `https://httpbin.org/get?${k}=${v}`, false);
      x.send(null);
      console.log(x.responseText);
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
    <iframe height="${this.getAttribute('height')}" 
            width="${this.getAttribute('width')}" 
            src="//www.youtube.com/embed/${this.getAttribute('watch')}" 
            frameborder="0" 
            allowfullscreen>
    </iframe>`;
};

window.ajax = function(u, v, d, cb){
  var x = new XMLHttpRequest();
  x.open(v, u, false);
  x.send();
  cb(x.responseText);
};
window.firebase = function(o){
  var k = this.getAttribute('data'), db = this.getAttribute('db');
  this.setValue = function(v){
     window.ajax(`https://${db}.firebaseio.com/${k}.json`, 'POST');
  };
};

