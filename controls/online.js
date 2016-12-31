/*
  <online style='width:50px' control></online>
*/
enig.online = (e)=>{
 function check(){
   e.children[0].color = navigator.onLine ? 'green': '#dbdbdb';
 }
 e.innerHTML = `<hr size="7" width="${e.style.width}" color="green">`;
 setInterval(check, 3000);
}
