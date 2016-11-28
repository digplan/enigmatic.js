// Controls

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

window.firebase = function(o){
  var k = this.getAttribute('data'), db = this.getAttribute('db');
  this.setValue = function(v){
     window.ajax(`https://${db}.firebaseio.com/${k}.json`, 'POST');
  };
};

