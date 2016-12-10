enig.input = (e)=>{
  e.setAttribute('list', 'inp');
  var datalist = e.child('datalist');
  datalist.id = 'inp';
  e.setValue = (d)=>{
    if(typeof d === 'string') return e.value = d;
    var list = d.map((e)=>{return `<option label="${e.label}" value="${e.value}"></option>`});
    datalist.innerHTML = list.join('');
  }
}
