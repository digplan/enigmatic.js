/*
<i id=login class='ion-person thirty' style='float:right; margin-right:40px'></i>
<userlogin id=user style='float:right; margin-right:40px' authtitle=Hi authkey='fBLesHV6GaLAbGs0ajbJEAT6KtdTfm8c' authid='digplan.auth0.com' control hidden>
  <span style='cursor:default'>${name}</span> 
  <img style='height:30px; border-radius: 20px; transform: translateY(25%)' src=# > <br> 
  <div id=userprefs style='margin-left:30px'> <i id=logout class='left ion-close-round red push-one'></i></div>
</userlogin>

<script>
  document.onlogin = ()=>{
    //do something
  };
</script>
*/
enig.userlogin = function(e) {
   var user = e;
    function loggedIn(user){
       login.hidden = userprefs.hidden = true; user.hidden = false;
       var userinfo = JSON.parse(localStorage.getItem('user'));
       user.template = user.innerHTML;
       user.innerHTML = user.template.replace(/\${[^}]*}/g, function(o) { return userinfo[o.replace(/\$|{|}/g,'')] });
       document.querySelector('#user > img').src = userinfo.picture;
       user.onmouseover = () => { userprefs.hidden = false }
       user.onmouseout = () => { userprefs.hidden = true }
       logout.addEventListener('click', ()=>{
         localStorage.removeItem('id_token');
         localStorage.removeItem('user');
         location.href = '/';
       });
       if(document.onlogin) document.onlogin();
    }
    var user = localStorage.getItem('user');
    if(!user){
      login.hidden = false; userprefs.hidden = true;
      var authkey = e.getAttribute('authkey');
      var authid = e.getAttribute('authid');
      var authtitle = e.getAttribute('authtitle');
      var lock = new Auth0Lock(authkey, authid, {
        theme: {
          primaryColor: '#3A99D8',
          logo:''
        },
        languageDictionary: {
          title: authtitle
        }
      });
      login.addEventListener('click', ()=>lock.show());
      login.hidden = false;
      lock.on("authenticated", (authResult) => {
        lock.getProfile(authResult.idToken, (error, profile) => {
          if (error) return Error(error);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('user', JSON.stringify(profile));
          loggedIn(e);
        });
      });
      return;
    }
    loggedIn(e);
 }
