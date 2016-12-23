/*
  document.onlogin = () => {
    myrouter.route('home');
  };
*/

enig.router = (e) => {
  e.route = (name) => {
    history.pushState({}, '', name);
    $('router > view').forEach((v)=>{v.hidden = v.id != name});
  }
};
