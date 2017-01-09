// <login control>
enig.login = e => {
  enig.loadcss('//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css')
  if(!e) {
    localStorage.removeItem('user')
    return location.reload()
  }
  var uis = localStorage.getItem('user');
  if(uis){
    var ui = JSON.parse(uis)
    return e.innerHTML = `
       <span style='cursor:default'>${ui.name}</span> 
       <img style='height:30px; border-radius:20px; transform:translateY(25%)' src=${ui.picture} >
       <i id=logout class='ion-close-round' onclick='enig.login(false)'></i></div>
      `
  }
  enig.auth = new Auth0Lock('fBLesHV6GaLAbGs0ajbJEAT6KtdTfm8c', 'digplan.auth0.com', {
    theme: { primaryColor: '#3A99D8', logo:'' }, languageDictionary: { title: 'login' }
  });
  enig.auth.on("authenticated", (ar) => {
    enig.auth.getProfile(ar.idToken, (err, p) => {
      if (err) return Error(err)
      p.id_token = ar.idToken
      localStorage.setItem('user', JSON.stringify(p))
      enig.login(e)
    });
  });
  e.innerHTML = `<i class='ion-person' onclick="enig.auth.show()"></i>`
}
