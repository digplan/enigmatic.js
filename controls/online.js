// <online style='position:absolute' class='three two-high' control>

enig.online = (e)=>{
 var check = k =>
   e.style.backgroundColor = navigator.onLine ? 'green': '#f44242';
 e.innerHTML = '&nbsp';
 check();
 setInterval(check, 3000);
}
