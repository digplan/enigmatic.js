enig.panel = (e) => {
  var templ = e.innerHTML;

  function getSub(data, prop){
    var a = prop.split('.');
    a.forEach((k)=>{
      data = data[k];
    });
    return data;
  }
  
  function arr(data){
    data.forEach((row)=>{
      var child = e.child();
      child.innerHTML = enig.format(templ, row);
    });
  }
  
  e.setValue = (data) => {
    var prop = e.getAttribute('data-prop');
    if(prop) data = getSub(data, prop);
    e.innerHTML = '';
    if(!data.push)
      e.innerHTML = enig.format(templ, data);
    else
      arr(data);
    e.hidden = false;
  }
}
