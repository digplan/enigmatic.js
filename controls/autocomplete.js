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
  var max = e.getAttribute('max');
  e.setValue = data => {
    e.data = data;
    [].slice.call(myac.children).splice(1).forEach(e => e.remove());
    data.forEach(item => {
      var ch = e.child();
      ch.style.backgroundColor = 'white';
      ch.style.opacity = '0.8';
      ch.style.width = e.offsetWidth+'px';
      ch.innerHTML = e.template.replace(/\${[^}]*}/g, o => item[o.replace(/\$|{|}/g,'')]);
      ch.value = item.value;
      ch.style.cursor = 'default';
      ch.style.padding = '6px'
      ch.onmouseover = () => ch.style.backgroundColor = '#dbdbdb';
      ch.onmouseout = () =>  ch.style.backgroundColor = 'white';
      ch.onclick = () => {
        e.value = input.value = ch.value;
        myac.querySelectorAll('div:not([hidden])').forEach(e => e.hidden = true);
        if(e.onselected) 
          e.onselected.call(e, e.data.filter(item => item.value==e.value)[0]);
      }
      ch.hidden = true;
    })
  }
  e.onkeyup = ev => {
    if(ev.keyCode == 27){
      myac.querySelectorAll('div:not([hidden])').forEach(e => e.hidden = true);
      return input.value = '';
    }
    var x = 0;
    [].slice.call(e.children, 1).forEach(ch => {
      if(ch.value.match(input.value, 'i') && x < max && e.value){
        ch.hidden = false;
        x++;
      } else {
        ch.hidden = true;
      }
    });
  }
}
