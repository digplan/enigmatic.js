enig.panel = (e) => {
  var templ = e.innerHTML;

  function arr(data){
    data.forEach((row)=>{
      var child = e.child();
      child.innerHTML = enig.format(templ, row);
    });
  }
  
  e.setValue = (data) => {
    e.innerHTML = '';
    if(!data.push)
      e.innerHTML = enig.format(templ, data);
    else
      arr(data);
    e.hidden = false;
  }
}
