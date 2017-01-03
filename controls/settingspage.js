/*
<settingspage control>
  <span class='close'>⬅</span>
</settingspage>
*/

  enig.settingspage = (e)=>{
  e.setStyle = (o)=>{ for(k in o) e.style[k] = o[k]; }
  e.hide = ()=>{
    e.setStyle({
      position: 'absolute',
      top:'10px', width: '88%', height: '70%',
      transition: 'opacity .4s, margin-left .4s',
      opacity: '0',
      padding: '5%',
      margin: '3%',
      'margin-left':'-20px',
      cursor: 'default'
    });
   }
   e.show = ()=>{
    e.setStyle({
      opacity: '0.8',
      transition: 'opacity .3s margin-left .4s',
      'margin-left':'5px',
      'background-color':'white'
		})
   }
   e.hide();
   e.querySelector('.close').onclick = e.hide;
}
