/*
    <autocomplete id=myac data='apilist' max=9 placeholder='API' control>
      <span>${value}</span><br> 
      <span class='twelve magenta'>${Method}</span>
      <a target=_ href='${Info}'><i class='ion-ios-information-outline'></i></a>
    </autocomplete>
    
    myac.onselected = (o) => alert(o);
*/
enig.autocomplete = e => {
  e.style.position = 'relative';
  e.value = '';
  e.template = e.innerHTML || '${value}';
  e.innerHTML = '';
  var input = e.child('input');
  input.setAttribute('placeholder', e.getAttribute('placeholder'));
  input.style.padding = '6px';
  input.onkeyup = ev => e.value = input.value;
  input.onclick = () => input.select();
  var max = e.getAttribute('max');
  e.setValue = data => {
    e.data = data;
    [].slice.call(e.children).splice(1).forEach(e => e.remove());
    data.forEach(item => {
      var ch = e.child();
      ch.style.backgroundColor = 'white';
      ch.style.width = e.offsetWidth+'px';
      ch.innerHTML = e.template.replace(/\${[^}]*}/g, o => item[o.replace(/\$|{|}/g,'')]);
      ch.value = item.value;
      ch.style.position = 'absolute';
      ch.style.cursor = 'default';
      ch.style.padding = '6px';
      ch.onmouseover = () => ch.style.backgroundColor = '#dbdbdb';
      ch.onmouseout = () =>  ch.style.backgroundColor = 'white';
      ch.onclick = () => {
        e.value = input.value = ch.value;
        e.querySelectorAll('div').forEach(e => e.style.display = 'none');
        if(e.onselected) 
          e.onselected.call(e, e.data.filter(item => item.value==e.value)[0]);
      }
      ch.style.display = 'none';
    })
  }
  e.onkeyup = ev => {
    if(ev.keyCode == 27){
      e.querySelectorAll('div').forEach(e => e.style.display = 'none');
      return input.value = '';
    }
    if(ev.keyCode == 13) return;
    var x = 0; var hpos = input.offsetHeight;
    [].slice.call(e.children, 1).forEach(ch => {
      var rx = new RegExp(input.value, 'i');
      if(ch.value.match(rx) && x < max && e.value){
        ch.style.display = 'block';
        ch.style.top = `${hpos}px`;
        hpos += ch.offsetHeight;
        x++;
      } else {
        ch.style.display = 'none';
      }
    });
  }
}
